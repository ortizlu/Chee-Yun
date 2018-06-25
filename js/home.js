

//once the document is ready hide korean and display only english
//also hide all other tour dates except 2018
$(function() {
  $(".korean").hide();
  for(var i = 10; i < 18; i++) {
    $(".20" + i + "-itinerary").hide();
  }
  $(".2018-itinerary").show();
})

//fixes glitch where on refresh if you are at the top of the page after the big header, the small header does not show up without scrolling
var myFunction = function() {
  if($(window).scrollTop() > 188 &&  $(window).scrollTop() < 1644) {
    fixedHeader();
  }
}

//fixed or unfixed header depending on where you are in the page
function fixedHeader() {
  $('.desktop-nav').addClass('small-nav');
  $('#name').removeClass('name');
  $('.main-nav').addClass('small-header');

  $('#home-nav, #about-nav, #itinerary-nav, #discography-nav, #gallery-nav, #contact-nav').removeClass('space');
  $('#home-nav, #about-nav, #itinerary-nav, #discography-nav, #gallery-nav, #contact-nav').addClass('less-space');
}

function unfixedHeader() {
  $('.desktop-nav').removeClass('small-nav');
  $('#name').addClass('name');
  $('.main-nav').removeClass('small-header');


  $('#home-nav, #about-nav, #itinerary-nav, #discography-nav, #gallery-nav, #contact-nav').addClass('space');
  $('#home-nav, #about-nav, #itinerary-nav, #discography-nav, #gallery-nav, #contact-nav').removeClass('less-space');
}

//starts glitch fix when window refreshes
window.onload = myFunction;

//if the window is scrolled more than the desktop header
//classes are applied to shrink the header making a small desktop header throughout the page
$(window).scroll(function(){
  if ($(window).scrollTop() >= 188) {
    fixedHeader();
  } else {
    unfixedHeader();
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



