

window.onload = function(){
	const { createApp } = Vue;
	console.log(ecriture);
	let app = createApp(ecriture);
	app.mixin(btn_sous_titres);
	app.mixin(btn_video);
	app.mixin(div_video);
	app.mixin(timeline);
	app.mixin(list_videos);
	app.mount('body');
};