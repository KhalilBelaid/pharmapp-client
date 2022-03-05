import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPrescription } from '../data';

interface RouteParams{
  [prescriptionId: string]:string
}

function Prescription() {
  let navigate = useNavigate();
  const {prescriptionId} = useParams<RouteParams>();
  let prescription = getPrescription(parseInt(prescriptionId ?? "0", 10));

  return (
    <main>
      <h3>Name: {prescription.name}</h3>
      <h4>ID: {prescription.number}</h4>
      <img src={prescription.img} alt="prescription"/>
      <p>
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          Submit
        </button>
      </p>
    </main>
  );
}
 
export default Prescription;