import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Column, useRowSelect, useTable } from 'react-table'
import { TableColumns } from './ListForm'

type TableProps = {
    data: ReadonlyArray<TableColumns>
    columns: Column<TableColumns>[]
    onSelect: any
  }
  
export default function ReactTable({data, columns, onSelect}: TableProps) {
    const [selectedRow, setSelectedRow] = useState(-1)
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      footerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data }, useRowSelect)
  
    const handleSelect = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      const selectedIndex = e.currentTarget.rowIndex - 1
      setSelectedRow(selectedIndex)
      onSelect(selectedIndex)
    }
  
    return (
      <Table bordered hover striped {...getTableProps()}>
        <thead>
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
            <tr {...row.getRowProps()} className={row.index === selectedRow ? "table-primary" : ""} onClick={handleSelect}>
                {row.cells.map(cell => {
                  return (
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
    )
  }