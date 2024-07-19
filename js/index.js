// ハンバーガーボタンとドロワー
$(document).ready(function () {

  $("#js-button-drawer").on("click", function () {
    $(this).toggleClass("is-checked");
    $("#js-drawer").slideToggle();
    $("body").toggleClass("is-fixed");
  });

  $(window).on('resize', function() {
    var windowWidth = $(window).width();
    if (windowWidth > 768) {
      // 大画面用のメニュー表示
      $(".header__contents").show();
    } else {

      $(".header__contents").hide();
      $("#js-button-drawer").removeClass("is-checked");
      $("#js-drawer").slideUp();
      $("body").removeClass("is-fixed");
    }
  });


  $(window).trigger('resize');
  

  $(".header__nav-link").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $('html, body').animate({
      scrollTop: $(target).offset().top - 40
    }, 500);

    if ($(window).width() <= 768) {
      $("#js-button-drawer").removeClass("is-checked");
      $("#js-drawer").slideUp();
      $("body").removeClass("is-fixed");
    }
  });
});




// section animation


function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}


$(document).ready(function() {
  const $sliderItems = $('.slide-in');
  const $sectionNames = $('.section__head-main__slide');

  function checkSlide() {
    $sliderItems.each(function() {
      const $sliderItem = $(this);
      const slideInAt = $(window).scrollTop() + $(window).height() * 4 / 5;
      const isShown = slideInAt > $sliderItem.offset().top;
      if (isShown) {
        $sliderItem.addClass('active');
      }
    });
  }


  function sectionNameSlide() {
    $sectionNames.each(function() {
      const $sliderItem = $(this);
      const slideInAt = ($(window).scrollTop() + $(window).height()) - $sliderItem.height() / 30;
      const isShown = slideInAt > $sliderItem.offset().top;
      if (isShown) {
        $sliderItem.addClass('active');
      }
    });
  }

  $(window).on('scroll', debounce(checkSlide));
  $(window).on('scroll', debounce(sectionNameSlide));
  
});


// about action



function createSlider(selector) {
  let currentSlide = 0;
  const $slides = $(selector);
  const totalSlides = $slides.length;

  function showSlide(index) {
    $slides.each(function(i) {
      $(this).removeClass('active');
      if (i === index) {
        $(this).addClass('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 4000);
}

createSlider('.about__item-img__travel');
createSlider('.about__item-img__hobby');
createSlider('.about__item-img__sport');
createSlider('.about__item-name__travel');
createSlider('.about__item-name__hobby');
createSlider('.about__item-name__sport');
// createSlider('.about__item-img__title');
