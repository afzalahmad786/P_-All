// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeMenu();
    initializeReviews();
    initializeNewsletterForm();
    initializeBooking();
    initializeOrderButtons();
    initializeAnimations();
    initializeContactForm();
});

// Handle mobile navigation and smooth scrolling
function initializeNavigation() {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuViewBtn = document.querySelector('.view-menu');
    
    // Toggle mobile menu
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navContent.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContent.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navContent.classList.remove('active');
        }
    });

    // Handle header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        lastScroll = currentScroll;
    });

    // Function to handle smooth scrolling
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            mobileMenuBtn.classList.remove('active');
            navContent.classList.remove('active');
            
            // Scroll to section
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`a[href="${targetId}"]`)?.classList.add('active');
        }
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });

    // Handle menu view button click
    menuViewBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToSection('#menu');
    });

    // Handle order now button click to scroll to menu
    document.querySelectorAll('.order-now').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollToSection('#menu');
        });
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Menu items data
const menuItems = {
    starters: [
        {
            name: "Bruschetta",
            price: "$8.99",
            description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil",
            image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500",
            dietary: ["vegetarian"],
            spicy: false
        },
        {
            name: "Calamari Fritti",
            price: "$12.99",
            description: "Crispy fried squid served with marinara sauce and lemon wedges",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500",
            dietary: [],
            spicy: false
        }
    ],
    "main-course": [
        {
            name: "Grilled Ribeye Steak",
            price: "$32.99",
            description: "12oz ribeye steak grilled to perfection, served with roasted vegetables",
            image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500",
            dietary: ["gluten-free"],
            spicy: false
        },
        {
            name: "Chicken Marsala",
            price: "$24.99",
            description: "Pan-seared chicken breast in a Marsala wine sauce with mushrooms",
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
            dietary: [],
            spicy: false
        }
    ],
    seafood: [
        {
            name: "Grilled Salmon",
            price: "$28.99",
            description: "Fresh Atlantic salmon with lemon herb butter and seasonal vegetables",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500",
            dietary: ["gluten-free"],
            spicy: false
        },
        {
            name: "Seafood Paella",
            price: "$34.99",
            description: "Traditional Spanish rice dish with mixed seafood and saffron",
            image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500",
            dietary: [],
            spicy: true
        }
    ],
    desserts: [
        {
            name: "Tiramisu",
            price: "$8.99",
            description: "Classic Italian dessert with layers of coffee-soaked ladyfingers",
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
            dietary: ["vegetarian"],
            spicy: false
        },
        {
            name: "Chocolate Lava Cake",
            price: "$9.99",
            description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
            dietary: ["vegetarian"],
            spicy: false
        }
    ],
    drinks: [
        {
            name: "Signature Cocktail",
            price: "$12.99",
            description: "House special blend of premium spirits with fresh fruit juices",
            image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500",
            dietary: [],
            spicy: false
        },
        {
            name: "Craft Beer Selection",
            price: "$7.99",
            description: "Rotating selection of local and international craft beers",
            image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=500",
            dietary: [],
            spicy: false
        }
    ]
};

// Initialize menu functionality
function initializeMenu() {
    const menuContainer = document.querySelector('.menu-container');
    const categoryButtons = document.querySelectorAll('.menu-category-btn');
    
    if (!menuContainer || !categoryButtons.length) return;
    
    // Load all items initially
    loadMenuItems('all');
    
    // Add click handlers to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Load items for selected category
            const category = button.dataset.category;
            loadMenuItems(category);
        });
    });
}

// Load menu items for a category
function loadMenuItems(category) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = '';
    
    // Get items for category
    let items = [];
    if (category === 'all') {
        // Combine all categories
        Object.values(menuItems).forEach(categoryItems => {
            items = [...items, ...categoryItems];
        });
    } else {
        items = menuItems[category] || [];
    }
    
    // Create and append menu items
    items.forEach(item => {
        const menuItem = createMenuItem(item);
        menuContainer.appendChild(menuItem);
    });
}

// Create a menu item element
function createMenuItem(item) {
    const element = document.createElement('div');
    element.className = 'menu-item';
    
    // Create dietary icons
    const dietaryIcons = {
        vegetarian: '<i class="fas fa-leaf" title="Vegetarian"></i>',
        'gluten-free': '<i class="fas fa-wheat-awn-circle-exclamation" title="Gluten Free"></i>'
    };
    
    const dietaryHTML = item.dietary
        .map(diet => dietaryIcons[diet] || '')
        .join('');
    
    element.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}">
            ${item.spicy ? '<span class="menu-item-badge">Spicy</span>' : ''}
        </div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-title">${item.name}</h3>
                <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
                <div class="dietary-info">
                    ${dietaryHTML}
                    ${item.spicy ? '<i class="fas fa-pepper-hot" title="Spicy"></i>' : ''}
                </div>
                <button class="btn-primary order-now">
                    <i class="fas fa-shopping-cart"></i> Order
                </button>
            </div>
        </div>
    `;
    
    return element;
}

// Sample reviews data
const allReviews = [
    {
        name: "Sarah Johnson",
        date: "January 15, 2025",
        rating: 5,
        comment: "The food was absolutely amazing! The flavors were perfectly balanced and the presentation was beautiful. The service was impeccable too!",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        helpful: 24
    },
    {
        name: "Michael Chen",
        date: "January 18, 2025",
        rating: 5,
        comment: "Best Italian restaurant in the city! The homemade pasta is to die for, and the wine selection is excellent. Will definitely be coming back!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        helpful: 18
    },
    {
        name: "Emily Davis",
        date: "January 20, 2025",
        rating: 4,
        comment: "Lovely atmosphere and great food. The dessert menu is exceptional. Service was a bit slow but the quality made up for it.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        helpful: 15
    },
    {
        name: "David Wilson",
        date: "January 21, 2025",
        rating: 5,
        comment: "The chef's special was outstanding! Love the attention to detail and the friendly staff. Perfect for special occasions.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        helpful: 21
    },
    {
        name: "Lisa Martinez",
        date: "January 22, 2025",
        rating: 5,
        comment: "Amazing experience from start to finish. The seafood pasta was fresh and delicious. The ambiance is perfect for a romantic dinner.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        helpful: 12
    }
];

// Initialize reviews section
function initializeReviews() {
    const reviewsContainer = document.querySelector('.reviews-container');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let visibleReviews = 3;

    if (!reviewsContainer || !loadMoreBtn) return;

    // Function to create star rating HTML
    function createStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Function to display reviews
    function displayReviews(count) {
        reviewsContainer.innerHTML = '';
        
        const reviewsToShow = allReviews.slice(0, count);
        
        reviewsToShow.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
            
            reviewCard.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-image">
                        <img src="${review.image}" alt="${review.name}">
                    </div>
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <span class="date">${review.date}</span>
                    </div>
                </div>
                <div class="review-rating">
                    ${createStarRating(review.rating)}
                </div>
                <p class="review-content">${review.comment}</p>
                <div class="review-footer">
                    <span class="helpful">
                        <i class="fas fa-thumbs-up"></i>
                        ${review.helpful} found this helpful
                    </span>
                </div>
            `;
            
            reviewsContainer.appendChild(reviewCard);
        });
        
        // Show/hide load more button
        loadMoreBtn.style.display = count >= allReviews.length ? 'none' : 'inline-flex';
    }

    // Initial display
    displayReviews(visibleReviews);

    // Load more button click handler
    loadMoreBtn.addEventListener('click', () => {
        visibleReviews += 2;
        displayReviews(visibleReviews);
    });
}

// Handle newsletter form submission
function initializeNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Here you would typically send this to your backend
        showNotification('Thank you for subscribing! We will keep you updated.', 'success');
        form.reset();
    });
}

// Initialize booking functionality
function initializeBooking() {
    const bookTableBtns = document.querySelectorAll('.book-table');
    if (bookTableBtns.length === 0) return;

    bookTableBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically open a booking modal
            showNotification('Booking feature coming soon!', 'info');
        });
    });
}

// Initialize order buttons
function initializeOrderButtons() {
    const orderButtons = document.querySelectorAll('.order-now, .category-card button');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically open an order modal or redirect to order page
            showNotification('Online ordering coming soon!', 'info');
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.category-card, .about-content, .info-content, .ingredients-content, .chef-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            phone: this.querySelector('#phone').value,
            message: this.querySelector('#message').value
        };
        
        // Here you would typically send this to your backend
        console.log('Form submitted:', formData);
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Utility function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }

    // Add appropriate class for styling
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Show notification
    notification.classList.add('show');

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Handle errors globally
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    showNotification('Something went wrong. Please try again.', 'error');
});
