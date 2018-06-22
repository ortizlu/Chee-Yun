

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
  if($(window).scrollTop() > 188 &&  $(window).scrollTop() < 999) {
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

  //when clicking an input button
  $("input").click(function(event) {
    //hide every tour date year except the one clicked
    for(var i = 10; i <= 18; i++) {
      $(".20" + i + "-itinerary").hide();
    }
    $("." + $(this).val() + "-itinerary").show();
    //change the title of the year
    $("#year").html($(this).val());
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



