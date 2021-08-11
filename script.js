var colorWheel = ["#ee7674", "#f72585", "#00bbf9", "#f77f00", "#d62828", "#540b0e", "#47126b", "#2c6e49"];

var quoteAuthor = "";
var quoteText = "";

function getQuote() {
 $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?", function(data) {
    quoteText = data.quoteText;

    if (data.quoteAuthor) {
      quoteAuthor = data.quoteAuthor;
    } else {
      quoteAuthor = "Anonymous"
    }

    $('#quote').animate({
      opacity: 0
    }, 500, function() {
      $('#quote').html(quoteText);
      $(this).animate({
        opacity: 1
      }, 500);
    });

    $('.author').animate({
      opacity: 0
    }, 500, function() {
      $('.author').html(" - " + quoteAuthor);
      $(this).animate({
        opacity: 1
      }, 500);
    });

    var choice = Math.floor(Math.random() * colorWheel.length);

    $('body').animate({
      backgroundColor: colorWheel[choice],
      color: colorWheel[choice],
    }, 1000);

    $('button').animate({
      backgroundColor: colorWheel[choice]
    }, 1000);
    
    $('#tw-button').attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"'+ quoteText +'" -'+quoteAuthor));
  }); 
}

$(document).ready(function() {
  var quoteInfo = [];
  $('#refresh').click(function(event) {
    event.preventDefault();
    getQuote();
  });
});

getQuote();