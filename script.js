// Game configuration
const categories = [
    { name: 'Bebe chorão', color: '#ff3860' },
    { name: 'afff', color: '#3273dc' },
    { name: 'meu deus que dificil', color: '#48c774' },
    { name: 'Bebe chorão', color: '#ff3860' },
    { name: 'afff', color: '#3273dc' },
    { name: 'meu deus que dificil', color: '#48c774' },
    { name: 'Bebe chorão', color: '#ff3860' },
    { name: 'afff', color: '#3273dc' },
    { name: 'meu deus que dificil', color: '#48c774' },
];

// Sample questions for each difficulty
const questions = {
    'History': [
        { q: 'In which year did World War II end?', answers: ['1945', '1944', '1946', '1943'], correct: 0 },
        { q: 'Who was the first President of the United States?', answers: ['George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin'], correct: 0 },
        { q: 'Which empire was ruled by Julius Caesar?', answers: ['Roman Empire', 'Greek Empire', 'Byzantine Empire', 'Ottoman Empire'], correct: 0 },
        { q: 'The French Revolution began in which year?', answers: ['1789', '1776', '1792', '1804'], correct: 0 },
        { q: 'Who built the first automobile?', answers: ['Karl Benz', 'Henry Ford', 'Gottlieb Daimler', 'Nicolas Cugnot'], correct: 0 }
    ],
    'Science': [
        { q: 'What is the chemical symbol for gold?', answers: ['Au', 'Ag', 'Fe', 'Cu'], correct: 0 },
        { q: 'How many bones are in the adult human body?', answers: ['206', '205', '207', '208'], correct: 0 },
        { q: 'What planet is known as the Red Planet?', answers: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correct: 0 },
        { q: 'What gas makes up most of Earth\'s atmosphere?', answers: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'], correct: 0 },
        { q: 'Who developed the theory of relativity?', answers: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Stephen Hawking'], correct: 0 }
    ],
    'Sports': [
        { q: 'How many players are on a basketball team on the court?', answers: ['5', '6', '7', '4'], correct: 0 },
        { q: 'In which sport would you perform a slam dunk?', answers: ['Basketball', 'Volleyball', 'Tennis', 'Baseball'], correct: 0 },
        { q: 'How often are the Summer Olympics held?', answers: ['Every 4 years', 'Every 2 years', 'Every 3 years', 'Every 5 years'], correct: 0 },
        { q: 'What is the maximum score possible in ten-pin bowling?', answers: ['300', '250', '200', '400'], correct: 0 },
        { q: 'In which sport is the Ryder Cup contested?', answers: ['Golf', 'Tennis', 'Cricket', 'Rugby'], correct: 0 }
    ],
    'Arts': [
        { q: 'Who painted the Mona Lisa?', answers: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'], correct: 0 },
        { q: 'Which instrument has 88 keys?', answers: ['Piano', 'Organ', 'Harpsichord', 'Accordion'], correct: 0 },
        { q: 'What type of art is Auguste Rodin famous for?', answers: ['Sculpture', 'Painting', 'Photography', 'Architecture'], correct: 0 },
        { q: 'Who wrote the play "Romeo and Juliet"?', answers: ['William Shakespeare', 'Christopher Marlowe', 'Ben Jonson', 'John Webster'], correct: 0 },
        { q: 'Which art movement was Pablo Picasso associated with?', answers: ['Cubism', 'Impressionism', 'Surrealism', 'Abstract Expressionism'], correct: 0 }
    ],
    'Geography': [
        { q: 'Which is the largest continent?', answers: ['Asia', 'Africa', 'North America', 'Europe'], correct: 0 },
        { q: 'What is the capital of Australia?', answers: ['Canberra', 'Sydney', 'Melbourne', 'Perth'], correct: 0 },
        { q: 'Which river is the longest in the world?', answers: ['Nile', 'Amazon', 'Mississippi', 'Yangtze'], correct: 0 },
        { q: 'Mount Everest is located in which mountain range?', answers: ['Himalayas', 'Andes', 'Rocky Mountains', 'Alps'], correct: 0 },
        { q: 'Which country has the most time zones?', answers: ['France', 'Russia', 'United States', 'China'], correct: 0 }
    ],
    'Entertainment': [
        { q: 'Which movie won the Academy Award for Best Picture in 2020?', answers: ['Parasite', '1917', 'Joker', 'Once Upon a Time in Hollywood'], correct: 0 },
        { q: 'Who directed the movie "Jaws"?', answers: ['Steven Spielberg', 'George Lucas', 'Francis Ford Coppola', 'Martin Scorsese'], correct: 0 },
        { q: 'Which TV series features dragons and the Iron Throne?', answers: ['Game of Thrones', 'The Witcher', 'Vikings', 'The Crown'], correct: 0 },
        { q: 'What is the highest-grossing animated movie of all time?', answers: ['Frozen II', 'The Lion King', 'Frozen', 'Incredibles 2'], correct: 0 },
        { q: 'Which streaming service produced "Stranger Things"?', answers: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max'], correct: 0 }
    ]
};

// Game state
let currentCategory = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let isSpinning = false;
let rotation = 0;

// DOM elements
const canvas = document.getElementById('roulette');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const resultBox = document.getElementById('result-box');
const quizBox = document.getElementById('quiz-box');
const newSpinBtn = document.getElementById('new-spin-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');

// Initialize the game
document.addEventListener('DOMContentLoaded', function () {
    drawRoulette();
    setupEventListeners();
});

function setupEventListeners() {
    spinBtn.addEventListener('click', spinRoulette);
    newSpinBtn.addEventListener('click', resetGame);
    startQuizBtn.addEventListener('click', startQuiz);
    document.getElementById('close-quiz-result').addEventListener('click', closeQuizResult);
}

function drawRoulette() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;
    const anglePerSegment = (2 * Math.PI) / (categories.length);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);
    categories.forEach((difficulty, index) => {
        const startAngle = index * anglePerSegment;
        const endAngle = startAngle + anglePerSegment;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = difficulty.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.rotate(startAngle + anglePerSegment / 2);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(difficulty.name, radius / 2, 5);
        ctx.restore();
    });


    ctx.restore();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#363636';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function spinRoulette() {
    if (isSpinning) return;

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.innerHTML = '<span class="icon"><i class="fas fa-spinner fa-spin"></i></span><span>Rodaaaando...</span>';

    // Random spin amount (at least 5 full rotations)
    const spinAmount = Math.random() * 2 * Math.PI + 10 * Math.PI;
    const duration = 3000; // 3 seconds
    const startTime = Date.now();
    const startRotation = rotation;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);

        rotation = startRotation + spinAmount * easeOut;
        drawRoulette();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Determine winning difficulty
            const normalizedRotation = (rotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            const segmentAngle = (2 * Math.PI) / categories.length;
            const winningIndex = Math.floor((2 * Math.PI - normalizedRotation + segmentAngle / 2) / segmentAngle) % (categories.length);

            showResult(categories[winningIndex]);
            isSpinning = false;
        }
    }

    animate();
}

function showResult(difficulty) {
    currentCategory = difficulty.name;

    // Update result display
    document.getElementById('result-difficulty').textContent = difficulty.name;
    document.getElementById('result-icon').innerHTML = `<i class="${difficulty.icon}"></i>`;
    document.getElementById('result-text').textContent = `Perguntas ${difficulty.name}!`;
    document.getElementById('result-description').textContent = `Se prepare para uma pergunta ${difficulty.name.toLowerCase()}!`;

    // Show result box
    resultBox.classList.remove('is-hidden');

    // Reset spin button
    spinBtn.disabled = false;
    spinBtn.innerHTML = '<span class="icon"><i class="fas fa-play"></i></span><span>Roda a Roletaaa!</span>';
}

function startQuiz() {
    // Initialize quiz
    currentQuestions = [...questions[currentCategory]];
    currentQuestionIndex = 0;
    score = 0;

    // Hide result box and show quiz
    resultBox.classList.add('is-hidden');
    quizBox.classList.remove('is-hidden');

    // Update quiz header
    document.getElementById('quiz-difficulty').textContent = currentCategory;
    document.getElementById('quiz-score').textContent = score;
    document.getElementById('quiz-total').textContent = currentQuestions.length;

    // Show first question
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    // Update progress
    const progress = (currentQuestionIndex / currentQuestions.length) * 100;
    document.getElementById('quiz-progress').value = progress;

    // Show question
    document.getElementById('question-text').textContent = question.q;

    // Create answer buttons
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'button is-fullwidth mb-2';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;

    // Update score
    if (isCorrect) {
        score++;
        document.getElementById('quiz-score').textContent = score;
    }

    // Disable buttons and show feedback
    const buttons = document.querySelectorAll('#answers-container .button');
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correct) {
            button.classList.add('is-success');
        } else if (index === selectedIndex && !isCorrect) {
            button.classList.add('is-danger');
        }
    });

    // Show result notification
    const resultNotification = document.getElementById('quiz-result');
    const resultText = document.getElementById('quiz-result-text');

    if (isCorrect) {
        resultNotification.className = 'notification is-success';
        resultText.textContent = 'Correct! Well done!';
    } else {
        resultNotification.className = 'notification is-danger';
        resultText.textContent = `Incorrect. The correct answer was: ${question.answers[question.correct]}`;
    }

    resultNotification.classList.remove('is-hidden');

    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        resultNotification.classList.add('is-hidden');
        showQuestion();
    }, 2000);
}

function closeQuizResult() {
    document.getElementById('quiz-result').classList.add('is-hidden');
}

function endQuiz() {
    // Update progress to 100%
    document.getElementById('quiz-progress').value = 100;

    // Show final score
    const percentage = Math.round((score / currentQuestions.length) * 100);
    let message = '';
    let notificationClass = '';

    if (percentage >= 80) {
        message = `Excellent! You scored ${score}/${currentQuestions.length} (${percentage}%)`;
        notificationClass = 'notification is-success';
    } else if (percentage >= 60) {
        message = `Good job! You scored ${score}/${currentQuestions.length} (${percentage}%)`;
        notificationClass = 'notification is-info';
    } else {
        message = `Keep trying! You scored ${score}/${currentQuestions.length} (${percentage}%)`;
        notificationClass = 'notification is-warning';
    }

    // Show final result
    const resultNotification = document.getElementById('quiz-result');
    const resultText = document.getElementById('quiz-result-text');

    resultNotification.className = notificationClass;
    resultText.innerHTML = `${message}<br><br><button class="button is-primary" onclick="resetGame()">Play Again</button>`;
    resultNotification.classList.remove('is-hidden');

    // Hide question container
    document.getElementById('question-container').style.display = 'none';
}

function resetGame() {
    // Hide all boxes
    resultBox.classList.add('is-hidden');
    quizBox.classList.add('is-hidden');
    document.getElementById('quiz-result').classList.add('is-hidden');

    // Reset question container
    document.getElementById('question-container').style.display = 'block';

    // Reset game state
    currentCategory = '';
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;

    // Reset spin button
    spinBtn.disabled = false;
    spinBtn.innerHTML = '<span class="icon"><i class="fas fa-play"></i></span><span>Spin the Wheel!</span>';
}