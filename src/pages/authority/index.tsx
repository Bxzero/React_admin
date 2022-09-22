import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
const { Option } = Select
interface DataType {
  key: string
  dep: string
  no: string
  name: string
  gender: string
  role: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '部门',
    dataIndex: 'dep',
    key: 'dep',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '工号',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    dep: 'DC1',
    no: 'P010000000',
    name: '张三',
    gender: '女',
    role: '管理员',
  },
  {
    key: '2',
    dep: 'DC2',
    no: 'P010000000',
    name: '张三',
    gender: '女',
    role: '管理员',
  },
  {
    key: '3',
    dep: 'DC3',
    no: 'P010000000',
    name: '张三',
    gender: '女',
    role: '管理员',
  },
  {
    key: '4',
    dep: 'DC4',
    no: 'P010000000',
    name: '张三',
    gender: '女',
    role: '管理员',
  },
]
const App: React.FC = () => {
  const [keyword, setkeyword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState({
    key: '',
    dep: '',
    no: '',
    name: '',
    gender: '',
    role: '',
  })
  const columns: ColumnsType<DataType> = [
    {
      title: '部门',
      dataIndex: 'dep',
      key: 'dep',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '工号',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editHandler(record)}>edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]
  const addHandler = (record: any) => {
    setUser({
      key: '',
      dep: '',
      no: '',
      name: '',
      gender: '',
      role: '',
    })
    setIsModalOpen(true)
  }
  const editHandler = (record: any) => {
    setUser(record)
    setIsModalOpen(true)
  }
  const changeHandler = (key: string, e: any) => {
    setUser({
      ...user,
      [key]: e.target.value,
    })
  }
  const selectChangeHandler = (key: string, e: any) => {
    setUser({
      ...user,
      [key]: e,
    })
  }
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal
        title="用户添加"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="保存"
        cancelText="关闭">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
          autoComplete="off">
          <Form.Item
            label="部门"
            rules={[{ required: true, message: '请输入部门!' }]}>
            <Input value={user.dep} onChange={(e) => changeHandler('dep', e)} />
          </Form.Item>
          <Form.Item
            label="工号"
            rules={[{ required: true, message: '请输入工号!' }]}>
            <Input value={user.no} onChange={(e) => changeHandler('no', e)} />
          </Form.Item>

          <Form.Item
            label="姓名"
            rules={[{ required: true, message: '请输入姓名!' }]}>
            <Input
              value={user.name}
              onChange={(e) => changeHandler('name', e)}
            />
          </Form.Item>
          <Form.Item label="性别" rules={[{ message: '请选择性别' }]}>
            <Select
              defaultValue={user.gender}
              onChange={(e) => selectChangeHandler('gender', e)}>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item label="角色" rules={[{ message: '请选择角色' }]}>
            <Select
              defaultValue={user.role}
              onChange={(e) => selectChangeHandler('role', e)}>
              <Option value="管理员">管理员</Option>
              <Option value="普通用户">普通用户</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Row className="header" gutter={16}>
        <Col span={13}>
          <Form.Item>
            <Input
              allowClear
              size="large"
              value={keyword}
              placeholder="请输入员工号或姓名"
              onChange={(e) => setkeyword(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Button type="primary" size="large">
            检索
          </Button>
        </Col>
        <Col span={4}>
          <Button type="primary" size="large">
            全员检索
          </Button>
        </Col>
        <Col span={4}>
          <Button type="primary" size="large" onClick={addHandler}>
            用户添加
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default App
