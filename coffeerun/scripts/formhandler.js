(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {
      //hold title and name entered by user
      var titleName;
      var name;

      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        if (item.name === 'username') {
          name = item.value;

          console.log(name);
        } else if (item.name === 'title') {
          titleName = item.value;
          console.log(titleName);
        }
        //console.log(item.name + ' is ' + item.value);
      });
      $('#ex1').modal('show');
      $('#modalText').text('Thank you for your payment, ' + titleName + ' ' + name);
      console.log(data);
      console.log($(this).attr('data-payment-form'));

      //if on payment page, do not run fn(data); expection console.error
      if ($(this).attr('data-payment-form')) {
        //inside payment page, ignore fn(data);
      } else {
        fn(data);
      }


      this.reset();
      this.elements[0].focus();
    });

  };

  FormHandler.prototype.addInputHandler = function(fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
