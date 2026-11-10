window.__ModuleLoader__.load({
	id: "dsh-plugin-persian-rtl-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		/**
		 * Client half of dsh-plugin-persian-rtl.
		 *
		 * Marks Persian text blocks with the direction they actually read in, so
		 * the Web GUI right-aligns prose, mirrors list markers and table cells,
		 * and keeps trailing punctuation on the correct side. Code, inputs and
		 * machine-readable text stay LTR.
		 *
		 * No services are required; the plugin only touches the document.
		 */

		const STYLE_ID = "dsh-persian-rtl-style";
		const BLOCK_CLASS = "dsh-rtl-block";
		const MARK = "dshRtl";
		const SELECTOR =
			"p, li, h1, h2, h3, h4, h5, h6, blockquote, td, th, dt, dd, figcaption, summary, div, section, article";

		/** Only text that carries Persian script is touched. */
		const PERSIAN = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
		/** Elements whose direction we never rewrite. */
		const SKIP_TAGS = new Set([
			"PRE", "CODE", "SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION",
			"KBD", "SAMP", "SVG", "MATH", "CANVAS", "IFRAME",
		]);
		/** Block elements that hold prose directly. */
		const PROSE_TAGS = new Set([
			"P", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE",
			"TD", "TH", "DT", "DD", "FIGCAPTION", "SUMMARY",
		]);
		/** Inline tags that do not make a container a layout wrapper. */
		const INLINE_TAGS = new Set([
			"A", "ABBR", "B", "BDI", "BDO", "BR", "CITE", "CODE", "DATA", "DFN",
			"EM", "I", "IMG", "KBD", "MARK", "Q", "S", "SAMP", "SMALL", "SPAN",
			"STRONG", "SUB", "SUP", "TIME", "U", "VAR", "WBR",
		]);

		const CSS = `
.${BLOCK_CLASS} {
	text-align: start !important;
}
pre, pre code, kbd, samp {
	direction: ltr !important;
	text-align: left !important;
	unicode-bidi: isolate !important;
}
textarea, [contenteditable="true"], [contenteditable="plaintext-only"] {
	unicode-bidi: plaintext;
}
`;

		/** Count Persian letters and Latin letters to pick a base direction. */
		function countPersian(text) {
			let n = 0;
			for (const ch of text) if (PERSIAN.test(ch)) n++;
			return n;
		}

		function countLatin(text) {
			let n = 0;
			for (const ch of text) {
				const code = ch.codePointAt(0);
				if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) n++;
			}
			return n;
		}

		/** A container is a layout wrapper when it holds block-level children. */
		function isProseContainer(el) {
			if (PROSE_TAGS.has(el.tagName)) return true;
			if (el.tagName !== "DIV" && el.tagName !== "SECTION" && el.tagName !== "ARTICLE") return false;
			for (const child of el.children) {
				if (!INLINE_TAGS.has(child.tagName)) return false;
			}
			return true;
		}

		function untune(el, touched) {
			if (el[MARK] !== "1") return;
			delete el[MARK];
			el.removeAttribute("dir");
			el.classList.remove(BLOCK_CLASS);
			if (touched) touched.delete(el);
		}

		/**
		 * Give one element the direction its own text reads in. Persian-dominant
		 * text becomes RTL (so punctuation and markers land on the right side);
		 * a mostly-English block that quotes a Persian word stays auto-directed.
		 */
		function tune(el, touched) {
			if (!el || el.nodeType !== 1) return;
			if (SKIP_TAGS.has(el.tagName)) return;
			if (!isProseContainer(el)) return;
			const text = el.textContent || "";
			if (text.length === 0 || !PERSIAN.test(text)) {
				untune(el, touched);
				return;
			}
			const persian = countPersian(text);
			const latin = countLatin(text);
			const dir = persian >= latin ? "rtl" : "auto";
			if (el.getAttribute("dir") !== dir) el.setAttribute("dir", dir);
			if (el[MARK] !== "1") {
				el[MARK] = "1";
				el.classList.add(BLOCK_CLASS);
				if (touched) touched.add(el);
			}
		}

		function tuneTree(root, touched) {
			if (!root || root.nodeType !== 1) return;
			tune(root, touched);
			for (const el of root.querySelectorAll(SELECTOR)) tune(el, touched);
		}

		function install() {
			const style = document.createElement("style");
			style.id = STYLE_ID;
			style.textContent = CSS;
			document.head.appendChild(style);

			const touched = new Set();
			const pending = new Set();
			let frame = 0;

			const mark = (el) => {
				if (!el || el.nodeType !== 1) return;
				pending.add(el);
				if (!frame) frame = requestAnimationFrame(flush);
			};

			const markFrom = (node) => {
				if (!node) return;
				if (node.nodeType === 1) {
					mark(node);
					return;
				}
				mark(node.parentElement);
			};

			function flush() {
				frame = 0;
				const batch = [...pending];
				pending.clear();
				for (const el of batch) {
					if (!el.isConnected) continue;
					tuneTree(el, touched);
				}
			}

			const observer = new MutationObserver((records) => {
				for (const record of records) {
					if (record.type === "characterData") {
						mark(record.target.parentElement);
						continue;
					}
					for (const node of record.addedNodes) markFrom(node);
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
				characterData: true,
			});

			tuneTree(document.body, touched);

			return () => {
				observer.disconnect();
				if (frame) cancelAnimationFrame(frame);
				for (const el of [...touched]) untune(el, touched);
				touched.clear();
				pending.clear();
				style.remove();
			};
		}

		function apply(ctx) {
			if (typeof document === "undefined") return;
			ctx.effect(() => install(), "persian-rtl:document-direction");
		}

		exports.apply = apply;
		exports.inject = [];
		return module.exports;
	}
});
