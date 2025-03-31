import React from "react"
import styled from "styled-components"
import marked from "marked"

import Page from "../../components/Page"
import MainWrapper from "../../components/MainWrapper"
import Button from "../../components/Button"
import Hero from "../../components/Hero"
import { Skewed } from "../../components/PageSections"

import { encode } from "../../helpers"
import { themer } from "../../styles/helpers"

import contactData from "../../data/contact.json"

const Form = styled.form`
  min-width: 280px;
  margin: 0 auto;
  flex: 1;
  background: ${themer("shade.lightest")};
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
  input,
  textarea {
    padding: 1rem;
    border: 2px solid ${themer("accent")};
    margin: 1rem 0;
    display: block;
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 300;
    color: ${themer("shade.darker")};
    width: 100%;
    &:hover,
    &:focus,
    &:active {
      box-shadow: ${themer("accent")} 0 0 1rem inset;
      outline: 0;
    }
  }
`

const ContactForm = styled(MainWrapper)`
  background: ${themer("shade.lightest")};
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
    background: ${themer("shade.lightest")};
  }
`

class Contact extends React.Component {
  state = {}

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  /* eslint-disable no-alert */
  handleSubmit = e => {
    e.preventDefault()
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error))
  }
  /* eslint-enable no-alert */

  render() {
    return (
      <Page accentKey="purple" bgDesign="mesh" seoProfile="contact-page">
        <Hero expanding height="50vh">
          <h1>Reach Out</h1>
        </Hero>
        <ContactFormWrapper skew="4deg">
          <h2 className="title">Drop me a line!</h2>
          <ContactForm>
            <Information
              dangerouslySetInnerHTML={{
                __html: marked(contactData["hit-me-up"]),
              }}
            />
            <Form
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action="/contact/success"
            >
              <input type="hidden" name="form-name" value="contact" />
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={contactData.placeholders.name}
                  required
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={contactData.placeholders.email}
                  required
                />
              </label>
              <label htmlFor="subject">
                Subject:
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder={contactData.placeholders.subject}
                  required
                />
              </label>
              <label htmlFor="message">
                Message:
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder={contactData.placeholders.message}
                  required
                />
              </label>
              <Button type="submit">Send</Button>
            </Form>
          </ContactForm>
        </ContactFormWrapper>
      </Page>
    )
  }
}

export default Contact
