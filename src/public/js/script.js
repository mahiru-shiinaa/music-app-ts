//Aplayers
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
  });
  const avatar = document.querySelector(".singer-detail .inner-avatar");
  if (avatar) {
    ap.on("play", () => {
      avatar.style.animation = "rotate 5s linear infinite";
    });
    ap.on("pause", () => {
      avatar.style.animation = "none";
    });
    ap.on("ended", () => {
      const link = `/songs/listen/${dataSong._id}`;
      const options = { method: "PATCH" };
      fetch(link, options)
        .then((response) => response.json())
        .then((data) => {
          const listen = document.querySelector(".inner-listen span");
          listen.innerHTML = `${data.listen} lượt nghe`;

          buttonLike.classList.toggle("active");
        });
    });
  }
}

//End Aplayer

//Button Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
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
      });
  });
}
//End Button Like

//Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach((buttonFavorite) => {
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
        });
    });
  });
}
//End Button Like

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");
  input.addEventListener("keyup", async () => {
    const keyword = input.value;
    const link = `/search/suggest/?keyword=${keyword}`;
    const options = { method: "GET" };
    fetch(link, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          boxSuggest.classList.add("show");
          const htmls = data.map((song) => {
            return ` 
            <a class="inner-item" href="/songs/detail/${song.slug}">
              <div class="inner-image">
                <img src="${song.avatar}" />
              </div>
              <div class="inner-info">
                <div class="inner-title">${song.title}</div>
                <div class="inner-singer">
                  <i class="fa-solid fa-microphone-lines"></i> ${song.singer.fullName}
                </div>
              </div>
            </a>   
            `;
          });
          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
        // const innerSuggest = boxSearch.querySelector(".inner-suggest");
        // innerSuggest.innerHTML = data.html;
      });
  });
}
//End Search Suggest
