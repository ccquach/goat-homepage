$(document).ready(function() {
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
});
