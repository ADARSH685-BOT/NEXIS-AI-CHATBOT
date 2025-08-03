const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const chatInput = document.querySelector('.chat-input-box');
const sendButton = document.querySelector('.send-button');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) speak("Good Morning Boss...");
    else if (hour >= 12 && hour < 17) speak("Good Afternoon Boss...");
    else speak("Good Evening Boss...");
}

window.addEventListener('load', () => {
    speak("Initializing NEXIS..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message !== "") {
        content.textContent = message;
        takeCommand(message.toLowerCase());
        chatInput.value = ""; 
    }
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello') || message.includes('hi')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes('who are you')) {
        speak("My name is NEXIS. I'm a Virtual Assistant Created by My God Foxa whose real name is Amay.");
    } else if (message.includes('how are you')) {
        speak("I am very fine. Thank you so much for asking. I feel so grateful for helping you.");
    } else if (message.includes('what is your name')) {
        speak("My name is NEXIS.");
    } else if (message.includes('bye')) {
        speak("Bye, nice meeting you.");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes("open whatsapp")) {
        window.open("https://web.whatsapp.com", "_blank");
        speak("Opening WhatsApp...");
    } else if (message.includes("open camera")) {
        openCamera();
    } else if (message.startsWith("play ")) {
        const song = message.replace("play ", "").trim();
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
        speak(`Playing ${song} on YouTube`);
    } else if (
        message.includes('what is') ||
        message.includes('who is') ||
        message.includes('what are') ||
        message.includes('tell me something about')
    ) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///', "_blank");
        speak("Opening Calculator");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("I found some information for " + message + " on Google.");
    }
}

function openCamera() {
    const video = document.createElement('video');
    video.autoplay = true;
    document.body.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            speak("Camera is now on.");
        })
        .catch((err) => {
            console.error("Camera error: ", err);
            speak("Sorry, I can't access the camera.");
        });
}
