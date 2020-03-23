"use strict";

(function() {
  const form = document.querySelector("form");
  const table = document.querySelector("table");
  const tbody = document.querySelector("tbody");

  table.addEventListener("click", function(evt) {
    evt.preventDefault();
    let target = evt.target;
    if (target.classList.contains("js-button-activate")) {
      let columnActivated = [
        ...target.parentNode.parentNode.children
      ].filter(el => el.classList.contains("js-active-value"))[0];
      switch (target.innerHTML) {
        case "Activate":
          columnActivated.innerText = "true";
          target.innerHTML = "Deactivate";
          break;
        case "Deactivate":
          columnActivated.innerText = "false";
          target.innerHTML = "Activate";
          break;
      }
    }
    if (target.classList.contains("js-button-remove")) {
      target.parentNode.parentNode.remove();
    }
    if (target.classList.contains("js-value")) {
      target.innerText = prompt("Add new value", target.innerText);
    }
  });

  form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="js-value">${name}</td>
        <td class="js-value">${email}</td>
        <td class="js-value">${phone}</td>
        <td class="js-active-value">false</td>
        <td><button class="js-button-activate activate">Activate</button><button class="js-button-remove">Remove</button></td>
    `;
    tbody.appendChild(row);
    form.reset();
  });
})();
