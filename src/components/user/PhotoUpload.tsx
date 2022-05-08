import { ChangeEvent, useState } from 'react';
import { Button, Card, Container, Form, ListGroup } from 'react-bootstrap';
import { ref, uploadBytes } from 'firebase/storage';
import { storage, db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, Timestamp, collection, getDocs } from "firebase/firestore"
import { useAuth } from '../../contexts/AuthContext';

type Pharmacy = {
  uid: string,
  name: string
}

type Pharmacies = Array<Pharmacy>

export default function PhotoUpload () {
  const [file, setFile] = useState<Blob>(new Blob())
  const [pharmacy, setPharmacy] = useState('')
  const [pharmacies, setPharmacies] = useState<Pharmacies>([])
  const currentUser = useAuth()

  function handleUpload() {
    const fileUid = uuidv4()
    const storageRef = ref(storage, `prescriptions/${fileUid}`)
    uploadBytes(storageRef, file).then((snapshot) => {
      setDoc(doc(db, "requests",fileUid),
        {
          userUid: currentUser?.uid,
          createdAt: Timestamp.now() ,
          pharmacyUid: pharmacy,
        }
      )
    })
  }

  async function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0])

      const querySnapshot = await getDocs(collection(db, "pharmacies"))
      querySnapshot.forEach((doc) => {
        setPharmacies([...pharmacies, {uid: doc.id, name: doc.data().name} ])
      })
    }
  }

  const ListItem = (id: string, name: string) => {
    return (
      <ListGroup.Item className="list-group-item-action py-3 lh-tight" key={id} onClick={() => setPharmacy(id)}>
        <div className="d-flex w-100 align-items-center justify-content-between">
          <strong className="mb-1">{name}</strong>
        </div>
        <div className="col-10 mb-1 small">{id}</div>
      </ListGroup.Item>
    )
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: "800px" }}>
        <Card.Body>
          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={onFileChange}/>
            </Form.Group>
            <Button onClick={handleUpload}>Upload</Button>
          </Form>
        </Card.Body>  
      </Card>
      <ListGroup className="list-group-flush border-bottom" style={{overflowY: "scroll"}}>
        {pharmacies.map((pharmacy: Pharmacy) => ListItem(pharmacy.uid, pharmacy.name))}
      </ListGroup>
    </Container>
  )
}

