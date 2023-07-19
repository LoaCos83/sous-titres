const timeline = {
	data : function() {
		return {
			current_marker : {
				time : "(time)",
				duration : "duration",
				texte : "texte",
				id : null
			},
			min : 0,
			max : 0
		}
	},

	methods : {
		
		/**
			@brief change le temps de la video
		*/
		changeTemps(){
			this.$refs.player.currentTime = this.player.currentTime;
			let h = (parseInt(this.player.currentTime/3600)).toString();
			if(h.length == 1) h = "0"+h;
			let m = (parseInt(this.player.currentTime/60)%60).toString();
			if(m.length == 1) m = "0"+m;
			let s = (parseInt(this.player.currentTime%60)).toString();
			if(s.length == 1)s= "0"+s;
			this.input_time=h+":"+m+":"+s;
		},
		
		/**
			@brief positionne un marker
			@param i : index
		*/
		markerLoad(i){
			let m = this.$refs.markers[i];
			let time = 0;
			for(t of m.getAttribute("data-time").split(":")){
				time *= 60;
				time += parseInt(t);
			}
			
			m.style.left = (100*time/this.max).toString()+"%";
		},
		
		/**
			@brief selectionne un marker
			@param i : index
		*/
		markerClick(i){
			if(this.sous_titres[i].brille=="brille"){
				this.sous_titres[i].brille="brille_pas";
				this.current_marker.time = "(time)";
				this.current_marker.duration = "(duration)";
				this.current_marker.texte = "(texte)";
				this.current_marker.id = null;
			}else{
				this.setBrillePasToAll();
				this.sous_titres[i].brille="brille";
				this.current_marker.id = i;
				this.current_marker.time = this.sous_titres[i].time;
				this.current_marker.duration = this.sous_titres[i].duration;
				this.current_marker.texte = this.sous_titres[i].texte;
			}
		},
		
		/**
			@brief deselectionne tous les markers
		*/
		setBrillePasToAll(){
			for(let i in this.sous_titres){
				this.sous_titres[i].brille = "brille_pas";
			}
			this.current_marker.id = null;
			this.current_marker.time = "(time)";
			this.current_marker.duration = "(duration)";
			this.current_marker.texte = "(texte)";
		},
		
		/**
			@brief positionne tous les markers
		*/
		updateAllMarkers(){
			for(i in this.sous_titres){
				this.markerLoad(i);
			}
		}
		
	}
};