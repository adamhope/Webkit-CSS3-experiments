(function ($) {

  $.fn.timeTravel = function(options){

    // var options = $.extend(defaults, options);

  	var maxPos,
  			currentPos = 0,
  			division	 = 400,
        element    = this,

    setMaxPos = function () {
       maxPos = $('.history .time', element).length - 1;
    },

  	setZ = function (el, z) {
  		$(el).css('webkitTransform', 'translateZ(' + z + 'px)');
  	},

  	distributeCards = function () {
  		$('.history .time', element).each(function (i, card) {
  			setZ(card, -i * division);
  		});
  	},

  	move = function (pos) {
  		if (!validPos(pos)) {
  			return;
  		}
  		currentPos = pos;
      $('.history .time > div:eq(' + currentPos + ')', element).css('opacity', '1'); // TODO doesn't work if you move by more than 1
  		$('.history .time > div:lt(' + currentPos + ')', element).css('opacity', '0');
  		setZ('.history',	pos * division);
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
         case 189: // minus
           previous();
           e.preventDefault();
           break;
         case 187: // plus
           next();
           e.preventDefault();
           break;
       }
      };
    
    $(element).each(function () {

  	  setMaxPos();
  		distributeCards();
      $(document).keydown(inputHandler);

      return {
        next: next,
        previous: previous
      }

    });
  };

}(jQuery));