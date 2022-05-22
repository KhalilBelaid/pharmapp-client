import { useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { Credentials, useFirebase } from "react-redux-firebase"

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string()
		.email("Must be a valid email address")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
	passwordConfirm: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match"
	),
})

interface Values {
	firstName: string
	lastName: string
	email: string
	password: string
	passwordConfirm: string
}

export default function SignUp() {
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const firebase = useFirebase()
	const initialValues: Values = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfirm: "",
	}

	return (
		<div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
			<Card className="w-100" style={{ maxWidth: "400px" }}>
				<Card.Body>
					<h2 className="text-center mb-4">Sign Up</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(true)
							const credentials: Credentials = {
								email: values.email,
								password: values.password,
							}
							const profile = {
								firstName: values.firstName,
								lastName: values.lastName,
								email: values.email,
							}
							await firebase
								.createUser(credentials, profile)
								.then(() => {
									setSubmitting(false)
									navigate("/signin")
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
								<Form.Group controlId="formFirstName">
									<Form.Label>First name</Form.Label>
									<Form.Control
										type="text"
										name="firstName"
										onChange={handleChange}
										value={values.firstName}
										isValid={
											touched.firstName &&
											!errors.firstName
										}
										isInvalid={
											touched.firstName &&
											!!errors.firstName
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.firstName}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group controlId="formLastName">
									<Form.Label>Last name</Form.Label>
									<Form.Control
										type="text"
										name="lastName"
										onChange={handleChange}
										value={values.lastName}
										isValid={
											touched.lastName && !errors.lastName
										}
										isInvalid={
											touched.lastName &&
											!!errors.lastName
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.lastName}
									</Form.Control.Feedback>
								</Form.Group>
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
								<Form.Group controlId="formPasswordConfirm">
									<Form.Label>Confirm password</Form.Label>
									<Form.Control
										type="password"
										name="passwordConfirm"
										onChange={handleChange}
										value={values.passwordConfirm}
										isValid={
											touched.passwordConfirm &&
											!errors.passwordConfirm
										}
										isInvalid={
											touched.passwordConfirm &&
											!!errors.passwordConfirm
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.passwordConfirm}
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
						Already have an account?{" "}
						<Link to="/signin">Sign In</Link>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}
