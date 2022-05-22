import ListForm from "./ListForm";
import Lightbox from "../common/Lightbox";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export function RequestCard () {
    return (
        <div className='flex-grow-1 d-flex flex-column'>
            <div className='flex-grow-1 p-1 m-0 d-flex flex-column gap-1 justify-content-start align-items-stretch h-100'>
                {/* <UserCard info={selectedRequest}/> */}
                <div className="d-flex flex-grow-1 justify-content-between gap-1 border p-1">
                    <ListForm/>
                    <div className="h-100" style={{minWidth: '420px', maxHeight: '640px'}}>
                        <Lightbox image='http://placekitten.com/300/500'/>
                    </div>
                </div>
            </div>
            <Navbar bg="light" variant="light">
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
