import React from 'react'

const WidgetTags = () => {
    
    const tags=['C','CSS','firebase','Java','html','javascript','mern','mysql','python','C++','C#']

    return (
    <div className='widget-tags'>
        <h4>Watched tags</h4>
        <div className='widget-tags-div'>
            {
                tags.map((tag)=>(
                    <p key={tag}>{tag}</p>
                ))
            }
        </div>
    </div>
  )
}

export default WidgetTags