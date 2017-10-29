$(function()
{
			// ACTIVITY INDICATOR
			// CLOSE BUTTON

			var closeButtonOn = function( instance )
			{
				$( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
			},
			closeButtonOff = function()
			{
				$( '#imagelightbox-close' ).remove();
			},

			activityIndicatorOn = function()
			{
				$( '<div id="imagelightbox-loading"><div class="Cube panelLoad"><div class="cube-face cube-face-front">Ho</div><div class="cube-face cube-face-back">Mi</div><div class="cube-face cube-face-left">Lo</div><div class="cube-face cube-face-right">Di</div><div class="cube-face cube-face-bottom">La</div><div class="cube-face cube-face-top">Ro</div></div></div>' ).appendTo( 'body' );
			},
			activityIndicatorOff = function()
			{
				$( '#imagelightbox-loading' ).remove();
			},

			// CAPTION

			captionOn = function()
			{
				var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
				if( description.length > 0 )
					$( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
			},
			captionOff = function()
			{
				$( '#imagelightbox-caption' ).remove();
			},

			// OVERLAY

			overlayOn = function()
			{
				$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
			},
			overlayOff = function()
			{
				$( '#imagelightbox-overlay' ).remove();
			};

			var lightbox = $( 'a.expand' ).imageLightbox(
			{
				onStart: 	 function() { overlayOn(); closeButtonOn(lightbox);},
				onEnd:	 	 function() { closeButtonOff(); overlayOff(); activityIndicatorOff(); captionOff();},
				onLoadStart: function() { activityIndicatorOn(); captionOff();},
				onLoadEnd:	 function() { activityIndicatorOff(); captionOn();}
			});

			if (undefined === window.ontouchstart) {
				$('[data-toggle="tooltip"]').tooltip();
			}
		
			function mailSuccess(el) {
			    $(el).parent().fadeOut();
			    $('#success-contact-message').fadeIn();
			}

			function mailError(el) { 
			    $('#contact-form-warning').fadeIn(200);
			    }

			$('a[rel]').click(function(element,e){ 


				if ($(this).hasClass('navbar-brand')) {

					$("ul.nav > li.active").removeClass("active");
				}
				else
				$(this).parent().addClass("active").siblings().removeClass("active");  
				
				var pageId = "#"+$(this).attr("rel");  
				$('div.page'+pageId).siblings().fadeOut(200, 'swing', function() {window.scrollTo(0,0)}).end().fadeIn(900);  
				$("button[aria-expanded=true]").click();

			    });

			$('form').on('submit', function(e) { 
				e.preventDefault();
				var data = $(this).serialize();

				$.post("/contact.php", data, function(res) { 
					var response = $.parseJSON(res);
					if (response.status == "Ok!") {  
					    mailSuccess(this);
					} else {
					    mailError(this);
					}

				    }.bind(this));
				return false;
			    });

			var address = window.location.hash.replace("#","");
			if(address.length > 0){
			$('a[rel=' + address + ']').click();
			}

			window.onhashchange = function() {   
				var address = window.location.hash;
				window.setTimeout(function() {  
				$('a[rel=' + address.replace("#","") + ']').click();
				},600);
			};


});
