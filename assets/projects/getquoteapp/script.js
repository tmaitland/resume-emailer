// no API key required for this API
const API_URL = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?'
var quoteText = document.querySelector('.quote-text')
var quoteAuthor = document.querySelector('.quote-author')
var btn = document.querySelector('.newQuote')

function getQuote() {
    $.ajax({
        url: API_URL,
        dataType: 'json',
        success: function(data){
            console.log(data)
            quoteText.textContent = data.quoteText
            quoteAuthor.textContent = data.quoteAuthor
        },
        error: function (error){
            console.log("There was an error")
        }
    })
}

getQuote()


btn.addEventListener("click", function(){ //why is the event not written in the function?
    if(btn.textContent == "Get New Quote"){
        getQuote(quoteText) ///why does selecting only quoteText display both the quote and the author?
    }
})
