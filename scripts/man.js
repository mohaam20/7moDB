const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d2a2325d29msh1e229817fbf71b6p14aebcjsn60e7a9f14a24",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};
let realInfos;
let videoType;
let failVids = [];
let possibleVids;
let tag;
let firstScriptTag;
let isTouch = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // some code..
  isTouch = true;
} else isTouch = false;

addEventListener("popstate", channnn);

function channnn() {
  console.log(window.history);
  // let hashs = location.hash.split("-")[0];
  // let hash2 = location.hash.split("-")[1];
  // sessionStorage.setItem("movieId", hashs.substring(1));
  // sessionStorage.setItem("type", hash2);
  window.scrollTo({ top: 0 });
  location.reload();
  // init();
}

let allFav = JSON.parse(localStorage.getItem("favs")) || { laters: [] };
localStorage.setItem("favs", JSON.stringify(allFav));

let yours = JSON.parse(localStorage.getItem("customs")) || {};
console.log(yours);

let allSeen = JSON.parse(localStorage.getItem("watched")) || { seen: [] };
localStorage.setItem("watched", JSON.stringify(allSeen));

let allLinks = JSON.parse(localStorage.getItem("tabs")) || { links: [] };
localStorage.setItem("tabs", JSON.stringify(allLinks));

let infos = JSON.parse(localStorage.getItem("tabs"));
console.log(infos);

console.log(realInfos);
console.log(videoType);

async function init() {
  if (isTouch) {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars">';
  } else {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>menu';
  }
  if (location.hash.length == 0) {
    open("/index.html", "_self");
  } else {
    console.log("i am here");

    let hashs = location.hash.split("-")[0];
    let hash2 = location.hash.split("-")[1];

    realInfos = hashs.substring(1);
    videoType = "person";
  }
  let raw = await fetch(
    `https://api.themoviedb.org/3/${videoType}/${realInfos}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=movie_credits,videos,tv_credits,credits,images,changes,external_ids`
  ).then((res) => res.json());

  console.log(raw);
  let titleRate;
  let colap = raw.known_for_department == "Acting" ? "cast" : "crew";
  console.log(raw.movie_credits[colap]);
  let pastVid;
  let field;
  for (let i of raw.movie_credits[colap]) {
    if (i.popularity > 10) {
      pastVid = i.id;
      field = "movie";
      break;
    }
  }
  console.log(pastVid);
  if (!pastVid) {
    for (let i of raw.tv_credits[colap]) {
      if (i.popularity > 10) {
        console.log(i);
        pastVid = i.id;
        field = "tv";
        break;
      }
    }
  }
  if (raw.movie_credits.cast[0] && pastVid) {
    titleRate = await fetch(
      `https://api.themoviedb.org/3/${field}/${pastVid}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=movie_credits,tv_credits,credits,videos,changes,external_ids`
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));

    console.log(titleRate);
    possibleVids = titleRate.videos.results;
    if (titleRate.videos.results.length == 0) {
      vid.remove();
    } else {
      tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    for (let k of titleRate.videos.results) {
      if (k.type == "Trailer") {
        console.log(k.type);
        // console.log(raw.videos.results.indexOf(k));
        console.log(k.key);
        // vid.src = `https://www.youtube.com/embed/${k.key}`;

        break;
      }
    }
  } else {
    vid.remove();
  }

  console.log(raw);
  // raw.genres.forEach((element) => {
  //   document.querySelector(".genre").innerHTML += `/ ${element.name}`;
  // });
  // plotSlides(raw.movie_credits, actorMovies);
  actorMovies.querySelector(
    ".slide-title"
  ).href = `/pages/fullLists.html#work-${realInfos}-movie`;
  actorShows.querySelector(
    ".slide-title"
  ).href = `/pages/fullLists.html#work-${realInfos}-tv`;
  if (raw.known_for_department == "Acting") {
    actorsWork(raw.movie_credits.cast.slice(0, 25), actorMovies, "movie");
    actorsWork(raw.tv_credits.cast.slice(0, 25), actorShows, "tv");
    if (raw.movie_credits.cast.length == 0) {
      actorMovies.remove();
    }
    if (raw.tv_credits.cast.length == 0) {
      actorShows.remove();
    }
  } else {
    console.log("repeattttttttttttttttttttttttttttttttttttttttttttt");
    if (raw.movie_credits.crew.length == 0) {
      actorMovies.remove();
    }
    if (raw.tv_credits.crew.length == 0) {
      actorShows.remove();
    }
    actorsWork(raw.movie_credits.crew.slice(0, 25), actorMovies, "movie");
    actorsWork(raw.tv_credits.crew.slice(0, 25), actorShows, "tv");
  }

  document.title = raw.name ?? raw.original_name;

  mainTitle.querySelector(".title").innerHTML = raw.name ?? raw.original_name;
  actorMovies.querySelector(
    ".slide-title"
  ).innerHTML = `some of ${raw.name}'s movies`;

  actorShows.querySelector(
    ".slide-title"
  ).innerHTML = `some of ${raw.name}'s shows`;

  document.querySelector(".air").remove();
  // document.querySelector(".media").innerHTML +=
  //   videoType == "movie" ? "moive" : "tv-show";
  mainOverview.innerHTML =
    raw.biography.length !== 0
      ? raw.biography
      : "there is no info about this person";
  if (raw.images.profiles[1]) {
    mainDop.src = `${baseDrop}${raw.images.profiles[1].file_path}`;
  } else {
    mainDop.src = `${baseDrop}${raw.profile_path}`;
  }
  if (raw.profile_path !== null) {
    mainPoster.src = `${baseImg}${raw.profile_path}`;
  }

  console.log(raw.credits);
  // plotCast(raw.credits.cast, castSlide);
}

// Dom Elements
const mainTitle = document.querySelector(".mainTitle");
const mainOverview = document
  .querySelector(".mainInfos")
  .querySelector(".text");
const mainDop = document.querySelector(".backDropHolder").querySelector("img");
const mainPoster = document.querySelector(".posterHold").querySelector("img");
const vid = document.querySelector(".trailer");
const searchBar = document.querySelector("#search_area");
const ressTemp = document.querySelector(".results");
const resTemp = ressTemp.querySelector(".result_temp").content;
// const castSlide = document.querySelector("#cast");
const slide1 = document.querySelector("#movieTrends");
const slide2 = document.querySelector("#tvTrends");
const actorMovies = document.querySelector("#actorMovies");
const actorShows = document.querySelector("#actorShows");
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

document.querySelector(".story").querySelector(".text").style.maxHeight =
  " 35ch";

let num = JSON.parse(localStorage.getItem("tabs")).links.length || 0;

// refrence constats
let autoslide = true;
let counter = 2;
let trendPage = 1;
let baseImg = "http://image.tmdb.org/t/p/w500/";
let baseDrop = "http://image.tmdb.org/t/p/w1280/";
let basePoster = "http://image.tmdb.org/t/p/w342/";
// refrence constats

const action2 = action1((ele) => {
  let card = ele.querySelector(".card");
  let scrollVal = card.offsetWidth;
  console.log(scrollVal + "...." + ele.scrollLeft);
  if (Math.floor(ele.scrollLeft) % (scrollVal + 16) == 0) {
  } else {
    ele.scrollLeft =
      Math.round(ele.scrollLeft / (scrollVal + 16)) * (scrollVal + 16);
    // keepScroll = false;
    // console.log(keepScroll);
  }
});
document.querySelectorAll(".slide-show").forEach((ele) => {
  console.log(ele);
  ele.addEventListener("scroll", (event) => {
    action2(ele);
    setTimeout(() => {}, 1000);

    console.log(ele);
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
      card.querySelector("a").href = `movie1.html#${movie.id}-${
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

async function actorsWork(idss, slideName, which) {
  idss.sort((a, b) => {
    let numa = Math.round((a.vote_average ?? 1) * a.popularity, 3);
    let numb = Math.round((b.vote_average ?? 1) * b.popularity, 3);
    // console.log(a.title ?? a.original_name);
    return numb - numa;
  });

  console.log(idss);
  idss = idss.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );
  console.log(idss);
  for (let i of idss) {
    const trend = await fetch(
      `https://api.themoviedb.org/3/${which}/${i.id}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US`
    ).then((res) => res.json());
    // console.log(trend + "55555555555");

    let poster = trend.poster_path;
    let title = trend.original_name ?? trend.title;
    let date = trend.release_date ?? trend.first_air_date;
    let detial = trend.overview;
    let card = movieCard.content.cloneNode(true);
    card.querySelector(".card").id = trend.id;
    card.querySelector(".card").href = `/pages/movie1.html#${trend.id}-${
      trend.title == null ? "tv" : "movie"
    }`;
    card
      .querySelector(".card")
      .setAttribute("type", trend.title == null ? "tv" : "movie");

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
    for (let i in yours) {
      // console.log(i);
      let item = document.createElement("li");
      item.innerHTML = yours[i].title;
      card.querySelector(".listOptions").append(item);
    }
    if (poster != null) {
      slideName.querySelector(".slide-show").append(card);
    }
  }
  console.log(slideName.querySelector(".slide-show").children);
  if (slideName.querySelector(".slide-show").children.length < 2) {
    slideName.remove();
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
      card.querySelector(".card").id = trend.id;
      card.querySelector(".card").href = `/pages/movie1.html#${trend.id}-${
        trend.title == null ? "tv" : "movie"
      }`;
      card
        .querySelector(".card")
        .setAttribute("type", trend.title == null ? "tv" : "movie");

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
    if (event.target.nodeName == "BUTTON") {
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
    // if (isTouch) {
    //   console.log("touch");
    //   menuOpen.innerHTML = '<i class="fa-solid fa-bars">';
    // } else {
    //   menuOpen.innerHTML = '<i class="fa-solid fa-bars"> menu';
    // }
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
  } else if (card.classList.contains("card")) {
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
function stopShit(event) {
  let unit = event.target.closest("a");
  if (event.target.tagName == "BUTTON" || event.target.tagName == "UL") {
    event.preventDefault();
  }
  if (unit.classList.contains("viewdCard")) {
    event.preventDefault();
  }
  console.log(!unit.classList.contains("viewdCard"));
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
