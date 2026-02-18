document.addEventListener("DOMContentLoaded", function(){ window.addEventListener("DOMContentLoaded", function(){
	var swiper = new Swiper( ".uagb-block-b2352154 .uagb-swiper",
		{"autoplay":{"delay":3000,"disableOnInteraction":false,"pauseOnMouseEnter":true,"stopOnLastSlide":false},"loop":true,"speed":800,"effect":"slide","direction":"horizontal","flipEffect":{"slideShadows":false},"fadeEffect":{"crossFade":true},"pagination":{"el":".uagb-block-b2352154 .swiper-pagination","clickable":true,"hideOnClick":false},"navigation":{"nextEl":".uagb-block-b2352154 .swiper-button-next","prevEl":".uagb-block-b2352154 .swiper-button-prev"}}	);
});

window.addEventListener( 'load', function() {
	UAGBTabs.init( '.uagb-block-d2fc5430' );
	UAGBTabs.anchorTabId( '.uagb-block-d2fc5430' );
});
window.addEventListener( 'hashchange', function() {
	UAGBTabs.anchorTabId( '.uagb-block-d2fc5430' );
}, false );
var ssLinksParent = document.querySelector( '.uagb-block-9033c73c' );
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