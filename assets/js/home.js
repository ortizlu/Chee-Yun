//once the document is ready hide korean and display only english
//also hide all other tour dates except 2018
$(function() {
  $(".english").hide();
  $(".korean").hide();
  for(var i = 10; i < 18; i++) {
    $(".20" + i + "-itinerary").hide();
  }
  $(".2018-itinerary").show();
})

// fixes glitch where on refresh if you are at the top of the page after the big header, the small header does not show up without scrolling
var myFunction = function() {
  if($(window).width() > 992) {
    if($(window).scrollTop() === 0) {
      unfixedHeader();
    } else if($(window).scrollTop() > 188 &&  $(window).scrollTop() < 1644) {
      fixedHeader();
    }
  }
}

window.onload = myFunction;

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

//check for scrolling
$(window).scroll(function(){
  //if width greater than 992
  if($(window).width() > 992) {
    //if scrolling greater than 188
    if ($(window).scrollTop() >= 188) {
      //change header to smaller font
      fixedHeader();
    } else {
    //change header to larger font
    unfixedHeader();
    }
  }
});

//check for window width resize
$(window).resize(function() {
  //if width is more than 992px
  if($(window).width() > 992) {
    //change header to larger font
    unfixedHeader();
  } else {
    //change header to smaller font
    fixedHeader();
  }
});

//on button click, alternate between english and korean
$(".eng").click(function(){
  $(".korean").hide();
  $(".english").show();
});

$(".kor").click(function(){
  $(".korean").show();
  $(".english").hide();
});

//when clicking an itinerary button
$(".itin-btn").click(function() {
  //hide all tour dates
  for(var i = 10; i <= 18; i++) {
    $(".20" + i + "-itinerary").hide();
  }
  //show only the tour year clicked
  $("." + $(this).text() + "-itinerary").show();
  $("#year").html($(this).text());
});

//smooth scrolling when clicking on a link
$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
  }, 300);
});

//activate lightbox
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox({
                wrapping: false,
                loadingMessage: true,
                alwaysShowClose: true,
            });
});



