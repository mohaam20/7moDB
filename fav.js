const searchBar = document.querySelector("#search_area");
const resTemp = document.querySelector(".result_temp").content;
const ressTemp = document.querySelector(".results");
const movieCard = document.querySelector(".card-temp");
const items = document.querySelector(".slide-show");
const filter = document.querySelector("#filter");
const menuOpen = document.querySelector(".burger");
const navBar = document.querySelector(".menu");

filter.addEventListener("change", (event) => {
  event.preventDefault();
  console.log("mama");
  console.log(filter.value);
  for (let i of items.children) {
    if (i.getAttribute("type") == filter.value) {
      i.style.display = null;
    } else {
      i.style.display = "none";
    }
    if (filter.value == "all") {
      i.style.display = null;
    }
  }
});

window.addEventListener("load", () => {
  console.log("reloaded");
  sessionStorage.setItem("count", 0);
});

console.log(movieCard.content);
let baseImg = "http://image.tmdb.org/t/p/w500/";
let baseDrop = "http://image.tmdb.org/t/p/w1280/";
let basePoster = "http://image.tmdb.org/t/p/w342/";

let isTouch = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // some code..
  isTouch = true;
} else {
  isTouch = false;
}

let allLinks = JSON.parse(localStorage.getItem("tabs")) || { links: [] };
localStorage.setItem("tabs", JSON.stringify(allLinks));
if (allLinks.links.length > 100) {
  JSON.parse(localStorage.setItem("tabs", JSON.stringify({ links: [] })));
}

//search start
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
              (re) =>
                re.original_language == "en" ||
                re.original_language == "ar" ||
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

//search end

let latersList = JSON.parse(localStorage.getItem("favs"));
let pure = [...latersList.laters];
// console.log(pure);
const uniqueIds = [];

let unique = pure.filter((element) => {
  const isDuplicate = uniqueIds.includes(element.id);

  if (!isDuplicate) {
    uniqueIds.push(element.id);

    return true;
  }

  return false;
});
console.log(unique.length);

unique.forEach((element) => {
  getWatch(element.type, element.id);
});

async function getWatch(videoType, dataId) {
  let raw = await fetch(
    `https://api.themoviedb.org/3/${videoType}/${dataId}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=reviews,videos,credits,similar,external_ids`
  ).then((res) => res.json());
  // console.log(raw);
  plotSlides(raw);
}

function plotSlides(trend) {
  // console.log(trend);
  // trends = trends.slice(0, 7);
  let poster = trend.poster_path;
  let title = trend.name ?? trend.original_title;
  let date = trend.release_date ?? trend.first_air_date;
  let detial = trend.overview;
  let card = movieCard.content.cloneNode(true);

  card.querySelector(".card").id = trend.id;
  card
    .querySelector(".card")
    .setAttribute("type", trend.title == null ? "tv" : "movie");
  card.querySelector("img").src = `${baseImg}${poster}`;
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
    document.querySelector(".slide-show").append(card);
  }
}

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
          1,
          event.type
        );
      } catch {}
      try {
        openMovie(
          event.target.closest(".card").id,
          event.target.closest(".card").getAttribute("type"),
          1,
          event.type
        );
        console.log(event.target.closest(".card").getAttribute("type"));
      } catch {}
    },
    false
  );
  window.addEventListener("click", appendLink, false);
} else {
  window.addEventListener("mousedown", appendLink, false);
  window.addEventListener("mousedown", endFav, false);
}

function appendLink(event) {
  // for (let y of document.querySelectorAll(".card")) {
  //   y.classList.remove("viewdCard");
  // }
  let card = event.target.closest(".card");
  if (event.target.className == "endFav") {
    return;
  }
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
    // console.log(event.type);
    // console.log(event.button);
    // console.log(event.target.closest(".result"));
    openMovie(
      event.target.closest(".result").id,
      event.target.closest(".result").getAttribute("type"),
      event.button
    );
  } catch {}
  let dad = event.target.closest(".slide-dad");
  let uncle = dad.querySelector(".slide-show");

  console.log(card);

  // console.log(card);
  // console.log(gage + "gage");
  // console.log(
  //   Math.round(
  //     card.getBoundingClientRect().left - dad.getBoundingClientRect().left - 8
  //   )
  // );

  console.log(event.target);
  openMovie(
    event.target.closest(".card").id,
    event.target.closest(".card").getAttribute("type"),
    event.button
  );
}

function openMovie(card, dataType, go) {
  let meta = { id: card, type: dataType };
  console.log(meta + "is meta");
  allLinks.links.push(meta);

  localStorage.setItem("tabs", JSON.stringify(allLinks));

  // console.log(localStorage.getItem("tabs"));
  console.log(meta.id + meta.type + " inner");
  if (go !== 2 && go !== 1) {
    console.log("not touch");
    sessionStorage.setItem("count", 0);
    window.open("movie1.html", "_blank");
  }
  console.log(JSON.parse(localStorage.getItem("tabs")).links);
}

function stopShit(event) {
  event.preventDefault();
  console.log("this is link");
}

function endFav(event) {
  let card = event.target.closest(".card");
  console.log(event.target.className);
  if (event.target.className == "endFav") {
    let laters = [];
    console.log(typeof card.id);
    card.style.display = "none";
    card.remove();
    for (let i of unique) {
      if (i.id == card.id) {
        console.log(i);
      } else {
        laters.push(i);
      }
    }
    unique = laters;
    localStorage.setItem("favs", JSON.stringify({ laters }));
  }
}

menuOpen.addEventListener("click", () => {
  navBar.classList.toggle("showNav");
  if (navBar.classList.contains("showNav")) {
    menuOpen.innerHTML = '<i class="fa-solid fa-xmark"></i> close';
  } else {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>menu';
  }
});
