"use strict";

(function() {
  function setInput(el) {
    const input = el.querySelector("input");
    const buttonPrev = el.querySelector(".js-button-prev");
    const buttonNext = el.querySelector(".js-button-next");

    let curPosition = 0;
    let history = [];

    buttonPrev.setAttribute("disabled", "disabled");
    buttonNext.setAttribute("disabled", "disabled");

    const pushToHistory = value => {
      history.push(value);
      curPosition = history.length - 1;
      buttonPrev.removeAttribute("disabled");
      buttonNext.setAttribute("disabled", "disabled");
    };

    const goPrev = () => {
      if (curPosition > 0) {
        curPosition--;
        input.value = history[curPosition];
        buttonNext.removeAttribute("disabled");
      } else {
        input.value = "";
        buttonPrev.setAttribute("disabled", "disabled");
      }
    };

    const goNext = () => {
      if (curPosition < history.length - 1) {
        curPosition++;
        input.value = history[curPosition];
        buttonPrev.removeAttribute("disabled");
      } else {
        buttonNext.setAttribute("disabled", "disabled");
      }
    };

    input.addEventListener("input", evt => {
      evt.preventDefault();
      pushToHistory(evt.target.value);
    });

    buttonPrev.addEventListener("click", evt => {
      evt.preventDefault();
      goPrev();
    });

    buttonNext.addEventListener("click", evt => {
      evt.preventDefault();
      goNext();
    });
  }

  document.querySelectorAll(".js-input-wrapper").forEach(el => setInput(el));
})();
