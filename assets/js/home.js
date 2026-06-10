/*
steps to add a year:
1. create a itin-${year}.js file and add dates. Location must always be present but all others are optional
2. add itin${year} to itinAll below
3. add corresponding html elements to index.html
*/

const { $ } = window;

// gather all objects in an array (objects are imported at the bottom of the html where the scripts live)
const itinAll = [
  itin2017,
  itin2018,
  itin2019,
  itin2020,
  itin2021,
  itin2022,
  itin2023,
  itin2024,
  itin2025,
  itin2026
];

const itinYears = itinAll
  .map((itin, index) => ({ year: index + 2017, itin }))
  .filter(({ itin }) => itin.length > 0);

const calendarYear = new Date().getFullYear();
const latestYear = itinYears[itinYears.length - 1].year;
const defaultYear = itinYears.some(({ year }) => year === calendarYear)
  ? calendarYear
  : latestYear;

const itinPhotoBreakpoint = 768;
const itinPhotoOvershootRatio = 1.15;

function getItinPhotos() {
  const photosCol = document.getElementById("itin-photos");
  if (!photosCol) {
    return { photosCol: null, images: [] };
  }
  return { photosCol, images: Array.from(photosCol.querySelectorAll("img")) };
}

function isItinPhotoVisible(img) {
  return window.getComputedStyle(img).display !== "none";
}

function getItinContentHeight(itinEl) {
  const childHeight = Array.from(itinEl.children).reduce(
    (sum, child) => sum + child.getBoundingClientRect().height,
    0
  );
  return Math.max(childHeight, itinEl.scrollHeight);
}

function getPhotosHeightForCount(imageHeights, count) {
  return imageHeights
    .slice(0, count)
    .reduce((sum, height) => sum + height, 0);
}

function getImageBlockHeight(img) {
  const style = window.getComputedStyle(img);
  const marginTop = parseFloat(style.marginTop) || 0;
  const marginBottom = parseFloat(style.marginBottom) || 0;
  return img.getBoundingClientRect().height + marginTop + marginBottom;
}

function resetItinPhotos() {
  const { images } = getItinPhotos();
  images.forEach((img) => {
    img.style.display = "";
  });
}

function applyVisibleImageCount(visibleImages, count) {
  visibleImages.forEach((img, index) => {
    img.style.display = index < count ? "" : "none";
  });
}

function balanceItinPhotos(year) {
  const itinEl = document.getElementById(`itin-${year}`);
  const { images } = getItinPhotos();
  if (!itinEl || images.length === 0) {
    return;
  }

  resetItinPhotos();

  if (window.innerWidth < itinPhotoBreakpoint) {
    return;
  }

  const itinHeight = getItinContentHeight(itinEl);
  const visibleImages = images.filter((img) => isItinPhotoVisible(img));

  if (visibleImages.length === 0 || itinHeight === 0) {
    return;
  }

  const imageHeights = visibleImages.map((img) => getImageBlockHeight(img));
  const maxPhotosHeight = getPhotosHeightForCount(
    imageHeights,
    visibleImages.length
  );
  const maxAllowedPhotosHeight = itinHeight * itinPhotoOvershootRatio;
  let bestCount = visibleImages.length;

  if (maxPhotosHeight > maxAllowedPhotosHeight) {
    bestCount = 1;
    let bestDiff = Infinity;

    for (let count = visibleImages.length; count >= 1; count -= 1) {
      const photosHeight = getPhotosHeightForCount(imageHeights, count);

      if (photosHeight <= maxAllowedPhotosHeight) {
        bestCount = count;
        break;
      }

      const diff = Math.abs(itinHeight - photosHeight);
      if (diff < bestDiff || (diff === bestDiff && count > bestCount)) {
        bestDiff = diff;
        bestCount = count;
      }
    }
  }

  applyVisibleImageCount(visibleImages, bestCount);
}

function balanceItinPhotosWhenReady(year) {
  const { images } = getItinPhotos();
  const pending = images.filter((img) => !img.complete);

  const runBalance = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => balanceItinPhotos(year));
    });
  };

  if (pending.length === 0) {
    runBalance();
    return;
  }

  let loaded = 0;
  pending.forEach((img) => {
    img.addEventListener(
      "load",
      () => {
        loaded += 1;
        if (loaded === pending.length) {
          runBalance();
        }
      },
      { once: true }
    );
    img.addEventListener("error", () => {
      loaded += 1;
      if (loaded === pending.length) {
        runBalance();
      }
    }, { once: true });
  });
}

function showItinYear(year) {
  for (let i = 2010; i <= 2017 + itinAll.length - 1; i += 1) {
    $(`#itin-${i}`).hide();
  }
  $(`#itin-${year}`).show();
  $("#year").html(`${year}`);
  balanceItinPhotosWhenReady(year);
}

function initHeroSlideshow() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length < 2) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === 0);
    });
    return;
  }

  let currentSlide = slides.findIndex((slide) =>
    slide.classList.contains("is-active")
  );
  if (currentSlide < 0) {
    currentSlide = 0;
    slides[0].classList.add("is-active");
  }

  window.setInterval(() => {
    slides[currentSlide].classList.remove("is-active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("is-active");
  }, 6000);
}

// once the document is ready hide korean and display only english
// also hide all other tour dates except the default year
$(function () {
  initHeroSlideshow();
  $(".english").hide();
  $(".korean").hide();
  showItinYear(defaultYear);
  $(`.btn-${defaultYear}`).addClass("active");
});

// fixed or unfixed header depending on where you are in the page
function fixedHeader() {
  $(".navbar-brand").css("font-size", "2rem");
  $(".nav-link").css("font-size", "1rem");
  $(".nav-link").css("margin", "0 2px");
}

function unfixedHeader() {
  $(".navbar-brand").css("font-size", "6rem");
  $(".nav-link").css("font-size", "1.2rem");
  $(".nav-link").css("margin", "0 12px");
}

// fixes glitch where on refresh if you are at the top of the page after the big header, the small header does not show up without scrolling
const myFunction = function () {
  if ($(window).width() > 992) {
    if ($(window).scrollTop() === 0) {
      unfixedHeader();
    } else if ($(window).scrollTop() > 188 && $(window).scrollTop() < 1644) {
      fixedHeader();
    }
  }
};

window.onload = myFunction;

// check for scrolling
$(window).scroll(function () {
  // if width greater than 992
  if ($(window).width() > 992) {
    // if scrolling greater than 188
    if ($(window).scrollTop() >= 188) {
      // change header to smaller font
      fixedHeader();
    } else {
      // change header to larger font
      unfixedHeader();
    }
  }
});

// check for window width resize
$(window).resize(function () {
  // if width is more than 992px
  if ($(window).width() > 992) {
    // change header to larger font
    unfixedHeader();
  } else {
    // change header to smaller font
    fixedHeader();
  }
});

// on button click, alternate between english and korean
$(".eng").click(function () {
  $(".korean").hide();
  $(".english").show();
});

$(".kor").click(function () {
  $(".korean").show();
  $(".english").hide();
});

// when clicking an itinerary button
$(".itin-btn").click(function () {
  const year = parseInt($(this).text(), 10);
  showItinYear(year);

  //remove active class from all buttons
  $(".itin-btn").removeClass("active");
  //add active class to button
  $(this).toggleClass("active");
});

let itinPhotoResizeTimer;
function rebalanceVisibleItinPhotos() {
  const year = parseInt($("#year").text(), 10);
  if (!Number.isNaN(year)) {
    balanceItinPhotosWhenReady(year);
  }
}

$(window).on("resize", function () {
  clearTimeout(itinPhotoResizeTimer);
  itinPhotoResizeTimer = setTimeout(rebalanceVisibleItinPhotos, 150);
});

$(window).on("load", rebalanceVisibleItinPhotos);

// smooth scrolling when clicking on a link
$("a").on("click", function (event) {
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    const { hash } = this;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800,
      function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      }
    );
  } // End if
});

// activate lightbox
$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox({
    wrapping: false,
    loadingMessage: true,
    alwaysShowClose: true,
  });
});

// loop over the itinAll
for (let j = 0; j < itinAll.length; j += 1) {
  // loop over each event in each year
  for (let i = 0; i < itinAll[j].length; i += 1) {
    // create a div tag with event and title
    const div = document.createElement("div");
    div.className = "mb-5";
    let inner = `<p class="event">${itinAll[j][i].event}</p><p class="info"><span class="title">${itinAll[j][i].title}</span>`;

    // append these details if not empty
    if (itinAll[j][i].conductor) {
      inner = `${inner}<br>Conductor: ${itinAll[j][i].conductor}`;
    }
    if (itinAll[j][i].presenter) {
      inner = `${inner}<br>Presenter: ${itinAll[j][i].presenter}`;
    }
    if (itinAll[j][i].venue) {
      inner = `${inner}<br>Venue: ${itinAll[j][i].venue}`;
    }
    if (itinAll[j][i].link) {
      inner = `${inner}<br><a href="${itinAll[j][i].link}" class="details" target="_blank" rel="noopener noreferrer">Details</a>`;
    }

    // append location, because location should not be empty
    inner = `${inner}</p><p>${itinAll[j][i].location}</p>`;

    // store the info for each event inside the div tag
    div.innerHTML = inner;
    // select the year in the HTML and append each new event to the year

    //if the 3rd year (meaning 2020, select 2020 div on page and append dates to it)
    if (j >= 3) {
      document.querySelector(`#itin-20${j + 17}`).appendChild(div);
      //otherwise if still in the 10's, select that div and append dates to it
    } else {
      document.querySelector(`#itin-201${j + 7}`).appendChild(div);
    }
  }
}
