var $ = window.$

// once the document is ready hide korean and display only english
// also hide all other tour dates except 2018
$(function () {
  $('.english').hide()
  $('.korean').hide()
  for (var i = 10; i <= 19; i++) {
    $('#itin-20' + i).hide()
  }
  $('#itin-2018').show()
})

// fixes glitch where on refresh if you are at the top of the page after the big header, the small header does not show up without scrolling
var myFunction = function () {
  if ($(window).width() > 992) {
    if ($(window).scrollTop() === 0) {
      unfixedHeader()
    } else if ($(window).scrollTop() > 188 && $(window).scrollTop() < 1644) {
      fixedHeader()
    }
  }
}

window.onload = myFunction

// fixed or unfixed header depending on where you are in the page
function fixedHeader () {
  $('.navbar-brand').css('font-size', '2rem')
  $('.nav-link').css('font-size', '1rem')
  $('.nav-link').css('margin', '0 2px')
}

function unfixedHeader () {
  $('.navbar-brand').css('font-size', '6rem')
  $('.nav-link').css('font-size', '1.2rem')
  $('.nav-link').css('margin', '0 12px')
}

// check for scrolling
$(window).scroll(function () {
  // if width greater than 992
  if ($(window).width() > 992) {
    // if scrolling greater than 188
    if ($(window).scrollTop() >= 188) {
      // change header to smaller font
      fixedHeader()
    } else {
    // change header to larger font
      unfixedHeader()
    }
  }
})

// check for window width resize
$(window).resize(function () {
  // if width is more than 992px
  if ($(window).width() > 992) {
    // change header to larger font
    unfixedHeader()
  } else {
    // change header to smaller font
    fixedHeader()
  }
});

// on button click, alternate between english and korean
$('.eng').click(function () {
  $('.korean').hide()
  $('.english').show()
})

$('.kor').click(function () {
  $('.korean').show()
  $('.english').hide()
})

// when clicking an itinerary button
$('.itin-btn').click(function () {
  // hide all tour dates
  for (var i = 10; i <= 19; i++) {
    $('#itin-20' + i).hide()
  }
  // show only the tour year clicked
  $('#itin-' + $(this).text()).show()
  $('#year').html($(this).text())
})

// smooth scrolling when clicking on a link
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault()

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 300)
})

// activate lightbox
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
  event.preventDefault()
  $(this).ekkoLightbox({
    wrapping: false,
    loadingMessage: true,
    alwaysShowClose: true
  })
})

// gather all objects in an array
var itinAll = [itin2017,itin2018, itin2019]

// loop over the itinAll
for (var j = 0; j < itinAll.length; j++) {
  // loop over each event in each year
  for (var i = 0; i < itinAll[j].length; i++) {
  // create a div tag with event and title
    var div = document.createElement('div')
    div.className = 'mb-5'
    var inner = '<p class="event">' + itinAll[j][i].event + '</p><p class="info">' + itinAll[j][i].title

    // append these details if not empty
    if (itinAll[j][i].conductor) {
      inner = inner + '<br>Conductor: ' + itinAll[j][i].conductor
    }
    if (itinAll[j][i].presenter) {
      inner = inner + '<br>Presenter: ' + itinAll[j][i].presenter
    }
    if (itinAll[j][i].venue) {
      inner = inner + '<br>Venue: ' + itinAll[j][i].venue
    }
    if (itinAll[j][i].link) {
      inner = inner + '<br><a href="' + itinAll[j][i].link +  '" class="details">Details</a>'
    }

    // append location, because location should not be empty
    inner = inner + '</p><p>' + itinAll[j][i].location + '</p>'

    // store the info for each event inside the div tag
    div.innerHTML = inner
    // select the year in the HTML and append each new event to the year
    document.querySelector('#itin-201' + (j + 7)).appendChild(div)
  }
}
