const jobs = [
    {
        id: 1,
        title: "Senior Product Engineer",
        company: "Figma",
        location: "USA",
        salary: "$145,000/Year",
        type: "Full Time",
        positions: 12,
        description: "Lead the development of innovative product solutions, leveraging your expertise in engineering and product management to drive success."
    },
    {
        id: 2,
        title: "Project Manager",
        company: "Google",
        location: "USA",
        salary: "$95,000/Year",
        type: "Full Time",
        positions: 2,
        description: "Manage project timelines and budgets to ensure successful delivery of projects on schedule, while maintaining clear communication with stakeholders."
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "LinkedIn",
        location: "Germany",
        salary: "$95,000/Year",
        type: "Full Time",
        positions: 3,
        description: "Develop and maintain web applications, ensuring high performance and responsiveness across platforms."
    }, 
    {
        id: 4,
        title: "UX Designer",
        company: "Amazon",
        location: "UK",
        salary: "$85,000/Year",
        type: "Full Time",
        positions: 5,

        description: "Create intuitive user experiences for web and mobile applications, collaborating with cross-functional teams to deliver high-quality designs."
    },
    {
        id: 5,
        title: "Data Scientist",    
        company: "Microsoft",
        location: "USA",
        salary: "$120,000/Year",
        type: "Full Time",
        positions: 4,
        description: "Analyze and interpret complex data sets to inform business decisions, leveraging statistical and machine learning techniques."
    },
    {
        id: 6,
        title: "Marketing Manager",
        company: "twitter",
        location: "UUKk",
        salary: "$90,000/Year",
        type: "Full Time",
        positions: 2,
        description: "Develop and implement marketing strategies to drive growth and engagement, collaborating with cross-functional teams to achieve business objectives." 
    }
    // Add more jobs as needed
];

let filteredJobs = [...jobs];

function filterJobs() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const location = document.getElementById('locationFilter')?.value || '';
    const salary = document.getElementById('salaryFilter')?.value || '';

    const loadingState = document.getElementById('loadingState');
    const jobsList = document.getElementById('jobsList');
    const noResults = document.getElementById('noResults');

    if (loadingState) loadingState.style.display = 'block';
    if (jobsList) jobsList.style.display = 'none';

    setTimeout(() => {
        try {
            filteredJobs = jobs.filter(job => {
                const matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                                    job.company.toLowerCase().includes(searchTerm) ||
                                    job.description.toLowerCase().includes(searchTerm);
                
                const matchesLocation = !location || job.location === location;
                const matchesSalary = !salary || matchesSalaryRange(job.salary, salary);
                
                return matchesSearch && matchesLocation && matchesSalary;
            });

            if (loadingState) loadingState.style.display = 'none';
            
            // Show warning message if no results found
            if (filteredJobs.length === 0) {
                if (noResults) {
                    noResults.classList.remove('hidden');
                    const warningMessage = `
                        <img src="assets/no-results.png" alt="No results">
                        <h3>No Jobs Found</h3>
                        <p>No jobs match "${searchTerm}"</p>
                        <p>Try different keywords or remove search filters</p>
                        <button onclick="resetFilters()" class="btn">Reset Filters</button>
                    `;
                    noResults.innerHTML = warningMessage;
                }
                if (jobsList) jobsList.style.display = 'none';
            } else {
                if (noResults) noResults.classList.add('hidden');
                if (jobsList) {
                    jobsList.style.display = 'grid';
                    displayJobs();
                }
            }
        } catch (error) {
            console.error('Error filtering jobs:', error);
            showToast('Error', 'Failed to filter jobs. Please try again.', 'error');
        }
    }, 500);
}

function matchesSalaryRange(jobSalary, range) {
    const salary = parseInt(jobSalary.replace(/[^0-9]/g, ''));
    const [min, max] = range.split('-').map(num => parseInt(num));
    
    if (range === '100000+') return salary >= 100000;
    return salary >= min && salary <= max;
}

function displayJobs() {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    try {
        jobsList.innerHTML = '';

        filteredJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job__card';
            jobCard.innerHTML = `
                <div class="job__card__header">
                    <img src="assets/${job.company.toLowerCase()}.png" alt="${job.company}" 
                         onerror="this.src='assets/default-company.png'"/>
                    <div>
                        <h5>${job.company}</h5>
                        <h6>${job.location}</h6>
                    </div>
                </div>
                <h4>${job.title}</h4>
                <p>${job.description}</p>
                <div class="job__card__footer">
                    <span>${job.positions} Positions</span>
                    <span>${job.type}</span>
                    <span>${job.salary}</span>
                </div>
                <button onclick="applyForJob(${job.id})" class="btn">Apply Now</button>
            `;
            jobsList.appendChild(jobCard);
        });
    } catch (error) {
        console.error('Error displaying jobs:', error);
        showToast('Error', 'Failed to display jobs. Please refresh the page.', 'error');
    }
}

function applyForJob(jobId) {
    window.location.href = `apply.html?jobId=${jobId}`;
}

// Add reset filters function
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const salaryFilter = document.getElementById('salaryFilter');

    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (locationFilter) locationFilter.value = '';
    if (salaryFilter) salaryFilter.value = '';

    filteredJobs = [...jobs];
    filterJobs();
}

// Add error handling to event listeners
document.addEventListener('DOMContentLoaded', () => {
    const filterElements = [
        'searchInput',
        'categoryFilter',
        'locationFilter',
        'salaryFilter'
    ];

    filterElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener('input', filterJobs);
            element.addEventListener('change', filterJobs);
        }
    });

    displayJobs();
});
