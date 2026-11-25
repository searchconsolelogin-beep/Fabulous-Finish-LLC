document.addEventListener("DOMContentLoaded", function () {
  /* Mobile menu */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });

  /* Dropdowns on mobile */
  document.querySelectorAll(".dd > a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (window.innerWidth <= 860) { e.preventDefault(); a.parentElement.classList.toggle("open"); }
    });
  });

  /* Animated counters */
  var counters = document.querySelectorAll(".count");
  function run(el) {
    var to = parseInt(el.dataset.to, 10) || 0, cur = 0;
    var step = Math.max(1, Math.ceil(to / 40));
    var t = setInterval(function () {
      cur += step;
      if (cur >= to) { cur = to; clearInterval(t); }
      el.textContent = cur;
    }, 40);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (list, o) {
      list.forEach(function (en) { if (en.isIntersecting) { run(en.target); o.unobserve(en.target); } });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  } else { counters.forEach(run); }

  /* Back to top */
  var top = document.querySelector(".totop");
  window.addEventListener("scroll", function () { top.classList.toggle("show", window.scrollY > 500); });
});