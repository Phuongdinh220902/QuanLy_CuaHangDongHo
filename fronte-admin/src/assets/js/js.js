const wrapper = document.querySelector(".wrapper1");
const btnPopup = document.querySelector(".loginBtn");
const iconClose = document.querySelector(".icon-close");
const jsWrapper = document.querySelector(".js-wrapper");
const modal = document.querySelector(".js-modal1");
const register = document.querySelector(".register-link");
const login = document.querySelector(".login-link")

register.addEventListener('click', ()=> {
  wrapper.classList.add('active');
})

login.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
})

btnPopup.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
  // modal.style.zIndex = 1;
});

iconClose.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});

modal.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  modal.style.zIndex = 0;
});

jsWrapper.addEventListener("click", (event) => {
  event.stopPropagation();
});

