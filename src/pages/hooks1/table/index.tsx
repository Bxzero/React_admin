import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import Dialog from '../../../components/dialog'
import { get, put } from '../../../utils/http'
interface DataType {
  key: string
  name: string
  id: string
  illustration: string
}
interface TableProps {
  data: Array<{
    key: string
    name: string
    id: string
    illustration: string
  }>
  setTableData: any
  selectData: any
  setSelectData: any
}

const TableContainer = ({
  data,
  setTableData,
  selectData,
  setSelectData,
}: TableProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [user, setUser] = useState({
    key: '',
    name: '',
    illustration: '',
    id: '',
  })
  const onOk = (e: any) => {
    // setTableData(data.map((item) => (item.id === e.id ? e : item)))
    setVisible(false)
    put('/users/' + e.id, e)
      .then((res) => {
        setTableData(data.map((item) => (item.id === res.id ? res : item)))
      })
      .catch((err) => {})
  }
  const editHandler = (item: any) => {
    setUser(item)
    setVisible(true)
  }
  useEffect(() => {
    get('/users')
      .then((res) => {
        setTableData(res)
      })
      .catch((err) => {})
  }, [])
  const onCancel = (e: any) => {
    setVisible(false)
  }
  const openDialog = () => {
    setVisible(true)
  }
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
      setSelectData(selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '设置组ID',
      dataIndex: 'id',

      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'illustration',
      dataIndex: 'illustration',
      key: 'illustration',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editHandler(record)}>明细</a>
        </Space>
      ),
    },
  ]
  return (
    <>
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <Dialog
        title={'弹窗'}
        visible={visible}
        onOk={onOk}
        defaultUser={user}
        onCancel={onCancel}
      />
    </>
  )
}

export default TableContainer
