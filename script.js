const audioElement = document.getElementById('audio');
const button = document.getElementById('button');


// VoiceRSS Javascript SDK


//  Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
// passing Joke to Voice
function tellMe(joke) {
    
    VoiceRSS.speech({
        key: '242b4611de7d4c4894842892e8e10928',
        src: joke,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
} 

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&idRange=0-185';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        //  text-to-speech
        tellMe(joke);
        //  disabled button
        toggleButton()
    } catch (err) {
        console.log(err);
    }
}

// eventlistener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);