var data;

(function() {

	

	$.fn.responsive = function(vars) {

		if(typeof vars == 'undefined') {
			vars = {};
		}
		
		// Setting some locals
		var includeChildren = vars.includeChildren ? vars.includeChildren : true;
		var minWidth = vars.minWidth ? vars.minWidth : 'auto';
		var minheight = vars.minWidth ? vars.minWidth : 'auto';


		var elementQueue = [];

		elementQueue.push(this);

		// set width and height of body to match screen
		$('body').css({width: '100vw', height: '100vh'});

		// set the viewport if not present
		if($('meta[name=viewport').length == 0) {
			$('<meta name="viewport" content="width=device-width, initial-scale=1.0"/>').appendTo('head');
		}	

		var calculatePercentage = function() {
			// Get width and height of body in px
			var width = $('body').width();
			var height = $('body').height();


			while(elementQueue.length > 0) {
				var element = $(elementQueue.splice(0, 1))[0];
				data = element;

				var ele_top = element.position().top;
				var ele_left = element.position().left;
				var ele_width = element.width();
				var ele_height = element.height();

				// Convert everything to percentage
				var per_top = parseFloat(ele_top / height) * 100;
				var per_height = parseFloat(ele_height / height) * 100;
				var per_left = parseFloat(ele_left / width) * 100;
				var per_width = parseFloat(ele_width / width) * 100;

				//console.log(per_top, per_left, per_width, per_height);

				$(element).css({
					'position': 'absolute',
					'top': per_top + 'vh',
					'left': per_left + 'vw',
					'width': per_width + 'vw',
					'height': per_height + 'vh',
					'min-height': minheight,
					'min-width': minWidth
				});

				// Include its children
				if(includeChildren) {
					var children = $(element).children().not('script');
					for(i = 0 ; i < children.length; i++) {
						if(!$(children[i]).is('script'))
							elementQueue.splice(elementQueue.length-1, 0, $(children[i]));
					}
				}
			}	
		}

		calculatePercentage();

	}

})(jQuery);