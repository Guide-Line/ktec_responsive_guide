/* live function 오류 해결 */
jQuery.fn.extend({
    live: function (event, callback) {
       if (this.selector) {
            jQuery(document).on(event, this.selector, callback);
           
        }
    }
});

/* 모바일 touch hover 해제 */
var touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;

if (touch) {
    try {
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

/* mobile viewport scale bug */
(function ( window, document, undefined ) {
	'use strict';
	
	window.helper = window.helper || {};
	
	/**
	 * Fix for iPhone viewport scale bug
	 * http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
	 */

	helper.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
	helper.ua = navigator.userAgent;

	helper.scaleFix = function() {
		if (helper.viewportmeta && /iPhone|iPad|iPod/.test(helper.ua) && !/Opera Mini/.test(helper.ua)) {
			helper.viewportmeta.originalContent = helper.viewportmeta.content;
			helper.viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
			document.addEventListener('gesturestart', helper.gestureStart, false);
		}
	};

	helper.gestureStart = function() {
		helper.viewportmeta.content = helper.viewportmeta.originalContent;
	};
	
    /**
     * Normalized hide address bar for iOS & Android
     * (c) Scott Jehl, scottjehl.com
     * MIT License
     */

    // If we split this up into two functions we can reuse
    // this function if we aren't doing full page reloads.

    // If we cache this we don't need to re-calibrate everytime we call
    // the hide url bar
    helper.BODY_SCROLL_TOP = false;

    // So we don't redefine this function everytime we
    // we call hideUrlBar
    helper.getScrollTop = function() {
        var win = window;
        var doc = document;

        return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
    };

    // It should be up to the mobile
    helper.hideUrlBar = function() {
        var win = window;

        // if there is a hash, or helper.BODY_SCROLL_TOP hasn't been set yet, wait till that happens
        if (!location.hash && helper.BODY_SCROLL_TOP !== false && helper.BODY_SCROLL_TOP < 20) {
            win.scrollTo( 0, helper.BODY_SCROLL_TOP === 1 ? 0 : 1 );
        }
    };

    helper.hideUrlBarOnLoad = function() {
        var win = window;
        var doc = win.document;
        var bodycheck;

        // If there's a hash, or addEventListener is undefined, stop here
        if ( !location.hash && win.addEventListener ) {

            // scroll to 1
			if (helper.BODY_SCROLL_TOP === false) {
				window.scrollTo( 0, 1 );
				helper.BODY_SCROLL_TOP = 1;
			}

            // reset to 0 on bodyready, if needed
            bodycheck = setInterval(function() {
                if ( doc.body ) {
                    clearInterval( bodycheck );
                    helper.BODY_SCROLL_TOP = helper.getScrollTop();
                    helper.hideUrlBar();
                }
            }, 15 );

            win.addEventListener('load', function() {
                setTimeout(function() {
                    // at load, if user hasn't scrolled more than 20 or so...
                    if (helper.getScrollTop() < 20) {
                        // reset to hide addr bar at onload
                        helper.hideUrlBar();
                    }
                }, 0);
            });
        }
    };
	
	// Init Helpers
	helper.scaleFix();
	helper.hideUrlBarOnLoad();
}( this, this.document ));

// landscape
function applyOrientation() {
  if (window.innerHeight > window.innerWidth) {
   $('body').removeClass('device-landscape');
  } else {
   $('body').addClass('device-landscape');
  }
}

var deviceCheck = function () {
	var winWidth = $(window).outerWidth();
	if (winWidth < 768) {
		applyOrientation();
		$('body').removeClass('device-tablet').removeClass('device-pc').addClass('device-mobile');
	} else if ( winWidth >= 768 && winWidth < 1199 ) {
		$('body').removeClass('device-mobile').removeClass('device-pc').addClass('device-tablet');
	} else {
		$('body').removeClass('device-mobile').removeClass('device-tablet').addClass('device-pc');
	}
}
deviceCheck();

/* ie : .msie / ie7,8 : .ie_low */
var agentCheck = function () {
	var agent = navigator.userAgent.toLowerCase();
	if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)){
		$('body').addClass('msie');
		if(/(MSIE\ [0-8]\.\d+)/.test(navigator.userAgent) || /(MSIE\ [0-7]\.\d+)/.test(navigator.userAgent)){
			$('body').addClass('ie_low');
			if (/(MSIE\ [0-7]\.\d+)/.test(navigator.userAgent)) {
				$('body').addClass('ie_7');
			}
		}
	}
}
agentCheck();

/* 쿠폰 안내 팝업 */
var cpLayerFunc = {
    scrollTopOffset: 0,

    init : function () {
        this.setElements();
        this.bindEvents();
    },
    setElements : function () {
        this.btn = $('.btn_noti_cp');
        this.box = $('.layer_coupon');
        this.winH = $(window).outerHeight();
        this.layerContainer = $('.layer_coupon_container');
        this.layerContent = $('.layer_coupon_container .coupon_layer_viewer');
        this.body = $('body');
        this.window = $(window);
    },
    bindEvents : function () {
    	this.btn.on('click', $.proxy(this.getTargetLayer, this));
        this.layerContainer.on('click', '.coupon_layer_dimmed, .btn_ok, .btn_close', $.proxy(this.cpLayerClose, this));
        this.box.on('click', '.btn_close, .btn_ok', $.proxy(this.cpLayerClose, this));
    },
    /**
	 * 활설화 시킬 레이어 컨텐츠를 가져옵니다.
     * @param e
     */
    getTargetLayer : function(e){
        this.cur = $(e.currentTarget);
        var targetLayer = this.cur.parents('.item').find('.layer_coupon').clone();

        this.cpLayerOpen(targetLayer);
	},
    /**
	 * 레이어 프레임 노출
     * @param [object]targetLayer - 활성화 시킬 DOM
     */
    cpLayerOpen : function (targetLayer) {
        this.layerContent.empty().append(targetLayer.show());
        this.layerContainer.show();
        this.setLayerCenterPosition();
        this.fixedViewPort(true);
    },
    /**
	 * 레이어 프레임 닫음
     */
    cpLayerClose : function () {
        this.layerContent.empty();
        this.layerContainer.hide();
        this.fixedViewPort(false);
        
        
    },
    /**
	 * 레이어 프레임 세로 중앙정렬
     */
	setLayerCenterPosition: function(){
    	var targetLayer = this.layerContainer.find('.layer_coupon');
        targetLayer.css({'margin-top': Math.floor(targetLayer.outerHeight() / 2) * -1});
	},
    /**
	 * 레이어 노출시 컨텐츠영역 스크롤 불가 처리
     * @param [boolean]fixedView - ture 스크롤 불가, false 스크롤 불가 해제
     */
    fixedViewPort: function (fixedView) {
        this.cachedWindowOffsetTop = this.window.scrollTop();

        if (fixedView) {
            this.body.css({
                'position': 'fixed',
                'top': this.cachedWindowOffsetTop * -1,
				'overflow-y': 'hidden',
                'left': '0',
                'right': '0'
            });

            this.scrollTopOffset = this.body.css('top').split('px')[0] * -1;
        } else {
            this.body.css({
                'position': 'static',
                'overflow-y': 'auto'
            });

            this.window.scrollTop(this.scrollTopOffset);
        }
    }
};

var moduleSwiper = function () {
	var winWidth = $(window).outerWidth();

	$('.module .top_banner.dark, .module.autoimg .top_banner, .module_prom .sliderwrap2 .item .link_prom').each(function(){
		$(this).append("<span class='dimmed'></span>");
	});
    
    
    /* 한반도 오픈
    $('.module .top_banner.dark, .module.autoimg .top_banner, .module_prom .sliderwrap2 .item .link_prom, .module .prev_banner, .module .next_banner').each(function(){
        $(this).append("<span class='dimmed'></span>");
    });*/

	/* banner slider */
	function bnrSwiper(){
		var sliders = [];
		$('.module_banner .sliderwrap ul').each(function(index){
			var $this = $(this).parents('.sliderwrap');
			$(this).addClass('s'+index);
			$('.s'+index).prepend('<li>').append('<li>');
			$('.s'+index).find('li').eq(0).css('height','1px');
			var bannerSwiper = $('.s'+index).carouFredSel({
				responsive: true,
				width: setWidth(),
				height: 'variable',
				auto: false,
				circular : false,
				infinite: false,
				prev: $this.find(".btn_prev"),
				next: $this.find(".btn_next"),
				pagination: $this.find(".paginate"),
				scroll: 1,
				items: 3
			});

			function setWidth ( item ) {
				var item;
				if (winWidth < 640){
                    item = '192%';
                } else {
                    item = '100%';
                }
				return item;
			}

			function pager(){
				var pagerNum = $(".paginate").find('a').length - 1;
				var pagerNum2 = pagerNum - 2;
				$(".paginate").find('a').eq(pagerNum).remove();
				$(".paginate").find('a').eq(pagerNum2).remove();
			} pager();

			$('.s'+index).swipe({
				excludedElements: "button, .noSwipe",
				swipeLeft: function() {
					$(this).trigger('next', true);
				},
				swipeRight: function() {
					$(this).trigger('prev', true);
				}
			});
		});
	}	
	if($('.module_banner .sliderwrap ul').length > 0) { if (winWidth < 640 && !$('body').hasClass('device-landscape')) bnrSwiper(); }

	/* story slider */
	function storySwiper1(){
		$('.module_story.story_type1 .sliderwrap .owl-carousel').each(function(index){
			var $this = $(this).parents('.sliderwrap');
			var mySwiper = $(this);
			var chkLen = mySwiper.find('.item').length;
			if (chkLen > 3) $this.addClass('multiple');
			if (chkLen == 3) $this.addClass('max');
			if (chkLen == 2) $this.addClass('double');
			if (chkLen == 1) $this.addClass('only');
			if (!$this.hasClass('only')) {
				var moduleStory = mySwiper.owlCarousel({
					loop: true,
					autoWidth: false,
					items : 1,
					responsive : {
						1200:{
							loop: ($this.hasClass('multiple')) ? true : false,
							autoWidth: true,
							dots: false,
							items: 3
						}
					}
				});
				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			}
		});
	} 		
	function storySwiper3(){
		$('.module_story.story_type3 .sliderwrap .owl-carousel').each(function(index){
			var $this = $(this).parents('.sliderwrap');
			var mySwiper = $(this);
			var chkLen = mySwiper.find('.item').length;
			if (chkLen > 2) $this.addClass('multiple');
			if (chkLen == 2) $this.addClass('max');
			if (chkLen == 1) $this.addClass('only');
			if (!$this.hasClass('only')) {
				var moduleStory = mySwiper.owlCarousel({
					loop: true,
					autoWidth: false,
					items : 1,
					responsive : {
						1200:{
							center: ($this.hasClass('multiple')) ? true : false,
							autoWidth: true,
							dots: false,
							items:2
						}
					},
					onInitialized : sizeAndLeftCallback,
					onResized : sizeAndLeftCallback,
					onResize : sizeAndLeftCallback
				});
				function sizeAndLeftCallback(e) {
					$this.find('.total').text(e.item.count);
					mySwiper.on('changed.owl.carousel', function(e) {
						if (!e.namespace || e.property.name != 'position') return
						var current =e.page.index;
						$('.page_num .current').text(current+1)
					})
				}
				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			}
		});
	}
	function storySwiper4(){
		$('.module_story.story_type4 .sliderwrap .owl-carousel').each(function(index){
			var $this = $(this).parents('.sliderwrap');
			var mySwiper = $(this);
			var chkLen = mySwiper.find('.item').length;
			if (chkLen > 3) $this.addClass('multiple');
			if (chkLen == 3) $this.addClass('max');
			if (chkLen == 2) $this.addClass('double');
			if (chkLen == 1) $this.addClass('only');
			if (!$this.hasClass('only')) {
				var moduleStory = mySwiper.owlCarousel({
					loop: true,
					autoWidth: false,
					items : 1,
					responsive : {
						1200:{
							loop: ($this.hasClass('multiple')) ? true : false,
							center: ($this.hasClass('multiple')) ? true : false,
							autoWidth: true,
							dots: false,
							items: 3
						}
					}
				});
				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			}
		});
	} 	
	function storySwiper5(){
		var targetSwiper = $('.module_story.story_type5 .sliderwrap .owl-carousel');
		targetSwiper.each(function(index){
			var $this = $(this).parents('.sliderwrap');
			var mySwiper = $(this);
			var chkLen = mySwiper.find('.item').length;
			if (chkLen == 1) $this.addClass('only');
			if (!$this.hasClass('only')) {
				var moduleStory = mySwiper.owlCarousel({
					loop: true,
					autoWidth: false,
					items : 1,
					dots : (!$('body').hasClass('device-pc')) ? true : false
				});
				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			}
			var txtMore = $(this).find('.btn_more_story');
			txtMore.click(function (){
				if ($(this).parents('.prdinfo').hasClass('active')) {
					$(this).parents('.prdinfo').removeClass('active');
					mySwiper.trigger('resize', true);
				} else {
					$(this).parents('.prdinfo').addClass('active');
					mySwiper.trigger('resize', true);
				}
			});
			mySwiper.on('change.owl.carousel', function(event) {
				txtMore.parents('.prdinfo').removeClass('active');
				mySwiper.trigger('resize', true);
			});
		});

		var delta = 300;
		var timer = null;
		$(window).on('resize',function(){
		    clearTimeout(timer);
		    timer = setTimeout(resizeDone, delta);
		});
		function resizeDone(){
		    targetSwiper.find('.prdinfo').removeClass('text_over');
		    targetSwiper.find('.prdinfo').find('.btn_more_story').prev('.stit').each(function(){
		    	var $this = $(this);
		    	var $thisParent = $this.parents('.prdinfo');
		    	var $btnMore = $this.next('.btn_more_story');
		    	var thisHeight = $this.height();
				if (!$('body').hasClass('device-pc')) {
					if(thisHeight > 60){
						$thisParent.addClass('text_over');
					}else{
						$thisParent.removeClass('text_over');
					};
				} else {
					if(thisHeight > 100){
						$thisParent.addClass('text_over');
					}else{
						$thisParent.removeClass('text_over');
					};
				}
		    });
		}
		resizeDone();
	}	
	function storySwiper6(){
		var targetSwiper = $('.module_story.story_type6 .sliderwrap .owl-carousel');
		targetSwiper.each(function(index){
			var $this = $(this).parents('.sliderwrap');
			var $thisInfo = $(this).parents('.prdinfo');
			var mySwiper = $(this);
			var chkLen = mySwiper.find('.item').length;
			if (chkLen == 1) $this.addClass('only');
			if (!$this.hasClass('only')) {
				var moduleStory = mySwiper.owlCarousel({
					loop: true,
					autoWidth: false,
					items : 1,
					dots :true
				});
				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			}
			var txtMore = $thisInfo.find('.btn_more_story');
			txtMore.click(function (){
				if ($thisInfo.hasClass('active')) {
					$thisInfo.removeClass('active');
				} else {
					$thisInfo.addClass('active');
				}
			});
		});

		var delta = 300;
		var timer = null;
		$(window).on('resize',function(){
		    clearTimeout(timer);
		    timer = setTimeout(resizeDone, delta);
		});
		function resizeDone(){
		    targetSwiper.parents('.prdinfo').removeClass('text_over');
		    targetSwiper.parents('.prdinfo').find('.btn_more_story').prev('.stit').each(function(){
		    	var $this = $(this);
		    	var $thisParent = $this.parents('.prdinfo');
		    	var $btnMore = $this.next('.btn_more_story');
		    	var thisHeight = $this.height();
				if (!$('body').hasClass('device-pc')) {
					if(thisHeight > 60){
						$thisParent.addClass('text_over');
					}else{
						$thisParent.removeClass('text_over');
					};
				} else {
					if(thisHeight > 100){
						$thisParent.addClass('text_over');
					}else{
						$thisParent.removeClass('text_over');
					};
				}
		    });
		}
		resizeDone();
	}
	if($('.module_story.story_type1 .sliderwrap').length > 0) { storySwiper1(); }
	if($('.module_story.story_type3 .sliderwrap').length > 0) { storySwiper3(); }
	if($('.module_story.story_type4 .sliderwrap').length > 0) { storySwiper4(); }
	if($('.module_story.story_type5 .sliderwrap').length > 0) { storySwiper5(); }
	if($('.module_story.story_type6 .sliderwrap').length > 0) { storySwiper6(); }
	
	/* navigation */
	var NaviInteraction = {
		init : function() {
			this.setElements();
			this.initLayout();
			this.createOffset();
			this.bindEvents();
		},
		setElements : function() {
			this.moduleWrap = $('.module_wrap');
			this.moduleBox = this.moduleWrap.children('.module');
			for ( var i = 0, max= $('.module_navi').length; i<max ;i++ ) {
				this.moduleNav = $('.module_navi').eq(i)
			}
			this.moduleNavItem = this.moduleNav.find('.item');
			this.quickBtns = this.moduleNavItem.find('.navi_anchor').filter(function () {
                var target = $(this),
                    targetHref = target.attr('href');
                if (!$(targetHref).length) return false;
                return true;
            });
			this.moduleNavHeight = this.quickBtns.outerHeight();
			this.moduleNavTop = (this.moduleNav.length) ? this.moduleNav.offset().top : false
			this.classAnchor = 'item-active';
			this.classFixNav = 'fix_navi';
			this.floatArea();
		},
		initLayout : function() {
			this.moduleNav.before('<div class="module_blank" style="width:100%;height:'+this.moduleNavHeight +'px"></div>');
			this.areaNav = $('.module_blank');
			$('.module_blank').hide();
		},
		floatArea : function() {
			var pcH = ($('#core_gnb').is(':visible')) ? $('#core_gnb').outerHeight() - 2 : false //pc
			var moH = ($('.header_wrap').is(':visible')) ? 0 : false //mobile
			var floatHeader = (!$('#core_gnb').is(':visible') && !$('.header_wrap').is(':visible')) ? 0 : false //app
			return pcH + moH + floatHeader;
		},
		createOffset : function () {
			this.offsetArrays = [];
			this.targetAreaEnd = [];
			for (var i = 0, max = this.quickBtns.length; i < max; i++) {
				this.targetArea = $(this.quickBtns.eq(i).attr('href'));
				this.targetAreaEnd.push(this.targetArea.offset().top + this.targetArea.outerHeight() );
				this.offsetArrays.push(this.targetArea.offset().top - this.floatArea() - this.floatArea() - this.moduleNavHeight);
			}
		},
		reFreshOffset : function () {
			this.offsetArrays = [];
			this.targetAreaEnd = [];
			for (var i = 0, max = this.quickBtns.length; i < max; i++) {
				this.targetArea = $(this.quickBtns.eq(i).attr('href'));
				this.targetAreaEnd.push(this.targetArea.offset().top + this.targetArea.outerHeight() );
				this.offsetArrays.push(this.targetArea.offset().top - this.floatArea() - this.floatArea() - this.moduleNavHeight);
			}
		},
		reFresh : function () {
            clearTimeout(this.reFreshOffsetTime);
            this.reFreshOffsetTime = setTimeout($.proxy(this.reFreshOffset, this), 150);
		},
		bindEvents : function(e) {
			$(window).on('scroll', $.proxy(this.scrollFunc, this));
			if ($('body').hasClass('device-pc')) {
				this.quickBtns.on('click', $.proxy(this.naviSticky, this));
			} else {
				this.quickBtns.on('click touch', $.proxy(this.naviSticky, this));
			}
			$('.module_item .btn_more, .module_story .btn_more_story').on('click', $.proxy(this.reFresh, this));
		},
		scrollFunc : function () {
			this.naviFloating();
            clearTimeout(this.scrollEndTime);
            this.scrollEndTime = setTimeout($.proxy(this.scrollEndFunc, this), 150);
		},
        scrollEndFunc : function () {
            var winTop = $(window).scrollTop();
            for (var i = 0, max = this.offsetArrays.length; i < max; i++) {
                if ( this.targetAreaEnd[i] > winTop && winTop >= this.offsetArrays[i]) {
                    this.activeIndex = i;
                } else if (winTop < this.offsetArrays[0]) {
                    this.activeIndex = null;
                }
            }
            this.quickActiveFunc();
			this.scrollTopFunc();
        },
		naviSticky : function(e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            this.currentIndex = this.quickBtns.index(target);
            $('html, body').stop(true,true).animate({
                scrollTop : this.offsetArrays[this.currentIndex] + 2
            },150);
			this.lastActiveMove();
		},
		activeCSS : function () {
			if (this.activeIndex === null) {
                this.quickBtns.parent().removeClass(this.classAnchor);
				this.quickBtns.parent().css('background-color','');
				this.quickBtns.find('.tit').css('opacity','0.7');
				this.quickBtns.find('.tit span').css('border', 'none');
            } else {
                this.quickBtns.parent().removeClass(this.classAnchor);
                this.quickBtns.eq(this.activeIndex).parent().addClass(this.classAnchor);
				if(this.moduleNav.hasClass("type_image")) {
					var h,s,l,dl,hsl,nColor,rgb;
					var nColor = this.moduleNav.css("background-color").toString();
					if(nColor.indexOf("rgb(") >= 0) 
						rgb = this.moduleNav.css("background-color");
					else 
						rgb = hex2Rgb(this.moduleNav.css("background-color").replace("#", ""));

					hsl = rgb2Hsl(rgb);

					h = Number(hsl[0]); 
					s = Number(hsl[1]);
					l = Number(hsl[2]);
					dl = Number(hsl[2]) - 10;
					this.quickBtns.parent().css('background-color', rgb2hex(hslToRgb(h,s,l)));
					this.quickBtns.eq(this.activeIndex).parent().css("background-color", rgb2hex(hslToRgb(h,s,dl)));	
				} else {
					this.quickBtns.find('.tit').css('opacity', '0.7');
					this.quickBtns.find('.tit span').css('border', 'none');
					this.quickBtns.eq(this.activeIndex).find('.tit').css('opacity', '1');
				}
            }
		},
        quickActiveFunc : function () {
			// 활성 아이템 스와이핑 trigger
			if ($('body').hasClass('device-pc')) { //pc
				moduleNavi.trigger("to.owl.carousel", [this.activeIndex-2, 100, true])
			} else { // tablet, mobile
				moduleNavi.trigger("to.owl.carousel", [this.activeIndex-1, 100, true])
			}
			this.activeCSS();
			//this.lastActiveMove();
        },
		lastActiveMove : function() {
			if ($(window).scrollTop() == $(document).height() - $(window).height() ) {
				this.moduleNav.find('.owl-item').find('.item').removeClass(this.classAnchor).css('background-color','');
				this.quickBtns.eq(this.currentIndex).parent().addClass(this.classAnchor);
				if(this.moduleNav.hasClass("type_image")) {
					var h,s,l,dl,hsl,nColor,rgb;
					var nColor = this.moduleNav.css("background-color").toString();
					if(nColor.indexOf("rgb(") >= 0) 
						rgb = this.moduleNav.css("background-color");
					else 
						rgb = hex2Rgb(this.moduleNav.css("background-color").replace("#", ""));

					hsl = rgb2Hsl(rgb);

					h = Number(hsl[0]); 
					s = Number(hsl[1]);
					l = Number(hsl[2]);
					dl = Number(hsl[2]) - 10;
					this.quickBtns.parent().css('background-color', rgb2hex(hslToRgb(h,s,l)));
					this.quickBtns.eq(this.currentIndex).parent().css("background-color", rgb2hex(hslToRgb(h,s,dl)));
				} else {
					this.quickBtns.find('.tit').css('opacity', '0.7');
					this.quickBtns.find('.tit span').css('border', 'none');
					this.quickBtns.eq(this.currentIndex).parent().find('.tit').css('opacity', '1');
				}
				this.activeIndex = this.currentIndex;
				if ($('body').hasClass('device-pc')) { //pc
					moduleNavi.trigger("to.owl.carousel", [this.activeIndex-1, 100, true])
				} else {
					moduleNavi.trigger("to.owl.carousel", [this.activeIndex, 100, true])
				}
			}
		},
		scrollTopFunc : function() {
			if ($(window).scrollTop() <= 1) {
				moduleNavi.trigger("to.owl.carousel", [0, 100, true])
			}
		},
		naviFloating : function() {
			this.winH = $(window).scrollTop();
			this.calFloatingPos = this.winH + this.floatArea()*2;
			if (this.moduleNavTop <= this.calFloatingPos ) {
				this.addFloating();
			} else {
				this.moduleNav.removeClass(this.classFixNav);
				this.removeFloating();
			}
		},
		addFloating : function() {
			this.areaNav.show();
			this.moduleNav.addClass(this.classFixNav);
			this.moduleNav.css({
				top: this.floatArea()
			});
		},
		removeFloating : function() {
			this.areaNav.hide();
			this.moduleNav.removeClass(this.classFixNav);
			this.moduleNav.css({
				top: 'auto'
			});
		}
	}
	$(function () { 
		if ($('.module_navi').length > 0) {
			setTimeout(function(){ 
				NaviInteraction.init(); 
			}, 100);
		}
	});
	
	var moduleNavi;
	function naviSwiper(){
		var targetSwiper = $('.module_navi .sliderwrap2 .owl-carousel');
		var windowWidth = $(window).width();
		targetSwiper.each(function(index) {
			var mySwiper = $(this);
			var $this = $(this).parents('.sliderwrap2');
			moduleNavi = mySwiper.owlCarousel({
				loop: false,
				autoWidth: true,
				responsive: true,
				slideSpeed: 1000,
				mouseDrag : false,
				onInitialized:sizeAndLeftCallbackInit,
				onResized:sizeAndLeftCallback,
				onResize:sizeAndLeftCallback,
				onRefresh:sizeAndLeftCallback
			});

			var navSwiperWidth = mySwiper.find('.owl-stage').width();
			var transOffset = windowWidth - navSwiperWidth;

			function sizeAndLeftCallbackInit(event)
			{
				if($(event.target).parents(".module_navi").hasClass("type_image")) {
					var h,s,l,dl,hsl,nColor,rgb;

					var nColor = $(event.target).parents(".module_navi").css("background-color").toString();
					if(nColor.indexOf("rgb(") >= 0) 
						rgb = $(event.target).parents(".module_navi").css("background-color");
					else 
						rgb = hex2Rgb($(event.target).parents(".module_navi").css("background-color").replace("#", ""));

					hsl = rgb2Hsl(rgb);

					h = Number(hsl[0]); 
					s = Number(hsl[1]);
					l = Number(hsl[2]);
					dl = Number(hsl[2]) - 10;
					$(event.target).find(".item-active").css("background-color", rgb2hex(hslToRgb(h,s,dl)));	

					if ($('body').hasClass('device-pc')) {
						$(event.target).find(".owl-item").bind("mouseover", function() {
							$(this).find(".item").css("background-color", rgb2hex(hslToRgb(h,s,dl)));
						}).bind("mouseout",function() {
							$(this).find(".item").css("background-color", rgb2hex(hslToRgb(h,s,l)));
							$(this).find(".item-active").css("background-color", rgb2hex(hslToRgb(h,s,dl)));	
						});				
					}
				}
				sizeAndLeftCallback(event)
			}

			function sizeAndLeftCallback(event) {
				var sliderLength = event.item.count;
				var sliderWrapWidth = mySwiper.parents(".sliderwrap2").width() + 10;
				if(sliderWrapWidth > 1000) sliderWrapWidth = 1000;
				var itemWidth = 0; 
				var leftMargin = 0;
				var owlStageWidth = 0;
				var thisSwiper = event.target;

				if(mySwiper.parents(".module_navi").hasClass("type_image")) {
					if($("body").hasClass("device-pc")) {
						itemWidth = mySwiper.parents(".module_navi").find(".item").width();
					}
					else if($("body").hasClass("device-tablet")) {
						if(sliderLength <= 3) itemWidth = (sliderWrapWidth / sliderLength);
						else itemWidth = sliderWrapWidth / 6.5;
					}
					else {
						if(sliderLength <= 3) itemWidth = (sliderWrapWidth / sliderLength);
						else itemWidth = sliderWrapWidth / 3.5;
					}

					if($("body").hasClass("device-pc")) {
						if(itemWidth < 125) itemWidth = 125;
					}
					else if($("body").hasClass("device-tablet")) {
						itemWidth = Math.floor(itemWidth);
						if(itemWidth < 125) itemWidth = 125;
						mySwiper.find(".item").css("width", itemWidth + "px");
					}
					else {
						itemWidth = Math.floor(itemWidth);
						if(itemWidth < 84) itemWidth = 84;
						mySwiper.find(".item").css("width", itemWidth + "px");
					}
					
					mySwiper.find(".owl-stage").css("width", (itemWidth*sliderLength) + "px");

					if(sliderWrapWidth > (itemWidth*sliderLength)) {
						mySwiper.find(".owl-stage").css("margin", "0 auto")
						.css("display", "block").css("position", "relative");
					}
				}
				else {
					var itemWidths = 0;
					mySwiper.find(".owl-stage").find(".owl-item").each(function(index) {
						itemWidths += $(this).width();
					});

					//owlStageWidth = mySwiper.find(".owl-stage").width() ? mySwiper.find(".owl-stage").width() : 0;
					owlStageWidth = itemWidths;
					mySwiper.find(".owl-stage").css("width", (owlStageWidth + 10) + "px");
					if(owlStageWidth < sliderWrapWidth) leftMargin = (sliderWrapWidth - owlStageWidth) / 2;

					mySwiper.css("left", leftMargin + "px");
                    
                   
				}

				mySwiper.css("overflow", "initial");

				if(sliderWrapWidth >= mySwiper.find(".owl-stage").width()) 
				{
					mySwiper.parents(".sliderwrap2").find(".btn_prev").hide();
					mySwiper.parents(".sliderwrap2").find(".btn_next").hide();
				}
				else {
					mySwiper.parents(".sliderwrap2").find(".btn_prev").show();
					mySwiper.parents(".sliderwrap2").find(".btn_next").show();
				}

				if(sliderWrapWidth < mySwiper.find(".owl-stage").width()) 
				{
					targetSwiper.on('translated.owl.carousel', function(e) {
						if(!$('body').hasClass('device-pc')){
							var transPosition;
							function trans_pos_check(){
								var sTop = targetSwiper.find('.owl-stage').css('transform');
								var values = sTop.split('(')[1];
								values = values.split(')')[0];
								values = values.split(',');
								transPosition = values[4];
							}
							trans_pos_check();
							if(transPosition < transOffset){
								mySwiper.find('.owl-stage').css('transform','translate3d('+ transOffset +'px,0px,0px)');
                                
							}
						}
					});
				}

			}
			$this.find(".btn_prev").unbind("click").bind("click", function(e) {
				e.preventDefault();
				mySwiper.trigger("prev.owl.carousel");
			});
			$this.find(".btn_next").unbind("click").bind("click", function(e) {
				e.preventDefault();
				mySwiper.trigger("next.owl.carousel");
			});
		});
	}

	function rgb2hex(rgb) {
		if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
	
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	function hex2Rgb(hex) {
		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
	
		return "rgb("+r + "," + g + "," + b+")";
	}

	function rgb2Hsl(rgb){
		var r, g, b;

		if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
		
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		r = rgb[1], g = rgb[2], b = rgb[3];
		r /= 255, g /= 255, b /= 255;

	   var max = Math.max(r, g, b), min = Math.min(r, g, b);
		
	   var h, s, l ;
	   l  = (max + min) / 2;

	   if (max == min) { h = s = 0; } 
	   else {
		   var d = max - min;
		   s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		   switch (max){
			   case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			   case g: h = (b - r) / d + 2; break;
			   case b: h = (r - g) / d + 4; break;
		   }
		   
		   h /= 6;
	   }
	   h = Math.round(h * 360, 1);
	   s = Math.round(s * 100, 1);
	   l = Math.round(l * 100, 1);
	   
	   
	   //return [(h*100+0.5)|0, ((s*100+0.5)|0) + '%', ((l*100+0.5)|0) + '%'];				
	   //return [h, s + '%', l + '%'  ];
	   return [h, s , l ];
   }
   
   
   function hslToRgb(h, s, l){
				   
	   var r, g, b, m, c, x;
	   h = Number(String(h).replace(/[^0-9\.]/gi, ''));
	   s = Number(String(s).replace(/[^0-9\.]/gi, ''));
	   l = Number(String(l).replace(/[^0-9\.]/gi, ''));
	   //console.log("l2: " + l);
	   if (!isFinite(h)) h = 0
	   if (!isFinite(s)) s = 0
	   if (!isFinite(l)) l = 0
	   //console.log("l3: " + l);
		h /= 60
	   if (h < 0) h = 6 - (-h % 6)
	   h %= 6
	   s = Math.max(0, Math.min(1, s / 100))
	   l = Math.max(0, Math.min(1, l / 100))
	   c = (1 - Math.abs((2 * l) - 1)) * s;
	   x = c * (1 - Math.abs((h % 2) - 1));
	   //console.log("l4: " + l);
	   if (h < 1) { 
		   r = c; g = x; b = 0;
	   } else if (h < 2) {
		   r = x; g = c; b = 0;
	   } else if (h < 3) {
		   r = 0; g = c; b = x;
	   } else if (h < 4) {
		   r = 0; g = x; b = c;
	   } else if (h < 5) {
		   r = x; g = 0; b = c;
	   } else {
		   r = c; g = 0; b = x;
	   }
	   m = l - c / 2
	   r = Math.round((r + m) * 255)
	   g = Math.round((g + m) * 255)
	   b = Math.round((b + m) * 255)
	   //console.log( r + " " + g + " " +  b );
					
	   return "rgb(" + r+","+g+","+b+")";
   }

	if($('.module_navi .sliderwrap2').length > 0) { naviSwiper(); }

	/* relation promotion */
	function promSwiper(){
        
		var targetSwiper2 = $('.module_prom .sliderwrap2 .owl-carousel');
		targetSwiper2.each(function(){
			var $this = $(this).parents('.sliderwrap2');
			var mySwiper = $(this);
			if (!(mySwiper.find('.item').length == 2) || !$("body").hasClass("device-pc")) {
				$this.find('.page_num, .btn_prev, .btn_next').show();
				var moduleProm = mySwiper.owlCarousel({
					loop:false,
					responsive:{
						0:{
							autoWidth: true,
							slideBy:1
						},
						1200:{
							slideBy:2,
							dots: true,
							items:2
						}
					},
					onInitialized:sizeAndLeftCallback,
					onResized:sizeAndLeftCallback,
					onResize:sizeAndLeftCallback
				});
				function sizeAndLeftCallback(e) {
					var sliderLength = e.item.count;
					var sliderWrapWidth = $this.width();
					var itemWidth = (sliderWrapWidth / sliderLength);
					var list_width = mySwiper.find('.owl-item').eq(0).width();
					$this.addClass("item_"+sliderLength);
					if($this.hasClass('item_2') && $(window).outerWidth() > 608) {
						mySwiper.find(".owl-stage").css("width", Math.max(sliderWrapWidth, itemWidth*sliderLength) + "px");
						itemWidth = mySwiper.find(".owl-stage").width()/2 - 7;
						mySwiper.find(".item").css("width", itemWidth + "px");
					}
					// page num
					$this.find(".btn_prev").addClass('disabled');
					$this.find('.total').text(Math.round( e.item.count/2));
					targetSwiper2.on('changed.owl.carousel', function(e) {
						if (!e.namespace || e.property.name != 'position') return
						var current =Math.round( e.item.index / 2 +1);
						$('.page_num .current').text(current);
						if (current === e.item.count/2) {
							$this.find(".btn_next").addClass('disabled');
							$this.find(".btn_prev").removeClass('disabled');
						} else if (current === 1) {
							$this.find(".btn_prev").addClass('disabled');
							$this.find(".btn_next").removeClass('disabled');
						};
					});
					targetSwiper2.on('translated.owl.carousel', function(e) {
						var list_length = mySwiper.find('.owl-item').length;
						var window_width = $(window).width();
						var right_align_width = -(mySwiper.find('.owl-stage').width() - (window_width - 7));
						var li_not_selector = mySwiper.find('.owl-item:not(:last)');
						var li_seletor1 = mySwiper.find('.owl-item:nth-last-child(1)');
						var li_seletor2 = mySwiper.find('.owl-item:nth-last-child(2)');
						var li_seletor3 = mySwiper.find('.owl-item:nth-last-child(3)');
						var li_seletor4 = mySwiper.find('.owl-item:nth-last-child(4)');
                        
                 
						if(window_width > list_width*3){
							if(li_seletor1.hasClass('active') && li_seletor2.hasClass('active') && li_seletor3.hasClass('active') && !li_seletor4.hasClass('active')){
								mySwiper.find('.owl-stage').css('transform','translate3d('+ right_align_width +'px,0px,0px)');
                                
                               
							}
						}else if(window_width > list_width*2){
							if(li_seletor1.hasClass('active') && li_seletor2.hasClass('active') && !li_seletor3.hasClass('active')){
								mySwiper.find('.owl-stage').css('transform','translate3d('+ right_align_width +'px,0px,0px)');
                               
							}
						}else{
							if(!li_not_selector.hasClass('active')){
								mySwiper.find('.owl-stage').css('transform','translate3d('+ right_align_width +'px,0px,0px)');
                               
							}
						}
					});
				}
				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			} else {
				$this.find('.page_num, .btn_prev, .btn_next').remove();
			}
		});
	}	
	if($('.module_prom .sliderwrap2').length > 0) { promSwiper(); }

	/* 특가 */
	function saleSwiper(){
		var targetSwiper = $('.module_bigsale .sliderwrap3 > ul').addClass('owl-carousel');
		targetSwiper.each(function(index){
			var $this = $(this).parents('.sliderwrap3');
			var mySwiper = $this.addClass('sale'+index).find('>.owl-carousel');
			if (!($this.find('.daily').length <= 5 && $('body').hasClass('device-pc'))) {
				var moduleSale = mySwiper.owlCarousel({
					loop: false,
					autoWidth: true,
					items : 1,
					dots: false
				}).trigger('to.owl.carousel', [$this.find('.owl-item .active').parent().index()-1, 0]);

				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			} else {
				$this.find('.btn_prev, .btn_next').remove();
			}
		});
	}
	function saleSwiper2(){
		var targetSwiper = $('.module_bigsale .sliderwrap > ul').addClass('owl-carousel');
		targetSwiper.each(function(index){
			var $this = $(this).parents('.sliderwrap');
			var mySwiper = $this.addClass('sale2-'+index).find('>.owl-carousel');
			if ($this.find('.group_prd').length > 1) {
				var moduleSale = mySwiper.owlCarousel({
					loop: true,
					autoWidth: false,
					items : 1,
					dots: (!$('body').hasClass('device-pc')) ? true : false
				});

				$this.find(".btn_prev").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("prev.owl.carousel");
				});
				$this.find(".btn_next").unbind("click").bind("click", function(e) {
					e.preventDefault();
					mySwiper.trigger("next.owl.carousel");
				});
				mySwiper.on('change.owl.carousel', function(e) {
					$(window).trigger("scroll");
				});
			} else {
				$this.find('.btn_prev, .btn_next').remove();
			}
		});
	}
	if($('.module_bigsale .sliderwrap3').length > 0) { saleSwiper(); }
	if($('.module_bigsale .sliderwrap').length > 0) { saleSwiper2(); }

    /* 쿠폰 */
	function couponSwiper(){
		var targetSwiper = $('.module_coupon.coupon_type1 .sliderwrap .owl-carousel');
        
		targetSwiper.each(function(){
           
			var $this = $(this).parents('.sliderwrap'),
				mySwiper = $(this),
				chkLen = mySwiper.find('.item').length,
                initParam = {
                    loop: false,
                    mouseDrag : false,
                    responsive:{
                        1200:{
                            slideBy: 2,
                            autoWidth: false,
                            items: 2,
                            dots: true,
                            nav: true
                        },
                        768: {
                            dots: true,
                            items: 2,
                            autoWidth: true
                        },
                        0 : {
                            autoWidth: true,
                            items: 1,
                            center: true
                        }
                    }
                };

            chkLen == 1 ? $this.addClass('only') : mySwiper.owlCarousel(initParam);
			chkLen == 2 ? $this.addClass('item2') : null;
		});
	}
    
    //$('.module_coupon.coupon_type1 .sliderwrap').css("border" , "1px solid red")
    
	if($('.module_coupon.coupon_type1 .sliderwrap').length > 0) {        
        couponSwiper();
	}
}
moduleSwiper();

function addItem(){
	$('.btn_more').on( 'click', function() {
		wElem();
		$(window).trigger("scroll");
	});
	function wElem(){
		if($('.module_item').hasClass('filter_view-change_deal')){
			$('.filter_view-change_deal .elements_item').each(function() {
				var lwidth = $(this).find('.delivery span').width()+Number($(this).find('.delivery').css('paddingLeft').replace("px", ""));
				$(this).find('.add-info').css('left',lwidth);
			});
		}
	}
	wElem();
	$(window).resize(function(){
		wElem();
	});
}

var noticeVideo = function() {
	var _this = $('.module_video .notice_data');
	_this.find('.confirm').click(function() {
		_this.fadeOut('fast');
	});
}

var blurrImg = function () {
	$('.top_banner.blur img').wrap('<div class="blurbx"></div>');	
	var blurArry = $('.top_banner.blur .blurbx');
	for ( var i = 0, max= blurArry.length; i<max; i++ ) {
		var _this = blurArry.eq(i);
		var _thisImg = _this.find('img').attr('src');
		_this.attr('data-href', _thisImg);
		_this.blurr({
			height: '100%',
			sharpness: 95,
			callback: null
		});
	}
	$('.autoimg .top_banner img').wrap('<div class="blurbx"></div>');
	var blurArry2 = $('.autoimg .top_banner .blurbx');
	for ( var i = 0, max= blurArry2.length; i<max; i++ ) {
		var _this = blurArry2.eq(i);
		var _thisImg = _this.find('img').attr('src');
		_this.attr('data-href', _thisImg);
		_this.blurr({
			height: '100%',
			sharpness: 95,
			callback: null
		});
	}
}

window.ieOnLoadEvent = {
	init : function(){
		this.setElements();
		this.initLayout();
	},
	setElements : function(){
		this.tempWrap = $('.module');
	},
	initLayout : function(){
		// this.tempWrap.find('.tit span').css('width','auto');
		this.tempWrap.find('.head_tit span').css('width','auto');
		$('.module_prom').find('.sliderwrap2 .stit span').css('width','auto');
	}
}

$(document).ready(function(){
	window.ieOnLoadEvent.init();
	blurrImg();
	addItem();
	noticeVideo();
	cpLayerFunc.init();
});

$(window).resize(function(){
	deviceCheck();
});

$(window).load(function(){
	$(".module_wrap img").lazyload({
		effect: "fadeIn",
		threshold : 1000,
		failure_limit : 10
	});
});
