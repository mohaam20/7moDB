const searchBar = document.querySelector("#search_area");
const resTemp = document.querySelector(".result_temp").content;
console.log(resTemp);
const ressTemp = document.querySelector(".results");
const movieCard = document.querySelector(".card-temp");
const items = document.querySelector(".slide-show");
const filter = document.querySelector(".filterOpt");
const menuOpen = document.querySelector(".burger");
const navBar = document.querySelector(".menu");
const laters = document.querySelector("#watchLater");
const seens = document.querySelector("#seen");
const customs = document.querySelector("#customLists");
const listForm = document.querySelector("#createList");
const newListTitle = document.querySelector("#listTitle");
const newListDesk = document.querySelector("#listDesk");
const dropListTemp = document.querySelector(".dropTemplate");

console.log(seens);
document.querySelectorAll(".filterOpt").forEach((select) => {
  select.addEventListener("change", (event) => {
    event.preventDefault();
    console.log("mama");
    console.log(select.value);
    console.log(select.closest(".slide-dad").querySelector(".slide-show"));
    for (let i of select.closest(".slide-dad").querySelector(".slide-show")
      .children) {
      console.log(i);
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
});

window.addEventListener("load", () => {
  console.log(location.hash);
  if (location.hash.length == 0) {
    document.querySelector("#watchLater").classList.add("slide-dad-show");
  }
  document.querySelector(`${location.hash}`).classList.add("slide-dad-show");
  switch (location.hash) {
    case "#watchLater":
      document.querySelector("#watchList").classList.add("listActive");
      break;
    case "#seen":
      document.querySelector("#watched").classList.add("listActive");
      break;
  }
  if (location.hash == "#watchLater") {
    document.querySelector("#watchList").classList.add("listActive");
  }
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
if (isTouch) {
  menuOpen.innerHTML = '<i class="fa-solid fa-bars">';
} else {
  menuOpen.innerHTML = '<i class="fa-solid fa-bars"> </i>menu';
}
let allLinks = JSON.parse(localStorage.getItem("tabs")) || { links: [] };
localStorage.setItem("tabs", JSON.stringify(allLinks));
let letDrage = true;
let latersList = JSON.parse(localStorage.getItem("favs")) || { laters: [] };
let allSeen = JSON.parse(localStorage.getItem("watched")) || { seen: [] };
let yours = JSON.parse(localStorage.getItem("customs")) || {};
if (allLinks.links.length > 100) {
  JSON.parse(localStorage.setItem("tabs", JSON.stringify({ links: [] })));
}

window.addEventListener("pointerdown", (event) => {
  console.log(event.target);
  if (event.target.className !== "arrange") {
    letDrage = false;
  } else {
    letDrage = true;
  }
});
//search start
window.addEventListener(
  "click",
  (event) => {
    console.log(event.target);
    if (
      event.target.closest(".card") &&
      event.target.closest(".card").dataset.navto == "true"
    ) {
    } else {
      for (let i of document.querySelectorAll(".card")) {
        console.log(i.dataset.navto);
        console.log(i);
        i.setAttribute("data-navto", false);
      }
    }

    if (event.target !== menuOpen && !navBar.contains(event.target)) {
      navBar.classList.remove("showNav");
      if (isTouch) {
        menuOpen.innerHTML = '<i class="fa-solid fa-bars"><i>';
      } else {
        menuOpen.innerHTML = '<i class="fa-solid fa-bars"></i> menu';
      }
    }
    if (
      event.target.className == "showList" &&
      event.target.closest(".dropTitle")
    ) {
      event.target.closest(".dropList").classList.toggle("dropShow");
      if (
        event.target.closest(".dropList").getAttribute("draggable") == "true"
      ) {
        event.target.closest(".dropList").setAttribute("draggable", "false");
      } else {
        event.target.closest(".dropList").setAttribute("draggable", "true");
      }
      console.log("open this");
      console.log(event.target.closest(".dropList").getAttribute("draggable"));
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

// function searchResults(movies) {
//   ressTemp.innerHTML = "";
//   movies.sort((a, b) => {
//     let numa = Math.round(a.vote_average * a.popularity, 3);
//     let numb = Math.round(b.vote_average * b.popularity, 3);
//     // console.log(a.title ?? a.original_name);
//     return numb - numa;
//   });
//   movies = movies.slice(0, 7);

//   for (let movie of movies) {
//     let poster = movie.poster_path;
//     let title = movie.original_name ?? movie.original_title;
//     let date = movie.release_date ?? movie.first_air_date;
//     let card = resTemp.cloneNode(true).querySelector("li");
//     // console.log(movie.popularity + " " + title);
//     card.id = movie.id;
//     card.setAttribute("type", movie.title == null ? "tv" : "movie");
//     card.querySelector("img").src = `https://image.tmdb.org/t/p/w92/${poster}`;
//     card.querySelector(".res_title").innerHTML =
//       `<p style=" display:inline; font-size:1.2rem;">${title}<p/>` +
//       " " +
//       `<p style="color:#F1EEE9; display:inline;">${date.slice(0, 4)}<p/>` +
//       `<p style="color:rgb(255, 208, 0); display:inline;">${
//         movie.title == null ? "tv-show" : "movie"
//       }<p/>`;

//     if (card.querySelector("img").complete & (poster != null)) {
//       ressTemp.style.display = "block";
//       ressTemp.append(card);
//     }
//   }
// }

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

//search end

listForm.addEventListener("submit", (event) => {
  event.preventDefault();
  yours = JSON.parse(localStorage.getItem("customs")) || {};
  let strr = newListTitle.value.replaceAll(" ", "_");
  console.log(strr);
  console.log(yours);
  console.log(event.target);
  if (yours.hasOwnProperty(`${strr}`) || newListTitle.value.length == 0) {
    console.log("that is illegal");
  } else {
    yours[strr] = {
      title: newListTitle.value,
      det: newListDesk.value,
      content: [],
    };
  }
  let bag = dropListTemp.content.querySelector(".dropList").cloneNode(true);
  bag.id = strr;
  bag.querySelector(".slide-title").innerText = newListTitle.value;
  bag.querySelector(".listdeskOut").innerText = ": " + newListDesk.value;
  bag.setAttribute("data-index", customs.children.length - 3);
  if (newListDesk.value.length == 0) {
    bag.querySelector(".listdeskOut").innerText = "";
  }

  let exist;
  for (let i of customs.children) {
    console.log(i);
    if (
      i.querySelector(".dropTitle .slide-title") &&
      i.querySelector(".dropTitle .slide-title").textContent.toLowerCase() ==
        newListTitle.value.toLowerCase()
    ) {
      console.log("doo");
      exist = true;
    }
  }
  if (exist) {
    alert("the list allready exist");
  }
  if (newListTitle.value.length !== 0 && !exist) {
    customs.append(bag);

    localStorage.setItem("customs", JSON.stringify(yours));
  }

  console.log(exist);
  console.log(yours);
  console.log(newListTitle.value);
  console.log(newListDesk.value);
  console.log("new list should appear");
});
console.log(customs.childNodes);
const isBelowThreshold = (currentValue) => currentValue.length < 40;

const array1 = [1, 30, 39, 29, 10, 13];

// console.log(
//   customs.childNodes.every((e) => {
//     e.length > 1;
//   })
// );

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
  getWatch(element.type, element.id, laters);
});
console.log(allSeen);

allSeen.seen.forEach((element) => {
  getWatch(element.type, element.id, seens);
});

console.log(yours);

let nums = Object.keys(yours);
let users = Object.entries(yours);
console.log(users);

users.sort((a, b) => {
  return a[1]["indo"] - b[1]["indo"];
});
console.log(users);

for (let i of users) {
  console.log(i[1]["indo"]);
}

let listYours = [];
for (let i in yours) {
  let bag = dropListTemp.content.querySelector(".dropList").cloneNode(true);
  bag.id = i;
  if (!yours[i].indo) {
    yours[i].indo = nums.indexOf(i);
  } else {
    bag.setAttribute("data-index", yours[i].indo);
  }
  bag.querySelector(".slide-title").innerText = yours[i].title;
  bag.querySelector(".listdeskOut").innerText = ": " + yours[i].det;
  console.log(nums.indexOf(i));
  localStorage.setItem("customs", JSON.stringify(yours));
  console.log(yours[i]);
  if (yours[i].det.length == 0) {
    bag.querySelector(".listdeskOut").innerText = "";
  }
  listYours.push(bag);
  // console.log(bag.querySelector(".slide-show"));
  let packs = yours[i].content;
  for (let h of packs) {
    // console.log(h);
    // console.log(bag);
    getWatch(h.type, h.id, bag);
  }

  bag.querySelector(".dropTitle").style.backgroundImage =
    baseDrop + console.log(bag.querySelector(".dropTitle"));
  console.log(packs);
}

console.log(listYours);
listYours.sort((a, b) => {
  return a.dataset.index - b.dataset.index;
});
for (let g of listYours) {
  customs.append(g);
}

console.log(yours);

document.querySelector("#customLists").childNodes.forEach((ele) => {
  if (ele.nodeName == "DIV") {
    console.log(ele);
    ele.querySelector(".filterOpt").addEventListener("change", (event) => {
      console.log(event.target);
      console.log(ele.querySelector(".slide-show"));
      for (let i of ele.querySelector(".slide-show").children) {
        console.log(i);
        if (
          i.getAttribute("type") == event.target.value &&
          i.className !== "filter"
        ) {
          i.style.display = null;
        } else if (i.className !== "filter") {
          i.style.display = "none";
        }
        if (event.target.value == "all") {
          i.style.display = null;
        }
      }
    });
  }
});

async function getWatch(videoType, dataId, block) {
  let raw = await fetch(
    `https://api.themoviedb.org/3/${videoType}/${dataId}?api_key=5e060480a887e5981aa743bc33a74e40&language=en-US&append_to_response=reviews,videos,credits,similar,external_ids`
  ).then((res) => res.json());
  // console.log(raw);
  // console.log(block);
  if (block.querySelector(".wall")) {
    block.querySelector(".wall").src = `${baseDrop + raw.backdrop_path}`;
  }
  plotSlides(raw, block);
}

function plotSlides(trend, block) {
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
  card.querySelector(".card").href = `/pages/movie1.html#${trend.id}-${
    trend.title == null ? "tv" : "movie"
  }`;
  // card.querySelector(
  //   ".infos"
  // ).innerHTML += `<button class="more"">more...</button>`;
  if (poster != null) {
    block.querySelector(".slide-show").append(card);
  }
}

window.addEventListener("pointerup", appendLink, false);
window.addEventListener("pointerup", endFav, false);

function appendLink(event) {
  // for (let y of document.querySelectorAll(".card")) {
  //   y.classList.remove("viewdCard");
  // }
  if (event.target.className == "list") {
    for (let i of document.querySelectorAll(".list")) {
      i.classList.remove("listActive");
    }
    event.target.classList.add("listActive");
  }
  if (event.target.id == "watchList") {
    console.log("deff");
    location.hash = "watchLater";
    location.reload();
    // document.querySelector("#watchLater").classList.add("slide-dad-show");
    // document.querySelector("#seen").classList.remove("slide-dad-show");
    // document.querySelector("#customLists").classList.remove("slide-dad-show");
  } else if (event.target.id == "watched") {
    location.hash = "seen";
    location.reload();

    // document.querySelector("#seen").classList.add("slide-dad-show");
    // document.querySelector("#watchLater").classList.remove("slide-dad-show");
    // document.querySelector("#customLists").classList.remove("slide-dad-show");
  } else if (event.target.id == "yourList") {
    location.hash = "customLists";
    location.reload();

    // document.querySelector("#customLists").classList.add("slide-dad-show");
    // document.querySelector("#watchLater").classList.remove("slide-dad-show");
    // document.querySelector("#seen").classList.remove("slide-dad-show");
  }
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

  // console.log(card);
  // console.log(gage + "gage");
  // console.log(
  //   Math.round(
  //     card.getBoundingClientRect().left - dad.getBoundingClientRect().left - 8
  //   )
  // );

  console.log(event.target);
  try {
    openMovie(
      event.target.closest(".card").id,
      event.target.closest(".card").getAttribute("type"),
      event.button
    );
  } catch {}
}

// function openMovie(card, dataType, go) {
//   let meta = { id: card, type: dataType };
//   console.log(meta + "is meta");
//   allLinks.links.push(meta);

//   localStorage.setItem("tabs", JSON.stringify(allLinks));

//   // console.log(localStorage.getItem("tabs"));
//   console.log(meta.id + meta.type + " inner");
//   if (go !== 2 && go !== 1) {
//     console.log("not touch");
//     sessionStorage.setItem("count", 0);
//     window.open("movie1.html", "_blank");
//   }
//   console.log(JSON.parse(localStorage.getItem("tabs")).links);
// }

function stopShit(event) {
  let unit = event.target.closest("a");
  console.log(unit);
  if (isTouch) {
    if (unit.dataset.navto && unit.dataset.navto == "true") {
      console.log("won't open");
    } else {
      event.preventDefault();
      unit.setAttribute("data-navto", true);
    }
  }
  // console.log(!unit.classList.contains("viewdCard"));
  console.log("this is link");
}

function endFav(event) {
  if (event.target.className == "delList") {
    yours = JSON.parse(localStorage.getItem("customs")) || {};
    if (confirm("you will delete " + event.target.closest(".dropList").id)) {
      event.target.closest(".dropList").remove();
      delete yours[event.target.closest(".dropList").id];
      localStorage.setItem("customs", JSON.stringify(yours));
    }

    return;
  }
  let card = event.target.closest(".card");
  console.log(event.target.className);
  if (event.target.className == "endFav") {
    let dad = event.target.closest(".slide-dad");
    console.log(typeof card.id);
    card.style.display = "none";
    if (dad.id == "watchLater") {
      for (let i of unique) {
        if (i.id == card.id) {
          unique.splice(unique.indexOf(i), 1);
        }
      }

      localStorage.setItem("favs", JSON.stringify({ laters: unique }));
    } else if (dad.id == "seen") {
      for (let i of allSeen.seen) {
        if (i.id == card.id) {
          allSeen.seen.splice(allSeen.seen.indexOf(i), 1);
        }
      }
      localStorage.setItem("watched", JSON.stringify({ seen: allSeen.seen }));
    } else if (dad.id == "customLists") {
      yours = JSON.parse(localStorage.getItem("customs")) || {};
      let cardParent = card.closest(".dropList").id;
      console.log(yours[cardParent].content);
      for (let k of yours[cardParent].content) {
        if (k.id == card.id) {
          yours[cardParent].content.splice(
            yours[cardParent].content.indexOf(k),
            1
          );
        }
      }
      localStorage.setItem("customs", JSON.stringify(yours));
    }
    if (card) {
      card.remove();
    }
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

navBar.addEventListener("click", (event) => {
  if (event.target.nodeName == "A") {
    location.hash = event.target.hash;
    location.reload();
  }
});

let index1;
let index2;
document.querySelectorAll(".dropList").forEach((ele) => {
  console.log(ele);
  console.log(ele.querySelector("img"));

  ele.addEventListener(
    "dragstart",
    (event) => {
      if (!letDrage) {
        // event.preventDefault();
      }
      console.log(event.target);
      console.log(Array.from(customs.children).indexOf(event.target));
      index1 = Array.from(customs.children).indexOf(event.target);
      console.log(ele);
      // ele.style.opacity = "0.8";
    },
    true
  );

  ele.addEventListener("dragover", (event) => {
    event.preventDefault();
    ele.style.filter = "brightness(2)";
    ele.style.transform = "scale(0.98)";
  });

  ele.addEventListener("dragenter", (event) => {
    // ele.style.opacity = "0.5";
    console.log(event.target);
    if (event.target.className == "arrange") {
      console.log("77777777");
    } else {
      event.preventDefault();
    }
    ele.style.filter = "brightness(2)";
    ele.style.transform = "scale(0.98)";
  });
  ele.addEventListener("dragleave", (event) => {
    ele.style.opacity = null;
    ele.style.filter = null;
    ele.style.transform = null;
  });

  ele.addEventListener(
    "drop",
    (event) => {
      event.stopPropagation(); // stops the browser from redirecting.
      // console.log(this);
      ele.style.filter = null;
      ele.style.transform = null;
      console.log(+event.target.closest(".dropList").dataset.index);
      console.log(event.target.closest(".dropList"));
      console.log(
        Array.from(customs.children).indexOf(event.target.closest(".dropList"))
      );
      index2 = Array.from(customs.children).indexOf(
        event.target.closest(".dropList")
      );
      console.log(index1);
      console.log(index2);
      console.log(customs.children[+index1]);

      if (index1 > index2) {
        for (let y of customs.children) {
          let pos = +y.dataset.index;
          if (pos < index1 - 3 && pos >= index2 - 3) {
            y.setAttribute("data-index", pos + 1);
          }
        }
        customs.children[index1].setAttribute("data-index", index2 - 3);
        customs.insertBefore(
          customs.children[index1],
          customs.children[index2]
        );
      } else {
        for (let y of customs.children) {
          let pos = +y.dataset.index;
          if (pos <= index2 - 3 && pos > index1 - 3) {
            y.setAttribute("data-index", pos - 1);
          }
        }
        customs.children[index1].setAttribute("data-index", index2 - 3);
        customs.insertBefore(
          customs.children[index1],
          customs.children[index2 + 1]
        );
      }
      arrLists();
    },
    true
  );
});

window.addEventListener("touchmove", (event) => {
  console.log(event.target);
});

function arrLists() {
  yours = JSON.parse(localStorage.getItem("customs")) || {};
  for (let i in yours) {
    for (let o of Array.from(customs.children)) {
      if (o.id == i) {
        console.log(o);
        console.log(yours[i].indo);
        console.log(o.dataset.index);
        yours[i].indo = o.dataset.index;
        console.log(yours[i].indo);
        console.log(o.dataset.index);
        // break;
      }
    }
  }
  localStorage.setItem("customs", JSON.stringify(yours));
}
