import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
//import Questions from './Questions'
import QuestionList from './QuestionList'
import './HomeMainbar.css'
import {useSelector} from 'react-redux'
const HomeMainbar = () => {
  
 /* var questionList=[{
    _id:1,
    upVotes:5,
    downVotes:3,
    noOfAnswers:2,
    questionTitle:"What Is Function?",
    questionBody:"It mean to be",
    questionTags:["java","C++","C","javascript"],
    userPosted:"udhay",
    userId:1,
    askedOn:"may 3",
    answer:[{
      answerBody:"Answer",
      userAnswered:"kumar",
      answeredOn:"jan 2",
      userId:2,
    }]
  },{
    _id:2,
    upVotes:3,
    downVotes:2,
    noOfAnswers:0,
    questionTitle:"What Is Function?",
    questionBody:"It mean to be",
    questionTags:["java","C++","C","javascript"],
    userPosted:"udhay",
    userId:2,
    askedOn:"may 3",
    answer:[{
      answerBody:"Answer",
      userAnswered:"kumar",
      answeredOn:"jan 2",
      userId:2,
    }]
  },{
    _id:3,
    upVotes:3,
    downVotes:2,
    noOfAnswers:3,
    questionTitle:"What Is Function?",
    questionBody:"It mean to be",
    questionTags:["java","C++","C","javascript"],
    userPosted:"udhay",
    userId:3,
    askedOn:"may 3",
    answer:[{
      answerBody:"Answer",
      userAnswered:"kumar",
      answeredOn:"jan 2",
      userId:2,
    }]
  }]*/

  const location = useLocation()

  const user="Udhay";
  const navigate = useNavigate()

  const questionList = useSelector(state => state.questionReducer)
  console.log(questionList)

  const redirect = () =>{
    if(user === null){
      alert("login or signup to ask questions")
      navigate('/Auth')
    }else{
      navigate('/AskQuestion')
    }
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/'? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={redirect} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionList.data === null ? <h1>Loading....</h1> :
          <>
            <p>{questionList.data.length} questions</p>
            <QuestionList questionList={questionList.data} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar