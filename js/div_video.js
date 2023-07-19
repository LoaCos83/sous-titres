const div_video = {
	data : function() {
		return {
			current_subtrack : "(aucun)",
			player : {currentTime : 0},
			current_video : ((new URLSearchParams(window.location.search)).get("v")?decodeURI((new URLSearchParams(window.location.search)).get("v")):"")
		}
	},

	methods : {
		/**
			@brief se lance a chaque actualisation de la video
		*/
		timeupdate(){
			this.player.currentTime = this.$refs.player.currentTime;
			
			if(this.subtrack.activeCues && this.subtrack.activeCues.length == 0){
				this.current_subtrack = "(aucun)";
			}else{
				this.current_subtrack = "";
				for(let i in this.subtrack.activeCues){
					if(this.subtrack.activeCues[i] && this.subtrack.activeCues[i].text)this.current_subtrack += this.subtrack.activeCues[i].text+"\n";
				}
			}
			
		},
		
		/**
			@brief se lance quand la video est chargee 
		*/
		loadedMetadata(){
			this.player.currentTime = this.$refs.player.currentTime;
			this.max = this.$refs.player.duration;
			this.$refs.player.currentTime = this.player.currentTime;
		}
	},
	mounted(){
		
	}
};