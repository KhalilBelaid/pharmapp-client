import React, { ChangeEvent, SyntheticEvent, useEffect, useState }  from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { TableColumns } from './ListForm'


type InputFormProps = {
    selectedRow: {
        index: number,
        data: TableColumns
    }
    onFormSubmit: any
  }
  
  export default function InputForm({selectedRow, onFormSubmit} : InputFormProps) {
    const [validated, setValidated] = useState(false)
  
    const [data, changeData] = useState(selectedRow.data)
  
    useEffect(() => {
      changeData(selectedRow.data)
    }, [selectedRow.data])
  
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      const form = e.currentTarget
      if (form.checkValidity() === true) {
        setValidated(true)
        onFormSubmit(data)
      }
    }
  
    function round(
      value: number,
      minimumFractionDigits: number,
      maximumFractionDigits: number
    ) {
      const formattedValue = value.toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits,
        maximumFractionDigits
      })
      return Number(formattedValue)
    }
  
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      changeData( prev => {
        return {
          ...prev,
          name: e.target.value
        }
      })
    }
  
    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newAmount= Number(e.target.value)
      changeData( prev => {
        return {
          ...prev,
          amount: newAmount,
          total_price :round(newAmount*data.price,2,2),
        }
      })
    }
  
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newPrice= Number(e.target.value)
      changeData( prev => {
        return {
          ...prev,
          price: newPrice,
          total_price :round(data.amount*newPrice,2,2),
        }
      })
    }
    
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex gap-2 mb-3" key={selectedRow.index} >
        <Form.Group style={{flex: 1, flexGrow: 4}}>
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" defaultValue={selectedRow.data.name} required onChange={handleNameChange}/>
          <Form.Control.Feedback type="invalid">Ce champs ne peux pas être vide</Form.Control.Feedback>
        </Form.Group>
        <Form.Group style={{flex: 1}} >
          <Form.Label>Quantité</Form.Label>
          <Form.Control type="number" min="0" defaultValue={selectedRow.data.amount} required onChange={handleAmountChange}/>
          <Form.Control.Feedback type="invalid">Invalide</Form.Control.Feedback>
        </Form.Group>
        <Form.Group style={{flex: 1}}>
          <Form.Label>Prix</Form.Label>
          <InputGroup>
            <Form.Control type="number" step=".1" min="0" defaultValue={selectedRow.data.price} required onChange={handlePriceChange}/>
            <InputGroup.Text>DT</InputGroup.Text>
            <Form.Control.Feedback type="invalid">Invalide</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group style={{flex: 1}} >
          <Form.Label>Total</Form.Label>
          <InputGroup>
            <Form.Control type="number" value={data.total_price} defaultValue={selectedRow.data.total_price} readOnly/>
            <InputGroup.Text>DT</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button className="d-none" type="submit" />
      </Form>
    )
  }