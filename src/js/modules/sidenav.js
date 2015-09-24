module.exports = function(){
  // サイドメニューのスライド機能
  $('.expander').click(function(){
    $(this).toggleClass('open');
    $(this).nextAll('.expander-target').slideToggle('fast');
  });
}

