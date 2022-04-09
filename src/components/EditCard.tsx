import { useSelector } from "react-redux";
import { RootState } from "../store";
import ListForm from "./ListForm";
import Lightbox from "./Lightbox";
import UserCard from "./UserCard";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export function EditCard () {
    const requests = useSelector((state: RootState) => state.requests.queue)
    const selectedRequestId = useSelector((state: RootState) => state.requests.selectedRequest)
    const selectedRequest = requests.find(request => request.id === selectedRequestId)
    if (!selectedRequestId) {
        return (
        <div className='flex-grow-1 p-1 m-0 d-flex flex-column gap-1 justify-content-center align-items-center h-100'>
            <h1>TODO : Welcome screen</h1>
        </div>
        )
    }
    return (
        <div className='d-flex flex-column' style={{overflowX: 'scroll'}}>
            <div className='flex-grow-1 p-1 m-0 d-flex flex-column gap-1 justify-content-start align-items-stretch h-100'>
                <UserCard info={selectedRequest}/>
                <div className="d-flex flex-grow-1 justify-content-between gap-1 border p-1">
                    <ListForm/>
                    <div className="h-100" style={{minWidth: '420px', maxHeight: '640px'}}>
                        <Lightbox image='http://placekitten.com/300/500'/>
                    </div>
                </div>
            </div>
            <Navbar bg="dark" variant="dark">
                <Container fluid className='justify-content-end'>
                    <Nav>
                        <Button className="ms-3">
                            Reject
                        </Button>
                        <Button className="ms-3">
                            Skip
                        </Button>
                        <Button className="ms-3">
                            Submit
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
