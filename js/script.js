$(document).ready(function() {
  // smooth scrolling
  smoothScroll();

  // sticky navigation
  stickyNav();

  // animations on scroll
  animateOnScroll();

  // prevent mobile nav transition on screen resize
  $('.nav__mobile-checkbox').on('change', toggleMobileNav);
  // remove activated class on window resize
  $(window).on('resize', removeMobileNavTransition);

  // Close mobile nav on click anywhere outside it
  $(document).mouseup(e => {
    e.stopPropagation();
    closeOnClickOutside(e, '.nav__list');
  });

  // Close mobile nav on escape key
  $(document).keyup(e => closeOnEsc(e, '.nav__list'));

  // Close mobile nav on link click
  $('.nav__link').on('click', () => $('#nav-toggle').prop('checked', false));
});

function closeOnClickOutside(e, target) {
  var container = $('.nav__list');
  if (
    parseInt(container.css('opacity')) === 1 &&
    $('#nav-toggle').prop('checked') &&
    !container.is(e.target) &&
    container.has(e.target).length === 0
  ) {
    $('#nav-toggle').prop('checked', false);
  }
}

function closeOnEsc(e, target) {
  if (
    parseInt($(target).css('opacity')) === 1 &&
    $('#nav-toggle').prop('checked') &&
    e.keyCode === 27
  ) {
    $('.nav__mobile-checkbox').prop('checked', false);
  }
}

function smoothScroll() {
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var targetHash = this.hash;
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body')
            .animate(
              {
                scrollTop: target.offset().top
              },
              1000,
              function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(':focus')) {
                  // Checking if the target was focused
                  return false;
                } else {
                  $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                }
              }
            )
            .promise()
            .then(function() {
              location.hash = targetHash;
            });
        }
      }
    });
}

function animateOnScroll() {
  // headlines
  new Waypoint({
    element: $('.js--headlines__list'),
    handler: () => $('.js--headlines__list').addClass('animated fadeInRight'),
    offset: '70%'
  });

  // content cards
  new Waypoint({
    element: $('.js--content-cards__cards'),
    handler: () => $('.js--content-cards__cards').addClass('animated fadeIn'),
    offset: '70%'
  });

  // fans
  new Waypoint({
    element: $('.js--fans'),
    handler: () => $('.js--fans').addClass('animated fadeInUp'),
    offset: '70%'
  });
}

function toggleMobileNav() {
  $('.nav__list').addClass('nav__list--activated');
}

function removeMobileNavTransition() {
  var width = getWindowWidth();
  if (width <= 1200) $('.nav__list').removeClass('nav__list--activated');
}

function stickyNav() {
  /* Sticky navigation */
  new Waypoint({
    element: $('.js--banner'),
    handler: function(direction) {
      direction === 'down'
        ? $('nav').addClass('sticky')
        : $('nav').removeClass('sticky');
    },
    offset: 60
  });
}

function scrollbarWidth() {
  var div = $(
    '<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>'
  );
  // Append our div, do our calculation and then remove it
  $('body').append(div);
  var w1 = $('div', div).innerWidth();
  div.css('overflow-y', 'scroll');
  var w2 = $('div', div).innerWidth();
  $(div).remove();
  return w1 - w2;
}

function hasScrollbar() {
  return $(document).height() > $(window).height();
}

function getWindowWidth() {
  w = hasScrollbar() ? $(window).width() + scrollbarWidth() : $(window).width();
  return w;
}
