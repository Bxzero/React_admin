import {
  CalendarOutlined,
  HistoryOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import {
  Col,
  Row,
  Segmented,
  Tag,
  Button,
  Modal,
  Form,
  Divider,
  Input,
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useEffect, useRef, useState } from 'react'
import { dele, get, put } from '../../utils/http'
import './style/index.css'
const App: React.FC = () => {
  const leftRef: any = useRef(null)
  const rightRef: any = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leftValue, setLeftValue] = useState('中文')
  const [transResult, setTransResult] = useState('中文')
  const [show, setShow] = useState(true)
  const [showSY, setShowSY] = useState(false)
  const [syItem, setSyItem] = useState({
    id: '',
    name: '',
    interpretation: '',
  })
  const [rightValue, setRightValue] = useState('中文')
  const [tagList, setTagList] = useState([])
  const [SYList, setSYList] = useState({ syList: [], name: '' })

  const [dicList, setDicList] = useState([])
  const [isSpan, setIsSpan] = useState(false)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    getTagList()
    getDicList()
  }, [])
  const showModal = () => {
    setIsModalOpen(true)
  }
  const getDicList = () => {
    get('/dicList')
      .then((res) => {
        setDicList(res)
      })
      .catch((err) => {})
  }
  const getTagList = () => {
    get('/transRecord')
      .then((res) => {
        setTagList(res)
      })
      .catch((err) => {})
  }

  const handleOk = () => {
    setIsModalOpen(false)
    const syList = [...SYList.syList, syItem]
    console.log(syList)

    put('/dicList/' + 1, { ...SYList, syList })
      .then((res) => {
        setSYList(res)
      })
      .catch((err) => {})
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const leftOnChange = (value: any) => {
    console.log(value)
    setLeftValue(value)
  }
  const rightOnChange = (value: any) => {
    console.log(value)
    setRightValue(value)
  }
  const changeHandler = (key: string, e: any) => {
    setSyItem({
      ...syItem,
      [key]: e.target.value,
    })
  }
  const setSpan = () => {
    setIsSpan(!isSpan)
    setTimeout(() => {
      setIsSpan(false)
    }, 500)
    let tempValue = leftValue
    setLeftValue(rightValue)
    setRightValue(tempValue)
  }
  const leftFocus = () => {
    leftRef?.current?.focus()
  }
  const rightFocus = () => {
    rightRef?.current?.focus()
  }
  const keywordChange = (value: any) => {
    setKeyword(value?.currentTarget?.value)
  }
  const clearHistory = () => {
    setTagList([])
  }
  const delDicItem = (item: any) => {
    dele('/dicList/' + item.id)
      .then((res) => {
        getDicList()
      })
      .catch((err) => {})
  }
  const showSyModal = (item: any) => {
    setShowSY(true)
    setSYList(item)
  }
  useEffect(() => {
    if (keyword != '') {
      if (show) setShow(false)
      setTransResult('翻译结果')
    }
    if (keyword == '') {
      {
        if (!show) setShow(true)
        if (showSY) setShowSY(false)
      }
    }
  }, [keyword])
  return (
    <>
      <Row>
        <Col span={4}></Col>
        <Col span={6}>
          <Segmented
            block
            options={['中文', '日语', '英语']}
            onChange={leftOnChange}
            value={leftValue}
          />
          <div
            style={{ height: '200px', border: '1px solid #1684fc' }}
            onClick={leftFocus}>
            <TextArea
              placeholder="请输入信息"
              autoSize
              allowClear
              bordered={false}
              ref={leftRef}
              onChange={keywordChange}
            />
          </div>
        </Col>
        <Col span={4}>
          <SwapOutlined
            style={{ fontSize: '64px', padding: '35% 0', color: '#1684fc' }}
            spin={isSpan}
            onClick={setSpan}
          />
        </Col>
        <Col span={6}>
          <Segmented
            block
            options={['中文', '日语', '英语']}
            onChange={rightOnChange}
            value={rightValue}
          />
          <div
            style={{ height: '200px', border: '1px solid #1684fc' }}
            onClick={rightFocus}>
            <TextArea
              placeholder="结果"
              autoSize
              bordered={false}
              allowClear
              value={transResult}
              maxLength={6}
              rows={4}
              ref={rightRef}
            />
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={4}></Col>
        <Col span={6}>
          {show ? (
            <div
              style={{
                height: '300px',
                border: '1px solid #1684fc',
                position: 'relative',
              }}>
              <div>
                <h3 style={{ textAlign: 'left', marginLeft: '10px' }}>
                  <HistoryOutlined />
                  &nbsp; 历史记录
                </h3>
              </div>
              <Button size="small" className="clearBtn" onClick={clearHistory}>
                清空
              </Button>
              <div style={{ textAlign: 'left' }}>
                {tagList.map((item) => (
                  <Tag color="green" style={{ margin: '2px' }} key={item}>
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          ) : null}
          <Modal
            title="词汇添加"
            maskClosable={false}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="添加"
            cancelText="取消">
            <Input
              size="large"
              value={syItem.name}
              placeholder="词汇名称"
              prefix={<div>词汇</div>}
              onChange={(e) => changeHandler('name', e)}
            />
            <TextArea
              rows={4}
              value={syItem.interpretation}
              placeholder="释义:哒哒发觉频繁坡"
              onChange={(e) => changeHandler('interpretation', e)}
              style={{
                marginTop: '20px',
                height: '200px',
                border: '1px solid #1684fc',
              }}
            />
          </Modal>
          {showSY ? (
            <div
              style={{
                height: '300px',
                border: '1px solid #1684fc',
                position: 'relative',
              }}>
              <Button
                size="small"
                className="clearBtn"
                onClick={showModal}
                type="primary">
                添加释义
              </Button>
              <h2>
                {' '}
                <span style={{ color: 'red' }}> {SYList?.name}</span>词条释义：
              </h2>

              <div style={{ textAlign: 'left' }}>
                {SYList?.syList?.map((item) => (
                  <h3
                    color="green"
                    style={{ margin: '2px' }}
                    key={item['name']}>
                    <span style={{ color: 'red' }}>{item['name']}：</span>
                    {item['value']}
                  </h3>
                ))}
              </div>
            </div>
          ) : null}
        </Col>
        <Col span={4}></Col>
        <Col span={6}>
          {!show ? (
            <div style={{ height: '300px', border: '1px solid #1684fc' }}>
              <h2 style={{ textAlign: 'left', marginLeft: '10px' }}>
                <CalendarOutlined />
                &nbsp; 相关词条
              </h2>

              <div className="info">
                <Row>
                  <Col span={8}>
                    <span
                      style={{
                        fontSize: '16px',
                        color: '#007acc',
                        width: '30px',
                      }}>
                      名称
                    </span>
                  </Col>
                  <Col span={6}>
                    <span
                      style={{
                        fontSize: '16px',
                        color: '#007acc',
                      }}>
                      类型
                    </span>
                  </Col>
                  <Col span={10}></Col>
                </Row>
              </div>

              {dicList.map((item) => (
                <div className="info" key={item['id']}>
                  <Row>
                    <Col span={8}>
                      <span
                        style={{
                          fontSize: '16px',
                          color: 'black',
                        }}>
                        {item['name']}
                      </span>
                    </Col>
                    <Col span={6}>
                      <span
                        style={{
                          fontSize: '16px',
                          color: '#ff853e',
                        }}>
                        {item['type']}
                      </span>
                      <span
                        style={{
                          border: '1px solid #ccc',
                          marginLeft: '5px',
                          color: 'black',
                          cursor: 'pointer',
                        }}
                        onClick={() => showSyModal(item)}>
                        查看释义
                      </span>
                    </Col>
                    <Col span={10}>
                      <span style={{ float: 'right' }}>
                        <span
                          className={
                            item['attitude'] == 'like' ? 'like liked' : 'like'
                          }>
                          <i className="icon" />
                        </span>
                        <span
                          className={
                            item['attitude'] == 'hate' ? 'hate hated' : 'hate'
                          }>
                          <i className="icon" />
                        </span>
                        <span
                          className="reply btn-hover"
                          onClick={() => delDicItem(item)}>
                          删除
                        </span>
                      </span>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          ) : null}
        </Col>
        <Col span={4}>
          <Button type="primary">添加到生词表</Button>
        </Col>
      </Row>
    </>
  )
}
export default App
