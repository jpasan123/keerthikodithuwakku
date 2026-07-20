(function () {
	"use strict";

	var THUMB_CHAIN = ["maxresdefault", "sddefault", "hqdefault"];

	function extractVideoId(src) {
		if (!src) return null;
		var match = src.match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
		return match ? match[1] : null;
	}

	function thumbUrl(id, quality) {
		return "https://i.ytimg.com/vi/" + id + "/" + quality + ".jpg";
	}

	function loadThumb(img, id, index) {
		if (index >= THUMB_CHAIN.length) return;
		img.src = thumbUrl(id, THUMB_CHAIN[index]);
		img.onerror = function () {
			loadThumb(img, id, index + 1);
		};
	}

	function activateLiteEmbed(wrapper, id, title) {
		if (wrapper.classList.contains("is-active")) return;
		wrapper.classList.add("is-active");
		wrapper.innerHTML = "";

		var iframe = document.createElement("iframe");
		iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1";
		iframe.title = title || "YouTube video";
		iframe.allow =
			"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
		iframe.referrerPolicy = "strict-origin-when-cross-origin";
		iframe.allowFullscreen = true;
		wrapper.appendChild(iframe);
	}

	function buildLiteEmbed(iframe) {
		var id = extractVideoId(iframe.getAttribute("src"));
		if (!id) return;

		var figure = iframe.closest(".wp-block-embed-youtube");
		var is43 = figure && figure.classList.contains("wp-embed-aspect-4-3");
		var title = iframe.getAttribute("title") || "YouTube video";
		var container = iframe.closest(".ast-oembed-container") || iframe.parentElement;
		if (!container) return;

		var wrapper = document.createElement("div");
		wrapper.className = "kk-yt" + (is43 ? " kk-yt--43" : "");
		wrapper.setAttribute("role", "button");
		wrapper.setAttribute("tabindex", "0");
		wrapper.setAttribute("aria-label", "Play video: " + title);

		var img = document.createElement("img");
		img.className = "kk-yt__thumb";
		img.alt = title;
		img.loading = "lazy";
		img.decoding = "async";
		loadThumb(img, id, 0);

		var shade = document.createElement("span");
		shade.className = "kk-yt__shade";
		shade.setAttribute("aria-hidden", "true");

		var play = document.createElement("button");
		play.type = "button";
		play.className = "kk-yt__play";
		play.setAttribute("aria-label", "Play video");

		wrapper.appendChild(img);
		wrapper.appendChild(shade);
		wrapper.appendChild(play);

		var activate = function () {
			activateLiteEmbed(wrapper, id, title);
		};

		wrapper.addEventListener("click", activate);
		wrapper.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				activate();
			}
		});

		container.replaceWith(wrapper);
	}

	function init() {
		document.querySelectorAll(".entry-content .wp-block-embed-youtube iframe").forEach(buildLiteEmbed);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
