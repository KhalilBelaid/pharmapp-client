import { ChangeEvent, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import {
	isEmpty,
	isLoaded,
	useFirebase,
	useFirestore,
	useFirestoreConnect,
} from "react-redux-firebase"
import { RootState } from "../../store/reducers"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import Cookies from "universal-cookie"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import "firebase/compat/database"

interface FormResult {
	firstName?: string
	lastName?: string
	pharmacy: string
	file: Blob | File
}

export default function RequestForm() {
	const [fileLink, setFileLink] = useState("")
	const auth = useSelector((state: RootState) => state.firebase.auth)
	const firebase = useFirebase()
	const firestore = useFirestore()
	const cookies = new Cookies()
	useFirestoreConnect([{ collection: "pharmacies" }])
	const pharmacies = useSelector(
		(state: RootState) => state.firestore.ordered.pharmacies
	)

	async function uploadFile(result: FormResult) {
		const fileUid = uuidv4()
		const baseRequest = {
			pharmacy: result.pharmacy,
			fileUid: fileUid,
		}
		const addRequest = async (uid: string) => {
			await firestore
				.collection("requests")
				.add({
					uid: uid,
					...baseRequest,
				})
				.then((ref) => {
					console.log(`Added request to firestore: ${ref.id}`)
				})
		}
		await firebase
			.uploadFile("prescriptions", result.file, "prescriptions", {
				name: fileUid,
				metadata: {
					contentType: result.file.type,
				},
			})
			.then(async (snapshot) => {
				console.log(
					`File uploaded to storage: ${snapshot.uploadTaskSnapshot.ref.name}`
				)
				const anonId = cookies.get("anon-id")
				if (auth.uid) addRequest(auth.uid)
				if (anonId) addRequest(anonId)
				else {
					await firestore
						.add("users", {
							firstName: result.firstName,
							lastName: result.lastName,
						})
						.then(async (doc) => {
							console.log(`Added new user: ${doc.id}`)
							cookies.set("anon-id", doc.id)
							addRequest(doc.id)
						})
				}
				await snapshot.uploadTaskSnapshot.ref
					.getDownloadURL()
					.then((link) => {
						setFileLink(link)
					})
			})
			.catch((err) => {
				console.log(err)
				return true
			})
		return true
	}

	return (
		<div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
			<Card className="w-100" style={{ maxWidth: "400px" }}>
				<Card.Body>
					<h2 className="text-center mb-4">Request</h2>
					{isEmpty(auth) ? (
						<AnonymousForm
							pharmacies={pharmacies}
							onSubmitValid={uploadFile}
						/>
					) : (
						<AuthenticatedForm
							pharmacies={pharmacies}
							onSubmitValid={uploadFile}
						/>
					)}
					{fileLink && (
						<div className="w-100 text-center mt-2">
							<a href={fileLink}>Link</a>
						</div>
					)}
				</Card.Body>
			</Card>
		</div>
	)
}

interface FormProps {
	pharmacies: any
	onSubmitValid: (result: FormResult) => Promise<boolean>
}

function AnonymousForm({ pharmacies, onSubmitValid }: FormProps) {
	const [file, setFile] = useState<Blob>(new Blob())
	const cookies = new Cookies()
	const [anonCookie] = useState(cookies.get("anon-id"))
	const initialValues: FormResult = {
		firstName: "",
		lastName: "",
		pharmacy: "",
		file: new Blob(),
	}
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("First name is required"),
		lastName: Yup.string().required("Last Name is required"),
		file: Yup.mixed().required("File is required"),
		pharmacy: Yup.string().required("Pharmacy is required"),
	})
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={async (values, { setSubmitting }) => {
				setSubmitting(true)
				const done = await onSubmitValid({
					firstName: values.firstName,
					lastName: values.lastName,
					pharmacy: values.pharmacy,
					file: file,
				})
				setSubmitting(!done)
			}}
		>
			{({
				values,
				errors,
				touched,
				handleSubmit,
				handleChange,
				isSubmitting,
				resetForm,
			}) => (
				<Form onSubmit={handleSubmit} noValidate>
					<Form.Group controlId="formFirstName">
						<Form.Label>First name</Form.Label>
						<Form.Control
							type="text"
							name="firstName"
							onChange={handleChange}
							value={values.firstName}
							isValid={touched.firstName && !errors.firstName}
							isInvalid={touched.firstName && !!errors.firstName}
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
							isValid={touched.lastName && !errors.lastName}
							isInvalid={touched.lastName && !!errors.lastName}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.lastName}
						</Form.Control.Feedback>
					</Form.Group>
					<h5>{anonCookie}</h5>
					<div className="w-100 text-center mt-2">
						<Link to="/signin">Sign in</Link> instead.
					</div>
					<Form.Group>
						<Form.Label>Select a pharmacy</Form.Label>
						<Form.Select
							name="pharmacy"
							onChange={handleChange}
							isValid={touched.pharmacy && !errors.pharmacy}
						>
							<option className="d-none" value="">
								{" "}
								...{" "}
							</option>
							{pharmacies &&
								pharmacies.map((pharmacy: any) => (
									<option
										key={pharmacy.id.toString()}
										value={pharmacy.id.toString()}
									>
										{pharmacy.name}
									</option>
								))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.pharmacy}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Upload an Image</Form.Label>
						<Form.Control
							id="file"
							name="file"
							type="file"
							accept="image/png, image/jpeg"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								if (e.target.files) {
									setFile(e.target.files[0])
								}
							}}
							isValid={touched.file && !errors.file}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.file}
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
					<Button
						className="w-100 mt-2"
						variant="primary"
						disabled={isSubmitting}
						onClick={() => resetForm()}
					>
						Reset
					</Button>
				</Form>
			)}
		</Formik>
	)
}

function AuthenticatedForm({ pharmacies, onSubmitValid }: FormProps) {
	const [file, setFile] = useState<Blob>(new Blob())
	const auth = useSelector((state: RootState) => state.firebase.auth)
	const profile = useSelector((state: RootState) => state.firebase.profile)
	const authError = useSelector(
		(state: RootState) => state.firebase.authError
	)

	const firebase = useFirebase()
	const initialValues: FormResult = {
		pharmacy: "",
		file: new Blob(),
	}
	const validationSchema = Yup.object().shape({
		file: Yup.mixed().required("File is required"),
		pharmacy: Yup.string().required("Pharmacy is required"),
	})
	async function handleSignOut() {
		await firebase.logout().catch((err) => {
			console.error(err)
		})
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={async (values, { setSubmitting }) => {
				setSubmitting(true)
				const done = await onSubmitValid({
					pharmacy: values.pharmacy,
					file: file,
				})
				setSubmitting(!done)
			}}
		>
			{({
				values,
				errors,
				touched,
				handleSubmit,
				handleChange,
				isSubmitting,
				resetForm,
			}) => (
				<Form onSubmit={handleSubmit} noValidate>
					{authError && <Alert variant="danger">{authError}</Alert>}
					<h5>{`${profile.firstName} ${profile.lastName}`}</h5>
					<h5>{auth.uid}</h5>
					<Button onClick={handleSignOut} className="ms-3 mt-2 mb-2">
						Sign Out
					</Button>
					<Form.Group>
						<Form.Label>Select a pharmacy</Form.Label>
						<Form.Select
							name="pharmacy"
							onChange={handleChange}
							isValid={touched.pharmacy && !errors.pharmacy}
						>
							<option className="d-none" value="">
								{" "}
								...{" "}
							</option>
							{pharmacies &&
								pharmacies.map((pharmacy: any) => (
									<option
										key={pharmacy.id.toString()}
										value={pharmacy.id.toString()}
									>
										{pharmacy.name}
									</option>
								))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.pharmacy}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Upload an Image</Form.Label>
						<Form.Control
							id="file"
							name="file"
							type="file"
							accept="image/png, image/jpeg"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								if (e.target.files) {
									setFile(e.target.files[0])
								}
							}}
							isValid={touched.file && !errors.file}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.file}
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
					<Button
						className="w-100 mt-2"
						variant="primary"
						disabled={isSubmitting}
						onClick={() => resetForm()}
					>
						Reset
					</Button>
				</Form>
			)}
		</Formik>
	)
}
