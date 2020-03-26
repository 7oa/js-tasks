"use strict";

class UsersList {
  constructor(form, table) {
    this.users = new Map();
    this.form = form;
    this.table = table;
    this.tbody = table.querySelector("tbody");
    this.bindEvents();
  }

  bindEvents() {
    this.table.addEventListener("click", evt => {
      evt.preventDefault();
      const target = evt.target;
      const userID = target.getAttribute("data-id");
      if (target.classList.contains("js-button-activate")) {
        this.toggleActivate(userID);
      }
      if (target.classList.contains("js-button-remove")) {
        this.remove(userID);
      }
      if (target.classList.contains("js-value")) {
        const value = prompt("Add new value", target.innerText);
        const field = target.getAttribute("data-field");
        this.update(userID, field, value);
      }
    });

    this.form.addEventListener("submit", evt => {
      evt.preventDefault();
      const name = this.form.querySelector("#name").value;
      const email = this.form.querySelector("#email").value;
      const phone = this.form.querySelector("#phone").value;
      this.add(name, email, phone);
    });
  }

  add(name, email, phone) {
    const id = Date.now() + "";
    const user = {
      id,
      name,
      email,
      phone,
      active: false
    };
    this.users.set(id, user);

    this.appendRow(user);
  }

  remove(id) {
    if (this.users.delete(id))
      this.table.querySelector(`tr[data-id='${id}']`).remove();
  }

  update(id, field, value) {
    const user = this.users.get(id);
    user[field] = value;
    this.updateRow(user);
  }

  toggleActivate(id) {
    const user = this.users.get(id);
    user.active = !user.active;
    this.updateRow(user);
  }

  generateRow(data) {
    const { id, name, email, phone, active } = data;
    return `
      <td class="js-value" data-field="name" data-id="${id}">${name}</td>
      <td class="js-value" data-field="email" data-id="${id}">${email}</td>
      <td class="js-value" data-field="phone" data-id="${id}">${phone}</td>
      <td class="js-active-value" data-id="${id}">${active}</td>
      <td>
        <button class="js-button-activate" data-id="${id}">
          ${active ? "Deactivate" : "Activate"}
        </button>
        <button class="js-button-remove" data-id="${id}">Remove</button>
      </td>
    `;
  }

  updateRow(data) {
    const row = this.table.querySelector(`tr[data-id='${data.id}']`);
    row.innerHTML = this.generateRow(data);
  }

  appendRow(data) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", data.id);
    row.innerHTML = this.generateRow(data);
    this.tbody.appendChild(row);
    this.form.reset();
  }
}

const form = document.querySelector("form");
const table = document.querySelector("table");

let users = new UsersList(form, table);
users.add("John Doe", "johndoe@gmail.com", "+3 (455) 354-54-89");
