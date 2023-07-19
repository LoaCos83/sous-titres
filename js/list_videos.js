const list_videos = {
	data : function() {
		return {
			video_links : [
				{
					"lien_video" : "rsc/videos/BigBuckBunny_512kb.mp4",
					"lien_click" : window.location.pathname + "?v=" + encodeURI("rsc/videos/BigBuckBunny_512kb.mp4")
				},
				{
					"lien_video" : "rsc/videos/ed_hd_512kb.mp4",
					"lien_click" : window.location.pathname + "?v=" + encodeURI("rsc/videos/ed_hd_512kb.mp4")
				},
				{
					"lien_video" : "rsc/videos/Python_512kb.mp4",
					"lien_click" : window.location.pathname + "?v=" + encodeURI("rsc/videos/Python_512kb.mp4")
				}
			]
		}
	},

	methods : {
		/**
			@brief joue une video en vignette
			@param i : index
		*/
		playVideoLien(i){
			this.$refs.players_link[i].play();
		},
		
		/**
			@brief met en pause une video en vignette
			@param i : index
		*/
		pauseVideoLien(i){
			this.$refs.players_link[i].pause();
			
		}
	},
	
	mounted(){
		this.$nextTick(function (){
			for(v of this.$refs.players_link){
				v.currentTime=10;
			}
		});
	}
};