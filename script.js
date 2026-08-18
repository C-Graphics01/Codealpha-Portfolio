"use strict";

/* =========================================================
   CHASHMAN PORTFOLIO
   Main JavaScript
========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("back-to-top");

const contactForm = document.getElementById("contact-form");

const sections = document.querySelectorAll("section[id]");


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   3. CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});


/* =========================================================
   4. ACTIVE NAVIGATION WHILE SCROLLING
========================================================= */

function updateActiveNav() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navItems.forEach((link) => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${sectionId}`) {

                    link.classList.add("active");

                }

            });

        }

    });

}


window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   5. HEADER SHADOW ON SCROLL
========================================================= */

const header = document.querySelector(".header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 25px rgba(76, 29, 149, 0.08)";

    } else {

        header.style.boxShadow = "none";

    }

}


window.addEventListener("scroll", updateHeader);


/* =========================================================
   6. BACK TO TOP BUTTON
========================================================= */

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener("scroll", updateBackToTop);


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   7. SCROLL REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .skill-card, .project-card, .timeline-item, .about-content, .about-image, .resume-box, .contact-item, .contact-form"
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   8. STAGGER PROJECT/SKILL ANIMATIONS
========================================================= */

function addAnimationDelay(selector) {

    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {

        element.style.transitionDelay = `${index * 0.08}s`;

    });

}


addAnimationDelay(".skill-card");
addAnimationDelay(".project-card");


/* =========================================================
   9. CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        if (!name || !email || !subject || !message) {
            return;
        }


        const nameValue = name.value.trim();
        const emailValue = email.value.trim();
        const subjectValue = subject.value.trim();
        const messageValue = message.value.trim();


        /* Basic validation */

        if (
            nameValue === "" ||
            emailValue === "" ||
            subjectValue === "" ||
            messageValue === ""
        ) {

            showFormMessage(
                "Please fill in all fields.",
                "error"
            );

            return;

        }


        /* Email validation */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(emailValue)) {

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        /*
            At this stage the form is only frontend-based.

            Later, we can connect this form to:
            - Netlify Forms
            - Formspree
            - EmailJS
            - Backend API
        */


        showFormMessage(
            `Thanks ${nameValue}! Your message has been received.`,
            "success"
        );


        contactForm.reset();

    });

}


/* =========================================================
   10. FORM MESSAGE FUNCTION
========================================================= */

function showFormMessage(message, type) {

    let existingMessage =
        document.querySelector(".form-message");


    if (existingMessage) {

        existingMessage.remove();

    }


    const messageElement =
        document.createElement("div");


    messageElement.className =
        `form-message ${type}`;


    messageElement.textContent = message;


    contactForm.appendChild(messageElement);


    setTimeout(() => {

        messageElement.style.opacity = "0";

        messageElement.style.transform =
            "translateY(-5px)";

        setTimeout(() => {

            messageElement.remove();

        }, 300);

    }, 4000);

}


/* =========================================================
   11. TYPING EFFECT
========================================================= */

const heroSubtitle =
    document.querySelector(".hero-content h2");


const typingTexts = [
    "IT Student & Web Developer",
    "Django Developer",
    "Frontend Developer",
    "Digital Creator",
    "UI & Web Designer"
];


let textIndex = 0;
let characterIndex = 0;
let isDeleting = false;


function typeEffect() {

    if (!heroSubtitle) return;


    const currentText =
        typingTexts[textIndex];


    if (!isDeleting) {

        heroSubtitle.textContent =
            currentText.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentText.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1800);

            return;

        }

    } else {

        heroSubtitle.textContent =
            currentText.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            isDeleting = false;

            textIndex =
                (textIndex + 1) % typingTexts.length;

        }

    }


    const typingSpeed =
        isDeleting ? 45 : 80;


    setTimeout(typeEffect, typingSpeed);

}


/* Start typing effect */

if (heroSubtitle) {

    setTimeout(typeEffect, 1000);

}


/* =========================================================
   12. PROJECT IMAGE FALLBACK
========================================================= */

const projectImages =
    document.querySelectorAll(".project-image img");


projectImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        image.parentElement.style.background =
            "linear-gradient(135deg, #7c3aed, #5b21b6)";

    });

});


/* =========================================================
   13. PROFILE IMAGE FALLBACK
========================================================= */

const profileImages =
    document.querySelectorAll(
        ".profile-image, .about-image img"
    );


profileImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        image.parentElement.style.background =
            "linear-gradient(135deg, #7c3aed, #a78bfa)";

    });

});


/* =========================================================
   14. SMOOTH ANCHOR SCROLLING
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        const headerHeight =
            header ? header.offsetHeight : 0;


        const targetPosition =
            target.offsetTop - headerHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   15. CURRENT YEAR
========================================================= */

const footerYear =
    document.querySelector(".footer-bottom p");


if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.innerHTML =
        `© ${currentYear} Chashman. All Rights Reserved.`;

}


/* =========================================================
   16. PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    updateActiveNav();

    updateHeader();

    updateBackToTop();

});


/* =========================================================
   17. CONSOLE MESSAGE
========================================================= */

console.log(
    "%cChashman Portfolio",
    "color: #7c3aed; font-size: 20px; font-weight: bold;"
);

console.log(
    "Portfolio loaded successfully."
);