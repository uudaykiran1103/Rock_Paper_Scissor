const container = document.querySelector('.choice-container');
const container2 = document.querySelector('.container2');
const nextButton = document.querySelector('.next'); 
const buttons = document.querySelectorAll('.buttons');
const playAgainButton = document.querySelector('.playagain');
const userChoiceDiv = document.querySelector('.userchoice');
const computerChoiceDiv = document.querySelector('.computerchoice');

const choices = ['rock', 'paper', 'scissor'];

let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
const heheDiv = document.querySelector('.choices-info');

function updateScoreDisplay() {
    document.getElementById('Computer-score').innerText = computerScore;
    document.getElementById('your-score').innerText = userScore;
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateChoiceDisplay(choiceDiv, choice) {
    choiceDiv.innerHTML = `<img src="${choice}.svg" alt="${choice}">`;

    choiceDiv.classList.remove('rock', 'paper', 'scissor'); 
    choiceDiv.classList.add(choice);

    choiceDiv.style.border = `16px solid var(--${choice}-border-color)`;
}

function determineWinner(userChoice, computerChoice) {
    userChoiceDiv.classList.remove('pulsing-div');
    computerChoiceDiv.classList.remove('pulsing-div');

    if (userChoice === computerChoice) {
        return "TIE UP";
    }

    if (
        (userChoice === 'rock' && computerChoice === 'scissor') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissor' && computerChoice === 'paper')
    ) {
      
        updateChoiceDisplay(userChoiceDiv, userChoice);
        userChoiceDiv.classList.add('pulsing-div');
        userScore++; 
        localStorage.setItem('userScore', userScore); 
        updateScoreDisplay(); 

        nextButton.style.display = 'block';
        
        return `YOU WIN <span style="font-size: 25px;">AGAINST PC</span>`;
    }

    updateChoiceDisplay(computerChoiceDiv, computerChoice);
    computerChoiceDiv.classList.add('pulsing-div'); 
    computerScore++;
    localStorage.setItem('computerScore', computerScore);
    updateScoreDisplay(); 
    nextButton.style.display = 'none';
    return `YOU LOST <span style="font-size: 25px;">AGAINST PC</span>`;
}

updateScoreDisplay();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.id;
        const computerChoice = getComputerChoice();

        updateChoiceDisplay(userChoiceDiv, userChoice);
        updateChoiceDisplay(computerChoiceDiv, computerChoice);

        const result = determineWinner(userChoice, computerChoice);

        const resultDiv = document.querySelector('.displayresult');
        resultDiv.innerHTML = `<div>${result}</div>`;

        container.style.display = 'none';
        container2.style.display = 'flex';
        heheDiv.style.display = 'flex';
    });
});

playAgainButton.addEventListener('click', () => {

    container.style.display = 'flex';

    container2.style.display = 'none';
    heheDiv.style.display = 'none';

    userChoiceDiv.innerHTML = '';
    computerChoiceDiv.innerHTML = '';


    const resultDiv = document.querySelector('.displayresult');
    resultDiv.innerHTML = ''; 

    userChoiceDiv.classList.remove('pulsing-div');
    computerChoiceDiv.classList.remove('pulsing-div');

    nextButton.style.display = 'none';
});

const rulesButton = document.querySelector('.rules_button');
const closeButton = document.querySelector('.rules_close_button');
const rulesDiv = document.querySelector('.rules');

rulesButton.addEventListener('click', function() {
    rulesDiv.style.display = 'flex';  
    rulesButton.style.display = 'flex'; 
});

closeButton.addEventListener('click', function() {
    rulesDiv.style.display = 'none'; 
    rulesButton.style.display = 'flex';  
});
