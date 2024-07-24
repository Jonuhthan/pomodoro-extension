function getWord() {
    fetch("https://random-word-api.herokuapp.com/word") // make API call, returns single word contained in array
    .then(res=>res.json())  
    .then(word=>document.getElementById("word").innerText = word[0])    // converts response into JSON and replace id word with new word response
    .then(err=>console.log(err));       // catch any exceptions
}

getWord();  // called on each load of index.html