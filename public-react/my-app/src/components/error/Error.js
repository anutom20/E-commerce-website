import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className='error-container'>
        <h1>Oops! It's a dead end</h1>
        <Link className='btn error-btn' to = '/'>Back to home</Link>
        
    </section>
  )
}

export default Error
