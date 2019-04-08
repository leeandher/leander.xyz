import React from "react"
import styled from "styled-components"

const FAQ = ({ answer, question, ...props }) => {
  return (
    <div {...props}>
      <h4>{question}</h4>
      <p>{answer}</p>
    </div>
  )
}

export default FAQ
