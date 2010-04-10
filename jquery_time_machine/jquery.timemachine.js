(function ($) {

  $.fn.timeMachine = function (options) {

    var maxPos,
        currentPos = 0,
        division   = 400,
        element    = this,
        defaults   = {
          nextKey: 187,     // plus
          previousKey: 189, // minus
          nextSelector: '.next',
          previousSelector: '.previous'
        },

    cfg = $.extend(defaults, options),

    setMaxPos = function () {
      maxPos = $('.history .time', element).length - 1;
    },

    setZ = function (el, z) {
      $(el).css('webkitTransform', 'translateZ(' + z + 'px)');
    },

    distributeCards = function () {
      $('.history .time', element).each(function (i, card) {
        setZ(card, - i * division);
      });
    },

    move = function (pos) {
      if (!validPos(pos)) {
        return;
      }
      currentPos = pos;
      $('.history .time > div:eq(' + currentPos + ')', element).css('opacity', '1'); // TODO doesn't work if you move by more than 1
      $('.history .time > div:lt(' + currentPos + ')', element).css('opacity', '0');
      setZ('.history', pos * division);
    },

    validPos = function (pos) {
      return ((pos < 0) || (pos > maxPos)) ? false : true;
    },

    previous = function (pos) {
      move(currentPos - 1);
    },

    next = function (pos) {
      move(currentPos + 1);
    },

    inputHandler = function (e) {
      switch (e.keyCode) {
        case cfg.previousKey:
          previous();
          e.preventDefault();
          break;
        case cfg.nextKey:
          next();
          e.preventDefault();
          break;
      }
    };

    $(element).each(function () {
      setMaxPos();
      distributeCards();
      $(cfg.nextSelector).click(next);
      $(cfg.previousSelector).click(previous);
      $(document).keydown(inputHandler);
    });
  };

}(jQuery));
