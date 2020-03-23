"use strict";

function fn() {
  return new Promise((resolve, reject) => {
    const n = Math.floor(Math.random() * 11);
    n > 3 ? reject(new Error("error")) : resolve(n);
  });
}

function executeFn(fn, maxAttempts) {
  // your implementation
}

const result = await executeFn(fn, 3);
