const btn_video = {
	data : function() {
		return {
			
		}
	},

	methods : {
		
		/**
			@brief lance la video
		*/
		playVideo(){
			this.$refs.player.play();
		},
		
		/**
			@brief retourne 0.5s en arriere
		*/
		retourVersLePasse(){
			this.$refs.player.currentTime -= 0.5;
		},
		
		/**
			@brief avance de 0.5s
		*/
		retourVersLeFutur(){
			this.$refs.player.currentTime += 0.5;
		},
		
		/**
			@brief arrete la video
		*/
		stopVideo(){
			this.$refs.player.pause();
			this.$refs.player.currentTime = 0;
		},
		
		/**
			@brief met en pause la video
		*/
		pauseVideo(){
			this.$refs.player.pause();
		},
		
		/**
			@brief selectionne le prochain sous-titre
		*/
		nextST(){
			if(this.current_marker.id == null)window.alert("aucun sous-titre selectionné");
			else if(this.current_marker.id >= this.sous_titres.length-1)window.alert("aucun sous-titre suivant");
			else{
				this.markerClick(this.current_marker.id+1);
				this.$refs.player.currentTime = this.getSecondsFromStrTime(this.current_marker.time);
			}
		},
		
		/**
			@brief selectionne le precedent sous-titre
		*/
		precST(){
			if(this.current_marker.id == null)window.alert("aucun sous-titre selectionné");
			else if(this.current_marker.id <= 0)window.alert("aucun sous-titre précedent");
			else{
				this.markerClick(this.current_marker.id-1);
				this.$refs.player.currentTime = this.getSecondsFromStrTime(this.current_marker.time);
			}
		}
	}
};