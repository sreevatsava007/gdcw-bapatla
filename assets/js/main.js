/* ==========================================================
   Site scripts: mobile nav, circulars ticker/notice board,
   gallery lightbox. No external libraries.
   ========================================================== */
(function () {
  "use strict";

  var NEW_DAYS = 15; // circulars newer than this many days get a "NEW" badge
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Circulars ---------- */
  function parseDate(s) {
    var p = String(s || "").split("-");
    return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1);
  }

  function formatDate(s) {
    var d = parseDate(s);
    if (isNaN(d)) return s || "";
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function isNew(s) {
    var d = parseDate(s);
    if (isNaN(d)) return false;
    var ageDays = (Date.now() - d.getTime()) / 86400000;
    return ageDays >= -1 && ageDays <= NEW_DAYS;
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (text != null) node.textContent = text;
    return node;
  }

  function titleNode(c) {
    if (c.link) {
      var a = el("a", { href: c.link }, c.title);
      if (/\.pdf$/i.test(c.link) || /^https?:/i.test(c.link)) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
      return a;
    }
    return el("span", { "class": "item" }, c.title);
  }

  var circulars = (window.CIRCULARS || [])
    .filter(function (c) { return c && c.title; })
    .sort(function (a, b) { return parseDate(b.date) - parseDate(a.date); });

  // Horizontal ticker
  var track = document.getElementById("ticker-track");
  if (track) {
    if (!circulars.length) {
      track.appendChild(el("span", { "class": "item" }, "No new circulars at the moment."));
      track.style.animation = "none";
    } else {
      var copies = reduceMotion ? 1 : 2; // duplicated so the loop is seamless
      for (var i = 0; i < copies; i++) {
        circulars.forEach(function (c) {
          var n = titleNode(c);
          if (i > 0) { n.setAttribute("aria-hidden", "true"); n.setAttribute("tabindex", "-1"); }
          track.appendChild(n);
        });
      }
      // Keep a steady reading speed (~70px/s) whatever the number of items
      requestAnimationFrame(function () {
        var secs = Math.max(20, (track.scrollWidth / 2) / 70);
        track.style.setProperty("--ticker-duration", secs + "s");
      });
    }
  }

  // Vertical notice board
  var list = document.getElementById("notice-list");
  if (list) {
    if (!circulars.length) {
      list.appendChild(el("li", null, "No circulars posted yet."));
      list.classList.add("static");
    } else {
      var shown = circulars.slice(0, 12);
      var loop = !reduceMotion && shown.length > 4;
      var reps = loop ? 2 : 1;
      for (var r = 0; r < reps; r++) {
        shown.forEach(function (c) {
          var li = el("li");
          if (r > 0) li.setAttribute("aria-hidden", "true");
          li.appendChild(el("span", { "class": "notice-date" }, formatDate(c.date)));
          var t = titleNode(c);
          if (r > 0 && t.tagName === "A") t.setAttribute("tabindex", "-1");
          li.appendChild(t);
          if (isNew(c.date)) li.appendChild(el("span", { "class": "badge-new" }, "NEW"));
          list.appendChild(li);
        });
      }
      if (!loop) {
        list.classList.add("static");
      } else {
        requestAnimationFrame(function () {
          var secs = Math.max(15, (list.scrollHeight / 2) / 30);
          list.style.setProperty("--notice-duration", secs + "s");
        });
      }
    }
  }

  // Full table of circulars
  var tbody = document.getElementById("circulars-table");
  if (tbody) {
    if (!circulars.length) {
      var tr0 = el("tr");
      tr0.appendChild(el("td", { colspan: "3" }, "No circulars posted yet."));
      tbody.appendChild(tr0);
    }
    circulars.forEach(function (c, idx) {
      var tr = el("tr");
      tr.appendChild(el("td", null, String(idx + 1)));
      tr.appendChild(el("td", { "class": "nowrap" }, formatDate(c.date)));
      var td = el("td");
      td.appendChild(titleNode(c));
      if (isNew(c.date)) td.appendChild(el("span", { "class": "badge-new" }, "NEW"));
      tr.appendChild(td);
      tbody.appendChild(tr);
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector("p");
    var lbClose = lightbox.querySelector(".lightbox-close");
    var lastFocus = null;

    function openLb(src, caption) {
      lastFocus = document.activeElement;
      lbImg.src = src;
      lbImg.alt = caption || "";
      lbCap.textContent = caption || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    }
    function closeLb() {
      lightbox.classList.remove("open");
      lbImg.src = "";
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openLb(btn.getAttribute("data-lightbox"), btn.getAttribute("data-caption"));
      });
    });
    lbClose.addEventListener("click", closeLb);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLb();
    });
  }
})();
