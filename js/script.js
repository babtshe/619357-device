document.addEventListener("DOMContentLoaded", ready);

function ready() {//DOM загрузился и ладно, фиг с картинками
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
}
window.onload = function () { //ждем пока вся страница целиком загрузится. Нужны рамеры для двойного слайдера
  //double-range==============================================================================
  //все базовые значения вводятся в html
  //можно допилить ещё управление с клавиатуры
  //и проверку введённых значений.
  try {
    var isDown = false; // нажата ли мышка
    var offset = 0;
    var handle = null;
    var valueFrom = document.querySelector('.double-range .min-start').innerHTML;
    var valueTo = document.querySelector('.double-range .max-end').innerHTML;
    var handles = document.querySelectorAll('.slider-handle');
    var handleFrom = document.querySelector('.slider-handle.price-from');
    var handleTo = document.querySelector('.slider-handle.price-to');
    var sliderRange = document.querySelector('.slider-range');
  } catch (e) {
    console.log('селектор цены не нашли на страничке');
  }
  if (handleFrom && handleTo) { //отслеживаем клики по ручкам
    handleFrom.addEventListener('mousedown', mouseDown, false);
    handleFrom.addEventListener('click', function (event) { //ссылки реагируют на таб, но не реагируют на клик
      event.preventDefault();
    }, false);
    handleTo.addEventListener('mousedown', mouseDown, false);
    handleTo.addEventListener('click', function (event) {
      event.preventDefault();
    }, false);
    initialiseRange();
  }


  function initialiseRange() { //подставим значения ползунков и фона по умолчанию как в макете
    if (document.querySelector('.double-range')) { //проверим есть ли блок на странице
      var firstHandle = calcWidth(document.getElementById('range-start').value, valueTo);
      var lastHandle = calcWidth(document.getElementById('range-end').value, valueTo);
      handleFrom.style.left = firstHandle + '%';
      handleTo.style.left = lastHandle + '%';
      sliderRange.style.left = firstHandle + '%';
      sliderRange.style.width = (lastHandle - firstHandle) + '%'; //размер фона
      document.querySelector('.double-range .value-from').innerHTML = 'от ' + (Math.round(firstHandle * valueTo / 100)); //подписи от и до
      document.querySelector('.double-range .value-to').innerHTML = 'до ' + (Math.round(lastHandle * valueTo / 100));
    }
  }

  function updateValues(handle) {
    if (handle == handleFrom) {
      var val = (Math.round(parseInt(handleFrom.style.left) * valueTo / 100));
      document.querySelector('.double-range .value-from').innerHTML = 'от ' + val;
      document.getElementById('range-start').value = val;
    } else {
      var val = (Math.round(parseInt(handleTo.style.left) * valueTo / 100));
      document.querySelector('.double-range .value-to').innerHTML = 'до ' + val;
      document.getElementById('range-end').value = val;
    }
  }

  function calcWidth(curValue, maxValue) {
    if (maxValue >= 0) {
      return Math.round(curValue / maxValue * 100);
    } else {
      return 0;
    }
  }

  function mouseDown(event) { //реагирует только на левую кнопку.
    if (event.button === 0) {
      isDown = true;
      event.preventDefault();
      handle = event.currentTarget;
      offset = event.currentTarget.offsetLeft - event.clientX + 10;
      document.addEventListener('mouseup', function () {
        if (event.button === 0) {
          isDown = false;
        }
      }, true)
    }
  }

  document.addEventListener('mousemove', function (event) {
    if (isDown) {
      event.preventDefault();
      var minValue = 0;
      var maxValue = document.querySelector('.price-slider').clientWidth;
      var moveDistance = event.clientX + offset;
      if (moveDistance < minValue) {
        moveDistance = minValue;
      } else if (moveDistance > maxValue) {
        moveDistance = maxValue;
      }
      moveDistance = calcWidth(moveDistance, maxValue);
      if (handle == handleFrom) { //первая ручка
        if (moveDistance > parseInt(handleTo.style.left)) { //не пускаем за вторую
          moveDistance = parseInt(handleTo.style.left);
        }
        handleFrom.style.left = moveDistance + '%';
        updateValues(handleFrom);
        sliderRange.style.left = handleFrom.style.left;
        sliderRange.style.width = parseInt(handleTo.style.left) - parseInt(handleFrom.style.left) + '%';
      } else { //вторая ручка
        if (moveDistance < parseInt(handleFrom.style.left)) { //не пускаем за первую
          moveDistance = parseInt(handleFrom.style.left);
        }
        handleTo.style.left = moveDistance + '%';
        updateValues(handleTo);
        sliderRange.style.width = parseInt(handleTo.style.left) - parseInt(handleFrom.style.left) + '%';
      }
    }
  }, true);


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
  if (mapLink) { //map
    mapLink.addEventListener('click', function (event) {
      mapOverlay.classList.add('show');
      mapOverlay.addEventListener('click', function (event) {
        if(event.target == mapOverlay){
        mapOverlay.classList.remove("show");
        }
      });
      event.preventDefault();
      window.addEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
          if (mapOverlay.classList.contains("show")) {
            mapOverlay.classList.remove("show");
          }
        }
      });
      var formClose = mapOverlay.querySelector('.modal-close-btn');
      if (formClose) {
        formClose.addEventListener('click', function (event) {
          mapOverlay.classList.remove('show');
          event.preventDefault();
        });
      }
    }, false);
  }
  var contactLink = document.querySelector('.form-contact-link');
  var formOverlay = document.getElementById('popup-writeus');
  if (contactLink) { //contact
    contactLink.addEventListener('click', function (event) {
      formOverlay.classList.add('show');
      formOverlay.addEventListener('click', function (event) {
        if(event.target == formOverlay) {
          formOverlay.classList.remove("show");
        }
      });
      event.preventDefault();
      window.addEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
          if (formOverlay.classList.contains("show")) {
            formOverlay.classList.remove("show");
          }
        }
      });
      var formClose = formOverlay.querySelector('.modal-close-btn');
      if (formClose) {
        formClose.addEventListener('click', function (event) {
          formOverlay.classList.remove('show');
          event.preventDefault();
        });
      }
    }, false);
  }
}
