import 'jquery-ui/ui/widgets/slider';
require('jquery-ui-touch-punch');

var defaults = {

	events: () => {

		$('.js-calc').each(function(){
			let min = $(this).data("min")*1;
			let max = $(this).data("max")*1;

			$(this).slider({
				range: true,
				min: min,
				max: max,
				values: [ min, max ],
				slide: function( event, ui ) {
					$(this).closest('.js-select').find('.js-select-label').text( ui.values[ 0 ] + "-" + ui.values[ 1 ] );
					$(this).closest('.js-select').find('.js-select-input').val( ui.values[ 0 ] + "-" + ui.values[ 1 ] + ' см' );

					$(this).find('.js-calc-from').text( ui.values[ 0 ] );
					$(this).find('.js-calc-to').text( ui.values[ 1 ] );
				}
			});
		});

		// Клик вне select
		const select = $('.js-select');
		window.addEventListener('click', e => { // при клике в любом месте окна браузера
		    const target = e.target // находим элемент, на котором был клик
		    if (!target.closest('.js-select')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
		      select.removeClass('is-active') // то закрываем окно навигации, удаляя активный класс
		    }
		});

		$('.js-show-search').click(function(){
			$('.js-search').addClass('is-active');
			setTimeout(function(){
				$('.js-search .form-search__input').focus();
			},100);
		});

		$('.js-close-search').click(function(){
			$('.js-search').removeClass('is-active');
		});
	},

	toggleMobile: (e) => {
		
		$(e.currentTarget).toggleClass('is-active');
		$('.js-mobile').toggleClass('is-active');
		$('body').toggleClass('js-lock');
		
	},

	toggleField: (e) => {
		
		$(e.currentTarget).toggleClass('is-active');
		$(e.currentTarget).closest('.js-field').toggleClass('is-active');
		
	},

	changeFile: (e) => {
		
		let fileName = e.target.files[0].name;

		$(e.currentTarget).closest('.js-file').find('.js-file-name').text(fileName);
		
	},

	thumbnails: (e) => {
		
		let index = $(e.currentTarget).index();

		if ( $(e.currentTarget).hasClass('is-active') ) {

		} else {
			$('.js-product-thumb.is-active, .js-product-img.is-active').removeClass('is-active');
			$(e.currentTarget).addClass('is-active');

			$('.js-product-img:eq(' +index+ ')').addClass('is-active');
		}
		
	},

	select: (e) => {

		let parrent = $(e.currentTarget).parent();
		
		if ( parrent.hasClass('is-active') ) {
			parrent.removeClass('is-active');
		} else {
			$('.js-select.is-active').removeClass('is-active');
			parrent.addClass('is-active');
		}
		
	},

	selectItem: (e) => {

		let value = $(e.currentTarget).data('value');
		let text = $(e.currentTarget).text();
		
		$('.js-select-item.is-active').removeClass('is-active');
		$(e.currentTarget).closest('.js-select').removeClass('is-active');
		$(e.currentTarget).addClass('is-active');

		$(e.currentTarget).closest('.js-select').find('.js-select-input').val(value);
		$(e.currentTarget).closest('.js-select').find('.js-select-label').text(value);
		
	},

	init: () => {

		defaults.events();
		$(document).on('click', '.js-burger', defaults.toggleMobile);
		$(document).on('click', '.js-change-email', defaults.toggleField);
		$(document).on('change', '.js-file-input', defaults.changeFile);
		$(document).on('click', '.js-product-thumb', defaults.thumbnails);
		$(document).on('click', '.js-select-head', defaults.select);
		$(document).on('click', '.js-select-item', defaults.selectItem);

		$('.js-mobile-close').click(function(){
			$('.js-burger').click();
		});


	}
}

export { defaults }