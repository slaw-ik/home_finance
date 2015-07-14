$(function () {

  $(".dropdown-menu").on('click', 'li a', function () {
    $(this).parents(".dropdwn").find('.btn').html(
      $(this).text() + " <span class=\"caret\"></span>"
    );
  });

});