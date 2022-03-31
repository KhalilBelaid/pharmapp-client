import React, { FC, useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { RootDispatch, RootState } from "../store"

type SignInScreenProps = {
  signIn: (email: string, password: string) => Promise<void>
}

function SignInScreen({signIn} : SignInScreenProps) {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let email = ((emailRef.current == null) ? "" : emailRef.current.value)
    let password = ((passwordRef.current == null) ? "" : passwordRef.current.value)
    try {
      setError("")
      setLoading(true)
      await signIn(email, password)
      navigate('/dashboard')
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
              <h2 className="text-center mb-4">Log In</h2>
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
                <Button disabled={loading} className="w-100 mt-2" type="submit">
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/signUp">Sign up</Link>
          </div>
      </Container>
  )
}

type AuthProps = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>

const SignIn: FC<AuthProps> = ({ signIn }) => {
    return <SignInScreen signIn={signIn} />
}

const mapProps = (state: RootState) => ({
    auth: state.auth
})
  
const mapDispatch = (dispatch: RootDispatch) => ({
    signIn: (email: string, password: string) => dispatch.auth.signIn({email, password})
})
  
export default connect(mapProps, mapDispatch)(SignIn)