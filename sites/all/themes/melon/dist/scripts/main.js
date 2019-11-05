(function($, Drupal) {

  Drupal.behaviors.horizon = {
    attach : function(context, settings) {
      $('.pager--infinite-scroll .pager__item a').addClass('btn btn-default');


      var anonymous = !settings.currentUser;
      var no_facebook_please = false;
      //var $favourites_modal = $('#favourites-modal');

      // Favourites
      // $("a.flag").on("click tap press", function(e) {
      //   //e.preventDefault();
      //   //console.log('clicked');
      //   $.ajax({
      //         url: Drupal.settings.basePath + 'views/ajax',
      //         type: 'POST',
      //         dataType: 'json',
      //         data: 'view_name=favourites&view_display_id=block_counter',
      //         success: function(response) {
      //           if(anonymous && !no_facebook_please) {
      //             $favourites_modal.modal(); // Pop the modal
      //           }
      //           var output = response[1].data;
      //           // console.log('done');
      //           // console.log(output);
      //           $("#favourites-counter").replaceWith(output);
      //         },
      //         error: function(data) {
      //           console.log("error occurred");
      //           //alert('An error occurred!');
      //         }
      //     });
      // }); 

      // $(document).bind('flagGlobalAfterLinkUpdate', function(event, data) {
      //   var flag = $('#node-'+data.contentId+ ' .favourite a');
      //   var flag_descrip = flag.find('.flag-description');
      //   if(flag.hasClass('flagged')) {
      //     flag_descrip.html(flag_descrip.html().replace(/Add/g,'Saved'));
      //     flag.find('.icon').addClass('fas text-highlight').removeClass('far');
      //   }
      //   else {
      //     flag_descrip.html(flag_descrip.html().replace(/Saved/g, 'Add'));
      //     flag.find('.icon').addClass('far').removeClass('fas');
      //   }
      // });

      // // Show popup on Favourites page
      // // Also when clicking a heart
      // $favourites_modal.find('.no-thanks').on('click tap press', function(e){
      //   $favourites_modal.modal('hide');
      // });

      // if(Drupal.settings.facebookPopup && !no_facebook_please) {
      //   //console.log("Pop the modal");
      //   $favourites_modal.modal();
      // }

      // $favourites_modal.on('hidden.bs.modal', function () {
      //   no_facebook_please = true;
      // });

      // Change search icon
      $('.mobile-search button').html('<i class="fas fa-search"></i>'); 
      $('.mobile-search .form-text').attr("placeholder", "Search"); 


    }
  }; 

  Drupal.behaviors.horizon_forms = { 
    attach: function (context, settings) {

      var $modal_form = $('#mailing-list-signup-modal form');
      $modal_form.attr('id', $modal_form.attr('id') + "--modal");

      $modal_form.find('input').each(function( el ) {
        $(this).attr('id', $(this).attr('id') + "--modal");
      });
      $modal_form.find('label').each(function( el ) {
        $(this).attr('for', $(this).attr('for') + "--modal");
      });       

      var signup_form = $('.webform-client-form-32');
      var signup_checkbox         = $('.webform-component-checkboxes input', signup_form);
      var signup_label            = $('.webform-component-checkboxes label', signup_form);
      var signup_checkbox_wrapper = $('.webform-component-checkboxes .form-type-checkbox', signup_form);

      $('.form-type-bef-checkbox label', context).once('bef-checkbox-pretty-checkbox',  function() {
        $(this).prepend('<span></span>');
      });

      $('.webform-client-form-32 .webform-component-checkboxes', context).once('sign-up-pretty-checkbox', function() {
        $(this).find('input').prependTo($(this).find('.form-type-checkbox'));
        $(this).find('label').prepend('<span></span');
      });

      // Events page / What's on
      var container = $('.view-events .view-filters');

      // Dates
      var $calendar_dates = $('.calendar-date', container);
      var $date = $("#edit-field-event-date-value-value-date");
     // $date.attr('disabled', 'disabled');

      $calendar_dates.on("click tap press", function(e) {
        $calendar_dates.removeClass('selected');
        $(this).addClass('selected');
        $date.val($(this).attr('data-value')).change();
      });

      $calendar_dates.each(function( el ) {
        $(this).removeClass("selected");
        if($date.val() == $(this).attr('data-value')) {
          $(this).addClass("selected");
        }
      }); 

      $('.view-events .view-filters', context).once('event-filters', function () {

        var categories = $('.form-checkboxes.bef-select-all-none.bef-processed, .form-checkboxes.bef-required-filter-processed', container);
        if (categories.length) {
          categories.removeClass('form-control form-checkboxes');

          var checkbox_labels = $('.bef-checkboxes label.option', categories);
          checkbox_labels.each(function( index, el ) {
            var tid = $(this).prev().val();
            var text = $(this).text().replace(/\s+/g, '-').toLowerCase();
            text = text.replace(',' , '').replace('&','');
            $(this).addClass('label--'+tid);
            $(this).addClass('label label--' + text);
          });



       
        }


        $('.views-exposed-widgets #edit-reset', container).removeClass('btn-primary');
        $('.views-exposed-widgets #edit-reset', container).on("click tap press", function(e) {

        });

      });

    }
  };


  var CustomScripts = {

    // All pages
    'common': {

      // JavaScript to be fired on all pages
      init: function() {
        function onresize() {
          $("body").css('padding-top', $("#header").outerHeight() + $("#alertSignUp").outerHeight());        
          $('.offcanvas-collapse').css('top', $('#alertSignUp').outerHeight() + $('#header').outerHeight());

          if($(window).width > 767) {
            $("body.front .node-slide").css('height', $(window).height() - $("#alertSignUp").outerHeight() - $("#header").outerHeight());
          }

        }

        //onload
        onresize();

        $(window).resize(function() { 
          onresize();
        });

           
        // Forms
        $(".form-type-radio, .form-type-checkbox").addClass("form-check");
        $(".form-type-radio input, .form-type-checkbox input").addClass("form-check-input");
        $(".form-type-radio label, .form-type-checkbox input").addClass("form-check-label");


        // set Matchheight class to be used in template
        $('.node-event-teaser, .node-artist-teaser').matchHeight({byRow:false}); 
        $('.view-search-api .node-teaser').matchHeight({byRow:false});

        $(document).ajaxSuccess(function(){
          $('.node-event-teaser, .node-artist-teaser').matchHeight({byRow:false}); 
          $('.view-search-api .node-teaser').matchHeight({byRow:false});
        });

        // Menu
        var $navbar_toggler = $('#navbar-toggler');  
        $('.offcanvas-collapse').css('top', $('#alertSignUp').outerHeight() + $('#header').outerHeight());
        $('[data-toggle="offcanvas"]').on('click tap press', function (e) {
          $('.offcanvas-collapse').toggleClass('open');
          $navbar_toggler.toggleClass('collapsed');
          $('body').toggleClass('modal-open');
          $('#collapseSignUp').collapse('hide');
        });        

        // Umbrella events list
        $('.umbrella-list li:not(:first-child) a').addClass('btn btn-nav');


        // Tooltip
        $('[data-toggle="tooltip"]').tooltip();

      
        $('.pager--infinite-scroll .pager__item a').addClass('btn btn-info');
          $( ".teaser-card .image img:not(.replace-as-bg)" ).each(function( index, el ) {
            var src = $(this).attr('src');
            $(this).closest('.teaser-block').css({'background-image': 'url("' + src + '")', 'background-size':'cover'});
            $(this).hide();
          });


        // Video embeds
        $(".field-type-video-embed-field .embedded-video").addClass('embed-responsive embed-responsive-16by9').find('iframe').addClass('embed-responsive-item');    


        // Teasers / Go to link in block
        $(".teaser-card, .go-to-first-link").css('cursor', 'pointer').on('click tap press', function(e){

          if(e.target.nodeName === 'I') {
            return false;
          }

          var $href = $(this).find("a:not(.flag)").attr("href");

          e.preventDefault();

          if($href.length>0) {
            window.location = $href;
          }

          return false;
        });

        $("#homepage-sign-up-block").css('cursor', 'pointer').on('click tap press', function(e){
          $('#mailing-list-signup-modal').modal('show');
        });

        // Sidebar fields
        $(".node .sidebar .details .icon").css('cursor', 'pointer').on("click tap press", function(e) {
          e.preventDefault();
          var $href = $(this).next("a").attr("href");
          //console.log($href);
          if($href.length>0) {
            window.location = $href;
          }
          return false;
        });

        // Smooth scroll
        // Select all links with hashes
        $('a[href*="#"]')
          // Remove links that don't actually link to anything
          .not('[data-toggle="collapse"]')
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function(event) {
            // On-page links
            if (
              location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
              location.hostname === this.hostname
            ) {
              // Figure out element to scroll to
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              // Does a scroll target exist?
              if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                  scrollTop: target.offset().top,
                }, 1000, function() {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  }
                });
              }
            }
          });
     
        console.log("Welcome to Horizon Festival 2019!");

        $('#block-views-events-block-2 .node-event-teaser, .node-artist-teaser').matchHeight({byRow: true}); 
        $('#block-views-events-block-2 .view-search-api .node-teaser').matchHeight({byRow:false});


        $("body.node-type-event .carousel-video-modal").detach().appendTo('body');

        // Pause Youtube videos when closing modals
        $('body.node-type-event .carousel-video-modal').on('hide.bs.modal', function (e) {
          //console.log('hide');
         $('body.node-type-event .carousel-video-modal iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        }); 

        $('body.node-type-event .field-name-field-hero-carousel').slick({
          centerMode: true, 
          infinite: true,
          variableWidth: true,
          lazyLoad: 'ondemand',
          slidesToShow: 1, 
          slidesToScroll: 1,
          arrows:true,
          prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fal fa-angle-left' aria-hidden='true'></i></button>",
          nextArrow:"<button type='button' class='slick-next pull-right'><i class='fal fa-angle-right' aria-hidden='true'></i></button>",
            responsive: [
            {
              breakpoint: 576,
              settings: {
                //arrows: false,
                centerMode: false,
                variableWidth: false,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });

        $('#block-views-hero-block-3 .home-carousel').slick({
          centerMode: false,
          infinite: true,
          variableWidth: false,
        //  lazyLoad: 'ondemand',
          slidesToShow: 1, 
          slidesToScroll: 1,
          arrows:true,
          prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fal fa-angle-left' aria-hidden='true'></i></button>",
          nextArrow:"<button type='button' class='slick-next pull-right'><i class='fal fa-angle-right' aria-hidden='true'></i></button>"
          
        });


      },

      // Put JavaScript to be fired on all pages -- after page load
      finalize: function() { 
       
        window.sr = ScrollReveal();
        window.sr.reveal('.reveal');
        // Reveal in a ripple effect
        // sr.reveal('.my-class', { duration: 800 }, 70);
      }
    }

  };

  // **********************************************************************
  // IGNORE BEYOND HERE

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = CustomScripts;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery, Drupal); // Fully reference jQuery after this point.
