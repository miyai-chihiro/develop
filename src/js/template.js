var template = template || {};

template.setDatepicker = function(){
  $('.js-datepicker').datepicker();
}

$(function(){
  template.setDatepicker();
});