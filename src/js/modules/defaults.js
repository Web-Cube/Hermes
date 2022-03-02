import 'jquery-ui/ui/widgets/slider';
require('jquery-ui-touch-punch');

var defaults = {

	events: () => {

		$('.js-calc').each(function(){
			$('#amount').slider({
				range: "min",
				min: 50000,
				max: 1000000,
				step: 1000,
				value: 150000,
				slide: function( event, ui ) {
					var amount = Math.round( ui.value * 1.035 );
					var amountReturn = thousandSeparator( amount );
					var amountPercent = amount - ui.value;
					amountPercent = thousandSeparator( amountPercent );

					$('.js-amount').text(thousandSeparator( ui.value ));
					$('.js-amount-return').text(amountReturn);
					$('.js-amount-percent').text(amountPercent);
					
				}
			});

			$('#amountDate').slider({
				range: "min",
				min: 14,
				max: 365,
				step: 1,
				value: 30,
				slide: function( event, ui ) {

					$('.js-amount-date').text( ui.value );
					
				}
			});
		});
	},

	toggleMobile: (e) => {
		
		$(e.currentTarget).toggleClass('is-active');
		$('.js-mobile').toggleClass('is-active');
		$('body').toggleClass('js-lock');
		
	},

	init: () => {

		defaults.events();
		$(document).on('click', '.js-burger', defaults.toggleMobile);

		$('.js-mobile-close').click(function(){
			$('.js-burger').click();
		});


	}
}

export { defaults }