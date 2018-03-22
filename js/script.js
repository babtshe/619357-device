//double-range==============================================================================
/*
var handles = document.querySelectorAll('.slider-handle');
for (var i = 0; i < handles.length; i++) {
  handles[i].style.background = 'blue';
  handles[i].addEventListener('mousedown', mouseDown, false);
  handles[i].addEventListener('mouseup', mouseUp, false);
}

function mouseDown(event) {
  event.currentTarget.style.background = 'green';
  event.currentTarget.addEventListener('mousemove', mouseMove, false);
}

function mouseUp(event) {
  event.currentTarget.removeEventListener('mousemove', mouseMove, false);
  event.currentTarget.style.background = 'pink';
}

function mouseMove(event) {
  event.currentTarget.style.background = 'black';
  event.currentTarget.style.left = 50 + '%';
  var min = 0;
  console.log(event.currentTarget.pageX);
}
*/
//links================================================================================

/*
var elements = document.querySelectorAll('a[href$="index.html#delivery"]');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', tabClicker);
}
var elements = document.querySelectorAll('a[href$="index.html#warranty"]');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', tabClicker);
}


function tabClicker(event) {
  event.currentTarget.style.background = 'red';
  event.preventDefault();
  location.href = 'index.html';
  var button = document.querySelector('.service-button:last-of-type');

  if (button) {
    button.style.background = 'red';
    //button.click();
  }
}
*/

//slider============================================================================
function servicesTab(event, tabId) {
  var i, serviceitem, servicebuttons; /* переменные*/
  serviceitem = document.getElementsByClassName("service-item");
  //прячем слайды
  for (i = 0; i < serviceitem.length; i++) {
    serviceitem[i].classList.remove("current");
  }
  //выключаем кнопки
  servicebuttons = document.getElementsByClassName("service-button");
  for (i = 0; i < servicebuttons.length; i++) {
    servicebuttons[i].classList.remove("current");
  }
  document.getElementById(tabId).classList.add("current");
  if (event.currentTarget.classList.contains("service-button")) {
    event.currentTarget.classList.add("current");
    event.preventDefault();
  }
}
// forms========================================================
var formFields = document.querySelectorAll('.form-contact input[type="text"], .form-contact textarea, .form-contact input[type="email"]');
var formSubmit = document.querySelector('.form-contact input[type="submit"]');
var contactLink = document.querySelector('.contact-form-link');
formSubmit.addEventListener('click', validateAll, false);
initialiseForm();
function initialiseForm() {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].addEventListener('blur', validate, false);
    formFields[i].classList.remove("validate");
}
}

function validate(event) {
  event.currentTarget.className += " validate";
}

function validateAll(event) {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].className += " validate";
  }
}
