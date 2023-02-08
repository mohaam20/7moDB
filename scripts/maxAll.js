// Dom Elements
const searchBar = document.querySelector("#search_area");
const ressTemp = document.querySelector(".results");
const resTemp = ressTemp.querySelector(".result_temp").content;
const movieCard = document.querySelector(".card-temp");
const menuOpen = document.querySelector(".burger");
const menuClose = document.querySelector(".closeMenu");
const navBar = document.querySelector(".menu");
const genreBox = document.querySelector("#cast");
const genTitle = document.querySelector(".slide-title");
const mainDop = document.querySelector(".backDropHolder").querySelector("img");
const nextPage = document.querySelector(".nextPage");
const select = document.querySelector(".filterOpt");
// Dom Elements
select.addEventListener("change", (event) => {
  event.preventDefault();
  console.log("mama");
  console.log(select.value);
  console.log(select.closest(".slide-dad").querySelector(".slide-show"));
  for (let i of select.closest(".slide-dad").querySelector(".slide-show")
    .children) {
    // console.log(i);
    if (i.getAttribute("type") == select.value) {
      i.style.display = null;
    } else {
      i.style.display = "none";
    }
    if (select.value == "all") {
      i.style.display = null;
    }
  }
});

searchBar.addEventListener("keypress", function (event) {
  console.log("Text input value: " + event.key);
  console.log(event.data);
  if (event.key === "Enter" && searchBar.value.length !== 0) {
    open(`/pages/fullLists.html#search-${searchBar.value}`);
    // const value = textInput.value;
    // console.log("Text input value: " + value);
  }
});

let searchPage = 1;
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
if (isTouch) {
  menuOpen.innerHTML = '<i class="fa-solid fa-bars"><i>';
} else {
  menuOpen.innerHTML = '<i class="fa-solid fa-bars"></i> menu';
}
let allFav = JSON.parse(localStorage.getItem("favs")) || { laters: [] };
localStorage.setItem("favs", JSON.stringify(allFav));

let allSeen = JSON.parse(localStorage.getItem("watched")) || { seen: [] };
localStorage.setItem("watched", JSON.stringify(allSeen));

let yours = JSON.parse(localStorage.getItem("customs")) || {};
console.log(yours);

let fetchQuery;
// for (let i in yours) {
//   console.log(yours[i].title);
//   console.log(JSON.parse(JSON.stringify(yours[i])));
// }

// for (const i of Object.entries(yours)) {
//   console.log(i[1].title);
//   console.log(i[1].det);
// }

let baseImg = "http://image.tmdb.org/t/p/w342/";
let baseDrop = "http://image.tmdb.org/t/p/w1280/";
// refrence constats

window.addEventListener("load", () => {
  console.log(location.hash);
  // sessionStorage.setItem("movieId", hashs.substring(1));
  // sessionStorage.setItem("type", hash2);
  if (location.hash.includes("trend")) {
    genTitle.innerHTML = `trending </br> ${location.hash.split("-")[1]}s`;

    fetchQuery = `https://api.themoviedb.org/3/trending/${
      location.hash.split("-")[1]
    }/day?api_key=5e060480a887e5981aa743bc33a74e40`;
  } else if (location.hash.includes("similar")) {
    fetchQuery = `https://api.themoviedb.org/3/${location.hash.split("-")[1]}/${
      location.hash.split("-")[2]
    }?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=similar`;
  } else if (location.hash.includes("cast")) {
    fetchQuery = `https://api.themoviedb.org/3/${location.hash.split("-")[1]}/${
      location.hash.split("-")[2]
    }?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=aggregate_credits,credits`;
  } else if (location.hash.includes("recommend")) {
    fetchQuery = `https://api.themoviedb.org/3/${location.hash.split("-")[1]}/${
      location.hash.split("-")[2]
    }?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=recommendations`;
  } else if (location.hash.includes("work")) {
    console.log("blah");
    fetchQuery = `https://api.themoviedb.org/3/person/${
      location.hash.split("-")[1]
    }?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=movie_credits,tv_credits`;
  } else if (location.hash.includes("top")) {
    if (location.hash.split("-")[2]) {
      genTitle.innerHTML = `top animes`;

      fetchQuery = `https://api.themoviedb.org/3/${
        location.hash.split("-")[1]
      }/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&adult=falseX&with_original_language=${
        location.hash.split("-")[2]
      }&certification_country=US&certification.lte=PG`;
    } else {
      genTitle.innerHTML = `top </br> ${location.hash.split("-")[1]}s`;

      fetchQuery = `https://api.themoviedb.org/3/${
        location.hash.split("-")[1]
      }/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&adult=false`;
    }
  } else if (location.hash.includes("search")) {
    bigSearch(1);
    searchPage += 1;
    let cleanS = location.hash.split("-")[1].replace(/%20/g, " ");
    console.log(decodeURIComponent(cleanS));
    genreBox.querySelector(
      ".slide-title"
    ).innerHTML = `results of ${decodeURIComponent(cleanS)} `;
    return;
  }
  select.parentNode.remove();
  init(1);
});

async function bigSearch(page) {
  let searched = location.hash.split("-")[1];
  Promise.all([
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searched}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res.results;
      })
      .then((res) => {
        // allResult.push(...res);
        // allUnsorted.push(...res);
        console.log(res);
        return res;
      }),
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=${page}&query=${searched}&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res.results;
      })
      .then((res) => {
        // allResult.push(...res);
        // allUnsorted.push(...res);
        return res;
      }),
    fetch(
      `https://api.themoviedb.org/3/search/person?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=${searched}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res.results;
      }),
  ])
    .then((res) => {
      return [].concat.apply([], res);
    })
    .then((res) => {
      searchResultsMixedAll(res);
    });
}

async function init(page) {
  if (isTouch) {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars">';
  } else {
    menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>menu';
  }

  if (location.hash.length == 0) {
    open("/index.html", "_self");
  }

  let raw = await fetch(`${fetchQuery}&page=${page}`).then((res) => res.json());
  console.log(raw);
  if (raw.recommendations) {
    genreBox.querySelector(".slide-title").innerHTML = `${
      raw.title || raw.name
    } recommendation`;
    mainDop.src = `${baseDrop}${raw.backdrop_path || raw.poster_path}`;
    plotSlides(raw.recommendations.results, genreBox);
  } else if (raw.similar) {
    genreBox.querySelector(".slide-title").innerHTML =
      "similar to <br>" + raw.title || raw.name;
    mainDop.src = `${baseDrop}${raw.backdrop_path || raw.poster_path}`;
    plotSlides(raw.similar.results, genreBox);
  } else if (raw.aggregate_credits || raw.credits) {
    genreBox.querySelector(".slide-title").innerHTML =
      "cast of " + (raw.original_name || raw.title);
    mainDop.src = `${baseDrop}${raw.backdrop_path || raw.poster_path}`;

    if (raw.aggregate_credits) {
      plotCast(raw.aggregate_credits.cast, genreBox);
    } else {
      plotCast(raw.credits.cast, genreBox);
    }
  } else if (location.hash.split("-")[0] !== "#work") {
    console.log(location.hash.split("-")[0]);
    let numf = Math.floor(Math.random() * raw.results.length);
    if (page == "1") {
      mainDop.src = `${baseDrop}${
        raw.results[numf].backdrop_path || raw.poster_path
      }`;
    }
    plotSlides(raw.results, genreBox);
  }
  if (location.hash.split("-")[0] == "#work") {
    if (raw.known_for_department == "Acting") {
      mainDop.style.transform = "translatey(-40rem)";
      mainDop.src = `${baseDrop}${raw.profile_path}`;
      genreBox.querySelector(".slide-title").innerHTML =
        location.hash.split("-")[2] + "s of " + raw.name;
      let mType = location.hash.split("-")[2] + "_credits";
      plotSlides(raw[mType].cast, genreBox);
    } else {
      mainDop.src = `${baseDrop}${raw.profile_path}`;

      let mType = location.hash.split("-")[2] + "_credits";

      console.log("repeattttttttttttttttttttttttttttttttttttttttttttt");
      plotSlides(raw[mType].crew, genreBox);
    }
  }

  // mainOverview.innerHTML = raw.overview;

  // mainPoster.src = `${baseImg}${raw.poster_path}`;
  // mainPoster.alt = raw.title ?? raw.original_name;
}

// search

window.addEventListener(
  "click",
  (event) => {
    if (
      event.target.closest(".card") &&
      event.target.closest(".card").dataset.navto == "true"
    ) {
    } else {
      for (let i of document.querySelectorAll(".card")) {
        // console.log(i.dataset.navto);
        // console.log(i);
        i.setAttribute("data-navto", false);
      }
    }
    console.log(event.target.className);
    // if (event.target.className == "bookMark") {
    //   let movie = {
    //     id: event.target.parentNode.id,
    //     type: event.target.parentNode.getAttribute("type"),
    //   };
    //   console.log(movie);
    // }

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
    // console.log(movie);
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
      let date = " ";
      try {
        date =
          movie.release_date.slice(0, 4) ?? movie.first_air_date.slice(0, 4);
      } catch {}
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
        `<p style="color:#F1EEE9; display:inline;">${date}<p/>` +
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

function searchResultsMixedAll(movies) {
  movies.sort((a, b) => {
    let numa = Math.round((a.vote_average ?? 1) * a.popularity, 3);
    let numb = Math.round((b.vote_average ?? 1) * b.popularity, 3);
    // console.log(a.title ?? a.original_name);
    return numb - numa;
  });
  console.log(movies);
  for (let trend of movies) {
    // console.log(trend);
    if (trend.known_for_department) {
      let poster = trend.profile_path;
      let title = trend.name;
      // let detial = trend.character ?? trend.roles[0].character;
      let card = movieCard.content.cloneNode(true);

      card.querySelector(".card").id = trend.id;
      card.querySelector(".card").setAttribute("type", "person");
      card.querySelector(".card").href = `person.html#${trend.id}`;

      card.querySelector("img").src = `${baseImg}${poster}`;
      card.querySelector(".infos").innerHTML =
        `<p style="color:gold; display:inline; font-size:1.2rem;">${title}<p/>` +
        " " +
        `<p style=" display:inline; font-size:1rem;"> known for: ${trend.known_for_department}<p/>`;
      card.querySelectorAll("BUTTON").forEach((e) => {
        e.remove();
      });
      if (poster == null) {
        card.querySelector("img").src = "/logos/poster-holder.png";
      }
      if (
        card.querySelector(".card").getAttribute("type") !== select.value &&
        select.value !== "all"
      ) {
        card.querySelector(".card").style.display = "none";
      }
      genreBox.querySelector(".slide-show").append(card);
    } else {
      let poster = trend.poster_path;
      let backDrop = trend.backdrop_path;
      let title = trend.original_name ?? trend.title;
      let date = " ";
      try {
        date =
          movie.release_date.slice(0, 4) ?? movie.first_air_date.slice(0, 4);
      } catch {}
      let detial = trend.overview;
      let card = movieCard.content.cloneNode(true);

      card.querySelector(".card").id = trend.id;
      card.querySelector(".card").href = `/pages/movie1.html#${trend.id}-${
        trend.title == null ? "tv" : "movie"
      }`;
      card
        .querySelector(".card")
        .setAttribute("type", trend.title == null ? "tv" : "movie");
      card.querySelector("img").src = `${baseImg}${poster}`;
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
        let item = document.createElement("li");
        item.innerHTML = yours[i].title;
        card.querySelector(".listOptions").append(item);
      }

      card.querySelector(".infos").innerHTML =
        `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
        " " +
        `<p style="color:rgb(199, 199, 199); display:inline;">${date}<p/>` +
        `<p style=" color:rgb(255, 208, 0); display:inline;">rating: ${
          Math.round(trend.vote_average * 10) / 10
        }<p/>` +
        `<p class="over-view">overview: ${detial}<p/>`;
      // card.querySelector(
      //   ".infos"
      // ).innerHTML += `<button class="more"">more...</button>`;
      if (poster == null) {
        card.querySelector("img").src = "/logos/poster-holder.png";
      }
      if (
        card.querySelector(".card").getAttribute("type") !== select.value &&
        select.value !== "all"
      ) {
        card.querySelector(".card").style.display = "none";
      }
      genreBox.querySelector(".slide-show").append(card);
    }
  }
}
//search

//scroll

function plotSlides(trends, slideName) {
  // trends = trends.slice(0, 7);
  for (let trend of trends) {
    let poster = trend.poster_path;
    let backDrop = trend.backdrop_path;
    let title = trend.original_name ?? trend.title;
    let date = " ";
    try {
      date = movie.release_date.slice(0, 4) ?? movie.first_air_date.slice(0, 4);
    } catch {}
    let detial = trend.overview;
    let card = movieCard.content.cloneNode(true);

    card.querySelector(".card").id = trend.id;
    card.querySelector(".card").href = `/pages/movie1.html#${trend.id}-${
      trend.title == null ? "tv" : "movie"
    }`;
    card
      .querySelector(".card")
      .setAttribute("type", trend.title == null ? "tv" : "movie");
    card.querySelector("img").src = `${baseImg}${poster}`;
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
      let item = document.createElement("li");
      item.innerHTML = yours[i].title;
      card.querySelector(".listOptions").append(item);
    }

    card.querySelector(".infos").innerHTML =
      `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
      " " +
      `<p style="color:rgb(199, 199, 199); display:inline;">${date}<p/>` +
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

function plotCast(trends, slideName) {
  // trends = trends.slice(0, 7);
  console.log(trends);
  for (let trend of trends) {
    let poster = trend.profile_path;
    let title = trend.name;
    let detial = trend.character ?? trend.roles[0].character;
    let card = movieCard.content.cloneNode(true);

    card.querySelector(".card").id = trend.id;
    card.querySelector(".card").setAttribute("type", "person");
    card.querySelector(".card").href = `person.html#${trend.id}`;

    card.querySelector("img").src = `${baseImg}${poster}`;
    card.querySelector(".infos").innerHTML =
      `<p style="color:gold; display:inline; font-size:1.2rem;">${title}<p/>` +
      " " +
      `<p style=" display:inline; font-size:1rem;">as: ${detial}<p/>` +
      " " +
      `<p style=" display:inline; font-size:1rem;"> known for: ${trend.known_for_department}<p/>`;
    card.querySelectorAll("BUTTON").forEach((e) => {
      e.remove();
    });
    if (poster == null) {
      card.querySelector("img").src = "/logos/poster-holder.png";
    }
    slideName.querySelector(".slide-show").append(card);
  }
}

document.addEventListener(
  "click",
  (event) => {
    if (
      event.target.className == "more" &&
      event.target.innerHTML == "more..."
    ) {
      let data = event.target.parentNode.querySelector(".over-view");
      data.style.minHeight = "fit-content";
      data.style.height = "100%";
      event.target.innerHTML = "less";
    } else if (
      event.target.className == "more" &&
      event.target.innerHTML == "less"
    ) {
      let data = event.target.parentNode.querySelector(".over-view");
      data.style.height = "4rem";
      event.target.innerHTML = "more...";
    }
    if (event.target.className == "over-view") {
      let data = event.target.parentNode.querySelector(".over-view");
      event.target.parentNode.querySelector(".more").innerHTML = "more...";
      data.style.height = "4rem";
    }
  },
  true
);
// scroll;

window.addEventListener("scroll", (event) => {
  // console.log(window.innerHeight + window.scrollY);
  // console.log(document.body.offsetHeight);
  if (
    Math.ceil(window.innerHeight + window.scrollY) >=
      document.body.offsetHeight &&
    !["#work", "#cast"].includes(location.hash.split("-")[0])
  ) {
    console.log("End of page");

    // console.log(newPage);
    nextPage.classList.add("nextBtnSee");
  }
});

nextPage.addEventListener("pointerup", (event) => {
  // console.log("get more");
  let newPage =
    Math.round(
      (genreBox.querySelector(".slide-show").children.length - 1) / 20
    ) + 1;
  console.log(searchPage);
  if (location.hash.split("-")[0].substring(1) == "search") {
    if (searchPage !== 1) {
      bigSearch(searchPage);
    }
  } else {
    if (newPage !== 1) {
      init(newPage);
    }
  }
  searchPage += 1;
});
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

  try {
    let dad = event.target.closest(".slide-dad");
    let uncle = dad.querySelector(".slide-show");

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

    console.log(event.target);

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

    // book.classList.toggle("bookMarkSee");

    card.querySelector(".over-view").style.height = "fit-content";
    card.querySelector("img").style.filter = "blur(0px)";
  } catch {}
}

function stopShit(event) {
  let unit = event.target.closest(".card");
  console.log(event.target);
  if (["LI", "BUTTON", "UL"].includes(event.target.nodeName)) {
    event.preventDefault();
    console.log("stoop nav");
  }
  if (isTouch) {
    if (unit.dataset.navto && unit.dataset.navto == "true") {
      console.log("won't open");
    } else {
      event.preventDefault();
      unit.setAttribute("data-navto", true);
    }
  }
  // if (unit.classList.contains("viewdCard") && unit.closest("#rec") == null) {
  //   event.preventDefault();
  // } else {
  //   for (let i of unit.children) {
  //     i.classList.remove("bookMarkSee");
  //   }
  // }
  // console.log(!unit.classList.contains("viewdCard"));
  // console.log("this is link");
}

// document.addEventListener("long-press", function () {
//   console.log("fire me");
// });

function addFav(meta, kind) {
  let uni = true;

  allFav = JSON.parse(localStorage.getItem("favs")) || { laters: [] };
  console.log("add one");
  for (let i of allFav.laters) {
    if (i.id == meta) {
      uni = false;
      console.log("allready there");
    }
  }
  if (uni) {
    allFav.laters.unshift({ id: meta, type: kind });
    localStorage.setItem("favs", JSON.stringify(allFav));
  }
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
