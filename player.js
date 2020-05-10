let video = document.getElementById('video');

function playM3u8(url){
  if(Hls.isSupported()) {
      video.volume = 0.3;
      var hls = new Hls();
      var m3u8Url = decodeURIComponent(url)
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
    }
	else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = url;
		video.addEventListener('canplay',function() {
		  video.play();
		});
		video.volume = 0.3;
  	}
}

function playPause() {
    video.paused?video.play():video.pause();
}

function volumeUp() {
    if(video.volume <= 0.9) video.volume+=0.1;
}

function volumeDown() {
    if(video.volume >= 0.1) video.volume-=0.1;
}

function mute() {
    video.muted = !video.muted;
}

function seekRight() {
    video.currentTime+=5;
}

function seekLeft() {
    video.currentTime-=5;
}

function vidFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
}

playM3u8('https://directo.fibwi.com/stream/stream_Fight_Time/fighttime.m3u8');//window.location.href.split("#")[1])

document.addEventListener("DOMContentLoaded", function() {
  //Guardar service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function() {
        //console.log('Service Worker Registered');
      });
  }

  document.addEventListener('keydown', function(e) {
    //console.log(event.keyCode);
    //console.log(event.key);
    if (event.keyCode === 32) { playPause();}
    if (event.keyCode === 38 || event.keyCode == "ArrowUp") { volumeUp();}
    if (event.keyCode === 40 || event.keyCode == "ArrowDown") { volumeDown();}
    if (event.keyCode === 77 || event.keyCode == "m" || event.keyCode == "M") { mute();}
    if (event.keyCode === 70 || event.keyCode == "f" || event.keyCode == "F") { vidFullscreen();}
  }); 

});