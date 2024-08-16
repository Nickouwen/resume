document.addEventListener("DOMContentLoaded", function() {
    function typeString(text, element, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('heading')) {
                    // Start typewriter effect for headings
                    const text = entry.target.textContent;
                    entry.target.textContent = ''; // Clear the text content before typing
                    typeString(text, entry.target, 40);
                } else if (entry.target.classList.contains('animatedParagraph')) {
                    // Fade in and move up for paragraphs
                    entry.target.classList.add('show');
                }
                observer.unobserve(entry.target); // Stop observing once the animation starts
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    // Observe all paragraphs with class "animatedParagraph"
    const paragraphs = document.querySelectorAll('.animatedParagraph');
    paragraphs.forEach(paragraph => {
        observer.observe(paragraph);
    });

    // Observe all headings with class "heading"
    const headings = document.querySelectorAll('.heading');
    headings.forEach(heading => {
        observer.observe(heading);
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const closeImage = () => {
    overlay = document.getElementById('enlarged-img');
    overlay.setAttribute('style', 'display: none;');
};

const openImage = (image) => {
    overlay = document.getElementById('enlarged-img');
    overlay.setAttribute('style', 'display: flex;');
    overlay.children[1].setAttribute('src', image);
};
