const btn_sous_titres = {
	data: function () {
		return {
			input_st : true,
			subtrack : null
		}
	},

	methods: {
		
		/**
			@brief permet de copier coller le contenu des sous-titres sous le format VTT
		*/
		clickCharger(){
			this.input_st = !this.input_st;
			if(this.input_st){
				this.loadFromText();
			}else{
				this.closeAllModif();
				this.txt_st = this.toVTT();
			}
		},
		
		/**
			@brief applique les nouveaux sous-titres
		*/
		clickAppliquer(){
			this.closeAllModif();
			if(!this.input_st){
				this.loadFromText();
				this.input_st = true;
			}
			for(let i = this.subtrack.cues.length-1;i>=0;--i){
				this.subtrack.removeCue(this.subtrack.cues[i]);
				
			}
			for(let i in this.sous_titres){
				let it = this.sous_titres[i];
				let time1 = this.getSecondsFromStrTime(it.time);
				let time2 = this.getSecondsFromStrTime(it.time)+it.duration;
				this.subtrack.addCue(new VTTCue(time1,time2,it.texte));
			}
			
		},
		
		/**
			@brief telecharge un fichier de sous-titres
		*/
		clickTelecharger(){
			let a = document.createElement('a');
			a.setAttribute('href','data:text/plain;charset=utf-8,'+encodeURIComponent(this.toVTT()));
			a.setAttribute('download','sous_titres.vtt');
			a.style.display = 'none';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}

	},
	mounted(){
		this.subtrack = this.$refs.player.addTextTrack("captions", "Captions", "fr");
		this.subtrack.mode = "showing";
	}
};

