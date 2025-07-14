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

//Button Like
const buttonLike = document.querySelector("[button-like]");
if(buttonLike) {
  buttonLike.addEventListener("click", async () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;
    const options = { method: "PATCH" };
    fetch(link, options)
      .then((response) => response.json())
      .then((data) => {
        const span = buttonLike.querySelector("span");
        span.innerHTML = `${data.like} thích`;

        buttonLike.classList.toggle("active");
      })
  });
}
//End Button Like


//Button Favorite
const buttonFavorite = document.querySelector("[button-favorite]");
if(buttonFavorite) {
  buttonFavorite.addEventListener("click", async () => {
    const idSong = buttonFavorite.getAttribute("button-favorite");
    const isActive = buttonFavorite.classList.contains("active");

    const typeFavorite = isActive ? "unfavorite" : "favorite";
    const link = `/songs/favorite/${typeFavorite}/${idSong}`;
    const options = { method: "PATCH" };
    fetch(link, options)
      .then((response) => response.json())
      .then((data) => {
        buttonFavorite.classList.toggle("active");
      })
  });
}
//End Button Like