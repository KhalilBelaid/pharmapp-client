import { useSelector } from "react-redux";
import { RootState } from "../store";
import InputTable from "./InputTable";
import Lightbox from "./Lightbox";

type EditCardProps = {
}

export function EditCard (props: EditCardProps) {
    const requests = useSelector((state: RootState) => state.requests.queue)
    const selectedRequestId = useSelector((state: RootState) => state.requests.selectedRequest)
    const selectedRequest = requests.find(request => request.id === selectedRequestId)
    return (
        <div className="flex-grow-1 p-3 m-0 d-flex flex-wrap gap-3 justify-content-start align-items-start h-100" style={{overflowY: 'scroll'}}>
            <div className="d-flex flex-fill flex-column justify-content-start align-items-center">
                <h1>{selectedRequest?.name.first}</h1>
                <InputTable/>
            </div>
            <div className="h-100" style={{minWidth: '320px', maxHeight: '640px'}}>
                <Lightbox image={selectedRequest?.picture.large ?? ''}/>
            </div>
        </div>
    );
}
