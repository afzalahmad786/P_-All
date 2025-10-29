const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const btn = document.getElementById("btn");

function register() {
    loginForm.style.left = "-400px";
    registerForm.style.left = "50px";
    btn.style.left = "110px";
}

function login() {
    loginForm.style.left = "50px";
    registerForm.style.left = "450px";
    btn.style.left = "0";
}

// Form switching functionality
function switchForm(type) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (type === 'register') {
        loginForm.classList.remove('active');
        registerForm.classList.add('active', 'slide-up');
    } else {
        registerForm.classList.remove('active');
        loginForm.classList.add('active', 'slide-down');
    }
}

// Password visibility toggle
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const input = e.target.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            e.target.classList.replace('ri-eye-line', 'ri-eye-off-line');
        } else {
            input.type = 'password';
            e.target.classList.replace('ri-eye-off-line', 'ri-eye-line');
        }
    });
});

// Form validation
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && 
           hasNumber && hasSpecialChar;
}

function showError(input, message) {
    const group = input.closest('.input__group');
    group.classList.add('error');
    
    // Remove existing error message if any
    const existingError = group.nextElementSibling;
    if (existingError?.classList.contains('error__message')) {
        existingError.remove();
    }
    
    // Add new error message
    const error = document.createElement('div');
    error.className = 'error__message';
    error.textContent = message;
    group.parentNode.insertBefore(error, group.nextSibling);
}

function clearError(input) {
    const group = input.closest('.input__group');
    group.classList.remove('error');
    
    const error = group.nextElementSibling;
    if (error?.classList.contains('error__message')) {
        error.remove();
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.input__group').forEach(group => {
        clearError(group.querySelector('input'));
    });
    
    // Validate email
    if (!email.includes('@')) {
        showError(form.email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (password.length < 8) {
        showError(form.password, 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Logging in...';
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, you would verify credentials with your backend
            showToast('Success', 'Logged in successfully!', 'success');
            
            // Redirect after successful login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 1500);
    }
    
    return false;
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.input__group').forEach(group => {
        clearError(group.querySelector('input'));
    });
    
    // Validate full name
    if (fullName.length < 3) {
        showError(form.fullName, 'Full name must be at least 3 characters long');
        isValid = false;
    }
    
    // Validate email
    if (!email.includes('@')) {
        showError(form.email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        showError(form.password, 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character');
        isValid = false;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
        showError(form.confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    if (!form.terms.checked) {
        showToast('Error', 'Please accept the terms and conditions', 'error');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Creating account...';
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, you would send this data to your backend
            showToast('Success', 'Account created successfully!', 'success');
            
            // Switch to login form after successful registration
            setTimeout(() => {
                switchForm('login');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        }, 1500);
    }
    
    return false;
}

// Toast notification
function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast__content i:first-child');
    const text = toast.querySelector('.toast__text');
    const description = toast.querySelector('.toast__description');
    
    // Set toast type
    icon.className = type === 'success' ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill';
    toast.style.borderLeftColor = type === 'success' ? '#10319e' : '#ff3b30';
    
    // Set content
    text.textContent = title;
    description.textContent = message;
    
    // Show toast
    toast.classList.add('active');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function closeToast() {
    document.getElementById('toast').classList.remove('active');
}

// Social login handlers
document.querySelector('.google').addEventListener('click', () => {
    showToast('Info', 'Google login is not implemented in this demo', 'info');
});

document.querySelector('.linkedin').addEventListener('click', () => {
    showToast('Info', 'LinkedIn login is not implemented in this demo', 'info');
});

// Handle form submissions
loginForm.addEventListener('submit', handleLogin);

registerForm.addEventListener('submit', handleRegister);
