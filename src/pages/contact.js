import React from "react"
import styled from "styled-components"

import Page from "../components/Page"
import MainWrapper from "../components/MainWrapper"
import Button from "../components/Button"

import { encode } from "../helpers"

const Form = styled.form`
  background: ${({ theme }) => theme.shade.lightest};
  margin-top: 20rem;
  border: 2px solid red;
  label {
    display: flex;
  }
`

class Contact extends React.Component {
  state = {}

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      /* eslint-disable no-alert */
      .then(() => alert("Success!"))
      .catch(error => alert(error))
    /* eslint-enable no-alert */
  }

  render() {
    return (
      <Page
        accent="purple"
        accentBg
        title="Hit me up!"
        design="mesh"
        description="Hi there! I'm glad you've stumbled across my humble personal site. I have a bunch of projects, notes, blog posts, and even a snazzy resume for you to see!"
      >
        <MainWrapper>
          <Form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <label htmlFor="name">
              Name:
              <input type="text" name="name" id="name" />
            </label>
            <label htmlFor="email">
              Email:
              <input type="email" name="email" id="email" />
            </label>
            <label htmlFor="subject">
              Subject:
              <input type="text" name="subject" id="subject" />
            </label>
            <label htmlFor="message">
              Message:
              <textarea name="message" id="message" rows="5" />
            </label>
            <Button type="submit">Send!</Button>
          </Form>
        </MainWrapper>
      </Page>
    )
  }
}

export default Contact
