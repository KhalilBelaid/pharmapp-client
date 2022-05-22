import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useFirestore, useFirestoreConnect } from "react-redux-firebase"
import { RootState } from "../../store/reducers"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import "firebase/compat/database"

interface IListItemProps {
	id: string
	name: string
	timestamp: string
}

function ListItem(props: IListItemProps) {
	const handleClick = () => {}
	const active = false
	return (
		<ListGroup.Item
			className="list-group-item-action py-3 lh-tight"
			active={active}
			onClick={handleClick}
		>
			<div className="d-flex w-100 align-items-center justify-content-between">
				<strong className="mb-1">{props.name}</strong>
				<small>{props.timestamp}</small>
			</div>
			<div className="col-10 mb-1 small">{props.id}</div>
		</ListGroup.Item>
	)
}

export default function Requests() {
	const firestore = useFirestore()
	useFirestoreConnect(() => [{ collection: "requests" }])
	const requests = useSelector(
		(state: RootState) => state.firestore.ordered.requests
	)
	return (
		<ListGroup
			className="list-group-flush border-bottom"
			style={{ overflowY: "scroll" }}
		>
			{requests && requests.map((request) => (
				<ListItem
					key={request.id.toString()}
					id={request.id.toString()}
					timestamp="10:30"
					name={request.uid.toString()}
				/>
			))}
		</ListGroup>
	)
}
