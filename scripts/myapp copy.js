// Dom Elements
const searchBar = document.querySelector("#search_area");
const ressTemp = document.querySelector(".results");
const resTemp = ressTemp.querySelector(".result_temp").content;
const slide1 = document.querySelector("#movieTrends");
const slide2 = document.querySelector("#tvTrends");
const topSlide = document.querySelector("#topMovies");
const top2Slide = document.querySelector("#topShows");
const top3Slide = document.querySelector("#topAnimes");
const mainSlide = document.querySelector("#rec");
const movieCard = document.querySelector(".card-temp");
const nextField = document.querySelector(".next-rec");
const menuOpen = document.querySelector(".burger");
const menuClose = document.querySelector(".closeMenu");
const navBar = document.querySelector(".menu");
// Dom Elements

searchBar.addEventListener("keypress", function (event) {
  console.log("Text input value: " + event.key);
  console.log(event.data);
  if (event.key === "Enter" && searchBar.value.length !== 0) {
    open(`pages/fullLists.html#search-${searchBar.value}`);
    // const value = textInput.value;
    // console.log("Text input value: " + value);
  }
});
addEventListener("hashchange", () => {
  console.log("ya rbbbb");
});
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

// let allLinks = JSON.parse(localStorage.getItem("tabs")) || { links: [] };
// localStorage.setItem("tabs", JSON.stringify(allLinks));
// if (allLinks.links.length > 100) {
//   JSON.parse(localStorage.setItem("tabs", JSON.stringify({ links: [] })));
// }

let yours = JSON.parse(localStorage.getItem("customs")) || {};
console.log(yours);

for (let i in yours) {
  console.log(yours[i].title);
  console.log(JSON.parse(JSON.stringify(yours[i])));
}

for (const i of Object.entries(yours)) {
  console.log(i[1].title);
  console.log(i[1].det);
}

function lazyLoad() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const rect = img.getBoundingClientRect();

    if (
      rect.top >= 0 &&
      rect.bottom <= window.innerHeight &&
      img.closest(".slide-dad")
    ) {
      img.src = img.dataset.src;
    }
  });
}

// window.addEventListener("scroll", lazyLoad);
// let tabs = JSON.parse(localStorage.getItem("tabs")).links;

// window.addEventListener("click", (event) => {
//   let card = event.target.closest(".card").id;
//   console.log(card);

//   allLinks.links.push(card);
//   localStorage.setItem("tabs", JSON.stringify(allLinks));
//   let logs = JSON.parse(localStorage.getItem("tabs")).links;
//   // window.open("movie1.html", "_blank");
// });
// refrence constats
let goal;
let trueScroll = true;
let autoslide = true;
let counter = 2;
let mainCount = 1;
let trendPage = 1;
nextField.children[1].style.display = "none";
let baseImg = "http://image.tmdb.org/t/p/w342/";
let thumImg = "http://image.tmdb.org/t/p/w342/";
let thumDrop = "http://image.tmdb.org/t/p/w1280/";
let baseDrop = "http://image.tmdb.org/t/p/w1280/";
// refrence constats

addEventListener("load", () => {
  // localStorage.clear();
  sessionStorage.clear();

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=5e060480a887e5981aa743bc33a74e40&vote_count.gte=1000&sort_by=release_date.desc&include_adult=false&include_video=false&page=${trendPage}&vote_average.gte=8&with_keywords=avengers&with_watch_monetization_types=flatrate`
  )
    .then((res) => res.json())
    .then((res) => res.results.filter((res) => res.original_language !== "sd"))
    .then((res) => {
      plotSlides(res, mainSlide);
    });
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=5e060480a887e5981aa743bc33a74e40"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res.results;
      })
      .then((res) => {
        console.log(res);
        slide1.querySelector(".slide-title").href =
          "pages/fullLists.html#trend-movie";
        plotSlides(res, slide1);
      });
  }, 800);

  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=5e060480a887e5981aa743bc33a74e40"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        slide2.querySelector(".slide-title").href =
          "pages/fullLists.html#trend-tv";
        plotSlides(res, slide2);
      });
  }, 1300);
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&adult=false"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        topSlide.querySelector(".slide-title").href =
          "pages/fullLists.html#top-movie";
        plotSlides(res, topSlide);
      });
  }, 2000);
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&with_original_language=en|ar&page=1&region=us"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        top2Slide.querySelector(".slide-title").href =
          "pages/fullLists.html#top-tv";
        plotSlides(res, top2Slide);
      });
  }, 2500);
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&with_original_language=ja&page=1"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        top3Slide.querySelector(".slide-title").href =
          "pages/fullLists.html#top-tv-ja";
        plotSlides(res, top3Slide);
      });
  }, 3000);
});

// search

window.addEventListener(
  "click",
  (event) => {
    console.log(event.target.className);
    // if (event.target.className == "bookMark") {
    //   let movie = {
    //     id: event.target.parentNode.id,
    //     type: event.target.parentNode.getAttribute("type"),
    //   };
    //   console.log(movie);
    // }
    if (event.target.closest("#rec")) {
      autoslide = false;
      setTimeout(() => {
        autoslide = true;
      }, 7000);
    }
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
    console.log(movie);
    let poster = movie.poster_path;
    let title = movie.original_name ?? movie.original_title;
    let date = " ";
    try {
      date = movie.release_date.slice(0, 4) ?? movie.first_air_date.slice(0, 4);
    } catch {}
    let card = resTemp.cloneNode(true).querySelector("li");
    card.id = movie.id;
    card.setAttribute("type", movie.title == null ? "tv" : "movie");

    // console.log(movie.popularity + " " + title);
    card.querySelector("a").href = `/pages/movie1.html#${movie.id}-${
      movie.title == null ? "tv" : "movie"
    }`;
    card.querySelector("img").src = ` https://image.tmdb.org/t/p/w92/${poster}`;
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

function searchResultsMixed(movies) {
  ressTemp.innerHTML = "";
  movies.sort((a, b) => {
    let numa = Math.round((a.vote_average ?? 1) * a.popularity, 3);
    let numb = Math.round((b.vote_average ?? 1) * b.popularity, 3);
    // console.log(a.title ?? a.original_name);
    return numb - numa;
  });
  movies = movies.slice(0, 7);
  console.log(movies);
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
      card.querySelector("a").href = `pages/movie1.html#${movie.id}-${
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
//search

//scroll

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
      for (let i in yours) {
        let item = document.createElement("li");
        item.innerHTML = yours[i].title;
        card.querySelector(".listOptions").append(item);
      }
      card.querySelector(".card").id = trend.id;
      card.querySelector(".card").href = `/pages/movie1.html#${trend.id}-${
        trend.title == null ? "tv" : "movie"
      }`;
      card
        .querySelector(".card")
        .setAttribute("type", trend.title == null ? "Tv" : "movie");

      nextCard.querySelector("img").src = `${thumImg}${poster}`;
      nextCard.querySelector("img").dataset.src = thumImg + poster;
      nextCard.querySelector("h4").innerHTML = `${title}`;
      nextCard.querySelector("p").innerHTML = `${date}`;

      card.querySelector("img").src = `${thumDrop}${backDrop || poster}`;
      card.querySelector("img").alt = `${title}`;
      card.querySelector("img").dataset.src = baseDrop + backDrop;

      card
        .querySelector(".posterTitle")
        .querySelector("img").src = `${baseImg}${poster}`;
      card.querySelector(".posterTitle").querySelector("img").dataset.src =
        baseImg + poster;
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

        slideName
          .querySelector(".slide-show")
          .append(card.querySelector(".card"));
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
      card.querySelector("img").src = `${thumImg}${poster}`;
      card.querySelector("img").dataset.src = baseImg + poster;

      card.querySelector("img").alt = `${title}`;
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
document.addEventListener(
  "click",
  (event) => {
    if (event.target.nodeName == "BUTTON") {
      let area = event.target.parentNode.querySelector(".slide-show");
      // console.log(area);
      let direction = event.target.className;
      if (event.target.parentNode.id == "rec") {
        // scrollSlide(direction, area);
        scrollSlide2(direction, area);
      } else {
        scrollSlide(direction, area);
      }
    }
  },
  true
);

function scrollSlide2(direction, area) {
  let set = area.parentNode;
  let currentScroll = area.scrollLeft;
  let card = area.querySelector(".card");
  let scrollVal = area.clientWidth;
  let maxScroll = area.scrollWidth - area.clientWidth;

  if (direction == "next") {
    for (let step = 0; step <= mainCount + 2; step++) {
      // Runs 5 times, with values of step 0 through 4.
      // console.log(step);
      nextField.children[step].style.display = "none";
      nextField.children[step + 1].style.backgroundColor = "rgb(0, 86, 184)";
      nextField.children[step + 1].style.transform = "scale(1.1)";
      nextField.children[step + 1].style.zIndex = "10";
    }
    counter = Math.floor(area.scrollLeft / scrollVal + 3);

    goal =
      area.children[counter - 2].offsetLeft -
      area.offsetWidth * (counter - 3) -
      8;
    console.log(goal);

    area.scrollLeft = mainCount * area.offsetWidth + goal;
    if (goal > 0) {
      console.log(area.scrollLeft);
    }

    if (Math.ceil(area.scrollWidth / area.scrollLeft) < 5) {
      console.log("fetch new");

      trendPage += 1;
      fetchTrend(trendPage);
    }

    mainCount += 1;
  } else if (direction == "back") {
    for (
      let step = mainCount + 2;
      step < nextField.children.length - 2;
      step++
    ) {
      // Runs 5 times, with values of step 0 through 4.
      console.log(step);
      nextField.children[step - 1].style.display = "flex";
      nextField.children[step].style.backgroundColor = null;
      nextField.children[step].style.transform = "scale(1)";
      nextField.children[step].style.zIndex = null;
    }
    area.scrollLeft = (mainCount - 2) * area.offsetWidth + goal;

    mainCount -= 1;
  } else if (direction == "back" && currentScroll == maxScroll) {
    // area.scrollLeft = 0;
  }
}
function scrollSlide(direction, area) {
  let set = area.parentNode;
  let card = area.querySelector(".card");
  let scrollVal = card.offsetWidth;
  let maxScroll = area.scrollWidth - area.clientWidth;
  // console.log(currentScroll);
  // console.log(scrollVal);
  console.log(direction);
  trueScroll = false;
  if (direction == "next") {
    if (Math.ceil(area.scrollLeft) % (scrollVal + 16) == 0) {
      area.scrollLeft += scrollVal + 16;
    } else {
      if (area.scrollWidth - area.offsetWidth - area.scrollLeft > scrollVal) {
        area.scrollLeft =
          Math.ceil(area.scrollLeft / (scrollVal + 16)) * (scrollVal + 16);
      }
    }
  } else if (direction == "back") {
    if (Math.floor(area.scrollLeft) % (scrollVal + 16) == 0) {
      area.scrollLeft -= scrollVal + 16;
    } else {
      area.scrollLeft =
        (Math.ceil(area.scrollLeft / (scrollVal + 16)) - 1) * (scrollVal + 16);
    }
  }
}

window.addEventListener(
  "click",
  (event) => {
    let area = mainSlide.querySelector(".slide-show");
    for (let k = 2; k < nextField.children.length; k++) {
      if (event.target.closest(".nextCard") == nextField.children[k]) {
        console.log(nextField.children[k]);
        console.log(k);
        if (k >= nextField.children.length - 5) {
          trendPage += 1;
          fetchTrend(trendPage);
        }
        mainCount = k - 3;
        for (let step = 0; step <= mainCount + 3; step++) {
          // Runs 5 times, with values of step 0 through 4.
          console.log(step);
          nextField.children[step].style.display = "none";
          nextField.children[step + 1].style.backgroundColor =
            "rgb(0, 86, 184)";
          nextField.children[step + 1].style.transform = "scale(1.1)";
          nextField.children[step + 1].style.zIndex = "10";
        }

        goal =
          area.children[counter - 2].offsetLeft -
          area.offsetWidth * (counter - 3) -
          8;
        console.log(goal);

        area.scrollLeft = (mainCount + 1) * area.offsetWidth;
        mainCount += 2;
      }
    }
  },
  true
);
// scroll;

fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&query=jaws&page=1&include_adult=false&append_to_response=videos,images`
).then((res) => {
  console.log(res.json());
});

function fetchTrend(page) {
  console.log(page);
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=5e060480a887e5981aa743bc33a74e40&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=7&with_keywords=avengers&with_watch_monetization_types=flatrate`
  )
    .then((res) => res.json())
    .then((res) =>
      res.results.filter(
        (res) =>
          res.original_language === "en" ||
          res.original_language === "ar" ||
          res.original_language === "ja"
      )
    )
    .then((res) => {
      plotSlides(res, mainSlide);
    });
}

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&region=us"
).then((res) => console.log(res.json()));

let autoScroll = setInterval(() => {
  if (autoslide) {
    // scrollSlide2("next", mainSlide.querySelector(".slide-show"));
    // scrollSlide("next", mainSlide.querySelector(".slide-show"));
  }
}, 3500);

mainSlide.addEventListener("mouseenter", () => {
  clearInterval(autoScroll);
  autoslide = false;
});
mainSlide.addEventListener("mouseleave", () => {
  autoslide = true;
  autoScroll = setInterval(() => {
    if (autoslide) {
      scrollSlide2("next", mainSlide.querySelector(".slide-show"));
      // scrollSlide("next", mainSlide.querySelector(".slide-show"));
    }
  }, 3500);
});

window.addEventListener(
  "resize",
  () => {
    let area = mainSlide.querySelector(".slide-show");

    console.log("it is moving");
    setTimeout(() => {
      area.scrollLeft =
        Math.round(area.scrollLeft / area.offsetWidth) * area.offsetWidth;
      // for (let bag of area.children) {
      //   bag.style.transform = `translateX(-${
      //     (counter - 2) * area.clientWidth
      //   }px)`;
      // }
      // for (let h of document.querySelectorAll(".card")) {
      //   // console.log(h);
      //   if (h.closest(".slide-dad").id !== "rec") {
      //     h.style.transform = `translateX(0px)`;
      //   }
      // }
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
  }

  try {
    let dad = event.target.closest(".slide-dad");
    let uncle = dad.querySelector(".slide-show");
    let book = card.querySelector(".bookMark");

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

    if (card.classList.contains("viewdCard")) {
      for (let i of document.querySelectorAll(".bookmark")) {
        i.classList.toggle("bookMarkSee");
      }

      console.log(event.target.closest(".card").getAttribute("type"));

      card.classList.toggle("viewdCard");
      card.querySelector(".over-view").style.height = null;
      card.querySelector("img").style.filter = null;
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

      // book.classList.toggle("bookMarkSee");

      card.classList.toggle("viewdCard");
      card.querySelector(".over-view").style.height = "fit-content";
      card.querySelector("img").style.filter = "blur(0px)";

      let mesure1 = Math.floor(card.offsetLeft - uncle.scrollLeft + 11);
      let mesure2 = uncle.clientWidth - card.offsetWidth;
      console.log(mesure1 >= mesure2);
      if (mesure1 >= mesure2 && dad.id !== "rec") {
        setTimeout(() => {
          uncle.scrollLeft += card.offsetWidth / 2 + 11;
        }, 400);
      }
    }
  } catch {}
}

// function openMovie(card, dataType, go) {
//   let meta = { id: card, type: dataType };
//   console.log(meta + "is meta");
//   allLinks.links.push(meta);
//   localStorage.setItem("tabs", JSON.stringify(allLinks));

//   // console.log(localStorage.getItem("tabs"));
//   if (go !== 2 && go !== 1) {
//     console.log("not touch");
//     window.open("/pages/movie1.html", "_blank");
//   }
// }

function stopShit(event) {
  let unit = event.target.closest(".card");
  console.log(event.target);
  if (["LI", "BUTTON", "UL"].includes(event.target.nodeName)) {
    event.preventDefault();
    console.log("stoop nav");
  }
  if (unit.classList.contains("viewdCard")) {
    if (isTouch && unit.closest(".slide-dad").id == "rec") {
      event.preventDefault();
    }
    if (unit.closest(".slide-dad").id !== "rec") {
      event.preventDefault();
    }
  } else {
    for (let i of unit.children) {
      i.classList.remove("bookMarkSee");
    }
  }
  console.log(!unit.classList.contains("viewdCard"));
  console.log("this is link");
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

// menuClose.addEventListener("click", () => {
//   navBar.classList.toggle("showNav");
// });

let keepScroll = true;

const action2 = action1((ele) => {
  let card = ele.querySelector(".card");
  let scrollVal = card.offsetWidth;
  console.log(scrollVal + "...." + ele.scrollLeft);
  ele.parentNode.querySelector(".next").style.opacity = null;
  ele.parentNode.querySelector(".back").style.opacity = null;

  if (Math.floor(ele.scrollLeft) % (scrollVal + 16) == 0) {
  } else {
    if (ele.parentNode.id == "rec") {
    } else {
      ele.scrollLeft =
        Math.round(Math.floor(ele.scrollLeft) / (scrollVal + 16)) *
        (scrollVal + 16);
      // keepScroll = false;
      console.log(keepScroll);
    }
  }
});
document.querySelectorAll(".slide-show").forEach((ele) => {
  console.log(ele);
  ele.addEventListener("scroll", (event) => {
    action2(ele);
    console.log(trueScroll);
    if (trueScroll && ele.parentNode.id !== "rec") {
      ele.parentNode.querySelector(".next").style.opacity = "0";
      ele.parentNode.querySelector(".back").style.opacity = "0";
    }
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
