import { useState } from 'react'
import Header from './header'
import Table from './table'

const Hooks = () => {
  const [tableData, setTableData] = useState([])
  const [selectData, setSelectData] = useState([])

  return (
    <>
      <h1>平台设置</h1>
      <Header
        data={tableData}
        setTableData={setTableData}
        selectData={selectData}
        setSelectData={setSelectData}
      />
      <Table
        data={tableData}
        setTableData={setTableData}
        selectData={selectData}
        setSelectData={setSelectData}
      />
    </>
  )
}

export default Hooks
