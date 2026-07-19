(function () {
	var scrolledClass = "kk-nav-scrolled";
	var threshold = 12;

	function update() {
		if (window.scrollY > threshold) {
			document.body.classList.add(scrolledClass);
		} else {
			document.body.classList.remove(scrolledClass);
		}
	}

	update();
	window.addEventListener("scroll", update, { passive: true });
})();
