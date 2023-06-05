import React, {useState} from 'react'
import { useParams, Link, useNavigate, useLocation} from 'react-router-dom'
import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { useSelector, useDispatch } from 'react-redux'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question'
import moment from 'moment'
import copy from 'copy-to-clipboard'

const QuestionDetails = () => {

    const { id } =useParams()
    const questionList = useSelector(state => state.questionReducer)
    const [Answer, setAnswer] = useState('')
    const dispatch = useDispatch()
    const location= useLocation()
    const url = 'http://localhost:3000'

   /* var questionList=[{
        _id:'1',
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
        _id:'2',
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
        _id:'3',
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

  const User = useSelector((state)=>(state.currentUserReducer))
  const Navigate=useNavigate()
  const handlePostAns = (e, answerLength) =>{
    e.preventDefault()
    if(User===null){
      alert('Login or Signup to answer a question')
      Navigate('./Auth')
    }
    else{
      if(Answer === ''){
        alert("Enter an answer before submitting")
      }
      else{
        dispatch(postAnswer({id,noOfAnswers:answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id}))
      }
    }
  }


  const handelShare = () =>{
    copy(url+location.pathname)
    alert('Copyed url: '+ url+location.pathname)
  }

  const handelDelete = () => {
    dispatch(deleteQuestion(id, Navigate))
  }

  const handelUpVote = () => {
    dispatch(voteQuestion(id, 'upVote', User.result._id))
  }

  const handelDownVote = () => {
    dispatch(voteQuestion(id, 'downVote', User.result._id))
  }

  return (
    <div className='question-details-page'>
        {
            questionList.data===null ?
            <h1>Loading...</h1>:
            <>
            {
                questionList.data.filter(question => question._id === id ).map(question => (
                    <div key={question._id}>
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                               <div className='question-votes'>
                                    <img src={upvote} alt="upvote" width='18' onClick={handelUpVote}/>
                                    <p>{question.upVote.length - question.downVote.length}</p>
                                    <img src={downvote} alt="downvote" width='18' onClick={handelDownVote}/> 
                               </div> 
                               <div style={{width:"100%"}}>
                                <p className='question-body'>{question.questionBody}</p>
                                <div className='question-details-tags'>
                                  {
                                    question.questionTags.map((tag)=>(
                                      <p key={tag}>{tag}</p>
                                    ))
                                  }
                                </div>
                                <div className='question-action-user'>
                                  <div>
                                    <button type='button' onClick={handelShare}>Share</button>
                                    {
                                      User?.result?._id === question?.userId && (
                                        <button type='button' onClick={handelDelete}>Delete</button>
                                      )
                                    }
                                    
                                  </div>
                                  <div>
                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                    <Link to={`/users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                      <Avatar backgroundColor='orange' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                      <div>
                                        {
                                          question.userPosted
                                        }
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                               </div>
                            </div>
                        </section>
                        {
                          question.noOfAnswers !== 0 && (
                            <section>
                              <h3>{question.noOfAnswers} Answers</h3>
                              <DisplayAnswer  key={question._id} question={question} handelShare={handelShare}/>
                            </section>
                          )
                        }
                        <section className='post-ans-container'>
                          <h3>Your Answer</h3>
                          <form onSubmit={ (e) => {handlePostAns(e,question.answer.length)}}>
                            <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea> <br />
                            <input type="submit" className='post-ans-btn' value='Post Your Answer'/>
                          </form>
                          <p>Browse other Question tagged  
                            
                            {
                              question.questionTags.map((tag)=>(
                                <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                              ))
                            }  or
                            <Link to='/AskQuestions' style={{textDecoration:'none', color:'#009dff'}}> ask your own question.</Link>
                          </p>
                        </section>
                    </div>
                ))
            }
            </>
        }
    </div>
  )
}

export default QuestionDetails