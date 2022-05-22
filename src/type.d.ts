interface IRequest {
    uid: string
    fileUid: string
  }
  
  type RequestState = {
    requests: IRequest[]
    selected: string
  }
  
  type RequestAction = {
    type: string
    request: IRequest
  }
  
  type DispatchType = (args: RequestAction) => RequestAction