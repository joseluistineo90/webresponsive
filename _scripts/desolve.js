// wait until document loads and then call menus and toggleSelect
$(document).ready(function() {
	configureMenus();
	toggleSelect();
});


//function to control menu behavior based on screen size
function configureMenus() {
			// variable que almacena el tamaño actual de pantalla:  - small, medium, or large
			 var windowState = 'large';
			  
			  // recupera el tamaño inicial de la pantalla y llama a la función apropiada
			 var sw = document.body.clientWidth;
			 if (sw < 481) {
				 smMenu();
			 } else if (sw >= 481 && sw <= 768) {
					 medMenu();
			 } else {
					 lgMenu();
				  };
			  
			  //decide qué ocurre cuando se cambia el tamaño de la pantalla
			  $(window).resize(function() {
				  var sw = document.body.clientWidth;
				  if (sw < 481 && windowState != 'small') {
					 smMenu();
				  }
				  if (sw > 480 && sw < 769 && windowState != 'medium') {
					 medMenu();
				  }  
				  if (sw > 768 && windowState != 'large') {
					 lgMenu();
				  } 
			  });

			function smMenu() {
			// reseteamos primero por si ha habido interacción previa
	//unbind eventos click y touch
    $('.menuToggle a').off('click');
			$('.topMenu h3').off('click touchstart');
			$('html').off('touchstart');
			$('#mainNav').off('touchstart');
			//reset el menú en caso de que venga de tamaño medio
    // eliminar cualquier menú expandido
			$('.expand').removeClass('expand');
			$('.menuToggle').remove();
			//ahora que se ha resetado, inicializamos indicador y añadimos toglge
			 $('.topMenu').before('<div class="menuToggle"><a href="#">menu<span class="indicator">+</span></a></div>'); // añadimos el indicador +
			 $('.topMenu h3').append('<span class="indicator">+</span>');
	// recuperamos click para cambiar entre estados del menú
	//usamos click en vez de touch para el caso de pantallas pequeñas con cursor
			$('.menuToggle a').click(function() {
				//se expande el menú
				$('.topMenu').toggleClass('expand');
				// figure out whether the indicator should be changed to + or -
				var newValue = $(this).find('span.indicator').text() == '+' ? '-' : '+';
				// y cambiamos el texto del indicador
				$(this).find('span.indicator').text(newValue);
			});
			
			//ahora preparamos los submenús
			$(".topMenu h3").click(function() {
				//buscamos el submenú actual
				var currentItem = $(this).siblings('.submenu');
				//eliminamos la clase expand para todos los submenús abiertos actualmente
				$('ul.submenu').not(currentItem).removeClass('expand');
				//ponemos el indicador correcto en los submenús cerrados 
				$('.topMenu h3').not(this).find('span.indicator:contains("-")').text('+');
				//abrimos el submenú seleccionado
				$(this).siblings('.submenu').toggleClass('expand');
				//cambiamos el indicador del menú seleccionado
				var newValue = $(this).find('span.indicator').text() == '+' ? '-' : '+';
				$(this).find('span.indicator').text(newValue);
			});
			//guardamos el estado actual de la ventana
			windowState = 'small';
		}
		
		function medMenu() {
			//reseteamos en caso de que venga de pantallas pequeñas
	// unbind eventos click$('.menuToggle a').off('click');
			$('.topMenu h3').off('click');
			// eliminamos cualquier menú expandido
			$('.expand').removeClass('expand');
			// eliminamos las etiquetas span de dentro del menú
			$('.topMenu h3').find('span.indicator').remove();
			//eliminamos el elemento "menú"
			$('.menuToggle').remove();
			
			//comprobamos si soporta eventos touch
	//si se pueden usar, los aplicaremos en vez de click
			if ('ontouchstart' in document.documentElement)
			{
				//buscamos la clase hover y la eliminamos
				 $('.topMenu').find('li.hover').removeClass('hover');
				 //añadimos eventos touch a los elementos del submenú
				 $(".topMenu h3").bind('touchstart', function(e){
					//buscamos el submenú actual
					var currentItem = $(this).siblings('.submenu');
					//eliminamos la clase expand para todos los submenús abiertos actualmente
					$('ul.submenu').not(currentItem).removeClass('expand');
					//abrimos el submenú seleccionado
					$(this).siblings('.submenu').toggleClass('expand');
				});
				//cerramos submenús si el usuario hace click fuera del menú
				$('html').bind('touchstart', function(e) {
					$('.topMenu').find('ul.submenu').removeClass('expand');
				});
				//paro la propagación del evento para evitar problemas
				$('#mainNav').bind('touchstart', function(e){
					e.stopPropagation();
			   });
			}
			//guardamos el estado actual de la ventana
			windowState = 'medium';
		}
		
		function lgMenu() {
			//básicamente, aquí eliminamos funcionalidades añadidas en otros tammaños
			//en este tamaño el menú usa sólo CSS
    // unbind eventos click y touch    
			$('.menuToggle a').off('click');
			$('.topMenu h3').off('click touchstart');
			$('html').off('touchstart');
			$('#mainNav').off('touchstart');
			
			//eliminar cualquier submenú expandido
			$('.topMenu').find('ul.submenu').removeClass('expand');
			
			// eliminamos las etiquetas span de dentro del menú
			$('.topMenu h3').find('span.indicator').remove();
			
			//eliminamos el elemento "menú"
			$('.menuToggle').remove();
			
			//guardamos el estado actual de la ventana
			windowState = 'large';
		}
}


//function to swap ul menus for select elements at smaller screen sizes
function toggleSelect() {
	//establish the default window state
	var windowState = 'large';
	
	//check to see if the screen is smaller than 769 pixels
	$(document).ready(function() {
		var sw = document.body.clientWidth;
		if (sw < 769) {
		   smScreen();
		}
	})
	//decide qué ocurre cuando se cambia el tamaño de la pantalla
	$(window).resize(function() {
		var sw = document.body.clientWidth;
		if (sw < 769 && windowState == 'large') {
		   smScreen();
		} 
		if (sw > 768 && windowState == 'small') {
			lgScreen();
		}
	});
	//convert list menus to select elements
	function smScreen() {
		//find the ul you wish to change
		$('nav.archives ul').each(function() {
			//add a select element
			var $select = $('<select />');
			//add an initial choice for the select element and assign its attributes
			var $initial = $('<option>Choose a gallery</option>');
			$initial.attr({
				value: '#',
				selected: 'selected'
			});
			//add the initial choice to the select element
			$select.append($initial);
			//populate the select element with links from the list menu
			$(this).find('a').each(function() {
				//go through each link and create an option in the select for each one
				var $option = $('<option />');
				//populate the option with data from the links
				$option.attr('value', $(this).attr('href')).html($(this).html());
				$option.attr('title', $(this).attr('title'));
				//add each option to the select element
				$select.append($option);
			});
			//when an option is selected, navigate to the selected page
			$select.change(function() {
	  window.location = $(this).find("option:selected").val();
	});
			//target the ul and replace it with the generated select element
			$(this).replaceWith($select);
		});
		 //set the current window state to small
		  windowState = 'small';
	  };
	//convert select elements to list menus
	function lgScreen() {
		//target the select menu
	   $('nav.archives select').each(function() {
				//remove the initial selection option
				$(this).find(':first-child').remove();
				//create an unordered list
			   var $ul = $('<ul />');
			   //go through the select and cycle through each option
			   $(this).find('option').each(function() {
				   //for each option create a li and an anchor
				   var $li = $('<li />');
				   var $a = $('<a />');
				   //populate the anchor attributes from the option
				   $a.attr('href', $(this).attr('value')).html($(this).html());
				   $a.attr('title', $(this).attr('title'));
				   //add the li and anchors to the ul
				   $ul.append($li);
				   $li.append($a);
			   });
			   //replace the select with the generated ul
			   $(this).replaceWith($ul);
		   });
		   //set the current window state
		   windowState = 'large';
	  };
}