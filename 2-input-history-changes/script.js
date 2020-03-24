"use strict";

class InputWithHistory {
  constructor(el) {
    this.input = el.querySelector("input");
    this.buttonPrev = el.querySelector(".js-button-prev");
    this.buttonNext = el.querySelector(".js-button-next");

    this.curPosition = 0;
    this.history = [];

    this.disabledButton([this.buttonPrev, this.buttonNext]);
    this.bindEvents();
  }

  enabledButton(arr) {
    arr.forEach(el => el.removeAttribute("disabled"));
  }

  disabledButton(arr) {
    arr.forEach(el => el.setAttribute("disabled", "disabled"));
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
    this.enabledButton([this.buttonPrev]);
    this.disabledButton([this.buttonNext]);
  }

  goPrev() {
    if (this.curPosition > 0) {
      this.curPosition--;
      this.input.value = this.history[this.curPosition];
      this.enabledButton([this.buttonNext]);
    } else {
      this.input.value = "";
      this.disabledButton([this.buttonPrev]);
    }
  }

  goNext() {
    if (this.curPosition < this.history.length - 1) {
      this.curPosition++;
      this.input.value = this.history[this.curPosition];
      this.enabledButton([this.buttonPrev]);
    } else {
      this.disabledButton([this.buttonNext]);
    }
  }
}

document
  .querySelectorAll(".js-input-wrapper")
  .forEach(el => new InputWithHistory(el));
