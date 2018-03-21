function servicesTab(event, tabId) {
  var i, serviceitem, servicebuttons; /* переменные*/
  serviceitem = document.getElementsByClassName("service-item");
  /*прячем слайды*/
  for (i = 0; i < serviceitem.length; i++) {
    serviceitem[i].className = serviceitem[i].className.replace(" current", "");
  }
  /*выключаем кнопки */
  servicebuttons = document.getElementsByClassName("service-button");
  for (i = 0; i < servicebuttons.length; i++) {
    servicebuttons[i].className = servicebuttons[i].className.replace(" current", "");
  }
  document.getElementById(tabId).className += " current";
  if (event.currentTarget.classList.contains("service-button")) {
    event.currentTarget.className += " current";
    event.preventDefault();
  }
}
