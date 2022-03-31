import Sidebar from './Sidebar'
import Header from './Header'
import { EditCard } from './EditCard'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className='d-flex h-100'>
        <Sidebar />
        <div className="vr"></div>
        <EditCard />
      </div>
    </>
  )
}