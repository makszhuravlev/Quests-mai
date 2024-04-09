const quizData = [
    {
        question: "В каком колледже ты учишься?",
        a: "Кпит",
        b: "Кпк",
        c: "Ранхигс",
        d: "Шарага какая-то",
        correct: "b",
    },
    {
        question: "У кого ты сейчас на паре?",
        a: "А.А.Ишханов",
        b: "А.Е.Браго",
        c: "Е.В.Понеделко",
        d: "Да вообще перемена так-то",
        correct: "a",
    },
    {
        question: "Привет?",
        a: "Привет!",
        b: "Я устал!",
        c: "Помогите",
        d: "Как дела?",
        correct: "a",
    },
    {
        question: "Тебе нравится квест?",
        a: "Нет",
        b: "Да!",
        c: "Не очень",
        d: "Вообще дичь какая-то",
        correct: "b",
    },


];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }

       currentQuiz++

       if(currentQuiz < quizData.length) {
           loadQuiz()
       } 
       else {
            if (score == 0){
                quiz.innerHTML = `
                <h2>Молодец ты получаешт подсказку</h2>
                <form action="../Pages/a.html" target="_blank">
                    <button>Получить</button>
                `
            }
            if (score == 1){
                quiz.innerHTML = `
                <h2>Ты набрал 1 из 4</h2>
                <form action="../Pages/skrimer2.html" target="_blank">
                    <button>Получить</button>
                `
            }
            if (score == 2){
                quiz.innerHTML = `
                <h2>Ты набрал 2 из 4</h2>
                <form action="../Pages/skrimer2.html" target="_blank">
                    <button>Получить</button>
                `
            }
            if (score == 3){
                quiz.innerHTML = `
                <h2>Ты набрал 3 из 4</h2>
                <form action="../Pages/skrimer2.html" target="_blank">
                    <button>Получить</button>
                `
            }
            if (score == 4){
                quiz.innerHTML = `
                <h2>Ты набрал 4 из 4</h2>
                <form action="../Pages/skrimer2.html" target="_blank">
                    <button>Получить</button>
                `
            }

       }
    }
})