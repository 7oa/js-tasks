"use strict";
(function() {
  const URL1 = `https://jsonplaceholder.typicode.com/users/1/posts`;
  const URL2 = `https://jsonplaceholder.typicode.com/users/2/posts`;

  const buttonSendRequest = document.querySelector(".js-send-request");
  const wrapperForData1 = document.querySelector(".js-data1");
  const wrapperForData2 = document.querySelector(".js-data2");

  const sendRequest = (method, url) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = "json";
      xhr.send();
      xhr.onload = function() {
        if (xhr.status != 200) {
          reject(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
          resolve(xhr.response);
        }
      };
      xhr.onerror = function() {
        reject(`Connection error: ${xhr.status}`);
      };
    });
  };

  const insertData = (data, wrapperForData) => {
    let posts = data.map(el => {
      return `
        <div class="post">
          <h2 class="post__title">${el.title}</h2>
          <div class="post__body">${el.body}</div>
        </div>
      `;
    });
    wrapperForData.innerHTML = posts.join("");
  };

  buttonSendRequest.addEventListener("click", () => {
    sendRequest("GET", URL1).then(data => insertData(data, wrapperForData1));
    sendRequest("GET", URL2).then(data => insertData(data, wrapperForData2));
  });
})();
