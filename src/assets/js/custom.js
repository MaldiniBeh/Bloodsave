// [MASTER JAVASCRIPT]
//	Project     :	BLOOD-DONATION TEMPLATE
//	Version     :	1.0
//	Last Change : 	23/01/2019
//	Primary Use :   BLOOD-DONATION TEMPLATE

	$(document).on('ready', function() {
    "use strict"; //Start of Use Strict
       var menu_li = $('.navbar-nav li a');
    var collapse = $('.navbar-collapse');
    var top_nav = $('#top-nav');

	//MENU SCROLL
    if (top_nav.length) {
        var x = top_nav.offset().top;
        if (x > 50) {
            top_nav.fadeIn();
        } else {
            top_nav.fadeOut();
        }
        $(document).on('scroll', function() {
            var y = $(this).scrollTop();
            if (y > 50) {
                top_nav.fadeIn();
            } else {
                top_nav.fadeOut();
            }
        });
    }

	//MENU BAR SMOOTH SCROLLING FUNCTION
    var menu_list = $('.navbar-nav');
    if (menu_list.length) {
        menu_list.on("click", ".nav-link", function(event) {
            event.stopPropagation();
            event.preventDefault();
            var hash_tag = $(this).attr('href');
            if ($(hash_tag).length) {
                $('html, body').animate({
                    scrollTop: $(hash_tag).offset().top - 55
                }, 2000);
            }
            return false;
        });
    }


	//RESPONSIVE MENU SHOW AND HIDE FUNCTION
    if (menu_li.length) {
        menu_li.on("click", function(event) {
			var disp = $(".navbar-toggler").css('display');
			if( !$(".navbar-toggler").hasClass('collapsed') ){
				if(collapse.hasClass('show')){
					collapse.removeClass('show').slideUp( "slow");
				}
			}
        });
    }

    //Lire plus
    var i=1;
    $('#sp1').click(function (e) {
        e.preventDefault();
        i++;
        if(i%2==0){
            $('#sp1').html('Réduire');
        }
        else {$('#sp1').html('Lire Plus')}

    });

    var j=1;
    $('#sp2').click(function (e) {
        e.preventDefault();
        j++;
        if(j%2==0){
            $('#sp2').html('Réduire');
        }
        else {$('#sp2').html('Lire Plus')}

    });

    var k=1;
    $('#sp3').click(function (e) {
        e.preventDefault();
        k++;
        if(k%2==0){
            $('#sp3').html('Réduire');
        }
        else {$('#sp3').html('Lire Plus')}

    });

    var a=1;
    $('#sp4').click(function (e) {
        e.preventDefault();
        a++;
        if(a%2==0){
            $('#sp4').html('Réduire');
        }
        else {$('#sp4').html('Lire Plus')}

    });

    });

