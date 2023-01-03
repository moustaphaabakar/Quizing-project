// question and answer 
var questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choices: ['scripting', 'script', 'javascript', 'js'],
        correctAnswer: 1
    },
    {
        question: 'What is the adult of a kid called?',
        choices: ['calf', 'doe', 'goat', 'chick'],
        correctAnswer: 2
    },
    {
        question: 'What is the young of buffalo called?',
        choices: ['calf', 'baby', 'pup', 'cow'],
        correctAnswer: 0
    },
    {
        question: 'What is a baby alligator called?',
        choices: ['baby', 'gator', 'hatchling', 'calf'],
        correctAnswer: 1
    },
    {
        question: 'What is a baby goose called?',
        choices: ['gooser', 'gosling', 'gup', 'pup'],
        correctAnswer: 1
    }
];
// selecting elements 
const question = document.querySelector('.question')
const choiceList = document.querySelector('.choiceList')
const quizMessage = document.querySelector('.quizMessage')
const result = document.querySelector('.result')
const nextButton = document.querySelector('.nextButton')
let num = 0
let resultPoint = 0

// display the elements
window.addEventListener('DOMContentLoaded', createElements)

nextButton.addEventListener('click', event => {
    if (nextButton.innerText == 'Next Question') {
        if (isRadioChecked()) {
            quizMessage.innerText = 'Please select an answer'
            quizMessage.style.display = 'block'
        } else if (num >= questions.length) {
            quizMessage.style.display = 'none'
            // count result 
            resultPoint = resultPoint + showResult()
            // showing result 
            result.style.display = 'block'
            result.innerText = `You score is: ${resultPoint} out of ${questions.length}`
            nextButton.innerText = 'Play Again?'
        } else {
            quizMessage.style.display = 'none'
            // count result 
            resultPoint = resultPoint + showResult()
            createElements()
        }
    } else if (nextButton.innerText == 'Play Again?') {
        num = 0
        createElements()
        // hidding result 
        result.style.display = 'none'
        nextButton.innerText = 'Next Question'
    }
})

// create elements
function createElements() {
    question.innerText = questions[num].question
    const mapChoices = questions[num].choices.map(choice => {
        return `<li>
                    <li>
                        <input type="radio" class="radio" value=${num} name="dynradio">
                        <label for="question">${choice}</label>
                    </li>
                </li>`
    }).join('')

    choiceList.innerHTML = mapChoices

    num++
}

// is radio checked
function isRadioChecked() {
    const inputRadios = document.querySelectorAll('.radio')
    for (i = 0; i < inputRadios.length; i++){
        if (inputRadios[i].checked) {
            return !(inputRadios[i].checked)
        }
    }
    return true
}

// showing result 
function showResult() {
    const inputRadios = document.querySelectorAll('.radio')
    for (i = 0; i < inputRadios.length; i++){
        if (inputRadios[i].checked) {
            const answer = inputRadios[i].parentElement.lastElementChild
            const elementIndex = Number(inputRadios[i].value)
            const answerIndex = questions[elementIndex].correctAnswer
            
            if (answer.innerText == questions[elementIndex].choices[answerIndex]) {
                return 1
            } else {
                return 0
            }
        } 
    }
}

