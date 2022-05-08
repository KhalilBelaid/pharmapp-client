import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import PhotoUpload from './PhotoUpload';

export type HomeProps = {
}

export default function Home (props: HomeProps) {
    const currentUser = useAuth()

    return (
        <div className='d-flex flex-column vh-100 overflow-hidden'>
            <div style={{flex: '0 1 auto'}}>
                <Header />
            </div>
            {currentUser ?
                <div style={{flex: '1 1 auto'}} className='d-flex flex-column' >
                    <PhotoUpload />
                </div>
            :
                null
            }
        </div>
    )
}
