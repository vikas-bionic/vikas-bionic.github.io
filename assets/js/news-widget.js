(function () {
  var LARGE_BREAKPOINT = 925; // matches $large in _sass/_themes.scss

  function positionNewsWidget() {
    var widget = document.querySelector(".news-widget-wrap");
    var page = document.querySelector(".page");
    var main = document.getElementById("main");
    if (!widget || !page || !main) return;

    // Small/medium screens: let it sit in normal flow, stacked below the content.
    if (window.innerWidth < LARGE_BREAKPOINT) {
      widget.classList.remove("news-widget-wrap--pinned");
      widget.style.right = "";
      widget.style.width = "";
      return;
    }

    var mainRect = main.getBoundingClientRect();
    var pageRect = page.getBoundingClientRect();

    // Distance from the viewport's right edge to #main's right edge.
    var rightOffset = window.innerWidth - mainRect.right;

    // The empty space between the article's right edge and #main's right edge.
    var gutterWidth = mainRect.right - pageRect.right;

    // Sanity check: if there isn't enough real empty space (e.g. an unusually
    // narrow "large" viewport), fall back to stacked/in-flow instead of
    // squeezing a near-invisible sliver.
    if (gutterWidth < 140) {
      widget.classList.remove("news-widget-wrap--pinned");
      widget.style.right = "";
      widget.style.width = "";
      return;
    }

    widget.classList.add("news-widget-wrap--pinned");
    widget.style.right = rightOffset + "px";
    widget.style.width = (gutterWidth - 16) + "px";
  }

  window.addEventListener("load", positionNewsWidget);
  window.addEventListener("resize", positionNewsWidget);
  // Re-measure shortly after load too, in case fonts/images shift layout.
  window.addEventListener("load", function () {
    setTimeout(positionNewsWidget, 300);
  });
})();
