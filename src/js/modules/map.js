var map = {
	
	create: () => {
		$.getScript( 'https://api-maps.yandex.ru/2.1/?lang=ru_RU', function( data, textStatus, jqxhr ) {
			ymaps.ready(function () {
				$('.js-map').each(function() {

					let size = [197, 134];
					let offset = [-98, -110];

					let winWidth = $(window).width();

					if ( winWidth < 581 ) {
						size = [120, 80];
						offset = [-60, -65];
					}

					var myMap = new ymaps.Map("map", {
			            center: [55.73731406898891,37.60089949999996],
			            zoom: 17
			        });

				    myMap.geoObjects
				        .add(new ymaps.Placemark([55.73731406898891,37.60089949999996], {
				            balloonContent: 'г. Москва, Коробейников пер., д.1'
				        }, {
				            iconLayout: 'default#image',
				            iconImageHref: '/app/img/marker.svg',
				            iconImageSize: size,
				            iconImageOffset: offset,
				        }));

				    myMap.behaviors.disable('scrollZoom');
				});
			});
		});
	},

	init: () => {
		
		if ( $('.js-map').length ) {
			$(window).on('load', function(){
				map.create();
			});
		}

	}
}

export { map }