import { Button, Alert, Navbar, Nav, Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useFirebase } from "react-redux-firebase"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store/reducers"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import "firebase/compat/database"

export default function Header() {
	const authError = useSelector(
		(state: RootState) => state.firebase.authError
	)
	const profile = useSelector((state: RootState) => state.firebase.profile)
	const firebase = useFirebase()
	const navigate = useNavigate()
	async function handleSignOut() {
		await firebase.logout().then(() => {
			navigate("/")
		})
	}
	return (
		<Navbar bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand className="d-flex flex-row">
					<h1>Pharmacy Dashboard</h1>
				</Navbar.Brand>
				<Nav>
					<Navbar.Text>
						Signed in as: {profile.firstName} {profile.lastName}
					</Navbar.Text>
					{authError && <Alert variant="danger">{authError}</Alert>}
					<Button onClick={handleSignOut} className="ms-3">
						Sign Out
					</Button>
				</Nav>
			</Container>
		</Navbar>
	)
}
