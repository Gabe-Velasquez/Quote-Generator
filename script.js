const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

//Show new quote
function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];

    //Checking if author is present
    if (!quote.author){
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    //Quote length to determine how it is styled
    if(quote.text.length > 75){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text
}

// Gather quotes from API
async function getQuotes() {
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try{
        const resposne = await fetch (apiURL);
        apiQuotes = await resposne.json();
        newQuote();
    }catch (error){
        //catch error here
    }
}

//Tweet quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// Loading
getQuotes();