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
let allFav = JSON.parse(localStorage.getItem("favs")) || { laters: [] };
localStorage.setItem("favs", JSON.stringify(allFav));

let allLinks = JSON.parse(localStorage.getItem("tabs")) || { links: [] };
localStorage.setItem("tabs", JSON.stringify(allLinks));
if (allLinks.links.length > 100) {
  JSON.parse(localStorage.setItem("tabs", JSON.stringify({ links: [] })));
}

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
let autoslide = true;
let counter = 2;
let trendPage = 1;
nextField.children[1].style.display = "none";
let baseImg = "http://image.tmdb.org/t/p/w342/";
let baseDrop = "http://image.tmdb.org/t/p/w1280/";
// refrence constats

addEventListener("load", () => {
  // localStorage.clear();
  sessionStorage.clear();

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=5e060480a887e5981aa743bc33a74e40&sort_by=release_date.desc&include_adult=false&include_video=false&page=${trendPage}&vote_average.gte=7&with_keywords=avengers&with_watch_monetization_types=flatrate`
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
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&region=us"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        plotSlides(res, topSlide);
      });
  }, 500);
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&with_original_language=en|ar&page=1&region=us"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        plotSlides(res, top2Slide);
      });
  }, 1000);
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&with_original_language=ja&page=1"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        plotSlides(res, top3Slide);
      });
  }, 1500);
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=5e060480a887e5981aa743bc33a74e40"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        plotSlides(res, slide1);
      });
  }, 2000);
  setTimeout(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=5e060480a887e5981aa743bc33a74e40"
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((res) => {
        // console.log(res);
        plotSlides(res, slide2);
      });
  }, 2500);
});

// search

window.addEventListener(
  "click",
  (event) => {
    console.log(event.target.className);
    if (event.target.className == "bookMark") {
      let movie = {
        id: event.target.parentNode.id,
        type: event.target.parentNode.getAttribute("type"),
      };
      console.log(movie);
    }
    if (ressTemp !== event.target && !ressTemp.contains(event.target)) {
      ressTemp.innerHTML = null;
    }
    if (ressTemp.children.length == 0) {
      ressTemp.style.display = "none";
    }
    if (event.target.id == "search_area" && searchBar.value.length !== 0) {
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
                res.original_language == "ja"
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
                res.original_language == "ja"
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
                res.original_language == "ja"
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
                res.original_language == "ja"
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
    console.log(movie);
    let poster = movie.poster_path;
    let title = movie.original_name ?? movie.original_title;
    let date = movie.release_date ?? movie.first_air_date;
    let card = resTemp.cloneNode(true).querySelector("li");
    card.id = movie.id;
    card.setAttribute("type", movie.title == null ? "tv" : "movie");

    // console.log(movie.popularity + " " + title);
    card.querySelector("img").src = ` https://image.tmdb.org/t/p/w92/${poster}`;
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
      card
        .querySelector(".card")
        .setAttribute("type", trend.title == null ? "Tv" : "movie");

      nextCard.querySelector("img").src = `${baseImg}${poster}`;
      nextCard.querySelector("h4").innerHTML = `${title}`;
      nextCard.querySelector("p").innerHTML = `${date}`;
      card.querySelector("img").src = `${baseDrop}${backDrop || poster}`;
      card
        .querySelector(".posterTitle")
        .querySelector("img").src = `${baseImg}${poster}`;
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
      card
        .querySelector(".card")
        .setAttribute("type", trend.title == null ? "tv" : "movie");
      card.querySelector("img").src = `${baseImg}${poster}`;
      for (let i of allFav.laters) {
        if (i.id == trend.id) {
          card.querySelector(".fa-bookmark").classList.add("bookMarkDone");
          card.querySelector(".bookMarkPlus").innerHTML =
            '<i class="fa-solid fa-check"></i>';
          break;
        }
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
    if (set.id == "rec") {
      counter += 1;
    }
    let statu =
      parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
    // console.log(statu);
    // console.log(maxScroll);
    if (statu > maxScroll - scrollVal * 3) {
      console.log("stared");
      trendPage += 1;
      fetchTrend(trendPage);
      if (isTouch) {
        console.log("should moveeeee");
        console.log(statu - 1000 * trendPage);
        for (let bag of area.children) {
          console.log(bag);
          bag.style.transform = `translateX(${statu - 4}px)`;
        }
      }
    }
    statu = parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
    if (nextField.children[counter].className == "nextCard") {
      nextField.children[counter].style.display = "none";
      nextField.children[counter + 1].style.backgroundColor = "rgb(0, 86, 184)";
      nextField.children[counter + 1].style.transform = "scale(1.1)";
      nextField.children[counter + 1].style.zIndex = "10";
    }

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
    console.log(counter + " this is counter");
    if (nextField.children[counter].className == "nextCard" && counter > 2) {
      nextField.children[counter].style.display = "flex";
      nextField.children[counter + 1].style.backgroundColor = null;
      nextField.children[counter + 1].style.transform = "scale(1)";
      nextField.children[counter + 1].style.zIndex = 4;
      counter -= 1;
    }

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

function newScroller(area) {
  let key = area.id;
  scrollVals[key] += 1;
  let kids = area.querySelector(".slide-show").children;
  console.log(scrollVals[key]);
  kids[scrollVals[key]].scrollIntoView({ block: "end", inline: "nearest" });
}

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

mainSlide.addEventListener("mouseenter", () => {
  autoslide = false;
});
mainSlide.addEventListener("mouseleave", () => {
  autoslide = true;
});

const autoScroll = setInterval(() => {
  if (autoslide) {
    let area = mainSlide.querySelector(".slide-show");
    let card = mainSlide.querySelector(".card");
    let scrollVal = card.scrollWidth;
    let maxScroll = area.scrollWidth - area.clientWidth;
    counter += 1;

    let statu =
      parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
    // console.log(statu);
    // console.log(maxScroll);
    if (statu > maxScroll - scrollVal * 3) {
      console.log("stared");
      trendPage += 1;
      fetchTrend(trendPage);
    }
    if (nextField.children[counter].className == "nextCard") {
      nextField.children[counter].style.display = "none";
      nextField.children[counter + 1].style.backgroundColor = "rgb(0, 86, 184)";
      nextField.children[counter + 1].style.transform = "scale(1.1)";
      nextField.children[counter + 1].style.zIndex = "10";
    }

    if (statu < maxScroll) {
      for (let bag of area.children) {
        bag.style.transform = `translateX(-${statu + area.clientWidth}px)`;
      }
    }
  }
}, 5000);

window.addEventListener(
  "resize",
  () => {
    let area = mainSlide.querySelector(".slide-show");

    console.log("it is moving");
    setTimeout(() => {
      for (let bag of area.children) {
        bag.style.transform = `translateX(-${
          (counter - 2) * area.clientWidth
        }px)`;
      }
      for (let h of document.querySelectorAll(".card")) {
        // console.log(h);
        if (h.closest(".slide-dad").id !== "rec") {
          h.style.transform = `translateX(0px)`;
        }
      }
    }, 2000);
  },
  false
);

for (let i of document.querySelectorAll("a")) {
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
    // console.log(event.type);
    // console.log(event.button);
    // console.log(event.target.closest(".result"));
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
    console.log(card);

    let statu =
      parseInt(uncle.children[1].style.transform.replace(/\D/g, "")) || 0;
    // console.log(card);
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
      console.log(event.target);
      openMovie(
        event.target.closest(".card").id,
        event.target.closest(".card").getAttribute("type"),
        1
      );
      if (card.classList.contains("viewdCard")) {
        book.classList.toggle("bookMarkSee");

        openMovie(
          event.target.closest(".card").id,
          event.target.closest(".card").getAttribute("type"),
          event.button
        );
        console.log(event.target.closest(".card").getAttribute("type"));

        card.classList.toggle("viewdCard");
        card.querySelector(".over-view").style.height = null;
        card.querySelector("img").style.filter = null;
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
  console.log(meta + "is meta");
  allLinks.links.push(meta);
  localStorage.setItem("tabs", JSON.stringify(allLinks));

  // console.log(localStorage.getItem("tabs"));
  if (go !== 2 && go !== 1) {
    console.log("not touch");
    window.open("/pages/movie1.html", "_blank");
  }
}

function stopShit(event) {
  event.preventDefault();
  console.log("this is link");
}

// document.addEventListener("long-press", function () {
//   console.log("fire me");
// });

function addFav(meta, kind) {
  console.log("add one");
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

// menuClose.addEventListener("click", () => {
//   navBar.classList.toggle("showNav");
// });
