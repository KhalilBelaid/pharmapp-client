import { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { useFirebase } from "react-redux-firebase"
import "firebase/compat/auth"

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Must be a valid email address")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
})

interface Values {
	email: string
	password: string
}

export default function SignIn() {
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const firebase = useFirebase()
	const initialValues: Values = {
		email: "",
		password: "",
	}
	return (
		<div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
			<Card className="w-100" style={{ maxWidth: "400px" }}>
				<Card.Body>
					<h2 className="text-center mb-4">Sign in</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(true)
							await firebase
								.login({
									email: values.email,
									password: values.password,
								})
								.then(() => {
									setSubmitting(false)
									navigate("/")
								})
								.catch((err) => {
									setSubmitting(false)
									if (err instanceof Error)
										setError(err.message)
									console.error(err)
								})
						}}
					>
						{({
							values,
							errors,
							touched,
							handleSubmit,
							handleChange,
							isSubmitting,
						}) => (
							<Form onSubmit={handleSubmit} noValidate>
								<Form.Group controlId="formEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="text"
										name="email"
										onChange={handleChange}
										value={values.email}
										isValid={touched.email && !errors.email}
										isInvalid={
											touched.email && !!errors.email
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="formPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										name="password"
										onChange={handleChange}
										value={values.password}
										isValid={
											touched.password && !errors.password
										}
										isInvalid={
											touched.password &&
											!!errors.password
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.password}
									</Form.Control.Feedback>
								</Form.Group>
								<Button
									className="w-100 mt-2"
									variant="primary"
									type="submit"
									disabled={isSubmitting}
								>
									Submit
								</Button>
							</Form>
						)}
					</Formik>
					<div className="w-100 text-center mt-2">
						Don't have an account? <Link to="/signup">Sign up</Link>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}
