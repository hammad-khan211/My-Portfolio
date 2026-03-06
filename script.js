// Vanta.js initialization
const vantaEffect = VANTA.GLOBE({
    el: "#vanta-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x007BFF,
    size: 1.00,
    backgroundColor: 0xF5F5F5
});

// Function to update Vanta.js colors for the theme
function updateVantaColors(isDark) {
    if (vantaEffect) {
        if (isDark) {
            vantaEffect.setOptions({
                color: 0x6C63FF,
                backgroundColor: 0x121212
            });
        } else {
            vantaEffect.setOptions({
                color: 0x007BFF,
                backgroundColor: 0xF5F5F5
            });
        }
    }
}

// Function to load content from a file
function loadContent(pageName) {
    const contentContainer = document.getElementById('dynamic-content-container');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active-link');
    });

    const currentLink = document.querySelector(`.nav-link[data-link="${pageName}"]`);
    if (currentLink) {
        currentLink.classList.add('active-link');
    }

    const sections = {
        'about': 'sections/about.html',
        'projects': 'sections/projects.html',
        'skills': 'sections/skills.html',
        'contact': 'sections/contact.html'
    };

    gsap.to(contentContainer, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            fetch(sections[pageName])
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error loading content: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(html => {
                    contentContainer.innerHTML = html;
                    gsap.to(contentContainer, {
                        opacity: 1,
                        duration: 0.5
                    });
                })
                .catch(error => {
                    console.error(error);
                    contentContainer.innerHTML = `<div style="color: red; padding: 20px;">Error loading content. Please check the file names and folder structure.</div>`;
                });
        }
    });
}

// Event listener for navigation links
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
        e.preventDefault();
        const pageName = e.target.getAttribute('data-link');
        loadContent(pageName);
    }
});

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcherBtn = document.getElementById('theme-switcher-btn');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        updateVantaColors(true);
    } else {
        updateVantaColors(false);
    }

    // Event listener for the theme switcher button
    if (themeSwitcherBtn) {
        themeSwitcherBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateVantaColors(isDark);
        });
    }

    // Load initial 'about' content
    // loadContent('about');
});

const typed = new Typed('.subtitle', {
    strings: [ 'Software Developer' , 'Problem Solver' , 'DSA Enthusiast', 'IT ENGINEER'],
    typeSpeed: 70,
    showCursor: false,
    loop: false
});

document.addEventListener("DOMContentLoaded", function(){

const aiButton = document.getElementById("ai-button");
const chat = document.getElementById("ai-chat");
const closeChat = document.getElementById("close-chat");
const messages = document.getElementById("chat-messages");

aiButton.onclick = () => {

chat.style.display = "flex";

const messages = document.getElementById("chat-messages");

/* only show welcome once */

if(messages.innerHTML.trim() === ""){

const welcome = document.createElement("div");
welcome.className = "msg ai";

welcome.innerHTML = `
👋 Hi! I'm Hammad's AI assistant.<br><br>
You can ask me about:<br>
• Projects<br>
• Skills<br>
• LeetCode practice
`;

messages.appendChild(welcome);

}

};

closeChat.onclick = () => {
    chat.style.display = "none";
};
//send messages
window.sendMessage = async function(){

const messages = document.getElementById("chat-messages");
const input = document.getElementById("user-input");
const text = input.value;

if(text.trim() === "") return;

/* USER MESSAGE */

messages.innerHTML += `<div class="msg user">${text}</div>`;

/* TYPING INDICATOR */

const typing = document.createElement("div");
typing.className = "typing";
typing.innerHTML = "<span></span><span></span><span></span>";

messages.appendChild(typing);

messages.scrollTop = messages.scrollHeight;

input.value = "";

try{

/* CALL NETLIFY FUNCTION */

const res = await fetch("http://localhost:3000/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({message:text})
});

const data = await res.json();

/* REMOVE TYPING INDICATOR */

typing.remove();

/* AI MESSAGE */

const aiMsg = document.createElement("div");
aiMsg.className = "msg ai";

messages.appendChild(aiMsg);

/* TYPING EFFECT */

typingEffect(aiMsg, data.reply);

messages.scrollTop = messages.scrollHeight;

}
catch(error){

typing.remove();

const aiMsg = document.createElement("div");
aiMsg.className = "msg ai";
aiMsg.innerHTML = "⚠️ Error connecting to AI.";

messages.appendChild(aiMsg);

console.error(error);

}

}

// QUICK ASK FUNCTION
window.quickAsk = function(question){

const input = document.getElementById("user-input");

input.value = question;

sendMessage();

};

});
//Typing Effect
function typingEffect(element, text){

const messages = document.getElementById("chat-messages");

element.innerHTML = "";

let i = 0;

function type(){

if(i < text.length){
element.innerHTML += text.charAt(i);
i++;

messages.scrollTop = messages.scrollHeight;

setTimeout(type, 25);
}

}

type();

}
document.getElementById("user-input")
.addEventListener("keypress", function(e){
if(e.key === "Enter"){
sendMessage();
}
});