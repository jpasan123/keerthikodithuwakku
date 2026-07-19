(function () {
	var STORAGE_KEY = "kk_social_popup_seen_v2";
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
			'<span class="kk-social-popup__logo" aria-hidden="true">' +
			'<svg viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>' +
			"</span>" +
			'<span class="kk-social-popup__label">Facebook</span>' +
			"</a>" +
			'<a class="kk-social-popup__link kk-social-popup__link--linkedin" href="https://www.linkedin.com/in/keerthi-kodithuwakku-b98149219" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' +
			'<span class="kk-social-popup__logo" aria-hidden="true">' +
			'<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>' +
			"</span>" +
			'<span class="kk-social-popup__label">LinkedIn</span>' +
			"</a>" +
			'<a class="kk-social-popup__link kk-social-popup__link--x" href="https://x.com/mkkeerthi" target="_blank" rel="noopener noreferrer" aria-label="X">' +
			'<span class="kk-social-popup__logo" aria-hidden="true">' +
			'<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
			"</span>" +
			'<span class="kk-social-popup__label">X</span>' +
			"</a>" +
			'<a class="kk-social-popup__link kk-social-popup__link--contact" href="/contact/" aria-label="Contact">' +
			'<span class="kk-social-popup__logo" aria-hidden="true">' +
			'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>' +
			"</span>" +
			'<span class="kk-social-popup__label">Contact</span>' +
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
