import React from 'react'
import './quiz.css';

export const Quiz = (quiz, item, index) => {
    return (
        
        <div className='quizUi'>
            <div className='head'>
                <h2>Topic Name</h2>
                <div className="hr"> <hr /></div>
            </div>
            <div className='qa'>

                {
                    quiz.map(({ item, index }) => {
                        return (

                            <div className='main'>
                                <form action="">
                                    <div key={index} className="question">
                                        <p>{item.question}</p>
                                    </div>
                                    <div className="options">

                                        <p>    <input type="radio" className='opt' name="ans" value={item.answer[0]} id="" /><span> {item.answer[0]}</span> </p>
                                        <p>    <input type="radio" className='opt' name="ans" value={item.answer[1]} id="" /><span> {item.answer[1]}</span> </p>
                                        <p>    <input type="radio" className='opt' name="ans" value={item.answer[2]} id="" /> <span>{item.answer[2]}</span></p>
                                        <p>    <input type="radio" className='opt' name="ans" value={item.answer[3]} id="" /><span> {item.answer[3]}</span> </p>

                                    </div>
                                </form>
                            </div>

                        )
                    })
                }


                <div className='qbtn'>
                    <button type='' className='btn '><span> Submit</span></button>
                </div>
            </div>
        </div>
    )
}
export default Quiz
