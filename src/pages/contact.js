import React from "react"
import styled from "styled-components"

import Page from "../components/Page"
import MainWrapper from "../components/MainWrapper"
import Button from "../components/Button"
import Hero from "../components/Hero"
import { Skewed } from "../components/PageSections"

import { encode } from "../helpers"

const Form = styled.form`
  min-width: 280px;
  margin: 0 auto;
  flex: 1;
  background: ${({ theme }) => theme.shade.lightest};
  button {
    font-size: inherit;
    display: block;
    margin: 2rem auto;
    width: 50%;
  }
  label {
    margin-bottom: 3rem;
    font-style: italic;
    display: block;
  }
`

const Input = styled.input`
  border: 0;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.accent};
  margin: 1rem 0;
  display: block;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 300;
  color: ${({ theme }) => theme.shade.darker};
  width: 100%;
  &:hover,
  &:focus,
  &:active {
    box-shadow: ${({ theme }) => theme.accent} 0 0 1rem inset;
    outline: 0;
  }
`

const TextArea = styled.textarea`
  border: 0;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.accent};
  margin: 1rem 0;
  display: block;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 300;
  color: ${({ theme }) => theme.shade.darker};
  width: 100%;
  resize: vertical;
  &:hover,
  &:focus,
  &:active {
    box-shadow: ${({ theme }) => theme.accent} 0 0 1rem inset;
    outline: 0;
  }
`

const ContactForm = styled(MainWrapper)`
  background: ${({ theme }) => theme.shade.lightest};
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`

const Information = styled.div`
  padding: 1.5rem;
  min-width: 280px;
  flex: 1;
  margin-bottom: 3rem;
`

const ContactFormWrapper = styled(Skewed)`
  padding: 10rem 0 5rem 0;
  margin: 10rem 0;
  &:before {
    background: ${({ theme }) => theme.shade.lightest};
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
      <Page accent="purple" bgDesign="mesh" seoProfile="contact-page">
        <Hero expanding height="50vh">
          <h1>Reach Out</h1>
        </Hero>
        <ContactFormWrapper skew="4deg">
          <h2>Drop me a line!</h2>
          <ContactForm>
            <Information>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate, neque nulla animi, quasi placeat dolor in aliquam
                quos provident ut sapiente aliquid assumenda. Incidunt nesciunt
                dolorum maxime hic, quae quam.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate, neque nulla animi, quasi placeat dolor in aliquam
                quos provident ut sapiente aliquid assumenda. Incidunt nesciunt
                dolorum maxime hic, quae quam.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate, neque nulla animi, quasi placeat dolor in aliquam
                quos provident ut sapiente aliquid assumenda. Incidunt nesciunt
                dolorum maxime hic, quae quam.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptate, neque nulla animi, quasi placeat dolor in aliquam
                quos provident ut sapiente aliquid assumenda. Incidunt nesciunt
                dolorum maxime hic, quae quam.
              </p>
            </Information>
            <Form
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <Input type="hidden" name="form-name" value="contact" />
              <label htmlFor="name">
                Name:
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Edgar Wright"
                  required
                />
              </label>
              <label htmlFor="email">
                Email:
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="edgar.wright@gmale.com"
                  required
                />
              </label>
              <label htmlFor="subject">
                Subject:
                <Input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="We'd like to cast you!"
                  required
                />
              </label>
              <label htmlFor="message">
                Message:
                <TextArea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder="But first, you need to send us 6 payments of..."
                  required
                />
              </label>
              <Button type="submit">Send!</Button>
            </Form>
          </ContactForm>
        </ContactFormWrapper>
      </Page>
    )
  }
}

export default Contact
