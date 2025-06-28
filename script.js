// Portin Game Interface JavaScript

// Screen management
const screens = {
    login: document.getElementById('login-screen'),
    register: document.getElementById('register-screen'),
    mainMenu: document.getElementById('main-menu-screen'),
    rules: document.getElementById('rules-screen'),
    gameOptions: document.getElementById('game-options-screen')
};

// Hide all screens
function hideAllScreens() {
    Object.values(screens).forEach(screen => {
        if (screen) {
            screen.classList.add('is-hidden');
        }
    });
}

// Show specific screen
function showScreen(screenName) {
    hideAllScreens();
    if (screens[screenName]) {
        screens[screenName].classList.remove('is-hidden');
    }
}

// Navigation functions
function showLogin() {
    showScreen('login');
    clearLoginForm();
}

function showRegister() {
    showScreen('register');
    clearRegisterForm();
}

function showMainMenu() {
    showScreen('mainMenu');
}

function showRules() {
    showScreen('rules');
}

function showCredits() {
    alert('Créditos:\n\nPortin - Jogo de Perguntas\nDesenvolvido com Bulma CSS\n\nObrigado por jogar!');
}

function startGame() {
    showScreen('gameOptions');
}

// Form handling
function clearLoginForm() {
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

function clearRegisterForm() {
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-phone').value = '';
    document.getElementById('reg-cpf').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm-password').value = '';
    document.getElementById('reg-role').value = '';
}

// Login validation
function validateLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (!email || !password) {
        alert('Por favor, preencha todos os campos!');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um email válido!');
        return false;
    }
    
    return true;
}

// Registration validation
function validateRegistration() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const cpf = document.getElementById('reg-cpf').value.trim();
    const password = document.getElementById('reg-password').value.trim();
    const confirmPassword = document.getElementById('reg-confirm-password').value.trim();
    const role = document.getElementById('reg-role').value.trim();
    
    if (!name || !email || !phone || !cpf || !password || !confirmPassword || !role) {
        alert('Por favor, preencha todos os campos!');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um email válido!');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return false;
    }
    
    if (password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return false;
    }
    
    if (!isValidCPF(cpf)) {
        alert('Por favor, insira um CPF válido!');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// CPF validation (basic format check)
function isValidCPF(cpf) {
    // Remove dots and dashes
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Check if has 11 digits
    if (cpf.length !== 11) {
        return false;
    }
    
    // Check if all digits are the same
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    return true;
}

// Registration process
function register() {
    if (validateRegistration()) {
        // Simulate registration process
        const name = document.getElementById('reg-name').value.trim();
        
        // Show success message
        alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${name}!`);
        
        // Redirect to main menu
        showMainMenu();
    }
}

// Add button click effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.pixel-button, .pixel-button-small');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click sound effect (if needed)
            playClickSound();
        });
    });
}

// Sound effect placeholder
function playClickSound() {
    // Placeholder for click sound effect
    // You can implement actual sound here if needed
    console.log('Click sound played');
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Enter key to login
        if (event.key === 'Enter') {
            const currentScreen = getCurrentScreen();
            
            if (currentScreen === 'login') {
                if (validateLogin()) {
                    showMainMenu();
                }
            } else if (currentScreen === 'register') {
                register();
            }
        }
        
        // Escape key to go back
        if (event.key === 'Escape') {
            const currentScreen = getCurrentScreen();
            
            if (currentScreen === 'register' || currentScreen === 'rules' || currentScreen === 'gameOptions') {
                showMainMenu();
            } else if (currentScreen === 'mainMenu') {
                showLogin();
            }
        }
    });
}

// Get current visible screen
function getCurrentScreen() {
    for (const [screenName, screen] of Object.entries(screens)) {
        if (screen && !screen.classList.contains('is-hidden')) {
            return screenName;
        }
    }
    return null;
}

// Auto-focus on first input
function autoFocusFirstInput() {
    const currentScreen = getCurrentScreen();
    let firstInput = null;
    
    if (currentScreen === 'login') {
        firstInput = document.getElementById('login-email');
    } else if (currentScreen === 'register') {
        firstInput = document.getElementById('reg-name');
    }
    
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

// CPF formatting
function formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
}

// Phone formatting
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    input.value = value;
}

// Initialize the application
function init() {
    // Show login screen by default
    showLogin();
    
    // Setup event listeners
    addButtonEffects();
    setupKeyboardNavigation();
    
    // Add formatting to CPF field
    const cpfField = document.getElementById('reg-cpf');
    if (cpfField) {
        cpfField.addEventListener('input', function() {
            formatCPF(this);
        });
    }
    
    // Add formatting to phone field
    const phoneField = document.getElementById('reg-phone');
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            formatPhone(this);
        });
    }
    
    // Auto-focus when screen changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                autoFocusFirstInput();
            }
        });
    });
    
    // Observe all screens for class changes
    Object.values(screens).forEach(screen => {
        if (screen) {
            observer.observe(screen, { attributes: true });
        }
    });
    
    console.log('Portin Game Interface initialized successfully!');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust layout if needed
    console.log('Window resized');
});

// Prevent form submission on Enter (handled by custom logic)
document.addEventListener('submit', function(event) {
    event.preventDefault();
});