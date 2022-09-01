// window.addEventListener("hashchange", () => {
//   console.log(`The current URL hash is `);
// });

// if (location.hash.length == 0) {
//   removeEventListener("popstate", channnn);
// }
console.log(location.hash);

addEventListener("popstate", channnn);

let allFav;
let allLinks;
let infos;

allFav = JSON.parse(localStorage.getItem("favs")) || { laters: [] };
localStorage.setItem("favs", JSON.stringify(allFav));

allLinks = JSON.parse(localStorage.getItem("tabs")) || { links: [] };
localStorage.setItem("tabs", JSON.stringify(allLinks));

infos = JSON.parse(localStorage.getItem("tabs"));
console.log(infos);

function channnn() {
  console.log(window.history);
  let hashs = location.hash.split("-")[0];
  let hash2 = location.hash.split("-")[1];
  sessionStorage.setItem("movieId", hashs.substring(1));
  sessionStorage.setItem("type", hash2);
  window.scrollTo({ top: 0 });
  location.reload();
  // init();
}
let lock = window.location.pathname.split("/")[1];
console.log(lock);
console.log(location.hash);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d2a2325d29msh1e229817fbf71b6p14aebcjsn60e7a9f14a24",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};
let failVids = [];
let possibleVids = [];
let isTouch = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // some code..
  isTouch = true;
} else isTouch = false;
var tag;
var firstScriptTag;
var player;
let realInfos;
let videoType;
// console.log(realInfos);
// console.log(videoType);
const mainTitle = document.querySelector(".mainTitle");
const mainOverview = document
  .querySelector(".mainInfos")
  .querySelector(".text");
const mainDop = document.querySelector(".backDropHolder").querySelector("img");
const mainPoster = document.querySelector(".posterHold").querySelector("img");
const searchBar = document.querySelector("#search_area");
const ressTemp = document.querySelector(".results");
const resTemp = ressTemp.querySelector(".result_temp").content;
const castSlide = document.querySelector("#cast");
const slide1 = document.querySelector("#movieTrends");
const slide2 = document.querySelector("#tvTrends");
const simiSlide = document.querySelector("#similar");
const topSlide = document.querySelector("#topMovies");
const top2Slide = document.querySelector("#topShows");
const top3Slide = document.querySelector("#topAnimes");
const menuOpen = document.querySelector(".burger");
const navBar = document.querySelector(".menu");
const bigMark = document.querySelector(".favMain");
// const mainSlide = document.querySelector("#rec");
const movieCard = document.querySelector(".card-temp");
// const nextField = document.querySelector(".next-rec");
// Dom Elements

bigMark.addEventListener("click", () => {
  if (bigMark.querySelector("i").classList.contains("bookMarkDone")) {
    bigMark.querySelector(".bookMarkPlus").innerHTML = "+";
    bigMark.querySelector("i").classList.toggle("bookMarkDone");

    for (let i of allFav.laters) {
      if (i.id == realInfos) {
        console.log(i.id);
        console.log(realInfos);
        console.log("this is best");
        console.log(allFav.laters.indexOf(i));
        console.log(allFav.laters.indexOf(i));
        allFav.laters.splice(allFav.laters.indexOf(i), 1);
      }
    }
  } else {
    bigMark.querySelector("i").classList.toggle("bookMarkDone");
    bigMark.querySelector(".bookMarkPlus").innerHTML = "";
    allFav.laters.unshift({ id: realInfos, type: videoType });
  }
  localStorage.setItem("favs", JSON.stringify(allFav));
});

async function init() {
  window.scrollTo({ top: 0 });
  console.log(window.history);
  console.log(location.hash);

  if (location.hash.length == 0) {
    console.log("i am here");
    sessionStorage.setItem(
      "movieId",
      `${infos.links[infos.links.length - 1].id}`
    );
    sessionStorage.setItem(
      "type",
      `${infos.links[infos.links.length - 1].type}`
    );
    history.replaceState(
      null,
      null,
      document.location.pathname +
        "#" +
        `${sessionStorage.getItem("movieId")}-${sessionStorage.getItem("type")}`
    );
    // location.hash = `${sessionStorage.getItem(
    //   "movieId"
    // )}-${sessionStorage.getItem("type")}`;
    console.log("import");
  } else {
    console.log("i am here");

    let hashs = location.hash.split("-")[0];
    let hash2 = location.hash.split("-")[1];
    sessionStorage.setItem("movieId", hashs.substring(1));
    sessionStorage.setItem("type", hash2);
  }
  // if (sessionStorage.getItem("count") == null) {
  //   sessionStorage.setItem("count", 0);
  //   console.log("first time");
  // } else {
  //   console.log("not again");
  // }

  // if (sessionStorage.getItem("count") < 1) {
  //   sessionStorage.setItem(
  //     "movieId",
  //     `${infos.links[infos.links.length - 1].id}`
  //   );
  //   sessionStorage.setItem(
  //     "type",
  //     `${infos.links[infos.links.length - 1].type}`
  //   );

  //   sessionStorage.setItem("count", 1);
  // }

  realInfos = sessionStorage.getItem("movieId");
  videoType = sessionStorage.getItem("type");

  let raw = await fetch(
    `https://api.themoviedb.org/3/${videoType}/${realInfos}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=reviews,videos,credits,similar,external_ids`
  ).then((res) => res.json());

  let imdbId = raw.external_ids.imdb_id;
  console.log(imdbId);
  try {
    let titleRate = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles/${imdbId}/ratings`,
      options
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));

    console.log(titleRate.results.averageRating);
    document.querySelector(
      ".rating"
    ).innerHTML = `<i class="fa-brands fa-imdb"></i> : ${
      titleRate.results.averageRating ?? raw.vote_average
    }`;
  } catch {}
  console.log(raw);

  raw.genres.forEach((element) => {
    document.querySelector(
      ".genre"
    ).innerHTML = `<p>genres</p> / ${element.name}`;
  });
  simiSlide.querySelector(".slide-show").innerHTML = "";
  plotSlides(raw.similar.results, simiSlide);

  mainTitle.querySelector(".title").innerHTML = raw.title ?? raw.original_name;
  document.title = raw.title ?? raw.original_name;

  document.querySelector(".air").innerHTML = `<p>release date</p> ${(
    raw.release_date ?? raw.first_air_date
  ).slice(0, 4)}`;
  document.querySelector(".media").innerHTML = `<p>type</p>${
    videoType == "movie" ? "moive" : "tv-show"
  }`;

  mainOverview.innerHTML = raw.overview;
  mainDop.src = `${baseDrop}${raw.backdrop_path || raw.poster_path}`;
  mainPoster.src = `${baseImg}${raw.poster_path}`;

  console.log(raw.credits);
  castSlide.querySelector(".slide-show").innerHTML = "";
  plotCast(raw.credits.cast, castSlide);
  document
    .querySelector("#similar")
    .querySelector(
      "h2"
    ).innerHTML = `similar ${videoType}s <i class="fa-solid fa-angle-right">`;
  possibleVids = raw.videos.results;

  for (let i of allFav.laters) {
    if (i.id == realInfos) {
      // console.log("this is best");
      bigMark.querySelector("i").classList.toggle("bookMarkDone");
      bigMark.querySelector(".bookMarkPlus").innerHTML = "";
      break;
    } else {
      bigMark.querySelector("i").classList.remove("bookMarkDone");
      bigMark.querySelector(".bookMarkPlus").innerHTML = "+";
    }
  }
  tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // for (let k of possibleVids) {
  //   if (k.type == "Trailer" && !failVids.includes(k.key)) {
  //     // document.querySelector(
  //     //   "#trailer"
  //     // ).src = `https://www.youtube.com/embed/${k.key}`;
  //     player.loadVideoById({ videoId: k.key ,endSeconds: 0  });
  //   }
  // }
  console.log(document.querySelector(".trailer"));
}

// Dom Elements

let num = JSON.parse(localStorage.getItem("tabs")).links.length || 0;

// refrence constats
let autoslide = true;
let counter = 2;
let trendPage = 1;
let baseImg = "http://image.tmdb.org/t/p/w342/";
let baseDrop = "http://image.tmdb.org/t/p/w1280/";
let basePoster = "http://image.tmdb.org/t/p/w342/";
// refrence constats

window.addEventListener("scroll", (event) => {
  // console.log(event);
  let valu = Math.round(window.scrollY);
  // console.log(valu);

  mainDop.style.filter = `blur(${
    valu / 100 < 10 ? valu / 100 : 10
  }px) brightness(${
    400 > valu > 0
      ? 100
      : 80000 / valu > 100
      ? 100
      : 80000 / valu < 50
      ? 50
      : 80000 / valu
  }%)`;
});

window.addEventListener("load", () => {
  console.log(location.hash);
  // sessionStorage.setItem("movieId", hashs.substring(1));
  // sessionStorage.setItem("type", hash2);
  init();
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&region=us"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      plotSlides(res, topSlide);
    });
  fetch(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&with_original_language=en|ar&page=1&region=us"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      plotSlides(res, top2Slide);
    });
  fetch(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&with_original_language=ja&page=1"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      plotSlides(res, top3Slide);
    });
  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=5e060480a887e5981aa743bc33a74e40"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      plotSlides(res, slide1);
    });
  fetch(
    "https://api.themoviedb.org/3/trending/tv/day?api_key=5e060480a887e5981aa743bc33a74e40"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      plotSlides(res, slide2);
    });
});

// search

window.addEventListener(
  "click",
  (event) => {
    if (ressTemp !== event.target && !ressTemp.contains(event.target)) {
      ressTemp.innerHTML = null;
    }
    if (ressTemp.children.length == 0) {
      ressTemp.style.display = "none";
    }
    if (event.target.id == "search_area" && searchBar.value.length !== 0) {
      console.log("hi blur pleas");
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searchBar.value}&page=1&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) =>
            res.results.filter(
              (res) =>
                res.original_language == "en" ||
                res.original_language == "ar" ||
                res.original_language == "ja" ||
                res.original_language == "fr"
            )
          )
          .then((res) => res.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            return res;
          }),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&query=${searchBar.value}&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) =>
            res.results.filter(
              (res) =>
                res.original_language == "en" ||
                res.original_language == "ar" ||
                res.original_language == "ja" ||
                res.original_language == "fr"
            )
          )
          .then((res) => res.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            // console.log(allResult);
            return res;
          }),
      ])
        .then((res) => {
          return [].concat.apply([], res);
        })
        .then((res) => {
          searchResults(res);
        })
        .then((allResult = []), (allUnsorted = []));
    }
  },
  true
);

searchBar.addEventListener(
  "input",
  (event) => {
    if (ressTemp !== event.target && !ressTemp.contains(event.target)) {
      ressTemp.innerHTML = null;
    }
    if (ressTemp.children.length == 0) {
      ressTemp.style.display = "none";
    }
    if (event.target.id == "search_area" && searchBar.value.length !== 0) {
      ressTemp.style.display = "blcok";
      // fetch(
      //   `https://api.themoviedb.org/3/configuration?api_key=5e060480a887e5981aa743bc33a74e40`
      // ).then((res) => {
      //   console.log(res.json());
      // });
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searchBar.value}&page=1&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) =>
            res.results.filter(
              (res) =>
                res.original_language == "en" ||
                res.original_language == "ar" ||
                res.original_language == "ja" ||
                res.original_language == "fr"
            )
          )
          .then((res) => res.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            return res;
          }),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&query=${searchBar.value}&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) =>
            res.results.filter(
              (res) =>
                res.original_language == "en" ||
                res.original_language == "ar" ||
                res.original_language == "ja" ||
                res.original_language == "fr"
            )
          )
          .then((res) => res.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            // console.log(allResult);
            return res;
          }),
      ])
        .then((res) => {
          return [].concat.apply([], res);
        })
        .then((res) => {
          searchResults(res);
        })
        .then((allResult = []), (allUnsorted = []));
    }
  },
  false
);

function searchResults(movies) {
  ressTemp.innerHTML = "";
  movies.sort((a, b) => {
    let numa = Math.round(a.vote_average * a.popularity, 3);
    let numb = Math.round(b.vote_average * b.popularity, 3);
    // console.log(a.title ?? a.original_name);
    return numb - numa;
  });
  movies = movies.slice(0, 7);

  for (let movie of movies) {
    let poster = movie.poster_path;
    let title = movie.original_name ?? movie.original_title;
    let date = movie.release_date ?? movie.first_air_date;
    let card = resTemp.cloneNode(true).querySelector("li");
    // console.log(movie.popularity + " " + title);
    card.id = movie.id;
    card.setAttribute("type", movie.title == null ? "tv" : "movie");
    card.querySelector("img").src = `https://image.tmdb.org/t/p/w92/${poster}`;
    card.querySelector(".res_title").innerHTML =
      `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
      " " +
      `<p style="color:#F1EEE9; display:inline;">${date.slice(0, 4)}<p/>` +
      `<p style="color:rgb(255, 208, 0); display:inline;">${
        movie.title == null ? "tv-show" : "movie"
      }<p/>`;

    if (card.querySelector("img").complete & (poster != null)) {
      ressTemp.style.display = "block";
      ressTemp.append(card);
    }
  }
}
//search

//scroll

async function plotCast(trends, slideName) {
  for (let trend of trends) {
    let cast = await fetch(
      `https://api.themoviedb.org/3/credit/${trend.credit_id}?api_key=5e060480a887e5981aa743bc33a74e40`
    ).then((res) => res.json());
    // console.log(cast.person);
    let poster = trend.profile_path;
    let title = trend.name;
    let detial = trend.character;
    let card = movieCard.content.cloneNode(true);

    card.querySelector(".card").id = cast.person.id;
    card.querySelector(".card").setAttribute("type", "person");
    card.querySelector(".card").href = `person.html#${cast.person.id}`;

    card.querySelector("img").src = `${basePoster}${poster}`;
    card.querySelector(".infos").innerHTML =
      `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
      " " +
      `<p style=" display:inline; font-size:1rem;">as: ${detial}<p/>`;

    if (poster != null) {
      slideName.querySelector(".slide-show").append(card);
    }
  }
}

function plotSlides(trends, slideName) {
  // trends = trends.slice(0, 7);

  for (let trend of trends) {
    let poster = trend.poster_path;
    let backDrop = trend.backdrop_path;
    let title = trend.original_name ?? trend.title;
    let date = trend.release_date ?? trend.first_air_date;
    let detial = trend.overview;
    let card = movieCard.content.cloneNode(true);
    if (slideName.id == "rec") {
      let nextCard = slideName
        .querySelector(".nextTemp")
        .content.cloneNode(true);
      let nextCont = slideName.querySelector(".next-rec");

      card.querySelector(".card").id = trend.id;
      card.setAttribute("type", trend.title == null ? "tv" : "movie");

      nextCard.querySelector("img").src = `${basePoster}${poster}`;
      nextCard.querySelector("h4").innerHTML = `${title}`;
      nextCard.querySelector("p").innerHTML = `${date}`;

      card.querySelector("img").src = `${basePoster}${backDrop || poster}`;
      card
        .querySelector(".posterTitle")
        .querySelector("img").src = `${basePoster}${poster}`;
      card.querySelector(".posterTitle").querySelector("h2").innerHTML = title;
      card.querySelector(".infos").innerHTML +=
        `<p style="color:rgb(199, 199, 199); display:inline;">${date.slice(
          0,
          4
        )}<p/>` +
        `<p style=" color:rgb(255, 208, 0); display:inline;">rating: ${trend.vote_average}<p/>` +
        `<p class="over-view">overview: ${detial ?? "don't exist yet"}<p/>`;

      if (poster != null && backDrop != null) {
        nextCont.append(nextCard);
        nextField.children[2].style.display = "none";

        slideName.querySelector(".slide-show").append(card);
        // console.log(mainSlide.querySelector(".slide-show").clientWidth);
      }
    } else {
      card.querySelector(".card").href = `#${trend.id}-${
        trend.title == null ? "tv" : "movie"
      }`;
      card.querySelector(".card").id = trend.id;
      card
        .querySelector(".card")
        .setAttribute("type", trend.title == null ? "tv" : "movie");

      for (let i of allFav.laters) {
        if (i.id == trend.id) {
          card.querySelector(".fa-bookmark").classList.add("bookMarkDone");
          card.querySelector(".bookMarkPlus").innerHTML =
            '<i class="fa-solid fa-check"></i>';
          break;
        }
      }
      card.querySelector("img").src = `${basePoster}${poster}`;
      card.querySelector(".infos").innerHTML =
        `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
        " " +
        `<p style="color:rgb(199, 199, 199); display:inline;">${date.slice(
          0,
          4
        )}<p/>` +
        `<p style=" color:rgb(255, 208, 0); display:inline;">rating: ${
          Math.round(trend.vote_average * 10) / 10
        }<p/>` +
        `<p class="over-view">overview: ${detial}<p/>`;
      // card.querySelector(
      //   ".infos"
      // ).innerHTML += `<button class="more"">more...</button>`;
      if (poster != null) {
        slideName.querySelector(".slide-show").append(card);
      }
    }
  }
}

document.addEventListener("click", (event) => {
  if (event.target.className == "next") {
    autoslide = false;
    setTimeout(() => {
      autoslide = true;
    }, 4000);
    console.log("stoped");
  }
});

window.addEventListener(
  "click",
  (event) => {
    if (event.target.className == "next" || event.target.className == "back") {
      let area = event.target.parentNode.querySelector(".slide-show");
      console.log(area);
      let direction = event.target.className;
      scrollSlide(direction, area);
    }
  },
  true
);

function scrollSlide(direction, area) {
  let set = area.parentNode;
  let currentScroll = area.scrollLeft;
  let card = area.querySelector(".card");
  let scrollVal = card.scrollWidth;
  let maxScroll = area.scrollWidth - area.clientWidth;
  // console.log(currentScroll);
  // console.log(scrollVal);
  console.log(direction);
  if (direction == "next") {
    let statu =
      parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
    // console.log(statu);
    // console.log(maxScroll);

    if (statu < maxScroll) {
      for (let bag of area.children) {
        bag.style.transform = `translateX(-${statu + card.clientWidth + 19}px)`;
      }
    }

    // if (set.id == "movieTrends" || set.id == "tvTrends") {
    //   area.scrollLeft += scrollVal * 4 + 77;
    // } else if (set.id == "rec") {
    //   console.log("captin");
    //   area.scrollLeft += scrollVal + 19;
    // }
  } else if (direction == "back") {
    let statu =
      parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
    console.log(statu);
    if (statu == maxScroll) {
      console.log("error here");
      for (let bag of area.children) {
        bag.style.transform = `translateX(0)`;
      }
    } else {
      console.log("error here");

      for (let bag of area.children) {
        bag.style.transform = `translateX(-${
          statu - (card.clientWidth + 19)
        }px)`;
      }
    }

    // if (set.id == "movieTrends" || set.id == "tvTrends") {
    //   area.scrollLeft -= scrollVal * 4 + 77;
    // } else if (set.id == "rec") {
    //   area.scrollLeft -= scrollVal + 19;
    // }
  } else if (direction == "back" && currentScroll == maxScroll) {
    area.scrollLeft = 0;
  }
}

// document.addEventListener(
//   "click",
//   (event) => {
//     if (
//       event.target.className == "more" &&
//       event.target.innerHTML == "more..."
//     ) {
//       let data = event.target.parentNode.querySelector(".over-view");
//       data.style.minHeight = "fit-content";
//       data.style.height = "100%";
//       event.target.innerHTML = "less";
//     } else if (
//       event.target.className == "more" &&
//       event.target.innerHTML == "less"
//     ) {
//       let data = event.target.parentNode.querySelector(".over-view");
//       data.style.height = "4rem";
//       event.target.innerHTML = "more...";
//     }
//     if (event.target.className == "over-view") {
//       let data = event.target.parentNode.querySelector(".over-view");
//       event.target.parentNode.querySelector(".more").innerHTML = "more...";
//       data.style.height = "4rem";
//     }
//   },
//   true
// );
// scroll;

// mainSlide.addEventListener("mouseenter", () => {
//   autoslide = false;
// });
// mainSlide.addEventListener("mouseleave", () => {
//   autoslide = true;
// });

// const autoScroll = setInterval(() => {
//   if (autoslide) {
//     let area = mainSlide.querySelector(".slide-show");
//     let card = mainSlide.querySelector(".card");
//     let scrollVal = card.scrollWidth;
//     let maxScroll = area.scrollWidth - area.clientWidth;
//     counter += 1;

//     let statu =
//       parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
//     // console.log(statu);
//     // console.log(maxScroll);
//     if (statu > maxScroll - scrollVal * 3) {
//       console.log("stared");
//       trendPage += 1;
//       fetchTrend(trendPage);
//     }

//     if (nextField.children[counter].className == "nextCard") {
//       nextField.children[counter].style.display = "none";
//       nextField.children[counter + 1].style.backgroundColor = "rgb(0, 86, 184)";
//       nextField.children[counter + 1].style.transform = "scale(1.1)";
//       nextField.children[counter + 1].style.zIndex = "10";
//     }

//     if (statu < maxScroll) {
//       for (let bag of area.children) {
//         bag.style.transform = `translateX(-${statu + area.clientWidth}px)`;
//       }
//     }
//   }
// }, 5000);

// window.addEventListener(
//   "resize",
//   () => {
//     let area = mainSlide.querySelector(".slide-show");

//     console.log("it is moving");
//     setTimeout(() => {
//       for (let bag of area.children) {
//         bag.style.transform = `translateX(-${
//           (counter - 2) * area.clientWidth
//         }px)`;
//       }
//       for (let h of document.querySelectorAll(".card")) {
//         console.log(h);
//         if (h.closest(".slide-dad").id !== "rec") {
//           h.style.transform = `translateX(0px)`;
//         }
//       }
//     }, 2000);
//   },
//   false
// );
window.addEventListener(
  "resize",
  () => {
    setTimeout(() => {
      for (let h of document.querySelectorAll(".card")) {
        // console.log(h);

        h.style.transform = `translateX(0px)`;
      }
    }, 2000);
  },
  false
);

if (isTouch) {
  window.addEventListener(
    "touchstart",
    (event) => {
      try {
        console.log(event.type);
        // console.log(event.button);
        console.log(event.target.closest(".result"));
        openMovie(
          event.target.closest(".result").id,
          event.target.closest(".result").getAttribute("type"),
          1
        );
      } catch {}
      try {
        openMovie(
          event.target.closest(".card").id,
          event.target.closest(".card").getAttribute("type"),
          1
        );
        console.log(event.target.closest(".card").getAttribute("type"));
      } catch {}
    },
    false
  );
  window.addEventListener("click", appendLink, false);
} else {
  window.addEventListener("mousedown", appendLink, false);
}

function appendLink(event) {
  // for (let y of document.querySelectorAll(".card")) {
  //   y.classList.remove("viewdCard");
  // }

  if (event.target !== menuOpen && !navBar.contains(event.target)) {
    navBar.classList.remove("showNav");
  }
  let card = event.target.closest(".card");
  if (card == null) {
    console.log("close all");
    document.querySelectorAll(".card").forEach((e) => {
      e.classList.remove("viewdCard");
    });
    document.querySelectorAll(".bookMark").forEach((e) => {
      e.classList.remove("bookMarkSee");
    });
  }
  try {
    console.log(event.type);
    // console.log(event.button);
    console.log(event.target.closest(".result"));
    openMovie(
      event.target.closest(".result").id,
      event.target.closest(".result").getAttribute("type"),
      event.button
    );
  } catch {}
  try {
    let dad = event.target.closest(".slide-dad");
    let uncle = dad.querySelector(".slide-show");
    let book = card.querySelector(".bookMark");
    let gage = (uncle.clientWidth / 5) * 4;
    let realLeft = Math.round(
      card.getBoundingClientRect().left - dad.getBoundingClientRect().left
    );

    let statu =
      parseInt(uncle.children[1].style.transform.replace(/\D/g, "")) || 0;
    console.log(event.target);
    // console.log(gage + "gage");
    // console.log(
    //   Math.round(
    //     card.getBoundingClientRect().left - dad.getBoundingClientRect().left - 8
    //   )
    // );
    if (event.target.classList.contains("bookMark")) {
      if (
        event.target
          .querySelector(".fa-bookmark")
          .classList.contains("bookMarkDone")
      ) {
        event.target.querySelector("i").classList.remove("bookMarkDone");
        event.target.querySelector(".bookMarkPlus").innerHTML = "+";
        for (let i of allFav.laters) {
          if (i.id == card.id) {
            allFav.laters.splice(allFav.laters.indexOf(i), 1);
          }
        }
        localStorage.setItem("favs", JSON.stringify(allFav));
      } else {
        addFav(card.id, card.getAttribute("type"));
        event.target.querySelector("i").classList.add("bookMarkDone");
        event.target.querySelector(".bookMarkPlus").innerHTML =
          '<i class="fa-solid fa-check"></i>';
        console.log(event.target.querySelector(".bookMarkPlus"));
      }

      return;
    }
    if (dad.id == "rec") {
      openMovie(
        event.target.closest(".card").id,
        event.target.closest(".card").getAttribute("type"),
        event.button
      );
      console.log(event.target.closest(".card").getAttribute("type"));
    } else {
      openMovie(
        event.target.closest(".card").id,
        event.target.closest(".card").getAttribute("type"),
        1
      );
      if (card.classList.contains("viewdCard") || dad.id == "cast") {
        if (dad.id !== "cast") {
          book.classList.toggle("bookMarkSee");
          card.classList.toggle("viewdCard");
        }
        openMovie(
          event.target.closest(".card").id,
          event.target.closest(".card").getAttribute("type"),
          event.button
        );
        console.log(event.target.closest(".card").getAttribute("type"));

        card.querySelector(".over-view").style.height = null;
        card.querySelector("img").style.filter = null;
        return;
      } else if (card.classList.contains("card")) {
        if (realLeft > gage) {
          for (let i of uncle.children) {
            i.style.transform = `translateX(-${
              statu + card.scrollWidth + 19
            }px)`;
          }
        }
        console.log("reach");

        for (let i of uncle.children) {
          let kid = i.querySelector(".bookMark");
          i.classList.remove("viewdCard");
          try {
            kid.classList.remove("bookMarkSee");
          } catch {
            console.log("did");
          }
        }
        book.classList.toggle("bookMarkSee");

        card.classList.toggle("viewdCard");
        card.querySelector(".over-view").style.height = "fit-content";
        card.querySelector("img").style.filter = "blur(0px)";
      }
    }
  } catch {}
}

function openMovie(card, dataType, go) {
  let meta = { id: card, type: dataType };
  console.log(card + dataType + "type of click");
  allLinks.links.push(meta);
  localStorage.setItem("tabs", JSON.stringify(allLinks));
  console.log("pushed");
  // console.log(localStorage.getItem("tabs"));
  // sessionStorage.setItem("count", 0);

  if (go !== 2 && go !== 1) {
    console.log("not touch");
    if (dataType == "person") {
      window.open("person.html", "_blank");
    } else {
      location.hash = card + "-" + dataType;
      window.scrollTo({ top: 0, behavior: "smooth" });

      // init();

      // location.reload();
      // if (lock == "movie1.html") {
      //   window.reload();
      // } else {
      //   window.reload();
      // }
    }
  }
}

function stopShit(event) {
  event.preventDefault();
  console.log("this is link");
}

function addFav(meta, kind) {
  allFav.laters.unshift({ id: meta, type: kind });
  localStorage.setItem("favs", JSON.stringify(allFav));
}

menuOpen.addEventListener("click", () => {
  navBar.classList.toggle("showNav");
  if (navBar.classList.contains("showNav")) {
    menuOpen.innerHTML = '<i class="fa-solid fa-xmark"></i> close';
  } else {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>menu';
  }
});

function onYouTubeIframeAPIReady() {
  for (let k of possibleVids) {
    if (k.type == "Trailer" && !failVids.includes(k.key)) {
      console.log(k.key);
      player = new YT.Player("trailer", {
        height: "390",
        width: "640",
        videoId: k.key,
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      // document.querySelector(
      //   "#trailer"
      // ).src = `https://www.youtube.com/embed/${k.key}`;
      // player.loadVideoById({ videoId: k.key, endSeconds: 0 });
    }
  }
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log(event.target.getPlayerState());

  if (!player) {
    console.log("Player could not be found.");
  } else if (event.target.getPlayerState() == -1) {
    console.log(player);
    player.destroy();
  }

  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  console.log(event.data);
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
