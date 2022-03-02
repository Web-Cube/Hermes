import Swiper from 'swiper';

var sliders = {

	build: () => {

		$(".js-slider").each(function(){
			let dataSettings = $(this).data("settings");
			let id = $(this).attr("id");
			let autoplay = $(this).data("autoplay");
			let autoplayDelay = $(this).data("autoplay-delay")*1;
			id = "#"+id;

			let navPrev = $(id).closest("section").find('.swiper-button-prev');
			let navNext = $(id).closest("section").find('.swiper-button-next');
			let navScrollbar = $(id).closest("section").find('.swiper-scrollbar');

			let settings = {
				loop: true,
				slidesPerView: "auto",
				freeMode: true,
				speed: 500,
				Navigation: {
					nextEl: navNext,
					prevEl: navPrev,
				},
				scrollbar: {
			      el: '.swiper-scrollbar',
			      hide: false,
			      draggable: true,
			      snapOnRelease: true
			    },
			    on: {
					init: function () {
						var length = $(id).closest("section").find('.swiper-slide:not(.swiper-slide-duplicate)').length;
				    	var index = $(id).closest("section").find('.swiper-slide-active').data('swiper-slide-index')+1;
				    	if ( length < 10 ) {
				    		length = "0" + length;
				    	}
						$(id).closest("section").find('.swiper-counter-length').text(length);
				    },
				},
			};

			if ( dataSettings ) {
				settings = $(this).data("settings");
			}

			const mySwiper = new Swiper(
				id,
				settings,
			);

			navNext.click(function(){
				mySwiper.slideNext();
			});

			navPrev.click(function(){
				mySwiper.slidePrev();
			});

			const mainSlider = document.querySelector(id).swiper;

			if ( id == "#main" ) {
				mainSlider.on('slideChange', function () {
					let index = mainSlider.realIndex;
					let current = index+1;
					$('.js-main-item.is-active').removeClass('is-active');
		    		$('.js-main-item:eq(' +index+ ')').addClass('is-active');
		    		if ( current < 10 ) {
			    		current = "0" + current;
			    	}
		    		$(id).closest("section").find('.swiper-counter-current').text(current);
				});
			}

		});
		
	},

	init: () => {
		if (!$('.js-slider').length) return false;

		$(window).on("load", function() {
			sliders.build();
		});
	},
};

export { sliders };