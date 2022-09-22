import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
interface DialogProps {
  visible: boolean
  onOk: (e: any) => any
  onCancel: (e: any) => any
  title?: string
  defaultUser?: {
    id: string
    key: string
    name: string
    illustration: string
  }
  disabledId?: boolean
}
const TheDialog = (props: DialogProps) => {
  const {
    visible = false,
    onCancel,
    onOk,
    title = '',
    defaultUser,
    disabledId = false,
  } = props
  const [user, setUser] = useState({
    id: '',
    key: '',
    name: '',
    illustration: '',
  })
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const changeHandler = (key: string, e: any) => {
    setUser({
      ...user,
      [key]: e.target.value,
    })
  }
  useEffect(() => {
    console.log(defaultUser, user)
    if (visible && defaultUser) {
      setUser({ ...defaultUser })
    }
  }, [defaultUser, visible])
  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onOk={() => onOk(user)}
        onCancel={() => onCancel(user)}
        okText="保存"
        cancelText="关闭">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="设置组ID"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input value={user.id} onChange={(e) => changeHandler('id', e)} />
          </Form.Item>
          <Form.Item
            label="key"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input value={user.key} onChange={(e) => changeHandler('key', e)} />
          </Form.Item>
          <Form.Item
            label="Name"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input
              value={user.name}
              onChange={(e) => changeHandler('name', e)}
            />
          </Form.Item>
          <Form.Item
            label="illustration"
            rules={[{ message: 'Please input your username!' }]}>
            <Input
              value={user.illustration}
              onChange={(e) => changeHandler('illustration', e)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TheDialog
