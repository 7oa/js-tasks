"use strict";

function fn() {
  return new Promise((resolve, reject) => {
    const n = Math.floor(Math.random() * 11);
    n > 3 ? reject(new Error("error")) : resolve(n);
  });
}

function executeFn(fn, maxAttempts) {
  return fn()
    .then(n => n)
    .catch(e => {
      if (!maxAttempts) throw e;
      else {
        pushLog(`try: ${maxAttempts}`);
        return executeFn(fn, maxAttempts - 1);
      }
    });
}

async function runFn() {
  try {
    const result = await executeFn(fn, 3);
    pushLog(`result: ${result}`);
  } catch (e) {
    pushLog(e);
  }
}

function cleanLog() {
  document.querySelector(".log").innerHTML = "";
}

function pushLog(log) {
  const div = document.createElement("div");
  div.innerText = log;
  document.querySelector(".log").append(div);
}

document.querySelector("button").addEventListener("click", e => {
  e.preventDefault();
  cleanLog();
  runFn();
});
