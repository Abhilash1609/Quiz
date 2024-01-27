const questions = [
    {
        question: "Question 1: What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hyperlink and Text Markup Language", "High-Level Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hypertext Markup Language"
    },
    {
        question: "Question 2: What does CSS stand for?",
        options: ["Cascading Style Sheet", "Creative Style Sheet", "Computer Style Sheet", "Colorful Style Sheet"],
        correctAnswer: "Cascading Style Sheet"
    },
    {
        question: "Question 3: Which HTML tag is used for creating an ordered list?",
        options: ["<ol>", "<ul>", "<li>", "<dl>"],
        correctAnswer: "<ol>"
    },
    {
        question: "Question 4: What is the correct way to comment out multiple lines in CSS?",
        options: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->", "# This is a comment #"],
        correctAnswer: "/* This is a comment */"
    },
    {
        question: "Question 5: Which HTML tag is used for creating a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<hyperlink>"],
        correctAnswer: "<a>"
    },
    {
        question: "Question 6: What property in CSS is used for changing the text color of an element?",
        options: ["color", "text-color", "font-color", "foreground-color"],
        correctAnswer: "color"
    },
    {
        question: "Question 7: Which HTML tag is used for creating a line break?",
        options: ["<br>", "<lb>", "<newline>", "<break>"],
        correctAnswer: "<br>"
    },
    {
        question: "Question 8: In CSS, how do you select all elements with the class name 'example'?",
        options: [".example", "#example", "element.example", "example"],
        correctAnswer: ".example"
    },
    {
        question: "Question 9: What does CSS padding control?",
        options: ["Space inside the border", "Space outside the border", "Border thickness", "Font size"],
        correctAnswer: "Space inside the border"
    },
    {
        question: "Question 10: Which CSS property is used for controlling the layout of an element's content?",
        options: ["display", "position", "margin", "padding"],
        correctAnswer: "display"
    },
    {
        question: "Question 11: What does the HTML <head> element contain?",
        options: ["Metadata and links to external resources", "The main content of the page", "Footer information", "Navigation links"],
        correctAnswer: "Metadata and links to external resources"
    },
    {
        question: "Question 12: What CSS property is used for controlling the space between lines of text?",
        options: ["line-height", "font-size", "text-spacing", "line-spacing"],
        correctAnswer: "line-height"
    },
    {
        question: "Question 13: What HTML tag is used for creating an image?",
        options: ["<img>", "<picture>", "<image>", "<photo>"],
        correctAnswer: "<img>"
    },
    {
        question: "Question 14: What does CSS 'position: relative' do?",
        options: ["Positions an element relative to its normal position", "Positions an element absolutely within its parent", "Sticks an element to the top of the page", "Rotates an element by a specified degree"],
        correctAnswer: "Positions an element relative to its normal position"
    },
    {
        question: "Question 15: Which HTML tag is used for creating a table?",
        options: ["<table>", "<tab>", "<tr>", "<tb>"],
        correctAnswer: "<table>"
    },
    {
        question: "Question 16: In CSS, what does 'margin: auto' do?",
        options: ["Centers the element horizontally", "Adds a margin to the left side", "Removes the margin", "Centers the element vertically"],
        correctAnswer: "Centers the element horizontally"
    },
    {
        question: "Question 17: What does the CSS property 'display: none;' do?",
        options: ["Hides the element completely", "Changes the element's font size", "Makes the element bold", "Creates a new element"],
        correctAnswer: "Hides the element completely"
    },
    {
        question: "Question 18: Which HTML tag is used for creating a clickable button?",
        options: ["<button>", "<clickable>", "<action>", "<link-button>"],
        correctAnswer: "<button>"
    },
    {
        question: "Question 19: What is the purpose of the CSS 'z-index' property?",
        options: ["Controls the stacking order of elements", "Sets the element's width", "Defines the element's background color", "Changes the element's font family"],
        correctAnswer: "Controls the stacking order of elements"
    },
    {
        question: "Question 20: Which HTML tag is used for creating a horizontal rule (line)?",
        options: ["<line>", "<hr>", "<divider>", "<horizontal>"],
        correctAnswer: "<hr>"
    },
    {
        question: "Question 21: In CSS, what does 'margin: auto' do?",
        options: ["Centers the element horizontally", "Adds a margin to the left side", "Removes the margin", "Centers the element vertically"],
        correctAnswer: "Centers the element horizontally"
    },
];

let currentQuestionIndex = 0;
let startTime;
let timeTaken;
let timerInterval; // Added timerInterval variable
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-button");
const resultList = document.getElementById("result-list");
const resultsContainer = document.getElementById("results");
const timeLeftElement = document.getElementById("time-left");

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "answer";
        radioInput.value = option;
        radioInput.id = "option" + index;

        const label = document.createElement("label");
        label.htmlFor = "option" + index;
        label.textContent = option;

        optionsElement.appendChild(radioInput);
        optionsElement.appendChild(label);
    });

    startTime = new Date().getTime();
    startTimer(); // Start the timer for each question
}

function showResults() {
    resultsContainer.style.display = "block";
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    submitButton.style.display = "none";

    questions.forEach((question, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Question ${index + 1}: ${question.correctAnswer === questions[index].selectedAnswer ? "Correct" : "Incorrect"} - Time taken: ${questions[index].timeTaken} seconds`;
        resultList.appendChild(listItem);
    });
}

function nextQuestion() {
    clearInterval(timerInterval); // Stop the timer
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        questions[currentQuestionIndex].selectedAnswer = selectedOption.value;
        timeTaken = (new Date().getTime() - startTime) / 1000;
        questions[currentQuestionIndex].timeTaken = timeTaken.toFixed(2);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resetTimer(); // Reset the timer to 30 seconds
            displayQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Time's up! Moving to the next question.");
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resetTimer(); // Reset the timer to 30 seconds
            displayQuestion();
        } else {
            showResults();
        }
    }
}

// Timer logic
let timeLeft = 30; // Initial time in seconds
timeLeftElement.textContent = timeLeft;

function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            // Handle timer expiration here (e.g., move to the next question)
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 30; // Reset timer to 30 seconds
    timeLeftElement.textContent = timeLeft;
}

// Start the timer when the page is loading
startTimer();

displayQuestion();

submitButton.addEventListener("click", nextQuestion);