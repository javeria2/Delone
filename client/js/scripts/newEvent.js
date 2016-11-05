//setup angular datepicker
$(document).ready(function(){

  $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  //select input won't work if not initialized programmatically 
  $('select').material_select();
});