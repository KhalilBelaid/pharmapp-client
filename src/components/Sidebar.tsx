import Requests from "../components/RequestList";

export default function Sidebar() {  
  return (
    <div className= 'vh-100 d-flex flex-column align-items-stretch' style={{width:'240px'}}>
      <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <span className="fs-5 fw-semibold">Requests</span>
      </a>
      <Requests />
    </div>
  )
}