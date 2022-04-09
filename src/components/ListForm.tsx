import { useMemo, useState }  from 'react'
import { Column } from 'react-table'
import ReactTable from './ReactTable'
import InputForm from './InputForm'

export type TableColumns = {
  name: string
  price: number
  amount: number
  total_price: number
}

type OrderedTableColumn = {
  index: number,
  data: TableColumns
}

export default function ListForm () {
  const dummyData=[
    {
      name: 'Doliprane 500g',
      price: 5,
      amount: 2,
    },{
      name: 'Doliprane 1000g',
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
  })
  
  const [data, setData] = useState(dummyData)
  const [selectedData, setSelectedData] = useState<OrderedTableColumn>(
    {
      index: 0,
      data: {
        name: "",
        price: 0,
        amount: 1,
        total_price: 0
      }
    })

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
  
  const onFormSubmit = (formData: TableColumns) => {
    setData(old =>
      old.map((row, index) => {
        if (index === selectedData.index) {
          return formData
        }
        return row
      })
    )
  }

  const setSelected = (index: number) => {
    setSelectedData({index: index, data: data[index]})
  }

  return (
    <div className="d-flex flex-column flex-fill p-3 border">
      <InputForm selectedRow={selectedData} onFormSubmit={onFormSubmit}/>
      <ReactTable data={data} columns={columns} onSelect={setSelected} />
    </div>
  )
}