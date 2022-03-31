import { FC, useState } from 'react'
import { Button, Alert, Navbar, Nav, Container } from "react-bootstrap"
import { connect, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import store, { RootDispatch, RootState } from '../store'

type SignOutScreenProps = {
	signOut: () => Promise<void>
}

function HeaderContainer({signOut}: SignOutScreenProps) {
	const [error, setError] = useState("")
	const currentUser = useSelector((state: RootState) => state.auth)
	const navigate = useNavigate()

	async function handleLogout() {
		setError("")
		try {
			await signOut()
			store.dispatch.requests.unloaded()
			navigate("/")
    	} catch (err) {
			if (err instanceof Error) {
				console.log(err.message)
				setError(err.message)
			} else {
				console.log('Unexpected error', err);
			}
		}
	}
	return (
		<Navbar bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand className="d-flex flex-row">
					<h1>Dashboard</h1>
				</Navbar.Brand>
				<Nav>
					<Navbar.Text>
						Signed in as: {currentUser?.email}
					</Navbar.Text>
					{error && <Alert variant="danger">{error}</Alert>}
					<Button onClick={handleLogout} className="ms-3">
						Log Out
					</Button>
				</Nav>
			</Container>
		</Navbar>
	)
}

type AuthProps = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>

const Header: FC<AuthProps> = ({ signOut }) => {
    return <HeaderContainer signOut={signOut} />
}

const mapProps = (state: RootState) => ({
    auth: state.auth
})
  
const mapDispatch = (dispatch: RootDispatch) => ({
    signOut: () => dispatch.auth.signOut()
})
  
export default connect(mapProps, mapDispatch)(Header)
