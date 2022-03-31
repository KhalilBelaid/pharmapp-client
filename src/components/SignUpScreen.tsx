import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function SignUpScreen() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

			let email = ((emailRef.current == null) ? "" : emailRef.current.value)
			let password = ((passwordRef.current == null) ? "" : passwordRef.current.value)
			let passwordConfirm = ((passwordConfirmRef.current == null) ? "" : passwordConfirmRef.current.value)

      if (password !== passwordConfirm) {
        return setError("Passwords do not match")
      }
  
      try {
        setError("")
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password)
				navigate('/')
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
          setError(err.message)
        } else {
          console.log('Unexpected error', err);
        }
      }
      setLoading(false)
    }
  
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: "400px" }}> 
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </Container>
  )
}
