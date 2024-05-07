import React, { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const QuizPage = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: 'What is React?',
            options: ['A JavaScript library for building user interfaces', 'A programming language', 'A database management system', 'A design framework'],
            correctAnswer: 'A JavaScript library for building user interfaces',
            selectedAnswer: null
        },
        {
            id: 2,
            question: 'What is JSX?',
            options: ['JavaScript XML', 'Java Standard Extension', 'JavaScript Extension', 'JavaScript with XML'],
            correctAnswer: 'JavaScript XML',
            selectedAnswer: null
        },
        {
            id: 3,
            question: 'What is the virtual DOM in React?',
            options: ['A virtual representation of the browser\'s DOM', 'A physical component of a computer', 'A server-side technology', 'A React component'],
            correctAnswer: 'A virtual representation of the browser\'s DOM',
            selectedAnswer: null
        },
        {
            id: 4,
            question: 'What are props in React?',
            options: ['Arguments passed into React components', 'CSS styles for React components', 'Special React elements', 'State variables'],
            correctAnswer: 'Arguments passed into React components',
            selectedAnswer: null
        },
        {
            id: 5,
            question: 'What is the purpose of state in React?',
            options: ['To store component data that may change over time', 'To control the appearance of components', 'To manage routing in a React app', 'To handle user input events'],
            correctAnswer: 'To store component data that may change over time',
            selectedAnswer: null
        },
          {
            id: 6,
            question: 'What is the main function of useEffect in React?',
            options: ['To perform side effects in function components', 'To fetch data from an API', 'To create reusable components', 'To handle form submissions'],
            correctAnswer: 'To perform side effects in function components',
            selectedAnswer: null
        },
        {
            id: 7,
            question: 'What is a React component?',
            options: ['A reusable piece of UI', 'A function that returns JSX', 'An HTML element', 'A React prop'],
            correctAnswer: 'A reusable piece of UI',
            selectedAnswer: null
        },
        {
            id: 8,
            question: 'What is the purpose of the render method in React components?',
            options: ['To render JSX to the DOM', 'To define component state', 'To handle component props', 'To create event listeners'],
            correctAnswer: 'To render JSX to the DOM',
            selectedAnswer: null
        },
        {
            id: 9,
            question: 'What is the significance of keys in React lists?',
            options: ['To identify list items uniquely', 'To style list items', 'To filter list items', 'To sort list items'],
            correctAnswer: 'To identify list items uniquely',
            selectedAnswer: null
        },
        {
            id: 10,
            question: 'What is the purpose of the useState hook in React?',
            options: ['To add state to functional components', 'To add props to functional components', 'To create event handlers', 'To define lifecycle methods'],
            correctAnswer: 'To add state to functional components',
            selectedAnswer: null
        },
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswerChange = (event) => {
        const selectedAnswer = event.target.value;
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].selectedAnswer = selectedAnswer;
        setQuestions(updatedQuestions);
    };

    const handleNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            calculateScore();
            setShowResult(true);
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question) => {
            if (question.selectedAnswer === question.correctAnswer) {
                score++;
            }
        });
        setScore(score);
    };

    const handleSubmit = () => {
        alert('Answer submitted!');
        // You can perform additional actions here when the quiz is submitted
    };

    return (
        <div style={{ 
            background: "linear-gradient(130deg, #231a6f, #0f054c)",
      
            minHeight: '100vh', 
            padding: '20px' 
          }}>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
           <Box
    border={3}
    borderRadius={16}
    p={3}
    textAlign="center"
    borderColor="white" // Set border color to white
    color="white" // Set text color to white
>
    <Typography variant="h4" gutterBottom>
        Question {currentQuestionIndex + 1}
    </Typography>
    <Typography variant="body1" gutterBottom>
        {questions[currentQuestionIndex].question}
    </Typography>
    <FormControl component="fieldset">
        <RadioGroup value={questions[currentQuestionIndex].selectedAnswer} onChange={handleAnswerChange}>
            {questions[currentQuestionIndex].options.map((option, index) => (
                <FormControlLabel key={index} value={option}  control={<Radio style={{ color: 'white' }} />} // Set radio button color to black
                 label={option} />
            ))}
        </RadioGroup>
    </FormControl>
    <Box marginTop={2}>
        {!showResult ? (
            <Button variant="contained" onClick={handleNextQuestion} disabled={questions[currentQuestionIndex].selectedAnswer === null}>
                Next
            </Button>
        ) : (
            <Box>
                <Typography variant="h4" gutterBottom>
                    Quiz Completed
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Your Score: {score}/{questions.length}
                </Typography>
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        )}
    </Box>
</Box>

      
        </Box>
        </div>
    )

};

export default QuizPage;


















