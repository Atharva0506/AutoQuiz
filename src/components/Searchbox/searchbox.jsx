import { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import Confetti from 'react-confetti';
import QuizUI from "../QuizUI/quiz"
import './searchbox.css';
import "../QuizUI/quiz.css"
import Question from '../../../../../AutoQuiz-main/AutoQuiz-main/src/Question';
// import Quiz from '../QuizUI/quiz'
// =======================================================




//I have coded everything in App component for testing and to save time
//The plan was to make separate components after this test is successful
function Searchbox() {

  //Two states: One for topic input 
  //and second for storing API Response i.e question and answers.
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [showDiv1, setShowDiv1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [marks,setMarks] = useState(0);
  const handleDiv1Click = () => {
    setShowDiv1(true);

  }



  console.log(import.meta.env.VITE_REACT_API_KEY);
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

    const apiKey = ""; //sk-pV3NYkUI3l98vVAM6ryIT3BlbkFJjvS2fnwiVAgWMm3xwEWDEnter your own API Key from openai account to make this work

    //API request needs this object. It is very simple no need to worry.
    //This format is given by OpenAI documentation only.
    //I have use gpt-3.5-turbo model which is latest and cheapest.
    //Prompt is made by me and we can change it later.

    const APIBody = {
      'model': 'gpt-3.5-turbo',
      'messages': [{ 'role': 'user', 'content': `Create a JavaScript array of 5 objects with ` +
      topic +
      ` related random and unique questions, each including a question and a set of four multiple choice answers. Use the last index position of the answer array to indicate the correct answer. Example format: [{"question":"question?","answers":["option1","option2","option3","option4",0]. const quiz=` }]
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
      setQuiz(quizArray);
      setLoading(false);
       //sets state to our response in array format.
      console.log(quiz);
      console.log(quizArray);
    });


  }
  const btnClick = () => {
    callAPI();
    handleDiv1Click();
  }

function  checkAnswer(answers,index2,index){
  console.log("Ans key:"+answers[4]);
  if(answers[4] == index2){
    setIsAnswerCorrect(true);
    setGlobalVar(index2);
    setGlobalVarMain(index);
  }
  console.log(index);
}

  return (<>
  <div>
    {marks === 4  && <Confetti  width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        gravity={0.5}
        initialVelocityX={0}
        initialVelocityY={-10} />}
    {/* Rest of your component */}
  </div>
  <div>

    <section className='search'>
      <div className='searchbox'>
        <div class="box">

          <input onChange={handleChange} type="text" name="topic" placeholder='Enter topic' value={topic} />
        </div> <button className='btn ' onClick={btnClick} ><span> Create Quiz</span></button>
      </div>

    </section>{showDiv1 &&
      <div className='quizUi'>
        <div className='head'>
           <div className='subtitle'><h2>Quiz For {topic}</h2> <h3><p>Marks: {marks}</p></h3></div>
          <div className="hr"> <hr /></div>
        </div>
        <div>
          {loading ? (
            <div className="loader load">
              <HashLoader size={50} color="#212A3E" />
            </div>
          ) :
            <div className='qa'>
            
              {
                quiz.map((item, quizIndex) => {
                  return (
                        <QuizUI object={item}
                        key={quizIndex}
                        id={quizIndex}
                        incrementMarks={()=>setMarks(marks+1)}/>
                  )
                })
              }
              {/* <div className='qbtn'>
                <button type='' className='btn '><span> Submit</span></button>
              </div> */}
            </div>
          }
        </div>
      </div>

    }
    </div>
  </>
  )
}


export default Searchbox;