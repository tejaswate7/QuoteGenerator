const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")


let apiQuotes = []


// Show new Quote
function newQuote() {
    // Pick a random quote from API quotes array
    let quoteNumber = Math.floor(Math.random() * apiQuotes.length)
    console.log(quoteNumber)
    const quote = apiQuotes[quoteNumber]
    // Check if Quote Author exists or not
    if(!quote.author) {
        authorText.textContent = "Unknown"
    }
    else {
        authorText.textContent = quote.author
    }

    // Check if Quote content is long
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    }

    quoteText.textContent = quote.text
} 


// Get quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote();
    } catch(error) {

    }
}


// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', newQuote)

//On Load
getQuotes();

