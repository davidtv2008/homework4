(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  //var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var SERVER_URL = 'http://localhost:2403/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('ncc-1701', remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder(data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  console.log(formHandler);
})(window);

function updateStrength() {
  var sliderValue = document.getElementById('strengthLevel').value;
  var strength = document.getElementById('strengthAmount');

  if (sliderValue < 25) {
    strength.style.backgroundColor = 'green';
  } else if (sliderValue > 25 && sliderValue < 75) {
    strength.style.backgroundColor = 'yellow';
  } else {
    strength.style.backgroundColor = 'red';
  }
  strength.innerHTML = sliderValue;
}

function resetAll() {
  var strength = document.getElementById('strengthAmount');
  strength.style.backgroundColor = 'yellow';
  strength.innerHTML = 30;
}

function pay() {
  window.location.href = 'paymentPage.html';
}
