// PortGO Game Interface JavaScript

// Screen management
const screens = {
    login: document.getElementById('login-screen'),
    register: document.getElementById('register-screen'),
    mainMenu: document.getElementById('main-menu-screen'),
    rules: document.getElementById('rules-screen'),
    gameOptions: document.getElementById('game-options-screen'),
    game: document.getElementById('game-screen'),
    victory: document.getElementById('victory-screen'),
    defeat: document.getElementById('defeat-screen'),
    roulette: document.getElementById('roulette-screen'),
    ranking: document.getElementById('ranking-screen')
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
    alert('Créditos:\n\nPortGO - Jogo de Perguntas\nDesenvolvido com Bulma CSS\n\nObrigado por jogar!');
}

function startGame() {
    showScreen('gameOptions');
}

function showGameScreen() {
    showScreen('game');
}

function showVictoryScreen() {
    showScreen('victory');
}

function showDefeatScreen() {
    showScreen('defeat');
}

function showRouletteScreen() {
    showScreen('roulette');
}

function showRanking() {
    showScreen('ranking');
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
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) {
        return false;
    }
    
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    return true;
}

// Registration process
function register() {
    if (validateRegistration()) {
        const name = document.getElementById('reg-name').value.trim();
        
        alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${name}!`);
        
        showMainMenu();
    }
}

// Add button click effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.pixel-button, .pixel-button-small');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
}

// Sound effect placeholder
function playClickSound() {
    console.log('Click sound played');
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
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
    showLogin();
    addButtonEffects();
    setupKeyboardNavigation();
    
    const cpfField = document.getElementById('reg-cpf');
    if (cpfField) {
        cpfField.addEventListener('input', function() {
            formatCPF(this);
        });
    }
    
    const phoneField = document.getElementById('reg-phone');
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            formatPhone(this);
        });
    }
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                autoFocusFirstInput();
            }
        });
    });
    
    Object.values(screens).forEach(screen => {
        if (screen) {
            observer.observe(screen, { attributes: true });
        }
    });
    
    console.log('PortGO Game Interface initialized successfully!');
}

document.addEventListener('DOMContentLoaded', init);

window.addEventListener('resize', function() {
    console.log('Window resized');
});

document.addEventListener('submit', function(event) {
    event.preventDefault();
});

function toggleTable() {
    const table = document.getElementById('ranking-table');
    table.classList.toggle('is-hidden');
}

function setRankingView(type) {
    document.getElementById('btn-aluno').classList.remove('is-active');
    document.getElementById('btn-escola').classList.remove('is-active');
    document.getElementById(`btn-${type}`).classList.add('is-active');
}

function showVictoryScreen() {
    showScreen('victory');
}

function showDefeatScreen() {
    showScreen('defeat');
}

function nextQuestion() {
    hideAllScreens();
    showRouletteScreen();
}

const respostaButtons = document.querySelectorAll('.resposta-button');

respostaButtons.forEach(button => {
    button.addEventListener('click', function () {
        const isCorrect = this.dataset.correct === "true";
        if (isCorrect) {
            showVictoryScreen();
        } else {
            showDefeatScreen();
        }
    });
});

let currentRotation = 0;

function spinRoulette() {
    const segments = [
        { label: 'FÁCIL', angle: 45, action: () => startQuestion('facil') },
        { label: 'MÉDIO', angle: 90, action: () => startQuestion('medio') },
        { label: 'DIFÍCIL', angle: 135, action: () => startQuestion('dificil') },
        { label: 'DIFÍCIL', angle: 180, action: () => startQuestion('dificil') },
        { label: 'DIFÍCIL', angle: 225, action: () => startQuestion('dificil') },
        { label: 'DIFÍCIL', angle: 270, action: () => startQuestion('dificil') },
        { label: 'FÁCIL', angle: 315, action: () => startQuestion('facil') },
        { label: 'FÁCIL', angle: 360, action: () => startQuestion('facil') },
    ];

    const index = Math.floor(Math.random() * segments.length);
    const segment = segments[index];
    
    const extraSpins = 3 * 360;
    currentRotation += extraSpins + segment.angle;

    const roulette = document.getElementById('roulette-image');
    roulette.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        console.log(`Segmento sorteado: ${segment.label}`);
        segment.action();
    }, 4000);
}

function startQuestion(dificuldade) {
    console.log("Iniciar pergunta com dificuldade:", dificuldade);
    showGameScreen();
}

function drawCard() {
    const gameScreen = document.getElementById('game-screen');
    const drawnCard = document.getElementById('drawn-card');
    const message = document.getElementById('card-message');

    const outcomes = [
        { text: "CARTA BOA", color: "#00FFFF", image: "img/card-good.png" },
        { text: "CARTA RUIM", color: "#FF3B3B", image: "img/card-bad.png" },
        { text: "CARTA BOA", color: "#00FFFF", image: "img/card-good.png" }
    ];

    const result = outcomes[Math.floor(Math.random() * outcomes.length)];

    // Atualiza texto e estilo da mensagem
    message.innerText = result.text;
    message.style.backgroundColor = result.color;

    // Atualiza imagem da carta sorteada
    drawnCard.src = result.image;

    // Mostra elementos e aplica animação
    drawnCard.classList.remove('is-hidden');
    message.classList.remove('is-hidden');
    gameScreen.classList.add('shake-screen');

    // Esconde após 3 segundos
    setTimeout(() => {
        gameScreen.classList.remove('shake-screen');
        drawnCard.classList.add('is-hidden');
        message.classList.add('is-hidden');
    }, 3000);
}