"use strict";

class InputWithHistory {
  curPosition = -1;
  history = [];

  constructor(el) {
    this.input = el.querySelector("input");
    this.buttonPrev = el.querySelector(".js-button-prev");
    this.buttonNext = el.querySelector(".js-button-next");
    this.toggleButtonNext(false);
    this.toggleButtonPrev(false);
    this.bindEvents();
  }

  toggleButtonNext(disabled) {
    if (disabled) {
      this.buttonNext.removeAttribute("disabled");
    } else {
      this.buttonNext.setAttribute("disabled", "disabled");
    }
  }

  toggleButtonPrev(disabled) {
    if (disabled) {
      this.buttonPrev.removeAttribute("disabled");
    } else {
      this.buttonPrev.setAttribute("disabled", "disabled");
    }
  }

  bindEvents() {
    this.input.addEventListener("input", evt => {
      evt.preventDefault();
      this.pushToHistory(evt.target.value);
    });

    this.buttonPrev.addEventListener("click", evt => {
      evt.preventDefault();
      this.goPrev();
    });

    this.buttonNext.addEventListener("click", evt => {
      evt.preventDefault();
      this.goNext();
    });
  }

  pushToHistory(value) {
    this.history.push(value);
    this.curPosition = this.history.length - 1;
    this.toggleButtonPrev(true);
    this.toggleButtonNext(false);
  }

  goPrev() {
    this.curPosition--;
    this.input.value = this.history[this.curPosition];
    this.toggleButtonNext(true);
    if (this.curPosition === -1) {
      this.input.value = "";
      this.curPosition = -1;
      this.toggleButtonPrev(false);
    }
  }

  goNext() {
    this.curPosition++;
    this.input.value = this.history[this.curPosition];
    this.toggleButtonPrev(true);
    if (this.curPosition === this.history.length - 1) {
      this.toggleButtonNext(false);
    }
  }
}

document
  .querySelectorAll(".js-input-wrapper")
  .forEach(el => new InputWithHistory(el));
