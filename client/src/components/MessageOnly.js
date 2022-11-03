import React from 'react'

const MessageOnly = ({message}) => {
  return (
    <section className='no-items-found-container'>
        <h1>{message}</h1>
    </section>
  )
}

export default MessageOnly
