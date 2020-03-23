"use strict";

(function() {
  const formGeneratePass = document.querySelector(".js-form-generate-pass");
  const inputPassLength = document.querySelector(".js-input-pass-length");
  const inputForPaste = document.querySelector(".js-input-for-paste");
  const buttonCopyToBuffer = document.querySelector(
    ".js-button-copy-to-buffer"
  );

  const generateRandom = str => str[Math.floor(Math.random() * str.length)];

  const shuffle = arr => {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  let generatePass = length => {
    if (length < 4) {
      alert(`Password length must be >=4`);
      return;
    }

    const ABC = `abcdefghijklmnopqrstuvwxyz`;
    const NUMBERS = `0123456789`;
    const SIMBLS = ` !#$%&()*+,-./:;<=>?@[\]^_{|}~`;
    let password = "";

    while (password.length < length) {
      password += generateRandom(ABC);
      password += generateRandom(ABC.toUpperCase());
      password += generateRandom(NUMBERS);
      password += generateRandom(SIMBLS);
    }

    return shuffle(password.substr(0, length).split("")).join("");
  };

  formGeneratePass.addEventListener("submit", function(evt) {
    evt.preventDefault();
    inputForPaste.value = generatePass(inputPassLength.value);
  });

  buttonCopyToBuffer.addEventListener("click", function(evt) {
    evt.preventDefault();
    inputForPaste.select();
    document.execCommand("copy");
  });
})();
