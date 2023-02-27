const quoteContainer = document.getElementsByClassName('curiosity-zone');
const txtInspiQuote = document.getElementById('inspi-quote');
const txtInspiAuthor = document.getElementById('inspi-author');
const txtJoke = document.getElementById('joke-text');
const txtRiddleQuestion = document.getElementById('riddle-question');
const txtRiddleQuestionModal = document.getElementById('riddle-question-modal');
const txtRiddleAnswerModal = document.getElementById('riddle-answer-modal');
let arrInspiQuotes = [];
let arrJokes = [];
let arrRiddles = [];

// Loading spinner shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Loading spinner hidden
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getInspiQuote () {
    const jsonUrl = '/data/quotes.json';
    try {
        fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length); 
            const randomObject = data[randomIndex]; 
            
            if (randomObject.text=== '') {
                txtInspiQuote.textContent = 'Unknown';
            } else {
                if(randomObject.text.length>150)
                    txtInspiQuote.classList.add('long-quote');
                else
                    txtInspiQuote.classList.remove('long-quote');

                txtInspiQuote.textContent = randomObject.text;
            }

            if (randomObject.author ==='') {
                txtInspiAuthor.textContent = '— '+'Unknown';
            } else {
                txtInspiAuthor.textContent = '— '+randomObject.author;
            }

            console.log("Quote: "+randomObject.text+" # "+randomObject.author);
        })
        .catch(error => {
            // handle the error
            console.error(error);
        });
    } catch (error) {
        console.log('whoops, no quote', error);
    }
}

async function getRiddles() {
    const jsonUrl = '/data/riddle.json';
    try {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length); 
                const randomObject = data[randomIndex]; 
                
                if (randomObject.answer=== '') {
                    txtRiddleAnswerModal.textContent = '— '+'Unknown';
                } else {
                    txtRiddleAnswerModal.textContent = 'Answer — ' + randomObject.answer;
                }

                if (randomObject.question ==='') {
                    txtRiddleQuestion.textContent = 'Unknown';
                    txtRiddleQuestionModal.textContent='Unknown';
                } else {
                    if(randomObject.question.length>150){
                        txtRiddleQuestion.classList.add('long-quote');
                    }else {
                        txtRiddleQuestion.classList.remove('long-quote');
                    }
                    txtRiddleQuestion.textContent = randomObject.question;
                    txtRiddleQuestionModal.textContent = randomObject.question;
                }

                console.log("Riddle: "+randomObject.question+" # "+randomObject.answer);
            })
            .catch(error => {
                // handle the error
                console.error(error);
            });

        
    } catch (error) {
        console.log('whoops, no riddles', error);
    }
}

async function getJokes() {
    const jsonUrl = '/data/jokes.json';
    try {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length); 
                const randomObject = data[randomIndex]; 
                
                if (randomObject.joke=== '') {
                    txtJoke.textContent = 'Unknown';
                } else {
                    if(randomObject.joke.length > 150)
                        txtJoke.classList.add('long-quote');
                    else
                        txtJoke.classList.remove('long-quote');

                    txtJoke.textContent = randomObject.joke;
                }
                console.log("Joke: "+ randomObject.joke);
            })
            .catch(error => {
                // handle the error
                console.error(error);
            });

        
    } catch (error) {
        console.log('whoops, no jokes', error);
    }
}

// On Load
getInspiQuote();
getRiddles();
getJokes();