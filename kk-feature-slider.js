(function () {
	"use strict";

	var DEFAULT_INTERVAL = 5000;

	function initSlider(root) {
		var track = root.querySelector(".kk-feature-slider__track");
		var slides = Array.prototype.slice.call(root.querySelectorAll(".kk-feature-slider__slide"));
		var prevBtn = root.querySelector(".kk-feature-slider__nav--prev");
		var nextBtn = root.querySelector(".kk-feature-slider__nav--next");
		var dotsWrap = root.querySelector(".kk-feature-slider__dots");

		if (!track || slides.length < 2) return;

		var index = 0;
		var timer = null;
		var interval = parseInt(root.getAttribute("data-autoplay"), 10) || DEFAULT_INTERVAL;
		var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		function renderDots() {
			if (!dotsWrap) return;
			dotsWrap.innerHTML = "";
			slides.forEach(function (_, dotIndex) {
				var dot = document.createElement("button");
				dot.type = "button";
				dot.className = "kk-feature-slider__dot" + (dotIndex === index ? " is-active" : "");
				dot.setAttribute("aria-label", "Show image " + (dotIndex + 1));
				dot.addEventListener("click", function () {
					goTo(dotIndex);
					restart();
				});
				dotsWrap.appendChild(dot);
			});
		}

		function goTo(nextIndex) {
			index = (nextIndex + slides.length) % slides.length;
			track.style.transform = "translate3d(-" + index * 100 + "%, 0, 0)";
			if (dotsWrap) {
				Array.prototype.forEach.call(dotsWrap.children, function (dot, dotIndex) {
					dot.classList.toggle("is-active", dotIndex === index);
				});
			}
		}

		function next() {
			goTo(index + 1);
		}

		function prev() {
			goTo(index - 1);
		}

		function stop() {
			if (timer) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function start() {
			if (reducedMotion || slides.length < 2) return;
			stop();
			timer = window.setInterval(next, interval);
		}

		function restart() {
			stop();
			start();
		}

		if (prevBtn) {
			prevBtn.addEventListener("click", function () {
				prev();
				restart();
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener("click", function () {
				next();
				restart();
			});
		}

		root.addEventListener("mouseenter", stop);
		root.addEventListener("mouseleave", start);
		root.addEventListener("focusin", stop);
		root.addEventListener("focusout", start);

		var touchStartX = 0;
		root.addEventListener(
			"touchstart",
			function (event) {
				touchStartX = event.changedTouches[0].clientX;
				stop();
			},
			{ passive: true }
		);

		root.addEventListener(
			"touchend",
			function (event) {
				var delta = event.changedTouches[0].clientX - touchStartX;
				if (Math.abs(delta) > 40) {
					if (delta < 0) next();
					else prev();
				}
				restart();
			},
			{ passive: true }
		);

		renderDots();
		goTo(0);
		start();
	}

	function init() {
		document.querySelectorAll(".kk-feature-slider").forEach(initSlider);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
