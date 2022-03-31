import { useMemo }  from 'react'
import {Column, useTable} from 'react-table'
import { Form, InputGroup, Table } from 'react-bootstrap'

type TableColumns = {
  name: string
  price: number
  amount: number
  total_price: number
}

export default function InputTable () {

  const data = useMemo(() => [
    {
      name: 'Doliprane 500g',
      price: 5,
      amount: 2,
    },{
      name: 'Doliprane 500g',
      price: 5,
      amount: 1,
    },{
      name: 'Doliprane 500g',
      price: 5,
      amount: 1,
    },{
      name: 'Doliprane 500g',
      price: 5,
      amount: 1,
    },{
      name: 'Doliprane 500g',
      price: 5,
      amount: 1,
    }
  ].map(entry => {
    return {
      total_price : entry.price * entry.amount,
      ...entry
    }
  }),[])

  const columns = useMemo<Column<TableColumns>[]>(() => [
      {
        Header: 'Nom',
        accessor: 'name',
      },{
        Header: 'Prix',
        accessor: 'price'
      },{
        Header: 'Qté',
        accessor: 'amount',
        Footer: 'Total'
      },{
        Header: 'Total',
        accessor: 'total_price',
        Footer: info => {
          const total = useMemo(() =>
            info.rows.reduce((sum, row) => row.values.total_price + sum, 0),
            [info.rows]
          )
          return <>{total}</>
        },
      }
  ],[])
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })
  
  return (
    <>
    <Table bordered hover striped {...getTableProps()}>
      <thead>
        <tr>
        <Form>
          <InputGroup className="mb-3">
              <Form.Control aria-label="Name" />
              <Form.Control aria-label="Price" />
              <Form.Control aria-label="Price" />
          </InputGroup>
        </Form>
        </tr>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                {column.render('Header')}
                </th>
            ))}
            </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(row => {
          prepareRow(row)
          return (
          <tr {...row.getRowProps()}>
              {row.cells.map(cell => {return (
              <td {...cell.getCellProps()}>
                  {cell.render('Cell')}
              </td>)})}
          </tr>)
      })}
      </tbody>
      <tfoot>
      {footerGroups.map(group => (
        <tr {...group.getFooterGroupProps()}>
        {group.headers.map(column => (
            <td {...column.getFooterProps()}>
            {column.render('Footer')}
            </td>))}
        </tr>
      ))}
      </tfoot>
      </Table>
    </>
  );
}
