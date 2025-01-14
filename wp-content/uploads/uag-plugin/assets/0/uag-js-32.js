document.addEventListener("DOMContentLoaded", function(){ window.addEventListener( 'load', function() {
	UAGBCounter.init( '.uagb-block-e6f5bf6c', {"layout":"number","heading":"Year Of Experience","numberPrefix":"","numberSuffix":"+","startNumber":0,"endNumber":12,"totalNumber":100,"decimalPlaces":0,"animationDuration":1500,"thousandSeparator":",","circleSize":230,"circleStokeSize":8,"isFrontend":true} );
});
				window.addEventListener( 'DOMContentLoaded', function() {
					const scope = document.querySelector( '.uagb-block-a16a7725' );
					if ( scope ){
						if ( scope.children[0].classList.contains( 'spectra-image-gallery__layout--masonry' ) ) {
							// Add timeout for the images to load.
							setTimeout( function() {
								const element = scope.querySelector( '.spectra-image-gallery__layout--masonry' );
								const isotope = new Isotope( element, {
									itemSelector: '.spectra-image-gallery__media-wrapper--isotope',
									percentPosition: true,
								} );
								imagesLoaded( element ).on( 'progress', function() {
									isotope.layout();
								});
								imagesLoaded( element ).on( 'always', function() {
									element.parentNode.style.visibility = 'visible';
								});
								UAGBImageGalleryMasonry.init( {"block_id":"a16a7725","classMigrate":true,"readyToRender":true,"tileSize":218,"mediaGallery":[{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/464475539_8493908874024053_2062765657774756386_n1.jpg","height":1106,"width":873,"orientation":"portrait"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":690,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/464475539_8493908874024053_2062765657774756386_n1.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/464475539_8493908874024053_2062765657774756386_n1\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/277253930_4924701910944785_4382205761829635155_n.jpg","height":853,"width":1280,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":685,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/277253930_4924701910944785_4382205761829635155_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/277253930_4924701910944785_4382205761829635155_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_357ed02e.jpg","height":866,"width":1024,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":10,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_357ed02e.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/whatsapp-image-2024-10-25-at-07-07-53_357ed02e\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Untitled-88-5.jpg","height":430,"width":650,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":12,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Untitled-88-5.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/untitled-88-5\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/440581919_7453653381382946_8762947325902773538_n.jpg","height":853,"width":1280,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":708,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/440581919_7453653381382946_8762947325902773538_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/440581919_7453653381382946_8762947325902773538_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/471262707_8843379232410347_2121922968161145039_n.jpg","height":1004,"width":1504,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":711,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/471262707_8843379232410347_2121922968161145039_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/471262707_8843379232410347_2121922968161145039_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Screenshot-2024-10-26-082843.png","height":501,"width":697,"orientation":"landscape"}},"mime":"image\/png","type":"image","subtype":"png","id":8,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Screenshot-2024-10-26-082843.png","alt":"","link":"http:\/\/localhost\/keerthi\/screenshot-2024-10-26-082843\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404918731_851610326967670_4449979743888819366_n.jpg","height":1536,"width":2048,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":712,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404918731_851610326967670_4449979743888819366_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/404918731_851610326967670_4449979743888819366_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_74a70002.jpg","height":1024,"width":682,"orientation":"portrait"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":9,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_74a70002.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/whatsapp-image-2024-10-25-at-07-07-53_74a70002\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/470234292_8788523767895894_6861906861019511671_n.jpg","height":999,"width":1065,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":732,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/470234292_8788523767895894_6861906861019511671_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/470234292_8788523767895894_6861906861019511671_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/461740548_8389714951110113_3939172945093025380_n.jpg","height":1066,"width":1600,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":733,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/461740548_8389714951110113_3939172945093025380_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/461740548_8389714951110113_3939172945093025380_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404315727_6802748329806791_6762531657266677609_n.jpg","height":2048,"width":1741,"orientation":"portrait"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":739,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404315727_6802748329806791_6762531657266677609_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/404315727_6802748329806791_6762531657266677609_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362297619_6385914684823493_8596335299672042246_n.jpg","height":480,"width":720,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":741,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362297619_6385914684823493_8596335299672042246_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/362297619_6385914684823493_8596335299672042246_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362285488_6385914158156879_8786782937418594285_n.jpg","height":422,"width":662,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":753,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362285488_6385914158156879_8786782937418594285_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/362285488_6385914158156879_8786782937418594285_n\/","caption":""}],"mediaIDs":[690,685,10,12,708,711,8,712,9,732,733,739,741,753],"feedLayout":"masonry","imageDisplayCaption":false,"galleryImageSize":"full","galleryImageSizeTablet":"full","galleryImageSizeMobile":"full","imageClickEvent":"lightbox","lightboxIconSizeMobile":48,"feedMarginTop":0,"feedMarginRight":0,"feedMarginBottom":0,"feedMarginLeft":0,"paginateUseLoader":false,"focusList":[],"focusListObject":[],"disableLazyLoad":false,"lightboxDisplayCaptions":false,"lightboxThumbnails":false,"lightboxDisplayCount":false,"lightboxCloseIcon":"xmark","lightboxCaptionHeight":50,"lightboxCaptionHeightTablet":"","lightboxCaptionHeightMobile":"","lightboxIconSize":24,"lightboxIconSizeTablet":"","captionVisibility":"hover","captionDisplayType":"overlay","imageCaptionAlignment":"center center","imageCaptionAlignment01":"center","imageCaptionAlignment02":"center","imageDefaultCaption":"No Caption","captionPaddingTop":8,"captionPaddingRight":8,"captionPaddingBottom":8,"captionPaddingLeft":8,"captionPaddingTopTab":8,"captionPaddingRightTab":8,"captionPaddingBottomTab":8,"captionPaddingLeftTab":8,"captionPaddingTopMob":8,"captionPaddingRightMob":8,"captionPaddingBottomMob":8,"captionPaddingLeftMob":8,"captionPaddingUnit":"px","captionPaddingUnitTab":"px","captionPaddingUnitMob":"px","captionPaddingUnitLink":true,"captionGap":0,"captionGapUnit":"px","columnsDesk":3,"columnsTab":3,"columnsMob":2,"gridImageGap":8,"gridImageGapTab":"","gridImageGapMob":"","gridImageGapUnit":"px","gridImageGapUnitTab":"px","gridImageGapUnitMob":"px","feedMarginTopTab":"","feedMarginRightTab":"","feedMarginBottomTab":"","feedMarginLeftTab":"","feedMarginTopMob":"","feedMarginRightMob":"","feedMarginBottomMob":"","feedMarginLeftMob":"","feedMarginUnit":"px","feedMarginUnitTab":"px","feedMarginUnitMob":"px","feedMarginUnitLink":true,"carouselStartAt":0,"carouselSquares":false,"carouselLoop":true,"carouselAutoplay":true,"carouselAutoplaySpeed":2000,"carouselPauseOnHover":true,"carouselTransitionSpeed":500,"gridPages":1,"gridPageNumber":1,"feedPagination":false,"paginateUseArrows":true,"paginateUseDots":true,"paginateLimit":9,"paginateButtonAlign":"center","paginateButtonText":"Load More Images","paginateButtonPaddingTop":"","paginateButtonPaddingRight":"","paginateButtonPaddingBottom":"","paginateButtonPaddingLeft":"","paginateButtonPaddingTopTab":"","paginateButtonPaddingRightTab":"","paginateButtonPaddingBottomTab":"","paginateButtonPaddingLeftTab":"","paginateButtonPaddingTopMob":"","paginateButtonPaddingRightMob":"","paginateButtonPaddingBottomMob":"","paginateButtonPaddingLeftMob":"","paginateButtonPaddingUnit":"px","paginateButtonPaddingUnitTab":"px","paginateButtonPaddingUnitMob":"px","paginateButtonPaddingUnitLink":true,"imageEnableZoom":true,"imageZoomType":"zoom-in","captionBackgroundEnableBlur":false,"captionBackgroundBlurAmount":0,"captionBackgroundBlurAmountHover":5,"lightboxEdgeDistance":10,"lightboxEdgeDistanceTablet":"","lightboxEdgeDistanceMobile":"","lightboxBackgroundEnableBlur":true,"lightboxBackgroundBlurAmount":5,"lightboxBackgroundColor":"rgba(0,0,0,0.75)","lightboxIconColor":"rgba(255,255,255,1)","lightboxCaptionColor":"rgba(255,255,255,1)","lightboxCaptionBackgroundColor":"rgba(0,0,0,1)","captionLoadGoogleFonts":false,"captionFontFamily":"Default","captionFontWeight":"","captionFontStyle":"normal","captionTransform":"","captionDecoration":"none","captionFontSizeType":"px","captionFontSize":"","captionFontSizeTab":"","captionFontSizeMob":"","captionLineHeightType":"em","captionLineHeight":"","captionLineHeightTab":"","captionLineHeightMob":"","loadMoreLoadGoogleFonts":false,"loadMoreFontFamily":"Default","loadMoreFontWeight":"","loadMoreFontStyle":"normal","loadMoreTransform":"","loadMoreDecoration":"none","loadMoreFontSizeType":"px","loadMoreFontSize":"","loadMoreFontSizeTab":"","loadMoreFontSizeMob":"","loadMoreLineHeightType":"em","loadMoreLineHeight":"","loadMoreLineHeightTab":"","loadMoreLineHeightMob":"","lightboxLoadGoogleFonts":false,"lightboxFontFamily":"Default","lightboxFontWeight":"","lightboxFontStyle":"normal","lightboxTransform":"","lightboxDecoration":"none","lightboxFontSizeType":"px","lightboxFontSize":"","lightboxFontSizeTab":"","lightboxFontSizeMob":"","lightboxLineHeightType":"em","lightboxLineHeight":"","lightboxLineHeightTab":"","lightboxLineHeightMob":"","captionBackgroundEffect":"none","captionBackgroundEffectHover":"none","captionBackgroundEffectAmount":100,"captionBackgroundEffectAmountHover":0,"captionColor":"rgba(255,255,255,1)","captionColorHover":"rgba(255,255,255,1)","captionBackgroundColor":"rgba(0,0,0,0.75)","captionBackgroundColorHover":"rgba(0,0,0,0.75)","overlayColor":"rgba(0,0,0,0)","overlayColorHover":"rgba(0,0,0,0)","captionSeparateColors":false,"paginateArrowDistance":-24,"paginateArrowDistanceUnit":"px","paginateArrowSize":24,"paginateDotDistance":8,"paginateDotDistanceUnit":"px","paginateLoaderSize":18,"paginateButtonTextColor":"","paginateButtonTextColorHover":"","paginateColor":"","paginateColorHover":"","imageBoxShadowColor":"","imageBoxShadowHOffset":0,"imageBoxShadowVOffset":0,"imageBoxShadowBlur":"","imageBoxShadowSpread":"","imageBoxShadowPosition":"outset","imageBoxShadowColorHover":"","imageBoxShadowHOffsetHover":0,"imageBoxShadowVOffsetHover":0,"imageBoxShadowBlurHover":"","imageBoxShadowSpreadHover":"","imageBoxShadowPositionHover":"outset","arrowBorderTopWidth":4,"arrowBorderLeftWidth":4,"arrowBorderRightWidth":4,"arrowBorderBottomWidth":4,"arrowBorderTopLeftRadius":50,"arrowBorderTopRightRadius":50,"arrowBorderBottomLeftRadius":50,"arrowBorderBottomRightRadius":50,"arrowBorderRadiusUnit":"px","arrowBorderTopWidthTablet":"","arrowBorderLeftWidthTablet":"","arrowBorderRightWidthTablet":"","arrowBorderBottomWidthTablet":"","arrowBorderTopLeftRadiusTablet":"","arrowBorderTopRightRadiusTablet":"","arrowBorderBottomLeftRadiusTablet":"","arrowBorderBottomRightRadiusTablet":"","arrowBorderRadiusUnitTablet":"px","arrowBorderTopWidthMobile":"","arrowBorderLeftWidthMobile":"","arrowBorderRightWidthMobile":"","arrowBorderBottomWidthMobile":"","arrowBorderTopLeftRadiusMobile":"","arrowBorderTopRightRadiusMobile":"","arrowBorderBottomLeftRadiusMobile":"","arrowBorderBottomRightRadiusMobile":"","arrowBorderRadiusUnitMobile":"px","arrowBorderStyle":"none","arrowBorderColor":"","arrowBorderHColor":"","btnBorderTopWidth":"","btnBorderLeftWidth":"","btnBorderRightWidth":"","btnBorderBottomWidth":"","btnBorderTopLeftRadius":"","btnBorderTopRightRadius":"","btnBorderBottomLeftRadius":"","btnBorderBottomRightRadius":"","btnBorderRadiusUnit":"px","btnBorderTopWidthTablet":"","btnBorderLeftWidthTablet":"","btnBorderRightWidthTablet":"","btnBorderBottomWidthTablet":"","btnBorderTopLeftRadiusTablet":"","btnBorderTopRightRadiusTablet":"","btnBorderBottomLeftRadiusTablet":"","btnBorderBottomRightRadiusTablet":"","btnBorderRadiusUnitTablet":"px","btnBorderTopWidthMobile":"","btnBorderLeftWidthMobile":"","btnBorderRightWidthMobile":"","btnBorderBottomWidthMobile":"","btnBorderTopLeftRadiusMobile":"","btnBorderTopRightRadiusMobile":"","btnBorderBottomLeftRadiusMobile":"","btnBorderBottomRightRadiusMobile":"","btnBorderRadiusUnitMobile":"px","btnBorderStyle":"","btnBorderColor":"","btnBorderHColor":"","imageBorderTopWidth":"","imageBorderLeftWidth":"","imageBorderRightWidth":"","imageBorderBottomWidth":"","imageBorderTopLeftRadius":"","imageBorderTopRightRadius":"","imageBorderBottomLeftRadius":"","imageBorderBottomRightRadius":"","imageBorderRadiusUnit":"px","imageBorderTopWidthTablet":"","imageBorderLeftWidthTablet":"","imageBorderRightWidthTablet":"","imageBorderBottomWidthTablet":"","imageBorderTopLeftRadiusTablet":"","imageBorderTopRightRadiusTablet":"","imageBorderBottomLeftRadiusTablet":"","imageBorderBottomRightRadiusTablet":"","imageBorderRadiusUnitTablet":"px","imageBorderTopWidthMobile":"","imageBorderLeftWidthMobile":"","imageBorderRightWidthMobile":"","imageBorderBottomWidthMobile":"","imageBorderTopLeftRadiusMobile":"","imageBorderTopRightRadiusMobile":"","imageBorderBottomLeftRadiusMobile":"","imageBorderBottomRightRadiusMobile":"","imageBorderRadiusUnitMobile":"px","imageBorderStyle":"","imageBorderColor":"","imageBorderHColor":"","mainTitleBorderTopWidth":2,"mainTitleBorderLeftWidth":0,"mainTitleBorderRightWidth":0,"mainTitleBorderBottomWidth":2,"mainTitleBorderTopLeftRadius":"","mainTitleBorderTopRightRadius":"","mainTitleBorderBottomLeftRadius":"","mainTitleBorderBottomRightRadius":"","mainTitleBorderRadiusUnit":"px","mainTitleBorderTopWidthTablet":"","mainTitleBorderLeftWidthTablet":"","mainTitleBorderRightWidthTablet":"","mainTitleBorderBottomWidthTablet":"","mainTitleBorderTopLeftRadiusTablet":"","mainTitleBorderTopRightRadiusTablet":"","mainTitleBorderBottomLeftRadiusTablet":"","mainTitleBorderBottomRightRadiusTablet":"","mainTitleBorderRadiusUnitTablet":"px","mainTitleBorderTopWidthMobile":"","mainTitleBorderLeftWidthMobile":"","mainTitleBorderRightWidthMobile":"","mainTitleBorderBottomWidthMobile":"","mainTitleBorderTopLeftRadiusMobile":"","mainTitleBorderTopRightRadiusMobile":"","mainTitleBorderBottomLeftRadiusMobile":"","mainTitleBorderBottomRightRadiusMobile":"","mainTitleBorderRadiusUnitMobile":"px","mainTitleBorderStyle":"","mainTitleBorderColor":"","mainTitleBorderHColor":""}, '.uagb-block-a16a7725', {"lazy":true,"slidesPerView":1,"navigation":{"nextEl":".uagb-block-a16a7725+.spectra-image-gallery__control-lightbox .swiper-button-next","prevEl":".uagb-block-a16a7725+.spectra-image-gallery__control-lightbox .swiper-button-prev"},"keyboard":{"enabled":true}}, [] );
								UAGBImageGalleryMasonry.initByOffset( element, isotope );
							}, 500 );
						}
					}
				});
							window.addEventListener( 'DOMContentLoaded', () => {
					const blockScope = document.querySelector( '.uagb-block-a16a7725' );
					if ( ! blockScope ) {
						return;
					}

										blockScope.addEventListener('keydown', (event) => {
						if ( 13 === event.keyCode || 32 === event.keyCode ) {
														blockScope.click();
						}
					} );

					let lightboxSwiper = null;
					let thumbnailSwiper = null;

										let lightboxSettings = {"lazy":true,"slidesPerView":1,"navigation":{"nextEl":".uagb-block-a16a7725+.spectra-image-gallery__control-lightbox .swiper-button-next","prevEl":".uagb-block-a16a7725+.spectra-image-gallery__control-lightbox .swiper-button-prev"},"keyboard":{"enabled":true}};
															lightboxSwiper = new Swiper( ".uagb-block-a16a7725+.spectra-image-gallery__control-lightbox .spectra-image-gallery__control-lightbox--main",
						{"lazy":true,"slidesPerView":1,"navigation":{"nextEl":".uagb-block-a16a7725+.spectra-image-gallery__control-lightbox .swiper-button-next","prevEl":".uagb-block-a16a7725+.spectra-image-gallery__control-lightbox .swiper-button-prev"},"keyboard":{"enabled":true}}					);
					loadLightBoxImages( blockScope, lightboxSwiper, null, {"block_id":"a16a7725","classMigrate":true,"readyToRender":true,"tileSize":218,"mediaGallery":[{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/464475539_8493908874024053_2062765657774756386_n1.jpg","height":1106,"width":873,"orientation":"portrait"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":690,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/464475539_8493908874024053_2062765657774756386_n1.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/464475539_8493908874024053_2062765657774756386_n1\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/277253930_4924701910944785_4382205761829635155_n.jpg","height":853,"width":1280,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":685,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/277253930_4924701910944785_4382205761829635155_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/277253930_4924701910944785_4382205761829635155_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_357ed02e.jpg","height":866,"width":1024,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":10,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_357ed02e.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/whatsapp-image-2024-10-25-at-07-07-53_357ed02e\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Untitled-88-5.jpg","height":430,"width":650,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":12,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Untitled-88-5.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/untitled-88-5\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/440581919_7453653381382946_8762947325902773538_n.jpg","height":853,"width":1280,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":708,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/440581919_7453653381382946_8762947325902773538_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/440581919_7453653381382946_8762947325902773538_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/471262707_8843379232410347_2121922968161145039_n.jpg","height":1004,"width":1504,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":711,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/471262707_8843379232410347_2121922968161145039_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/471262707_8843379232410347_2121922968161145039_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Screenshot-2024-10-26-082843.png","height":501,"width":697,"orientation":"landscape"}},"mime":"image\/png","type":"image","subtype":"png","id":8,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/Screenshot-2024-10-26-082843.png","alt":"","link":"http:\/\/localhost\/keerthi\/screenshot-2024-10-26-082843\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404918731_851610326967670_4449979743888819366_n.jpg","height":1536,"width":2048,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":712,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404918731_851610326967670_4449979743888819366_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/404918731_851610326967670_4449979743888819366_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_74a70002.jpg","height":1024,"width":682,"orientation":"portrait"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":9,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2024\/10\/WhatsApp-Image-2024-10-25-at-07.07.53_74a70002.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/whatsapp-image-2024-10-25-at-07-07-53_74a70002\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/470234292_8788523767895894_6861906861019511671_n.jpg","height":999,"width":1065,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":732,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/470234292_8788523767895894_6861906861019511671_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/470234292_8788523767895894_6861906861019511671_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/461740548_8389714951110113_3939172945093025380_n.jpg","height":1066,"width":1600,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":733,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/461740548_8389714951110113_3939172945093025380_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/461740548_8389714951110113_3939172945093025380_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404315727_6802748329806791_6762531657266677609_n.jpg","height":2048,"width":1741,"orientation":"portrait"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":739,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/404315727_6802748329806791_6762531657266677609_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/404315727_6802748329806791_6762531657266677609_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362297619_6385914684823493_8596335299672042246_n.jpg","height":480,"width":720,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":741,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362297619_6385914684823493_8596335299672042246_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/362297619_6385914684823493_8596335299672042246_n\/","caption":""},{"sizes":{"full":{"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362285488_6385914158156879_8786782937418594285_n.jpg","height":422,"width":662,"orientation":"landscape"}},"mime":"image\/jpeg","type":"image","subtype":"jpeg","id":753,"url":"http:\/\/localhost\/keerthi\/wp-content\/uploads\/2025\/01\/362285488_6385914158156879_8786782937418594285_n.jpg","alt":"","link":"http:\/\/localhost\/keerthi\/home-2\/362285488_6385914158156879_8786782937418594285_n\/","caption":""}],"mediaIDs":[690,685,10,12,708,711,8,712,9,732,733,739,741,753],"feedLayout":"masonry","imageDisplayCaption":false,"galleryImageSize":"full","galleryImageSizeTablet":"full","galleryImageSizeMobile":"full","imageClickEvent":"lightbox","lightboxIconSizeMobile":48,"feedMarginTop":0,"feedMarginRight":0,"feedMarginBottom":0,"feedMarginLeft":0,"paginateUseLoader":false,"focusList":[],"focusListObject":[],"disableLazyLoad":false,"lightboxDisplayCaptions":false,"lightboxThumbnails":false,"lightboxDisplayCount":false,"lightboxCloseIcon":"xmark","lightboxCaptionHeight":50,"lightboxCaptionHeightTablet":"","lightboxCaptionHeightMobile":"","lightboxIconSize":24,"lightboxIconSizeTablet":"","captionVisibility":"hover","captionDisplayType":"overlay","imageCaptionAlignment":"center center","imageCaptionAlignment01":"center","imageCaptionAlignment02":"center","imageDefaultCaption":"No Caption","captionPaddingTop":8,"captionPaddingRight":8,"captionPaddingBottom":8,"captionPaddingLeft":8,"captionPaddingTopTab":8,"captionPaddingRightTab":8,"captionPaddingBottomTab":8,"captionPaddingLeftTab":8,"captionPaddingTopMob":8,"captionPaddingRightMob":8,"captionPaddingBottomMob":8,"captionPaddingLeftMob":8,"captionPaddingUnit":"px","captionPaddingUnitTab":"px","captionPaddingUnitMob":"px","captionPaddingUnitLink":true,"captionGap":0,"captionGapUnit":"px","columnsDesk":3,"columnsTab":3,"columnsMob":2,"gridImageGap":8,"gridImageGapTab":"","gridImageGapMob":"","gridImageGapUnit":"px","gridImageGapUnitTab":"px","gridImageGapUnitMob":"px","feedMarginTopTab":"","feedMarginRightTab":"","feedMarginBottomTab":"","feedMarginLeftTab":"","feedMarginTopMob":"","feedMarginRightMob":"","feedMarginBottomMob":"","feedMarginLeftMob":"","feedMarginUnit":"px","feedMarginUnitTab":"px","feedMarginUnitMob":"px","feedMarginUnitLink":true,"carouselStartAt":0,"carouselSquares":false,"carouselLoop":true,"carouselAutoplay":true,"carouselAutoplaySpeed":2000,"carouselPauseOnHover":true,"carouselTransitionSpeed":500,"gridPages":1,"gridPageNumber":1,"feedPagination":false,"paginateUseArrows":true,"paginateUseDots":true,"paginateLimit":9,"paginateButtonAlign":"center","paginateButtonText":"Load More Images","paginateButtonPaddingTop":"","paginateButtonPaddingRight":"","paginateButtonPaddingBottom":"","paginateButtonPaddingLeft":"","paginateButtonPaddingTopTab":"","paginateButtonPaddingRightTab":"","paginateButtonPaddingBottomTab":"","paginateButtonPaddingLeftTab":"","paginateButtonPaddingTopMob":"","paginateButtonPaddingRightMob":"","paginateButtonPaddingBottomMob":"","paginateButtonPaddingLeftMob":"","paginateButtonPaddingUnit":"px","paginateButtonPaddingUnitTab":"px","paginateButtonPaddingUnitMob":"px","paginateButtonPaddingUnitLink":true,"imageEnableZoom":true,"imageZoomType":"zoom-in","captionBackgroundEnableBlur":false,"captionBackgroundBlurAmount":0,"captionBackgroundBlurAmountHover":5,"lightboxEdgeDistance":10,"lightboxEdgeDistanceTablet":"","lightboxEdgeDistanceMobile":"","lightboxBackgroundEnableBlur":true,"lightboxBackgroundBlurAmount":5,"lightboxBackgroundColor":"rgba(0,0,0,0.75)","lightboxIconColor":"rgba(255,255,255,1)","lightboxCaptionColor":"rgba(255,255,255,1)","lightboxCaptionBackgroundColor":"rgba(0,0,0,1)","captionLoadGoogleFonts":false,"captionFontFamily":"Default","captionFontWeight":"","captionFontStyle":"normal","captionTransform":"","captionDecoration":"none","captionFontSizeType":"px","captionFontSize":"","captionFontSizeTab":"","captionFontSizeMob":"","captionLineHeightType":"em","captionLineHeight":"","captionLineHeightTab":"","captionLineHeightMob":"","loadMoreLoadGoogleFonts":false,"loadMoreFontFamily":"Default","loadMoreFontWeight":"","loadMoreFontStyle":"normal","loadMoreTransform":"","loadMoreDecoration":"none","loadMoreFontSizeType":"px","loadMoreFontSize":"","loadMoreFontSizeTab":"","loadMoreFontSizeMob":"","loadMoreLineHeightType":"em","loadMoreLineHeight":"","loadMoreLineHeightTab":"","loadMoreLineHeightMob":"","lightboxLoadGoogleFonts":false,"lightboxFontFamily":"Default","lightboxFontWeight":"","lightboxFontStyle":"normal","lightboxTransform":"","lightboxDecoration":"none","lightboxFontSizeType":"px","lightboxFontSize":"","lightboxFontSizeTab":"","lightboxFontSizeMob":"","lightboxLineHeightType":"em","lightboxLineHeight":"","lightboxLineHeightTab":"","lightboxLineHeightMob":"","captionBackgroundEffect":"none","captionBackgroundEffectHover":"none","captionBackgroundEffectAmount":100,"captionBackgroundEffectAmountHover":0,"captionColor":"rgba(255,255,255,1)","captionColorHover":"rgba(255,255,255,1)","captionBackgroundColor":"rgba(0,0,0,0.75)","captionBackgroundColorHover":"rgba(0,0,0,0.75)","overlayColor":"rgba(0,0,0,0)","overlayColorHover":"rgba(0,0,0,0)","captionSeparateColors":false,"paginateArrowDistance":-24,"paginateArrowDistanceUnit":"px","paginateArrowSize":24,"paginateDotDistance":8,"paginateDotDistanceUnit":"px","paginateLoaderSize":18,"paginateButtonTextColor":"","paginateButtonTextColorHover":"","paginateColor":"","paginateColorHover":"","imageBoxShadowColor":"","imageBoxShadowHOffset":0,"imageBoxShadowVOffset":0,"imageBoxShadowBlur":"","imageBoxShadowSpread":"","imageBoxShadowPosition":"outset","imageBoxShadowColorHover":"","imageBoxShadowHOffsetHover":0,"imageBoxShadowVOffsetHover":0,"imageBoxShadowBlurHover":"","imageBoxShadowSpreadHover":"","imageBoxShadowPositionHover":"outset","arrowBorderTopWidth":4,"arrowBorderLeftWidth":4,"arrowBorderRightWidth":4,"arrowBorderBottomWidth":4,"arrowBorderTopLeftRadius":50,"arrowBorderTopRightRadius":50,"arrowBorderBottomLeftRadius":50,"arrowBorderBottomRightRadius":50,"arrowBorderRadiusUnit":"px","arrowBorderTopWidthTablet":"","arrowBorderLeftWidthTablet":"","arrowBorderRightWidthTablet":"","arrowBorderBottomWidthTablet":"","arrowBorderTopLeftRadiusTablet":"","arrowBorderTopRightRadiusTablet":"","arrowBorderBottomLeftRadiusTablet":"","arrowBorderBottomRightRadiusTablet":"","arrowBorderRadiusUnitTablet":"px","arrowBorderTopWidthMobile":"","arrowBorderLeftWidthMobile":"","arrowBorderRightWidthMobile":"","arrowBorderBottomWidthMobile":"","arrowBorderTopLeftRadiusMobile":"","arrowBorderTopRightRadiusMobile":"","arrowBorderBottomLeftRadiusMobile":"","arrowBorderBottomRightRadiusMobile":"","arrowBorderRadiusUnitMobile":"px","arrowBorderStyle":"none","arrowBorderColor":"","arrowBorderHColor":"","btnBorderTopWidth":"","btnBorderLeftWidth":"","btnBorderRightWidth":"","btnBorderBottomWidth":"","btnBorderTopLeftRadius":"","btnBorderTopRightRadius":"","btnBorderBottomLeftRadius":"","btnBorderBottomRightRadius":"","btnBorderRadiusUnit":"px","btnBorderTopWidthTablet":"","btnBorderLeftWidthTablet":"","btnBorderRightWidthTablet":"","btnBorderBottomWidthTablet":"","btnBorderTopLeftRadiusTablet":"","btnBorderTopRightRadiusTablet":"","btnBorderBottomLeftRadiusTablet":"","btnBorderBottomRightRadiusTablet":"","btnBorderRadiusUnitTablet":"px","btnBorderTopWidthMobile":"","btnBorderLeftWidthMobile":"","btnBorderRightWidthMobile":"","btnBorderBottomWidthMobile":"","btnBorderTopLeftRadiusMobile":"","btnBorderTopRightRadiusMobile":"","btnBorderBottomLeftRadiusMobile":"","btnBorderBottomRightRadiusMobile":"","btnBorderRadiusUnitMobile":"px","btnBorderStyle":"","btnBorderColor":"","btnBorderHColor":"","imageBorderTopWidth":"","imageBorderLeftWidth":"","imageBorderRightWidth":"","imageBorderBottomWidth":"","imageBorderTopLeftRadius":"","imageBorderTopRightRadius":"","imageBorderBottomLeftRadius":"","imageBorderBottomRightRadius":"","imageBorderRadiusUnit":"px","imageBorderTopWidthTablet":"","imageBorderLeftWidthTablet":"","imageBorderRightWidthTablet":"","imageBorderBottomWidthTablet":"","imageBorderTopLeftRadiusTablet":"","imageBorderTopRightRadiusTablet":"","imageBorderBottomLeftRadiusTablet":"","imageBorderBottomRightRadiusTablet":"","imageBorderRadiusUnitTablet":"px","imageBorderTopWidthMobile":"","imageBorderLeftWidthMobile":"","imageBorderRightWidthMobile":"","imageBorderBottomWidthMobile":"","imageBorderTopLeftRadiusMobile":"","imageBorderTopRightRadiusMobile":"","imageBorderBottomLeftRadiusMobile":"","imageBorderBottomRightRadiusMobile":"","imageBorderRadiusUnitMobile":"px","imageBorderStyle":"","imageBorderColor":"","imageBorderHColor":"","mainTitleBorderTopWidth":2,"mainTitleBorderLeftWidth":0,"mainTitleBorderRightWidth":0,"mainTitleBorderBottomWidth":2,"mainTitleBorderTopLeftRadius":"","mainTitleBorderTopRightRadius":"","mainTitleBorderBottomLeftRadius":"","mainTitleBorderBottomRightRadius":"","mainTitleBorderRadiusUnit":"px","mainTitleBorderTopWidthTablet":"","mainTitleBorderLeftWidthTablet":"","mainTitleBorderRightWidthTablet":"","mainTitleBorderBottomWidthTablet":"","mainTitleBorderTopLeftRadiusTablet":"","mainTitleBorderTopRightRadiusTablet":"","mainTitleBorderBottomLeftRadiusTablet":"","mainTitleBorderBottomRightRadiusTablet":"","mainTitleBorderRadiusUnitTablet":"px","mainTitleBorderTopWidthMobile":"","mainTitleBorderLeftWidthMobile":"","mainTitleBorderRightWidthMobile":"","mainTitleBorderBottomWidthMobile":"","mainTitleBorderTopLeftRadiusMobile":"","mainTitleBorderTopRightRadiusMobile":"","mainTitleBorderBottomLeftRadiusMobile":"","mainTitleBorderBottomRightRadiusMobile":"","mainTitleBorderRadiusUnitMobile":"px","mainTitleBorderStyle":"","mainTitleBorderColor":"","mainTitleBorderHColor":""}, thumbnailSwiper );
									} );
			window.addEventListener( 'load', function() {
	UAGBButtonChild.init( '.uagb-block-553f0a45' );
});
window.addEventListener( 'load', function() {
	UAGBButtonChild.init( '.uagb-block-91fa5191' );
});
var ssLinksParent = document.querySelector( '.uagb-block-404a39cf' );
ssLinksParent?.addEventListener( 'keyup', function ( e ) {
var link = e.target.closest( '.uagb-ss__link' );
if ( link && e.keyCode === 13 ) {
	handleSocialLinkClick( link );
}
});

ssLinksParent?.addEventListener( 'click', function ( e ) {
var link = e.target.closest( '.uagb-ss__link' );
if ( link ) {
	handleSocialLinkClick( link );
}
});

function handleSocialLinkClick( link ) {
var social_url = link.dataset.href;
var target = "";
if ( social_url == "mailto:?body=" ) {
	target = "_self";
}
var request_url = "";
if ( social_url.indexOf("/pin/create/link/?url=") !== -1 ) {
	request_url = social_url + encodeURIComponent( window.location.href ) + "&media=" + '';
} else {
	request_url = social_url + encodeURIComponent( window.location.href );
}
window.open( request_url, target );
}
 });