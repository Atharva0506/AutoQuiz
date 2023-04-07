import { useState } from 'react'
import './searchbox.css';
import "../QuizUI/quiz.css"
// import Quiz from '../QuizUI/quiz'
// =======================================================



//I have coded everything in App component for testing and to save time
//The plan was to make separate components after this test is successful
function Searchbox() {
    //Two states: One for topic input 
    //and second for storing API Response i.e question and answers.

    const [topic, setTopic] = useState("");
    const [quiz, setQuiz] = useState([]);

    // console.log(import.meta.env.VITE_REACT_API_KEY);
    //Changes input topic state whenever user enters anything.
    function handleChange(event) {
        setTopic(event.target.value);
    }

    //OpenAI API function:

    //This function is completely responsible for handling OpenAI API request.
    //It is an asynchronous function. 
    //I am not 100% confident about how all this works please research on your own...

    async function callAPI() {
        console.log("Calling the OpenAI API");

        //API key should never be pushed to GitHub or shared because others can misuse it.
        //To use environment variables in Vite, I just named the variable with VITE prefix.
        //API_KEY is stored in .env file that I did not push

        const apiKey = "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"; //sk-pV3NYkUI3l98vVAM6ryIT3BlbkFJjvS2fnwiVAgWMm3xwEWDEnter your own API Key from openai account to make this work
        //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
        //API request needs this object. It is very simple no need to worry.
        //This format is given by OpenAI documentation only.
        //I have use gpt-3.5-turbo model which is latest and cheapest.
        //Prompt is made by me and we can change it later.

        const APIBody = {
            'model': 'gpt-3.5-turbo',
            'messages': [{ 'role': 'user', 'content': 'Create a JavaScript array of 5 objects with ' + topic + ' related questions, each including a question and a set of four multiple choice answers. ' }]
        }

        //fetch() is a javascript function for getting data.
        //Endpoint is passed in brackets.
        //It needs method, headers and body to send request.

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify(APIBody) //APIBody is declared above we just pass it here.
        }).then((data) => {
            return data.json();
        }).then((data) => {
            //data means the response from the OpenAI API.
            console.log(data);

            //Response is very complicated with many objects and arrays.
            //quizString only extracts main part that we need- The array of objects having questions and answers.
            const quizString = data.choices[0].message.content;

            //quizString = "[{question:"vnsdfijnweifn?", answers:["first option", "second","third","fourth",2]},{},{}]"
            //It is in string format. We cannot use string to use array methods in react.
            //I tried using JSON.parse() but it is not working.
            //eval() is working but it is not recommended because of some security issues.

            const quizArray = eval(quizString);
            setQuiz(quizArray); //sets state to our response in array format.
            let myData = quiz;
            console.log(myData[1]);
            alert(myData);
            // console.log(quizArray);
        });
    }



    return (<>
        <section className='search'>
            <div className='searchbox'>
                <div class="box">

                    <input onChange={handleChange} type="text" name="topic" placeholder='Enter topic' value={topic} />
                </div> <button className='btn ' onClick={callAPI}><span> Create Quiz</span></button>
            </div>

        </section>
        <div className='quizUi'>
            <div className='head'>
                <h2>Topic Name</h2>
                <div className="hr"> <hr /></div>
            </div>
            <div className='qa'>
                {/* {quiz.length > 0 && (
                    <ul>
                        {quiz.map((item, index) => (
                            <li key={index}>
                                {item.question}
                                <ul>
                                    {item.answers.map((choice, index) => (
                                        index !== 4 &&
                                        <li key={index}>{choice}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )} */}

                {/* {quiz && quiz.map((item, index) => (
                        <div className='main' key={index}>
                            
                                <div  className="question">
                                    <p>{item.question}</p>
                                </div>
                                <div className="options">

                                    <p>    <input type="radio" className='opt' name="ans" value={item.answers[0]} id="" /><span> {item.answers[0]}</span> </p> 
                                    <p>    <input type="radio" className='opt' name="ans" value={item.answers[1]} id="" /><span> {item.answers[1]}</span> </p>
                                    <p>    <input type="radio" className='opt' name="ans" value={item.answers[2]} id="" /> <span>{item.answers[2]}</span></p>
                                    <p>    <input type="radio" className='opt' name="ans" value={item.answers[3]} id="" /><span> {item.answers[3]}</span> </p> 

                                </div>
                            
                        </div>
                    ))}
 */}

            </div>
        </div>
        {/* <Quiz quiz={quiz} item index /> */}
    </>
    )
}


export default Searchbox;