const ecriture = {
	data : function() {
		return {
			input_time : "00:00:00",
			input_duration : "1",
			input_texte : "" ,
			sous_titres : [],
			txt_st : ""
		}
	},

	methods : {
		
		/**
			@brief ajoute une nouvelle ligne de sous-titre
		*/
		addNewLigneDeSousTitle(){
			if(this.input_time.toString().length > 0 && this.input_duration.toString().length > 0 && this.input_texte.length > 0)
			this.sous_titres.push(
			{
				time : this.input_time,
				duration : this.input_duration,
				texte : this.input_texte,
				brille : "brille_pas",
				modifier : false
			});
			let self = this;
			this.sous_titres.sort(function(a,b){
				let c = self.getSecondsFromStrTime(a.time) - self.getSecondsFromStrTime(b.time);
				return c;
			});
			this.$nextTick(() => {
				self.updateAllMarkers();
			});
		},
		
		/**
			@brief renvoie le temps en seconde
			@param time : String
		*/
		timeToSec(time) {
			var b = time.split(':');
			return b[0]*3600 + +b[1]*60 + +b[2];
		},
		
		/**
			@brief renvoie le temps en String
			@param sec : float
		*/
		secToTime(sec) {
			var hours = Math.floor(sec / 3600);
			var minutes = Math.floor((sec - (hours * 3600)) / 60);
			var seconds = sec - (hours * 3600) - (minutes * 60);
			if (hours < 10) { hours = "0" + hours; }
			if (minutes < 10) { minutes = "0" + minutes; }
			if (seconds < 10) { seconds = "0" + seconds; }
			return hours + ':' + minutes + ':' + seconds;
		},
		
		/**
			@brief charge les sous-titre depuis la zone de texte
		*/
		loadFromText(){
			let strs = this.txt_st.split('\n');
			console.log(strs);
			if(strs[0] == "WEBVTT"){
				strs.shift();
				this.loadFromVTT(strs);
			}
		},
		
		/**
			@brief charge les sous-titre de format VTT depuis une liste de String
			@param strs : String[]
		*/
		loadFromVTT(strs){
			this.sous_titres = [];
			for(let i = 0; i< strs.length;++i){
				if(strs[i] == "" || strs[i].match("NOTE"))continue;
				let strs_time = strs[i++].split(" --> ");
				let txt = strs[i++];
				while(i< strs.length && strs[i] != ""){
					txt += "\n" + strs[i++];
				}
				let time1 = 0;
				let time2 = 0;
				for(it of strs_time[0].split(":")){
					time1 *= 60;
					time1 += parseFloat(it);
				}
				
				console.log(strs_time);
				
				for(it of strs_time[1].split(":")){
					time2 *= 60;
					time2 += parseFloat(it);
				}
				console.log("1 : "+time1);
				console.log("2 : "+time2);
				this.sous_titres.push({
					time : strs_time[0],
					duration : (time2-time1),
					texte : txt,
					brille : "brille_pas",
					modifier : false
				});
			}
			
		},
		
		/**
			@brief renvoie les sous-titre sous format VTT
		*/
		toVTT(){
			if(this.sous_titres.length == 0)return "";
			let str_vtt = "WEBVTT\n";
			for(i in this.sous_titres){
				let it = this.sous_titres[i];
				let str_time1 = it.time;
				let str_time2 = this.getStrTimeFromseconds(this.getSecondsFromStrTime(it.time)+it.duration);
				str_vtt+= "\n" + str_time1+" --> "+str_time2+"\n" + it.texte + "\n";
			}
			return str_vtt;
		},
		
		/**
			@brief renvoie le temps en String
			@param t : float
		*/
		getStrTimeFromseconds(t){
			let h = (Math.floor(Math.floor(t)/3600)).toString();
			if(h.length < 2)h = "0"+h;
			let m = ((Math.floor(Math.floor(t)/60))%60).toString();
			if(m.length < 2)m = "0"+m;
			let s = (t%60).toString();
			if(s.length < 2)s = "0"+s;
			return h+":"+m+":"+s;
			
		},
		
		/**
			@brief renvoie le temps en seconde
			@param str : String
		*/
		getSecondsFromStrTime(str){
			let s = 0;
			for(it of str.split(":")){
				s *= 60;
				s += parseFloat(it);
			}
			return s;
		},
		
		/**
			@brief action liee a la fermeture de la modification d'une ligne de sous-titre
			@param i : index
		*/
		clickOk(i){
			this.sous_titres[i].modifier = false;
			this.markerLoad(i);
		},
		
		/**
			@brief action liee a la suppression d'une ligne de sous-titre
			@param i : index
		*/
		clickSuppr(i){
			this.sous_titres.splice(i,1);
		},
		
		/**
			@brief action liee a l'ouverture de la modification d'une ligne de sous-titre
			@param i : index
		*/
		clickMod(i){
			this.closeAllModif();
			this.sous_titres[i].modifier=true;
		},
		
		/**
			@brief action liee a la fermeture de la modification de toutes les lignes de sous-titre
		*/
		closeAllModif(){
			for(let i in this.sous_titres){
				this.sous_titres[i].modifier=false;
				this.markerLoad(i);
			}
			
		}
		
	},
	mounted(){
		
		this.input_duration = 1;
	}
};