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
// Dom Elements

// refrence constats
let counter = 2;
let trendPage = 1;
nextField.children[1].style.display = "none";
let baseImg = "http://image.tmdb.org/t/p/original/";
// refrence constats

addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&region=us"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      showTrending(res, topSlide);
    });
  fetch(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&region=us"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      showTrending(res, top2Slide);
    });
  fetch(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&with_original_language=ja&page=1"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      showTrending(res, top3Slide);
    });
  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=5e060480a887e5981aa743bc33a74e40"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      showTrending(res, slide1);
    });
  fetch(
    "https://api.themoviedb.org/3/trending/tv/day?api_key=5e060480a887e5981aa743bc33a74e40"
  )
    .then((res) => res.json())
    .then((res) => res.results)
    .then((res) => {
      // console.log(res);
      showTrending(res, slide2);
    });
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
      showTrending(res, mainSlide);
    });
});

// search

window.addEventListener(
  "click",
  (event) => {
    if (ressTemp !== event.target && !ressTemp.contains(event.target)) {
      ressTemp.innerHTML = null;
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
                res.original_language == "en" || res.original_language == "ar"
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
                res.original_language == "en" || res.original_language == "ar"
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
          showMovies(res);
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
    if (event.target.id == "search_area" && searchBar.value.length !== 0) {
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
                res.original_language == "en" || res.original_language == "ar"
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
                re.original_language == "en" || re.original_language == "ar"
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
          showMovies(res);
        })
        .then((allResult = []), (allUnsorted = []));
    }
  },
  false
);

function showMovies(movies) {
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
    card.querySelector("img").src = `${baseImg}${poster}`;
    card.querySelector(".res_title").innerHTML =
      `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
      " " +
      `<p style="color:#F1EEE9; display:inline;">${date.slice(0, 4)}<p/>` +
      `<p style="color:red; display:inline;">${
        movie.title == null ? "tv-show" : "movie"
      }<p/>`;

    if (card.querySelector("img").complete & (poster != null)) {
      ressTemp.append(card);
    }
  }
}
//search

//scroll

function showTrending(trends, slideName) {
  // trends = trends.slice(0, 7);
  for (let trend of trends) {
    let poster = trend.poster_path;
    let backDrop = trend.backdrop_path;
    let title = trend.original_name ?? trend.title;
    let date = trend.release_date ?? trend.first_air_date;
    let detial = trend.overview;
    let card = movieCard.content.cloneNode(true);
    card.id = trend.id;
    if (slideName.id == "rec") {
      let nextCard = slideName
        .querySelector(".nextTemp")
        .content.cloneNode(true);
      let nextCont = slideName.querySelector(".next-rec");
      nextCard.querySelector("img").src = `${baseImg}${poster}`;
      nextCard.querySelector("h4").innerHTML = `${title}`;
      nextCard.querySelector("p").innerHTML = `${date}`;
      card.querySelector("img").src = `${baseImg}${backDrop || poster}`;
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
      }
    } else {
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
      card.querySelector(
        ".infos"
      ).innerHTML += `<button class="more"">more...</button>`;
      if (poster != null) {
        slideName.querySelector(".slide-show").append(card);
      }
    }
  }
}

document.addEventListener(
  "click",
  (event) => {
    let area = event.target.parentNode.querySelector(".slide-show");
    // console.log(area);
    let direction = event.target.className;
    scrollSlide(direction, area);
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

    // if (set.id == "movieTrends" || set.id == "tvTrends") {
    //   area.scrollLeft += scrollVal * 4 + 77;
    // } else if (set.id == "rec") {
    //   console.log("captin");
    //   area.scrollLeft += scrollVal + 19;
    // }
  } else if (direction == "back" && counter > 2) {
    if (nextField.children[counter].className == "nextCard") {
      nextField.children[counter].style.display = "flex";
      nextField.children[counter + 1].style.backgroundColor = null;
      nextField.children[counter + 1].style.transform = "scale(1)";
      nextField.children[counter + 1].style.zIndex = 4;
    }
    counter -= 1;

    let statu =
      parseInt(area.children[1].style.transform.replace(/\D/g, "")) || 0;
    console.log(statu);
    if (statu == maxScroll) {
      for (let bag of area.children) {
        bag.style.transform = `translateX(0)`;
      }
    } else {
      for (let bag of area.children) {
        bag.style.transform = `translateX(-${statu - area.clientWidth}px)`;
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
      console.log(res);
      showTrending(res, mainSlide);
    });
}

async function imdb() {
  const fetching = await fetch(
    "https://api.themoviedb.org/3/find/tt0111161?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&external_source=imdb_id"
  );
  const list = await fetching.json();
  console.log(list);
}

imdb();

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&page=1&region=us"
).then((res) => console.log(res.json()));

setInterval(() => {
  mainSlide.querySelector(".next").click();
}, 4000);
