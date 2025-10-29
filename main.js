const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

// Close menu when clicking links
navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Simple smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h2", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".steps__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".explore__card", {
  duration: 500,
  interval: 100,
});

ScrollReveal().reveal(".job__card", {
  ...scrollRevealOption,
  interval: 100,
});

ScrollReveal().reveal(".offer__card", {
  ...scrollRevealOption,
  interval: 100,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

// Remove duplicate event listeners and consolidate into one clean implementation
const viewMoreBtn = document.getElementById("view-more-btn");
const hiddenCards = document.querySelectorAll(".explore__card.hidden");

if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
    hiddenCards.forEach(card => {
      card.classList.toggle("show");
    });
    
    viewMoreBtn.textContent = viewMoreBtn.textContent.includes("View All") 
      ? "Show Less" 
      : "View All Categories";
  });
}

// Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    
    // Here you would typically send this data to your backend
    console.log('Contact form submitted:', formProps);
    
    // Show success toast
    showToast();
    
    // Reset form
    event.target.reset();
    
    return false;
}

// Toast Notification
function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
}

function closeToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('active');
}

// Add contact section to scroll reveal
ScrollReveal().reveal(".contact__card", {
    ...scrollRevealOption,
    interval: 500,
});
