import React from 'react'
import { Link } from 'react-router-dom'

const MessageWithButton = ({message,buttonText, linkTo}) => {
  return (
    <section className='error-container'>
        <h1>{message}</h1>
        <Link className='btn error-btn' to={linkTo}>{buttonText}</Link>
        
    </section>
  )
}

export default MessageWithButton
