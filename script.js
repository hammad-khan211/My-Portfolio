// Vanta.js initialization for a light theme
VANTA.GLOBE({
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

// Function to load content from a file
function loadContent(pageName) {
    const contentContainer = document.getElementById('dynamic-content-container');
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