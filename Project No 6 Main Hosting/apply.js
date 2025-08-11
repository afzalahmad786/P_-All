// Get job details from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('jobId');

// Fetch job details (in a real application, this would come from a backend)
const jobs = [
    {
        id: 1,
        title: "Senior Product Engineer",
        company: "Figma"
    },
    {
        id: 2,
        title: "Project Manager",
        company: "Google"
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "LinkedIn"
    },
    {
        id: 4,
        title: "UX Designer",
        company: "Amazon"
    },
    {
        id: 5,
        title: "Data Scientist",
        company: "Microsoft"
    },
    {
        id: 6,
        title: "Marketing Manager",
        company: "twitter"
    },
    // Add more jobs as needed
];

let currentStep = 0;
const steps = ['personal-info', 'experience', 'documents'];

function nextStep() {
    if (validateCurrentStep()) {
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        updateFormProgress();
    }
}

function prevStep() {
    currentStep = Math.max(currentStep - 1, 0);
    updateFormProgress();
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.${steps[currentStep]}`);
    if (!currentStepElement) return true;

    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else {
            clearFieldError(field);
        }
    });

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function updateFormProgress() {
    try {
        const progressSteps = document.querySelectorAll('.progress__step');
        const prevBtn = document.querySelector('.btn__secondary');
        const nextBtn = document.querySelector('.btn:not([type="submit"])');
        const submitBtn = document.querySelector('button[type="submit"]');

        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });

        if (prevBtn) prevBtn.style.display = currentStep === 0 ? 'none' : 'block';
        if (nextBtn) nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'block';
        if (submitBtn) submitBtn.style.display = currentStep === steps.length - 1 ? 'block' : 'none';
    } catch (error) {
        console.error('Error updating form progress:', error);
    }
}

window.onload = function() {
    const job = jobs.find(j => j.id === parseInt(jobId));
    if (job) {
        document.getElementById('jobTitle').textContent = `${job.title} at ${job.company}`;
        document.getElementById('jobId').value = job.id;
    }
    updateFormProgress();
};

// Modified submit function
function submitApplication(event) {
    event.preventDefault();

    if (!validateCurrentStep()) {
        showToast('Error', 'Please fill in all required fields', 'error');
        return false;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loader"></span> Submitting...';
    }

    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        // Simulate API call
        setTimeout(() => {
            showToast('Success', 'Application submitted successfully!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
    } catch (error) {
        console.error('Error submitting application:', error);
        showToast('Error', 'Failed to submit application. Please try again.', 'error');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit Application';
        }
    }

    return false;
}

function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type} active`;
    toast.innerHTML = `
        <div class="toast__content">
            <i class="ri-checkbox-circle-fill"></i>
            <div class="toast__message">
                <span class="toast__text">${title}</span>
                <span class="toast__description">${message}</span>
            </div>
            <i class="ri-close-line toast__close" onclick="this.parentElement.parentElement.remove()"></i>
        </div>
        <div class="toast__progress"></div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Initialize form
window.addEventListener('load', () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('jobId');
        const jobTitle = document.getElementById('jobTitle');
        const jobIdInput = document.getElementById('jobId');

        if (jobId && jobTitle && jobIdInput) {
            const job = jobs.find(j => j.id === parseInt(jobId));
            if (job) {
                jobTitle.textContent = `${job.title} at ${job.company}`;
                jobIdInput.value = job.id;
            }
        }

        updateFormProgress();
    } catch (error) {
        console.error('Error initializing form:', error);
        showToast('Error', 'Failed to load form. Please refresh the page.', 'error');
    }
});
