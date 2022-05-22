import Sidebar from './Sidebar'
import Header from './Header'
import { RequestCard } from './RequestCard'

export default function Dashboard() {
  return (
    <div className='d-flex flex-column vh-100 overflow-hidden'>
      <div style={{flex: '0 1 auto'}}>
        <Header />
      </div>
      <div style={{flex: '1 1 auto'}} className='d-flex overflow-hidden ' >
        <Sidebar />
        <div className='vr' />
        <RequestCard />
      </div>
    </div>
  )
}