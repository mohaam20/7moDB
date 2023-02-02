// window.addEventListener("hashchange", () => {
//   console.log(`The current URL hash is `);
// });

// if (location.hash.length == 0) {
//   removeEventListener("popstate", channnn);
// }
fetch(
  "https://api.themoviedb.org/3/tv/37854/season/3?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US"
).then((res) => {
  console.log(res.json());
});
console.log(location.hash);

addEventListener("popstate", channnn);

let allFav;
let allLinks;
let infos;

let allSeen = JSON.parse(localStorage.getItem("watched")) || { seen: [] };
localStorage.setItem("watched", JSON.stringify(allSeen));

let yours = JSON.parse(localStorage.getItem("customs")) || {};

allFav = JSON.parse(localStorage.getItem("favs")) || { laters: [] };
localStorage.setItem("favs", JSON.stringify(allFav));

allLinks = JSON.parse(localStorage.getItem("tabs")) || { links: [] };
localStorage.setItem("tabs", JSON.stringify(allLinks));

infos = JSON.parse(localStorage.getItem("tabs"));
console.log(infos);

function channnn() {
  // console.log(window.history);
  // let hashs = location.hash.split("-")[0];
  // let hash2 = location.hash.split("-")[1];
  // sessionStorage.setItem("movieId", hashs.substring(1));
  // sessionStorage.setItem("type", hash2);
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
const metaData = document.querySelector(".metaTitle");
const castSlide = document.querySelector("#cast");
const seasSlide = document.querySelector("#seasons");
const epislide = document.querySelector("#episodes");
const slide1 = document.querySelector("#movieTrends");
const slide2 = document.querySelector("#tvTrends");
const simiSlide = document.querySelector("#similar");
const recoSlide = document.querySelector("#recommend");
const topSlide = document.querySelector("#topMovies");
const top2Slide = document.querySelector("#topShows");
const top3Slide = document.querySelector("#topAnimes");
const menuOpen = document.querySelector(".burger");
const navBar = document.querySelector(".menu");
const bigMark = document.querySelector("#mainLater");
const bigEye = document.querySelector("#mainSeen");
const bigList = document.querySelector("#mainCustom");
// const mainSlide = document.querySelector("#rec");
const movieCard = document.querySelector(".card-temp");
// const nextField = document.querySelector(".next-rec");
// Dom Elements

bigMark.addEventListener("click", () => {
  if (bigMark.querySelector("i").classList.contains("bookMarkDone")) {
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
    allFav.laters.unshift({ id: realInfos, type: videoType });
  }
  localStorage.setItem("favs", JSON.stringify(allFav));
});

bigEye.addEventListener("click", () => {
  if (bigEye.querySelector("i").classList.contains("bookMarkDone")) {
    bigEye.querySelector("i").classList.toggle("bookMarkDone");

    for (let i of allSeen.seen) {
      if (i.id == realInfos) {
        console.log(i.id);
        console.log(realInfos);
        console.log("this is best");
        allSeen.seen.splice(allSeen.seen.indexOf(i), 1);
      }
    }
  } else {
    bigEye.querySelector("i").classList.toggle("bookMarkDone");
    allSeen.seen.unshift({ id: realInfos, type: videoType });
  }
  localStorage.setItem("watched", JSON.stringify(allSeen));
});

async function init() {
  if (isTouch) {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars">';
  } else {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>menu';
  }
  window.scrollTo({ top: 0 });
  console.log(window.history);
  console.log(location.hash);

  if (location.hash.length == 0) {
    open("/index.html", "_self");
  } else {
    console.log("i am here");

    let hashs = location.hash.split("-")[0];
    let hash2 = location.hash.split("-")[1];

    realInfos = hashs.substring(1);
    videoType = hash2;
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

  console.log(realInfos, videoType);

  let raw = await fetch(
    `https://api.themoviedb.org/3/tv/${realInfos}/season/${videoType}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=reviews,aggregate_credits,videos,genres,credits,recommendations,similar,external_ids`
  ).then((res) => res.json());

  let rawz = await fetch(
    `https://api.themoviedb.org/3/tv/${realInfos}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=reviews,aggregate_credits,videos,genres,credits,recommendations,similar,external_ids`
  ).then((res) => res.json());

  console.log(raw);
  console.log(rawz);
  mainOverview.innerHTML = raw.overview;
  mainDop.src = `${baseDrop}${raw.backdrop_path || raw.poster_path}`;
  mainPoster.src = `${baseImg}${raw.poster_path}`;
  mainPoster.alt = raw.title ?? raw.original_name;
  let imdbId = rawz.external_ids.imdb_id;
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
  console.log(imdbId);
  document.querySelector(
    ".rating"
  ).innerHTML = `<i class="fa-brands fa-imdb"></i> : ${raw.vote_average}`;
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

  mainTitle.querySelector(
    ".title"
  ).innerHTML = `<a style="color:gold;" href=/pages/movie1.html#${realInfos}-tv> ${
    rawz.name ?? rawz.original_name
  } </a> : ${raw.name ?? raw.original_name}`;
  document.title = raw.name ?? raw.original_name;
  let shortDate = (raw.air_date ?? raw.first_air_date ?? "unknown").slice(0, 4);
  let dateEle = document.querySelector(".air");
  dateEle.innerHTML = `<p>release date</p> <a href="/pages/expand.html#tv-${shortDate}">${shortDate}</a>`;
  document.querySelector(".media").innerHTML = `<p>type</p>${
    videoType == "movie" ? "moive" : "tv-show"
  }`;

  rawz.genres.forEach((element) => {
    document.querySelector(
      ".genre"
    ).innerHTML += ` /<a href="/pages/collection.html#${
      videoType == "tv" ? "tv" : "mv"
    }-genre-${element.id}">${element.name}</a>`;
  });
  if (raw.created_by && raw.created_by.length > 0) {
    document.querySelector(".boss2").lastChild.innerHTML =
      raw.created_by[0].name;
    document.querySelector(
      ".boss2"
    ).lastChild.href = `/pages/person.html#${raw.created_by[0].id}`;
  } else {
    document.querySelector(".boss2").remove();
  }
  for (let i of raw.credits.crew) {
    if (i.department == "Directing" && i.job == "Director") {
      console.log(i);
      document.querySelector(".boss").lastChild.innerHTML = i.name;
      document.querySelector(
        ".boss"
      ).lastChild.href = `/pages/person.html#${i.id}`;

      break;
    }
  }
  if (document.querySelector(".boss").lastChild.innerHTML.length == 0) {
    document.querySelector(".boss").remove();
  }
  let genrea = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=5e060480a887e5981aa743bc33a74e40&with_genres=28"
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
  castSlide.querySelector(".slide-show").innerHTML = "";
  if (raw.aggregate_credits) {
    plotCast(raw.credits.cast, castSlide);

    if (rawz.seasons.length > 0 && rawz.seasons[0].poster_path !== null) {
      plotSeas(rawz.seasons, seasSlide);
    } else {
      seasSlide.remove();
    }
    // plotCast(raw.aggregate_credits.cast.slice(0, 20), castSlide);
  } else {
    seasSlide.remove();
    plotCast(raw.credits.cast, castSlide);
  }

  if (raw.episodes.length > 0 && raw.episodes[0].poster_path !== null) {
    plotEpisode(raw.episodes, epislide);
  } else {
    epislide.remove();
  }

  simiSlide.querySelector(".slide-show").innerHTML = "";
  recoSlide.querySelector(".slide-show").innerHTML = "";
  plotSlides(rawz.similar.results, simiSlide);
  plotSlides(rawz.recommendations.results, recoSlide);
  if (rawz.recommendations.results.length == 0) {
    recoSlide.remove();
  } else {
    document
      .querySelector("#recommend")
      .querySelector(
        "h2"
      ).innerHTML = `tv s recommendations <i class="fa-solid fa-angle-right">`;
  }
  if (rawz.similar.results.length == 0) {
    similar.remove();
  } else {
    document
      .querySelector("#similar")
      .querySelector(
        "h2"
      ).innerHTML = `similar tv s <i class="fa-solid fa-angle-right">`;
  }

  if (raw.seasons) {
    console.log("seasons here");
  }
  if (raw.videos.results.length == 0 && rawz.videos.results.length == 0) {
    document.querySelector("#trailer").remove();
  } else {
    tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  if (raw.videos.results.length !== 0) {
    possibleVids = raw.videos.results;
  } else {
    possibleVids = rawz.videos.results;
  }

  for (let i of allFav.laters) {
    if (i.id == realInfos) {
      // console.log("this is best");
      bigMark.querySelector("i").classList.toggle("bookMarkDone");
      break;
    } else {
      bigMark.querySelector("i").classList.remove("bookMarkDone");
    }
  }
  for (let i of allSeen.seen) {
    if (i.id == realInfos) {
      // console.log("this is best");
      bigEye.querySelector("i").classList.toggle("bookMarkDone");
      break;
    } else {
      bigEye.querySelector("i").classList.remove("bookMarkDone");
    }
  }

  for (let i in yours) {
    console.log(i);
    let item = document.createElement("li");
    item.innerHTML = yours[i].title;
    bigList.querySelector(".listOptions").append(item);
  }

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
  console.log(event.target.nodeName);
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
          .then((res) => res.results.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            return res;
          }),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&query=${searchBar.value}&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) => res.results.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            // console.log(allResult);
            return res;
          }),
        fetch(
          `https://api.themoviedb.org/3/search/person?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searchBar.value}&page=1&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            return res.results;
          }),
      ])
        .then((res) => {
          return [].concat.apply([], res);
        })
        .then((res) => {
          searchResultsMixed(res);
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
      // fetch(
      //   `https://api.themoviedb.org/3/search/person?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searchBar.value}&page=1&include_adult=false`
      // )
      //   .then((res) => res.json())
      //   .then((res) => {
      //     // console.log(res);
      //     manSearchResults(res.results);
      //   }),
      Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searchBar.value}&page=1&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) => res.results.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            return res;
          }),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&query=${searchBar.value}&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) => res.results.slice(0, 10))
          .then((res) => {
            // allResult.push(...res);
            // allUnsorted.push(...res);
            // console.log(allResult);
            return res;
          }),
        fetch(
          `https://api.themoviedb.org/3/search/person?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searchBar.value}&page=1&include_adult=false`
        )
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            return res.results;
          }),
      ])
        .then((res) => {
          return [].concat.apply([], res);
        })
        .then((res) => {
          searchResultsMixed(res);
        })
        .then((allResult = []), (allUnsorted = []));
    }
  },
  false
);

function manSearchResults(movies) {
  console.log(movies);
  ressTemp.innerHTML = "";

  movies = movies.slice(0, 3);

  for (let movie of movies) {
    let poster = movie.profile_path;
    let title = movie.name;
    let card = resTemp.cloneNode(true).querySelector("li");
    // console.log(movie.popularity + " " + title);
    card.id = movie.id;
    card.querySelector("a").href = `/pages/person.html#${movie.id}`;
    card.querySelector("img").src = `https://image.tmdb.org/t/p/w92/${poster}`;
    card.querySelector(".res_title").innerHTML =
      `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
      " " +
      `<p style="color:rgb(255, 208, 0); display:inline;">${movie.known_for_department}<p/>`;

    console.log(card);

    console.log("a88");
    if (poster != null) {
      ressTemp.style.display = "block";
      ressTemp.append(card);
    }
  }
}

function searchResults(movies) {
  // ressTemp.innerHTML = "";
  movies.sort((a, b) => {
    let numa = Math.round((a.vote_average ?? 1) * a.popularity, 3);
    let numb = Math.round((b.vote_average ?? 1) * b.popularity, 3);
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
    card.querySelector("a").href = `#${movie.id}-${
      movie.title == null ? "tv" : "movie"
    }`;
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

function searchResultsMixed(movies) {
  ressTemp.innerHTML = "";
  movies.sort((a, b) => {
    let numa = Math.round((a.vote_average ?? 1) * a.popularity, 3);
    let numb = Math.round((b.vote_average ?? 1) * b.popularity, 3);
    // console.log(a.title ?? a.original_name);
    return numb - numa;
  });
  movies = movies.slice(0, 7);

  for (let movie of movies) {
    console.log(movie);
    if (movie.known_for_department) {
      let poster = movie.profile_path;
      let title = movie.name;
      let card = resTemp.cloneNode(true).querySelector("li");
      // console.log(movie.popularity + " " + title);
      card.id = movie.id;
      card.querySelector("a").href = `/pages/person.html#${movie.id}`;
      card.querySelector(
        "img"
      ).src = `https://image.tmdb.org/t/p/w92/${poster}`;
      card.querySelector(".res_title").innerHTML =
        `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
        " " +
        `<p style="color:rgb(255, 208, 0); display:inline;">${movie.known_for_department}<p/>`;

      console.log(card);

      console.log("a88");
      if (poster != null) {
        ressTemp.style.display = "block";
        ressTemp.append(card);
      }
    } else {
      let poster = movie.poster_path;
      let title = movie.original_name ?? movie.original_title;
      if (movie.original_language !== "ar" && movie.name) {
        title = movie.name;
      }
      let date = movie.release_date ?? movie.first_air_date;
      let card = resTemp.cloneNode(true).querySelector("li");
      // console.log(movie.popularity + " " + title);
      card.id = movie.id;
      card.querySelector("a").href = `/pages/movie1.html#${movie.id}-${
        movie.title == null ? "tv" : "movie"
      }`;
      card.setAttribute("type", movie.title == null ? "tv" : "movie");
      card.querySelector(
        "img"
      ).src = `https://image.tmdb.org/t/p/w92/${poster}`;
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
}
//search

//scroll

async function plotCast(trends, slideName) {
  console.log(trends);
  for (let trend of trends) {
    // console.log(trend);
    let poster = trend.profile_path;
    let title = trend.name;
    let detial = trend.character ?? trend.roles[0].character;
    let card = movieCard.content.cloneNode(true);

    card.querySelector(".card").id = trend.id;
    card.querySelector(".card").setAttribute("type", "person");
    card.querySelector(".card").href = `person.html#${trend.id}`;

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

async function plotSeas(trends, slideName) {
  console.log(trends);
  for (let trend of trends) {
    // console.log(trend);
    let poster = trend.poster_path;
    let title = trend.name;
    let sesDate = trend.air_date;
    let card = movieCard.content.cloneNode(true);

    card.querySelector(".card").id = trend.id;
    card.querySelector(".card").setAttribute("type", "person");
    card.querySelector(".card").href = `season.html#${realInfos}-${
      trends.indexOf(trend) + 1
    }`;

    card.querySelector("img").src = `${basePoster}${poster}`;
    card.querySelector(".infos").innerHTML =
      `<p style=" display:inline; font-size:1.2rem; color:gold;">${title}<p/>` +
      " " +
      `<p style=" display:inline; font-size:1rem; "> air date :${sesDate}<p/>` +
      " " +
      `<p style=" display:inline; font-size:1rem; ">number of episodes : ${trend.episode_count}<p/>`;

    if (poster != null) {
      slideName.querySelector(".slide-show").append(card);
    }
  }
}

async function plotEpisode(trends, slideName) {
  console.log(trends);
  for (let trend of trends) {
    // console.log(trend);
    let episodeRev = document.createElement("p");

    let poster = trend.still_path;
    let title = trend.name;
    let sesDate = trend.air_date;
    let card = movieCard.content.cloneNode(true);
    card.querySelector(".card").id = trend.id;
    card.querySelector(".card").setAttribute("type", "person");
    card.querySelector(".card").href = `season.html#${trend.id}`;
    episodeRev.innerHTML = " i am text ";

    card.querySelector("img").src = `${basePoster}${poster}`;
    card.querySelector(".infos").innerHTML =
      `<p style=" display:inline; font-size:1.2rem; color:gold;">${title}<p/>` +
      " " +
      `<p style=" display:inline; font-size:1rem; "> rating :${trend.vote_average}<p/>` +
      " " +
      `<p style=" display:inline; font-size:1rem; ">run time : ${trend.runtime}<p/>`;
    // card.querySelector(".infos").append(episodeRev);
    // episodeRev.classList.add("episodDet");

    card
      .querySelector(".card")
      .querySelectorAll("BUTTON")
      .forEach((e) => {
        e.remove();
      });
    card.querySelector(".card").addEventListener("click", (e) => {
      console.log("ssssaaaaa");
      e.preventDefault();
    });

    if (poster != null) {
      slideName.querySelector(".slide-show").append(card);
    }
  }
}

function plotSlides(trends, slideName) {
  // trends = trends.slice(0, 7);

  for (let trend of trends) {
    let poster = trend.poster_path;
    let title = trend.original_name ?? trend.title;
    let date = trend.release_date ?? trend.first_air_date;
    let detial = trend.overview;
    let card = movieCard.content.cloneNode(true);

    card.querySelector(".card").href = `/pages/movie1.html#${trend.id}-${
      trend.title == null ? "tv" : "movie"
    }`;
    card.querySelector(".card").id = trend.id;
    card
      .querySelector(".card")
      .setAttribute("type", trend.title == null ? "tv" : "movie");

    for (let i of allFav.laters) {
      if (i.id == trend.id) {
        card.querySelector("#later").classList.add("bookMarkDone");

        break;
      }
    }
    for (let i of allSeen.seen) {
      if (i.id == trend.id) {
        card.querySelector("#seen").classList.add("bookMarkDone");

        break;
      }
    }

    for (let i in yours) {
      // console.log(i);
      let item = document.createElement("li");
      item.innerHTML = yours[i].title;
      card.querySelector(".listOptions").append(item);
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

document.addEventListener("click", (event) => {
  if (event.target.id == "creatList") {
    location = "/pages/favs.html#customLists";
  }
  if (
    event.target.nodeName == "LI" &&
    event.target.parentNode.className == "listOptions"
  ) {
    yours = JSON.parse(localStorage.getItem("customs")) || {};
    let keey = event.target.textContent.split(" ").join("_");
    console.log(typeof keey);
    console.log(keey);
    console.log(
      yours[keey].content.includes({
        id: realInfos,
        type: videoType,
      })
    );
    var index = yours[keey].content.findIndex((x) => x.id == realInfos);

    index === -1
      ? yours[keey].content.unshift({
          id: realInfos,
          type: videoType,
        })
      : (event.target.style.backgroundColor = "green");

    console.log(yours[keey]);
    localStorage.setItem("customs", JSON.stringify(yours));
    return;
  }
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

// function scrollSlide(direction, area) {
//   let set = area.parentNode;
//   let currentScroll = area.scrollLeft;
//   let card = area.querySelector(".card");
//   let scrollVal = card.scrollWidth;
//   let maxScroll = area.scrollWidth - area.clientWidth;
//   // console.log(currentScroll);
//   // console.log(scrollVal);
//   console.log(direction);
//   if (direction == "next") {
//     let statu =
//       parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
//     // console.log(statu);
//     // console.log(maxScroll);

//     if (statu < maxScroll) {
//       for (let bag of area.children) {
//         bag.style.transform = `translateX(-${statu + card.clientWidth + 19}px)`;
//       }
//     }

//     // if (set.id == "movieTrends" || set.id == "tvTrends") {
//     //   area.scrollLeft += scrollVal * 4 + 77;
//     // } else if (set.id == "rec") {
//     //   console.log("captin");
//     //   area.scrollLeft += scrollVal + 19;
//     // }
//   } else if (direction == "back") {
//     let statu =
//       parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
//     console.log(statu);
//     if (statu == maxScroll) {
//       console.log("error here");
//       for (let bag of area.children) {
//         bag.style.transform = `translateX(0)`;
//       }
//     } else {
//       console.log("error here");

//       for (let bag of area.children) {
//         bag.style.transform = `translateX(-${
//           statu - (card.clientWidth + 19)
//         }px)`;
//       }
//     }

//     // if (set.id == "movieTrends" || set.id == "tvTrends") {
//     //   area.scrollLeft -= scrollVal * 4 + 77;
//     // } else if (set.id == "rec") {
//     //   area.scrollLeft -= scrollVal + 19;
//     // }
//   } else if (direction == "back" && currentScroll == maxScroll) {
//     area.scrollLeft = 0;
//   }
// }

function scrollSlide(direction, area) {
  let set = area.parentNode;
  let currentScroll = area.scrollLeft;
  let card = area.querySelector(".card");
  let scrollVal = card.offsetWidth;
  let maxScroll = area.offsetWidth - area.clientWidth;
  // console.log(currentScroll);
  // console.log(scrollVal);
  console.log(direction);
  if (direction == "next") {
    console.log(
      Math.ceil(area.scrollLeft) +
        "...." +
        (scrollVal + 16) +
        "....." +
        Math.ceil(area.scrollLeft / (scrollVal + 16))
    );
    console.log(area.scrollWidth - area.offsetWidth + "...." + area.scrollLeft);
    if (Math.ceil(area.scrollLeft) % (scrollVal + 16) == 0) {
      area.scrollLeft += scrollVal + 16;
    } else {
      if (area.scrollWidth - area.offsetWidth - area.scrollLeft > scrollVal) {
        area.scrollLeft =
          Math.ceil(area.scrollLeft / (scrollVal + 16)) * (scrollVal + 16);
      }
    }
    // if (set.id == "movieTrends" || set.id == "tvTrends") {
    //   area.scrollLeft += scrollVal * 4 + 77;
    // } else if (set.id == "rec") {
    //   console.log("captin");
    //   area.scrollLeft += scrollVal + 19;
    // }
  } else if (direction == "back") {
    if (Math.floor(area.scrollLeft) % (scrollVal + 16) == 0) {
      area.scrollLeft -= scrollVal + 16;
    } else {
      area.scrollLeft =
        (Math.ceil(area.scrollLeft / (scrollVal + 16)) - 1) * (scrollVal + 16);
    }
  } else if (direction == "back" && currentScroll == maxScroll) {
    area.scrollLeft = 0;
  }
}

window.addEventListener(
  "resize",
  () => {
    if (isTouch) {
      menuOpen.innerHTML = '<i class="fa-solid fa-bars">';
    } else {
      menuOpen.innerHTML = '<i class="fa-solid fa-bars"></i> menu';
    }
    setTimeout(() => {
      for (let h of document.querySelectorAll(".card")) {
        // console.log(h);

        h.style.transform = `translateX(0px)`;
      }
    }, 2000);
  },
  false
);

window.addEventListener("pointerup", appendLink, false);

function appendLink(event) {
  // for (let y of document.querySelectorAll(".card")) {
  //   y.classList.remove("viewdCard");
  // }
  if (event.target !== menuOpen && !navBar.contains(event.target)) {
    navBar.classList.remove("showNav");
    if (isTouch) {
      menuOpen.innerHTML = '<i class="fa-solid fa-bars"><i>';
    } else {
      menuOpen.innerHTML = '<i class="fa-solid fa-bars"></i> menu';
    }
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
    return;
  }

  let dad = event.target.closest(".slide-dad");
  let uncle = dad.querySelector(".slide-show");
  let book = card.querySelector(".bookMark");
  let bars = card.querySelector("#custom");
  let eye = card.querySelector("#seen");
  console.log(
    card.clientWidth +
      ".." +
      card.offsetWidth +
      ".." +
      card.scrollWidth +
      "..." +
      card.offsetLeft
  );

  console.log(
    uncle.scrollLeft +
      "..." +
      uncle.clientWidth +
      "..." +
      uncle.offsetWidth +
      "..." +
      uncle.scrollWidth
  );

  if (event.target.classList.contains("bookMark")) {
    if (event.target.classList.contains("bookMarkDone")) {
      event.target.classList.remove("bookMarkDone");
      for (let i of allFav.laters) {
        if (i.id == card.id && event.target.id == "later") {
          allFav.laters.splice(allFav.laters.indexOf(i), 1);
        }
      }
      for (let i of allSeen.seen) {
        if (i.id == card.id && event.target.id == "seen") {
          allSeen.seen.splice(allSeen.seen.indexOf(i), 1);
        }
      }
      localStorage.setItem("favs", JSON.stringify(allFav));
      localStorage.setItem("watched", JSON.stringify(allSeen));
    } else {
      console.log(card);
      console.log(event.target.id);
      event.target.classList.add("bookMarkDone");

      if (event.target.id == "later") {
        addFav(card.id, card.getAttribute("type"));
      } else if (event.target.id == "seen") {
        addSeen(card.id, card.getAttribute("type"));
      } else if (event.target.id == "custom") {
      }
      // event.target.innerHTML = '<i class="fa-solid fa-check"></i>';
    }

    return;
  }

  if (
    event.target.nodeName == "LI" &&
    event.target.parentNode.className == "listOptions"
  ) {
    yours = JSON.parse(localStorage.getItem("customs")) || {};
    let keey = event.target.textContent.split(" ").join("_");
    console.log(typeof keey);
    console.log(keey);
    console.log(
      yours[keey].content.includes({
        id: card.id,
        type: card.getAttribute("type"),
      })
    );
    var index = yours[keey].content.findIndex((x) => x.id == card.id);

    index === -1
      ? yours[keey].content.unshift({
          id: card.id,
          type: card.getAttribute("type"),
        })
      : (event.target.style.backgroundColor = "green");

    console.log(yours[keey]);
    localStorage.setItem("customs", JSON.stringify(yours));
    return;
  }

  if (card.classList.contains("viewdCard") || dad.id == "cast") {
    if (dad.id !== "cast") {
      book.classList.toggle("bookMarkSee");
      eye.classList.toggle("bookMarkSee");
      bars.classList.toggle("bookMarkSee");
      card.classList.toggle("viewdCard");
    }

    console.log(event.target.closest(".card").getAttribute("type"));

    card.querySelector(".over-view").style.height = null;
    card.querySelector("img").style.filter = null;
    return;
  } else if (
    card.classList.contains("card") &&
    !dad.classList.contains("noScale")
  ) {
    console.log("reach");

    for (let i of uncle.children) {
      let kid = i.querySelectorAll(".bookMark");
      i.classList.remove("viewdCard");
      try {
        for (let i of kid) {
          i.classList.remove("bookMarkSee");
        }
      } catch {
        console.log("did");
      }
    }
    for (let i of card.children) {
      console.log(i);
      if (i.classList.contains("bookMark")) {
        i.classList.toggle("bookMarkSee");
      }
    }

    card.classList.toggle("viewdCard");
    card.querySelector(".over-view").style.height = "fit-content";
    card.querySelector("img").style.filter = "blur(0px)";

    let mesure1 = Math.floor(card.offsetLeft - uncle.scrollLeft + 11);
    let mesure2 = uncle.clientWidth - card.offsetWidth;
    console.log(mesure1 >= mesure2);
    if (mesure1 >= mesure2) {
      setTimeout(() => {
        uncle.scrollLeft += card.offsetWidth / 2 + 24;
      }, 200);
    }
  }
}

// function openMovie(card, dataType, go) {
//   let meta = { id: card, type: dataType };
//   console.log(card + dataType + "type of click");
//   allLinks.links.push(meta);
//   localStorage.setItem("tabs", JSON.stringify(allLinks));
//   console.log("pushed");
//   // console.log(localStorage.getItem("tabs"));
//   // sessionStorage.setItem("count", 0);

//   if (go !== 2 && go !== 1) {
//     console.log("not touch");
//     if (dataType == "person") {
//       // window.open("person.html", "_blank");
//     } else {
//       // location.href = movie1.html;
//       // location.hash = card + "-" + dataType;
//       // window.scrollTo({ top: 0, behavior: "smooth" });
//       // init();
//       // location.reload();
//       // if (lock == "movie1.html") {
//       //   window.reload();
//       // } else {
//       //   window.reload();
//       // }
//     }
//   }
// }

function stopShit(event) {
  let unit = event.target.closest("a");
  console.log(unit);
  console.log(event.target.tagName);
  // event.preventDefault();
  if (event.target.tagName == "BUTTON" || event.target.tagName == "UL") {
    event.preventDefault();
  }
  if (unit.classList.contains("viewdCard")) {
    console.log("won't open");
    event.preventDefault();
  }
  // console.log(!unit.classList.contains("viewdCard"));
  console.log("this is link");
}

function addFav(meta, kind) {
  allFav.laters.unshift({ id: meta, type: kind });
  localStorage.setItem("favs", JSON.stringify(allFav));
}

function addSeen(meta, kind) {
  let uni = true;
  allSeen = JSON.parse(localStorage.getItem("watched")) || { seen: [] };
  console.log(allSeen);
  for (let i of allSeen.seen) {
    if (i.id == meta) {
      uni = false;
      console.log("allready there");
    }
  }
  if (uni) {
    allSeen.seen.unshift({ id: meta, type: kind });
    localStorage.setItem("watched", JSON.stringify(allSeen));
  }
}

menuOpen.addEventListener("click", () => {
  navBar.classList.toggle("showNav");
  if (navBar.classList.contains("showNav")) {
    if (isTouch) {
      menuOpen.innerHTML = '<i class="fa-solid fa-xmark"></i> ';
    } else {
      menuOpen.innerHTML = '<i class="fa-solid fa-xmark"></i> close';
    }
  } else {
    if (isTouch) {
      menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>';
    } else {
      menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>menu';
    }
  }
});

function onYouTubeIframeAPIReady(secondTime) {
  console.log(possibleVids);
  if (failVids.length == possibleVids.length) {
    document.querySelector("#trailer").remove();
  }
  for (let k of possibleVids) {
    if (k.type == "Trailer" && !failVids.includes(k.key) && !secondTime) {
      console.log(secondTime);
      console.log(k.key);
      failVids.push(k.key);
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
      break;
      // document.querySelector(
      //   "#trailer"
      // ).src = `https://www.youtube.com/embed/${k.key}`;
      // player.loadVideoById({ videoId: k.key, endSeconds: 0 });
    } else if (!failVids.includes(k.key) && secondTime) {
      console.log(k.key);
      console.log(secondTime);
      failVids.push(k.key);
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
      break;
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
    console.log(failVids);
    player.destroy();
    onYouTubeIframeAPIReady(true);
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
    // setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

// window.addEventListener(
//   "touchmove",
//   (event) => {
//     event.preventDefault();
//   },
//   { passive: false }
// );

// var startX,
//   startY,
//   dist,
//   threshold = 150, //required min distance traveled to be considered swipe
//   allowedTime = 500, // maximum time allowed to travel that distance
//   elapsedTime,
//   startTime;

// function handleswipe(swipe, right) {
//   if (isrightswipe) {
//     console.log("Congrats, you've made a swipe");
//   } else {
//     console.log("swipe faild");
//   }
// }

// window.addEventListener(
//   "touchstart",
//   function (e) {
//     window.innerHTML = "";
//     var touchobj = e.changedTouches[0];
//     dist = 0;
//     startX = touchobj.pageX;
//     startY = touchobj.pageY;
//     startTime = new Date().getTime(); // record time when finger first makes contact with surface
//     // e.preventDefault();
//   },
//   false
// );

// window.addEventListener(
//   "touchend",
//   function (e) {
//     var touchobj = e.changedTouches[0];
//     dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
//     elapsedTime = new Date().getTime() - startTime; // get time elapsed
//     // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
//     console.log(dist + " ...." + elapsedTime);
//     var isSwipe =
//       elapsedTime <= allowedTime &&
//       Math.abs(dist) >= threshold &&
//       Math.abs(touchobj.pageY - startY) <= 100;
//     var righOr = dist < 0;
//     console.log(threshold + "--" + allowedTime);
//     console.log(swiperightBol);
//     if (isSwipe && righOr) {
//     } else if (isSwipe && !righOr) {
//     }
//     handleswipe(isSwipe, righOr);
//     // e.preventDefault();
//   },
//   false
// );

let keepScroll = true;

const action2 = action1((ele) => {
  let card = ele.querySelector(".card");
  let scrollVal = card.offsetWidth;
  console.log(scrollVal + "...." + ele.scrollLeft);
  if (Math.floor(ele.scrollLeft) % (scrollVal + 16) == 0) {
  } else {
    ele.scrollLeft =
      Math.round(ele.scrollLeft / (scrollVal + 16)) * (scrollVal + 16);
    // keepScroll = false;
    console.log(keepScroll);
  }
});
document.querySelectorAll(".slide-show").forEach((ele) => {
  console.log(ele);
  ele.addEventListener("scroll", (event) => {
    action2(ele);
    setTimeout(() => {}, 1000);

    // console.log(ele);
  });
});

function action1(cb, delay = 750) {
  let timeOut;
  return (...args) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
