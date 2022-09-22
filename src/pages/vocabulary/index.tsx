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
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
const { Option } = Select
interface DataType {
  key: string
  chinese: string
  japanese: string
  english: string
  type: string
  interpretation: string
  cjcount: number
  cecount: number
  jecount: number
}

const data: DataType[] = [
  {
    key: '1',
    chinese: '对象',
    japanese: 'オブジェクト',
    english: 'objecct',
    type: 'IT',
    interpretation: '程序设计语言中的数据类型',
    cjcount: 1,
    cecount: 2,
    jecount: 3,
  },
  {
    key: '2',
    chinese: '对象',
    japanese: 'オブジェクト',
    english: 'objecct',
    type: 'IT',
    interpretation: '程序设计语言中的数据类型',
    cjcount: 1,
    cecount: 2,
    jecount: 3,
  },
  {
    key: '3',
    chinese: '对象',
    japanese: 'オブジェクト',
    english: 'objecct',
    type: 'IT',
    interpretation: '程序设计语言中的数据类型',
    cjcount: 1,
    cecount: 2,
    jecount: 3,
  },
]
const App: React.FC = () => {
  const [keyword, setkeyword] = useState('')
  const [langSelect, setLangSelect] = useState('中文')
  const [typeSelect, setTypeSelect] = useState('IT')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [langInfo, setLangInfo] = useState({
    key: '',
    chinese: '',
    japanese: '',
    english: '',
    type: '',
    interpretation: '',
    cjcount: 0,
    cecount: 0,
    jecount: 0,
  })
  const columns: ColumnsType<DataType> = [
    {
      title: '中文',
      dataIndex: 'chinese',
      key: 'chinese',
    },
    {
      title: '英语',
      dataIndex: 'english',
      key: 'english',
    },
    {
      title: '日语',
      dataIndex: 'japanese',
      key: 'japanese',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '释义',
      dataIndex: 'interpretation',
      key: 'interpretation',
    },
    {
      title: '中日点击量',
      dataIndex: 'cjcount',
      key: 'cjcount',
    },
    {
      title: '中英点击量',
      dataIndex: 'cecount',
      key: 'cecount',
    },
    {
      title: '日英点击量',
      dataIndex: 'jecount',
      key: 'jecount',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            onClick={() => editHandler(record)}>
            编辑词条
          </Button>
          <Button size="small" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const addHandler = (record: any) => {
    setLangInfo({
      key: '',
      chinese: '',
      japanese: '',
      english: '',
      type: '',
      interpretation: '',
      cjcount: 0,
      cecount: 0,
      jecount: 0,
    })
    setIsModalOpen(true)
  }
  const editHandler = (record: any) => {
    setLangInfo(record)
    setIsModalOpen(true)
  }
  const changeHandler = (key: string, e: any) => {
    setLangInfo({
      ...langInfo,
      [key]: e.target.value,
    })
  }
  const selectChange = (key: string, value: any) => {
    if (key === '语言') {
      setLangSelect(value)
    } else {
      setTypeSelect(value)
    }
  }
  const selectChangeHandler = (key: string, e: any) => {
    setLangInfo({
      ...langInfo,
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
  const selectBefore = (
    <Select
      defaultValue={langSelect}
      className="select-before"
      onChange={(e) => selectChange('语言', e)}>
      <Option value="日语">日语</Option>
      <Option value="中文">中文</Option>
      <Option value="英语">英语</Option>
    </Select>
  )
  const selectAfter = (
    <Select
      defaultValue={typeSelect}
      className="select-after"
      onChange={(e) => selectChange('行业', e)}>
      <Option value="保险">保险</Option>
      <Option value="金融">金融</Option>
      <Option value="IT">IT</Option>
      <Option value="全部">全部</Option>
    </Select>
  )
  return (
    <>
      <Modal
        title="词汇添加"
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
            label="日语"
            rules={[{ required: true, message: '请输入日语!' }]}>
            <Input
              value={langInfo.japanese}
              onChange={(e) => changeHandler('japanese', e)}
            />
          </Form.Item>
          <Form.Item label="分类" rules={[{ message: '请选择分类' }]}>
            <Select
              defaultValue={langInfo.type}
              onChange={(e) => selectChangeHandler('type', e)}>
              <Option value="保险">保险</Option>
              <Option value="金融">金融</Option>
              <Option value="IT">IT</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="中文"
            rules={[{ required: true, message: '请输入中文!' }]}>
            <Input
              value={langInfo.chinese}
              onChange={(e) => changeHandler('chinese', e)}
            />
          </Form.Item>

          <Form.Item
            label="英语"
            rules={[{ required: true, message: '请输入姓名!' }]}>
            <Input
              value={langInfo.english}
              onChange={(e) => changeHandler('english', e)}
            />
          </Form.Item>
          <Form.Item
            label="释义"
            rules={[{ required: true, message: '请输入释义!' }]}>
            <TextArea
              value={langInfo.interpretation}
              placeholder="释义:"
              maxLength={100}
              style={{ height: 120 }}
              onChange={(e) => changeHandler('english', e)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Row className="header" gutter={16}>
        <Col span={10}>
          <Form.Item>
            <Input
              size="large"
              addonBefore={selectBefore}
              addonAfter={selectAfter}
              allowClear
              placeholder="请输入员工号或姓名"
              value={keyword}
              onChange={(e) => setkeyword(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button type="primary" size="large">
            检索
          </Button>
        </Col>
        <Col span={10}>
          <Button
            type="primary"
            size="large"
            style={{ margin: '0 10px' }}
            onClick={addHandler}>
            新添加
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={addHandler}
            style={{ margin: '0 10px' }}>
            批量导入
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={addHandler}
            style={{ margin: '0 10px' }}>
            批量导出
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default App
