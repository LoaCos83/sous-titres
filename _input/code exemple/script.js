
//get current video time and put it in clipabord
function getCurrentVideoTime() {
	let current_time = new Date(Math.round(myvideo.currentTime * 1000))
	current_time.setHours(current_time.getHours() -1)
	//console.log(Math.round(e.target.currentTime * 1000));
	let time_string = current_time.toLocaleTimeString("fr-FR") + "," +current_time.getMilliseconds()
	//00:00:06,383 --> 00:00:09,427
	time_string = time_string + ' --> ' + current_time.toLocaleTimeString("fr-FR") + "," +current_time.getMilliseconds()
	
	return time_string
}

//Apply and make save link
function makeLink(trad_text){
	let blob = new Blob([trad_text], {type: 'text/plain'})
    , url = URL.createObjectURL(blob)
    , hf = document.getElementById('lnkdownload')
  ;
  hf.href = url;
  subtrack.src = url;
  hf.download = `subtitles`;
  hf.innerHTML = `download ${hf.download}`;

}

