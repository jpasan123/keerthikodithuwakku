(function () {
	var STORAGE_KEY = "kk_social_popup_seen_v1";
	var SHOW_DELAY_MS = 900;

	function alreadySeen() {
		try {
			return sessionStorage.getItem(STORAGE_KEY) === "1";
		} catch (e) {
			return false;
		}
	}

	function markSeen() {
		try {
			sessionStorage.setItem(STORAGE_KEY, "1");
		} catch (e) {}
	}

	function createPopup() {
		var root = document.createElement("div");
		root.className = "kk-social-popup";
		root.id = "kk-social-popup";
		root.setAttribute("role", "dialog");
		root.setAttribute("aria-modal", "true");
		root.setAttribute("aria-labelledby", "kk-social-popup-title");
		root.hidden = true;

		root.innerHTML =
			'<div class="kk-social-popup__backdrop" role="button" tabindex="-1" aria-label="Close connect popup"></div>' +
			'<div class="kk-social-popup__card">' +
			'<button type="button" class="kk-social-popup__close" aria-label="Close">' +
			'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
			"</button>" +
			'<p class="kk-social-popup__eyebrow">Stay Connected</p>' +
			'<h2 class="kk-social-popup__title" id="kk-social-popup-title">Connect with Keerthi</h2>' +
			'<p class="kk-social-popup__text">Follow the journey in biomedical innovation, MedTech leadership, and global collaborations.</p>' +
			'<div class="kk-social-popup__links">' +
			'<a class="kk-social-popup__link kk-social-popup__link--facebook" href="https://www.facebook.com/keerthi.priyankara.3" target="_blank" rel="noopener noreferrer" aria-label="Facebook">' +
			'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z"/></svg>' +
			"</a>" +
			'<a class="kk-social-popup__link kk-social-popup__link--linkedin" href="https://www.linkedin.com/in/keerthi-kodithuwakku-b98149219" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' +
			'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.9 8.4A1.9 1.9 0 1 1 6.9 4.6a1.9 1.9 0 0 1 0 3.8zM5.2 20.2h3.4V9.6H5.2v10.6zM13.1 9.6c-1.3 0-2.2.5-2.7 1.2V9.6H7.2c0 .6-.1 10.6-.1 10.6h3.2v-5.9c0-.3 0-.7.1-.9.3-.7.9-1.4 2-1.4 1.4 0 2 1.1 2 2.7v5.5h3.2v-5.9c0-3.2-1.7-4.7-4.1-4.7z"/></svg>' +
			"</a>" +
			'<a class="kk-social-popup__link kk-social-popup__link--x" href="https://x.com/mkkeerthi" target="_blank" rel="noopener noreferrer" aria-label="X">' +
			'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.5L6.1 21H3.3l6.5-7.5L3 3h5.8l4 5.9L17.5 3zm-1 16.1h1.5L7.6 4.8H6L16.5 19.1z"/></svg>' +
			"</a>" +
			'<a class="kk-social-popup__link kk-social-popup__link--contact" href="/contact/" aria-label="Contact">' +
			'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>' +
			"</a>" +
			"</div>" +
			'<div class="kk-social-popup__actions">' +
			'<a class="kk-social-popup__cta" href="/contact/">Get Appointment</a>' +
			'<button type="button" class="kk-social-popup__dismiss">Maybe later</button>' +
			"</div>" +
			"</div>";

		document.body.appendChild(root);
		return root;
	}

	function openPopup(root) {
		root.hidden = false;
		requestAnimationFrame(function () {
			root.classList.add("is-open");
		});
		document.body.classList.add("kk-social-popup-lock");
		var closeBtn = root.querySelector(".kk-social-popup__close");
		if (closeBtn) closeBtn.focus();
	}

	function closePopup(root) {
		root.classList.remove("is-open");
		document.body.classList.remove("kk-social-popup-lock");
		markSeen();
		window.setTimeout(function () {
			root.hidden = true;
		}, 280);
	}

	function init() {
		if (alreadySeen()) return;
		if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			/* still show, just without forced delay issues */
		}

		var root = createPopup();
		var closeEls = root.querySelectorAll(
			".kk-social-popup__backdrop, .kk-social-popup__close, .kk-social-popup__dismiss"
		);
		closeEls.forEach(function (el) {
			el.addEventListener("click", function () {
				closePopup(root);
			});
		});

		root.querySelectorAll(".kk-social-popup__link, .kk-social-popup__cta").forEach(function (el) {
			el.addEventListener("click", function () {
				markSeen();
			});
		});

		document.addEventListener("keydown", function onKey(e) {
			if (e.key === "Escape" && root.classList.contains("is-open")) {
				closePopup(root);
			}
		});

		window.setTimeout(function () {
			openPopup(root);
		}, SHOW_DELAY_MS);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
