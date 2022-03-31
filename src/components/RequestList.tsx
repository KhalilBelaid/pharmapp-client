import { FC, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux'
import store, { RootState, RootDispatch} from '../store'
import { State } from '../store/models/requests';

interface IListItemProps {
    id: string,
    name: string,
    timestamp: string,
}

function ListItem (props: IListItemProps) {
  const handleClick = () => {
    store.dispatch.requests.selected(props.id)
  }
  const active = useSelector((state: RootState) => state.requests.selectedRequest) === props.id
  return (
    <ListGroup.Item className="list-group-item-action py-3 lh-tight" active={active} onClick={handleClick}>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <strong className="mb-1">{props.name}</strong>
        <small>{props.timestamp}</small>
      </div>
      <div className="col-10 mb-1 small">{props.id}</div>
    </ListGroup.Item>
  )
}

type RequestListProps = {
  requests: State
}

function RequestList ({requests}: RequestListProps) {
  return (
    <ListGroup className="list-group-flush border-bottom" style={{overflowY: "scroll"}}>
        {requests.queue.map((request) => 
          <ListItem 
            key={request.id}
            id={request.id}
            timestamp='10:30'
            name={`${request.name.first} ${request.name.last}`}
          />)}
    </ListGroup>
  )
}

type RequestProps = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>

const Requests: FC<RequestProps> = ({ requests, load }) => {
    useEffect(() => {
        load()
    }, [])
    return <RequestList requests={requests} />
}

const mapProps = (state: RootState) => ({
    requests: state.requests
})

const mapDispatch = (dispatch: RootDispatch) => ({
    load: dispatch.requests.load
})

export default connect(mapProps, mapDispatch)(Requests)
