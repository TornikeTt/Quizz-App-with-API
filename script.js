"use strict"
/* get category value and difficulty value ======= start */
let category = document.querySelector("#Category")
let difficulty = document.querySelector("#Difficulty")
/* get category value and difficulty value ======= end */

/* display selected value and difficulty value  ======= start */
let show__selected__category = document.querySelector(".show__selected__category")
let show__selected__difficulty = document.querySelector(".show__selected__difficulty")
/* display selected value and difficulty value  ======= end */

/* for timer ======= start */
let timer = document.querySelector(".timer span")
/* for timer ======= end */

/* question and answers =============== start */
let question = document.querySelector(".question")
let A_answer = document.querySelector("#A")
let B_answer = document.querySelector("#B")
let C_answer = document.querySelector("#C")
let D_answer = document.querySelector("#D")
/* question and answers =============== end */

let send__answer__button = document.querySelector(".send__answer")
let Form_for_answers = document.querySelector(".form__answers")
let inputValues = document.getElementsByClassName("input_answer") // take all current answers
let show_current_question_Num = document.querySelector(".show_current_question_Num")

let currentDate = 0;
let correctAnswer = 0;
let currentNumb = 1 



async function get__Data() {
    show__selected__category.innerHTML = category.options[category.selectedIndex].innerText
    show__selected__difficulty.innerHTML = difficulty.value

    let url = `https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${difficulty.value}&type=multiple`
    const response = await fetch(url);
    const deta = await response.json();
    console.log(deta.results)
    change(deta)

    send__answer__button.addEventListener("click" , () => {     
        currentDate++
        ++currentNumb
        show_current_question_Num.innerHTML = currentNumb 

        change(deta)
    })

    startTimer()
}



function startTimer() {
        let number = parseFloat(timer.innerHTML)
        let time = number * 60
        let controlTime = setInterval(() => { 

        time--
        let minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;  
    
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        
        timer.innerHTML =  `${minutes}:${seconds}`

        if(time < 60) {
            timer.style.color = "red"
        }

        if( time < 0 ) {
            clearInterval(controlTime)
            alert("Time is over. Sorry, if you would like to start again, click Ok")
            timer.innerHTML =  "00:00"
            window.location.reload()
        }

    } , 1000)   
}



function change(deta) {
    let questionList = deta.results.length // how many questions in array
      
    if( questionList > currentDate) {
        let incorrect_answers_in_array = deta.results[currentDate].incorrect_answers
        let correct_answer_in_array = deta.results[currentDate].correct_answer
       
        // The correct answer is appearing in different places ============ start
        let answers = incorrect_answers_in_array.concat(correct_answer_in_array) 
        let place = Math.floor(Math.random() * 4)
        let newarr = answers.splice(0 , place)
        let newAnswers = answers.concat(newarr)
        // The correct answer is appearing in different places ============= end

        checkAnswer(3 - place) // give "checkAnswer function" correct answere place 

        console.log(correct_answer_in_array +  " <==== CORRECT ANSWER")

        // display questions and answers ======== start
        question.innerHTML =  deta.results[currentDate].question
        A_answer.innerHTML = newAnswers[0]
        B_answer.innerHTML = newAnswers[1]
        C_answer.innerHTML = newAnswers[2]
        D_answer.innerHTML = newAnswers[3] 
        // display questions and answers =========== end

    }else {
        checkAnswer()
        alert(`Correct answers: ${correctAnswer} of ${questionList}. if you would like to start again, click OK`)
        show_current_question_Num.innerHTML = "10"
        window.location.reload(); 
    }

    Form_for_answers.reset() // radio button restart every time when "send answer" button clicked
}



let numArray = [];

function checkAnswer(place) {
    numArray.push(place);

    Array.from(inputValues , (x) =>  {
        /* 
            Array.from we use to convert "inputValues" to array, and use map method
                - then check if choose answer's value is same as correct answer.      
        */

        if( x.checked == true ) {
            Number(x.value) == numArray[numArray.length - 2] ? ++correctAnswer : console.log("incorect");
            console.log(correctAnswer + " <===== YOUR SCROE")
        }
    })

}
