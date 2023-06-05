import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blacklogo from '../../assets/blacklogo.svg'

const Widget = () => {
  return (
    <div className='widgets'>
        <h4>The Overflow Blog</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen" width='18' />
                <p>AI isn’t the app, it’s the UI</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen" width='18' />
                <p>When AI meets IP: Can artists sue AI imitators? (Ep. 566)</p>
            </div>
        </div>

        <h4>Featured on Meta</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt="comment" width='18' />
                <p>Improving the copy in the close modal and post notices - 2023 edition</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt="comment" width='18' />
                <p>New blog post from our CEO Prashanth: Community is the future of AI</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={blacklogo} alt="blacklogo" width='18' />
                <p>Temporary policy: ChatGPT is banned</p>
            </div>
        </div>

        <h4>Hot Meta Posts</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <p>38</p>
                <p>AI isn’t the app, it’s the UI</p>
            </div>
            <div className='right-sidebar-div-2'>
                <p>22</p>
                <p>When AI meets IP: Can artists sue AI imitators? (Ep. 566)</p>
            </div>
            <div className='right-sidebar-div-2'>
                <p>14</p>
                <p>Temporary policy: ChatGPT is banned</p>
            </div>
        </div>
    </div>
  )
}

export default Widget