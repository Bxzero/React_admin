import { Col, Row, Input, Button, Form, Modal, message } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { get, post, dele } from '../../../utils/http'
import './common.css'
import Dialog from '../../../components/dialog'
interface HeaderProps {
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

const App = ({
  data,
  setTableData,
  selectData,
  setSelectData,
}: HeaderProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [user, setUser] = useState({
    key: '',
    name: '',
    illustration: '',
    id: '',
  })
  const [ID, setID] = useState<string>('')
  const [conVisible, setConVisible] = useState<boolean>(false)
  const onOk = (e: any) => {
    setVisible(false)
    post('/users', e)
      .then((res) => {
        searchHandler()
      })
      .catch((err) => {
        console.log('2111', err)
      })
  }
  const openDialog = () => {
    setUser({
      key: '',
      name: '',
      illustration: '',
      id: '',
    })
    setVisible(true)
  }
  const onCancel = (e: any) => {
    setVisible(false)
  }
  const hideModal = (e: any) => {
    setConVisible(false)
  }
  const sureDelete = (e: any) => {
    setConVisible(false)
    dele('/users/' + selectData[0].id)
      .then((res) => {
        searchHandler()
      })
      .catch((err) => {})
  }
  const resetHandler = () => {
    setName('')
    setID('')
  }
  const deleteData = () => {
    if (selectData.length == 1) {
      setConVisible(true)
    } else {
      message.error('您只能一次选择一个数据')
    }
  }
  const searchHandler = () => {
    get('/users')
      .then((res) => {
        setTableData(
          res.filter(
            (item: any) =>
              item.id.indexOf(ID) > -1 && item.name.indexOf(name) > -1
          )
        )
      })
      .catch((err) => {})
  }
  useEffect(() => {
    searchHandler()
  }, [name, ID])
  return (
    <>
      <Row className="header" gutter={16}>
        <Col span={5}>
          <Form.Item
            label="设置组ID:"
            rules={[{ message: 'Please input  configId!' }]}>
            <Input
              allowClear
              value={ID}
              onChange={(e) => setID(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            label="设置组名称:"
            rules={[{ message: 'Please input configName!' }]}>
            <Input
              allowClear
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Button
            type="primary"
            className="color1 radius1"
            onClick={searchHandler}>
            查询
          </Button>
          <Button type="default" className="radius1" onClick={resetHandler}>
            重置
          </Button>
        </Col>
        <Col span={2}></Col>
        <Col span={3}>
          <Button type="text" className="green" onClick={openDialog}>
            新增
          </Button>
          <Button
            shape="circle"
            className="green"
            icon={<PlusOutlined />}
            onClick={openDialog}
          />
          <Button type="text" className="red" onClick={deleteData}>
            删除
          </Button>
          <Button
            shape="circle"
            className="red"
            icon={<MinusOutlined />}
            onClick={deleteData}
          />
        </Col>
        <Dialog
          title={'弹窗'}
          visible={visible}
          onOk={onOk}
          defaultUser={user}
          onCancel={onCancel}
        />
        <Modal
          title="Modal"
          visible={conVisible}
          onOk={sureDelete}
          onCancel={hideModal}
          okText="确认"
          cancelText="取消">
          <p>要删除这{selectData.length}项元素吗？</p>
        </Modal>
      </Row>
    </>
  )
}

export default App
