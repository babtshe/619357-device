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

//external slider links================================================================================
if (location.hash) { //например, если ссылка снаружи
  hashWatcher();
}
window.addEventListener("hashchange", hashWatcher, false); //следим за сменой якоря
function hashWatcher(event) {
  var hashstr = location.hash.split('#')[1];
  tabClicker(hashstr);
}

function tabClicker(hash) {
  var button = document.querySelector('.service-button.' + hash);
  var slide = document.getElementById(hash);

  if (button && slide) { //если такая кнопочка и слайд есть в слайдере, то переключаем
    initialiseTabs();
    button.classList.add("current");
    slide.classList.add("current");
  }
}

//slider============================================================================
var buttons = document.querySelectorAll('.service-button'); //найдем все кнопки от слайдера
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', servicesTab, false);
}

function servicesTab(event) {
  initialiseTabs();
  var tabId = event.currentTarget.href.split('#')[1];
  document.getElementById(tabId).classList.add("current");
  if (event.currentTarget.classList.contains("service-button")) {
    event.currentTarget.classList.add("current");
    event.preventDefault();
    window.history.pushState("", document.title, window.location.pathname);
  }
}

function initialiseTabs() {
  var serviceitem = document.getElementsByClassName("service-item");
  //прячем слайды
  for (var i = 0; i < serviceitem.length; i++) {
    serviceitem[i].classList.remove("current");
  }
  //выключаем кнопки
  var servicebuttons = document.getElementsByClassName("service-button");
  for (var i = 0; i < servicebuttons.length; i++) {
    servicebuttons[i].classList.remove("current");
  }
}
// forms validate========================================================
var formFields = document.querySelectorAll('.form-contact input[type="text"], .form-contact textarea, .form-contact input[type="email"]');
var formSubmit = document.querySelector('.form-contact input[type="submit"]');

if (formSubmit) {
  formSubmit.addEventListener('click', validateAll, false);
}
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
//forms show==============================================================================
var mapLink = document.querySelector('.map-popup-link');
var mapOverlay = document.getElementById('popup-map');
if (mapLink) {//map
  mapLink.addEventListener('click', function (event) {
    mapOverlay.classList.add('show');
    event.preventDefault();
    window.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        if (mapOverlay.classList.contains("show")) {
          mapOverlay.classList.remove("show");
        }
      }
    });
    var formClose = mapOverlay.querySelector('.modal-close-btn');
    if(formClose) {
      formClose.addEventListener('click', function(event) {
        mapOverlay.classList.remove('show');
        event.preventDefault();
      });
    }
  }, false);
}
var contactLink = document.querySelector('.form-contact-link');
var formOverlay = document.getElementById('popup-writeus');
if (contactLink) {//contact
  contactLink.addEventListener('click', function (event) {
    formOverlay.classList.add('show');
    event.preventDefault();
    window.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        if (formOverlay.classList.contains("show")) {
          formOverlay.classList.remove("show");
        }
      }
    });
    var formClose = formOverlay.querySelector('.modal-close-btn');
    if(formClose) {
      formClose.addEventListener('click', function(event) {
        formOverlay.classList.remove('show');
        event.preventDefault();
      });
    }
  }, false);
}
