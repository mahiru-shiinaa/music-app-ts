//Aplayers
const aplayer = document.querySelector('#aplayer');
if(aplayer) {
  let dataSong = aplayer.getAttribute('data-song');
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute('data-singer');
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    audio: [{
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar
    }],
    autoplay: true
});
const avatar = document.querySelector(".singer-detail .inner-avatar");
if(avatar) {
  ap.on('play', () => {
    avatar.style.animation="rotate 5s linear infinite"
  })
  ap.on('pause', () => {
    avatar.style.animation="none"
  })
}
}



//End Aplayer