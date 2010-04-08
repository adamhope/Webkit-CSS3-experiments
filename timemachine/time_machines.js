var TimeMachine = (function () {

	var maxPos,
			currentPos = 0,
			division	 = 400,
			container,

  setMaxPos = function () {
     maxPos = $('.history .time', container).length - 1;
  },

	setZ = function (el, z) {
		$(el).css('webkitTransform', 'translateZ(' + z + 'px)');
	},

	distributeCards = function () {
		$('.history .time', container).each(function (i, card) {
			setZ(card, -i * division);
		});
	},

	move = function (pos) {
		if (!validPos(pos)) {
			return;
		}
		currentPos = pos;
    $('.history .time > div:eq(' + currentPos + ')', container).css('opacity', '1'); // TODO doesn't work if you move by more than 1
		$('.history .time > div:lt(' + currentPos + ')', container).css('opacity', '0');
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

  return {

		init: function (opts) {
		  container = opts.container;
		  setMaxPos();
			distributeCards();
			return {
			  next: next,
			  previous: previous
			}
		}
	
	}

}());