$(document).ready(function() {
  // sticky navigation
  stickyNav();

  // animations on scroll
  animateOnScroll();

  // prevent mobile nav transition on screen resize
  $('.nav__mobile-checkbox').on('change', toggleMobileNav);
  // remove activated class on window resize
  $(window).on('resize', removeMobileNavTransition);
});

function animateOnScroll() {
  // headlines
  new Waypoint({
    element: $('.js--headlines__list'),
    handler: () => $('.js--headlines__list').addClass('animated fadeInRight'),
    offset: '60%'
  });

  // content cards
  new Waypoint({
    element: $('.js--card'),
    handler: () => $('.js--card').addClass('animated flipInY'),
    offset: '60%'
  });

  // fans
  new Waypoint({
    element: $('.js--fans'),
    handler: () => $('.js--fans').addClass('animated fadeInUp'),
    offset: '60%'
  });
}

function toggleMobileNav() {
  $('.nav__list')
    .addClass('nav__list--activated')
    .toggleClass('nav__list--active');
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
