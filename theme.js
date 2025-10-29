class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Create theme switcher button
        this.createThemeSwitcher();
        
        // Apply saved theme
        this.applyTheme(this.theme);
        
        // Update button icon
        this.updateSwitcherIcon();
    }

    createThemeSwitcher() {
        const button = document.createElement('button');
        button.className = 'theme__switcher';
        button.setAttribute('aria-label', 'Toggle theme');
        button.innerHTML = '<i class="ri-sun-line"></i>';
        
        button.addEventListener('click', () => this.toggleTheme());
        
        document.body.appendChild(button);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        
        // Save to localStorage
        localStorage.setItem('theme', this.theme);
        
        // Apply theme
        this.applyTheme(this.theme);
        
        // Update button icon with animation
        this.updateSwitcherIcon(true);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Add animation class to body
        document.body.classList.add('theme-transition');
        
        // Remove animation class after transition
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    updateSwitcherIcon(animate = false) {
        const button = document.querySelector('.theme__switcher');
        if (!button) return;

        const icon = button.querySelector('i');
        
        if (animate) {
            icon.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0)';
            }, 200);
        }
        
        if (this.theme === 'dark') {
            icon.className = 'ri-moon-line';
        } else {
            icon.className = 'ri-sun-line';
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});

// Handle theme preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    new ThemeManager().applyTheme(newTheme);
});
