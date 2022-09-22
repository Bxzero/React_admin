import { Button, Dropdown, Menu, Carousel } from 'antd'
import React from 'react'
import vueLogo from '../../assets/logo.png'
import reactLogo from '../../assets/logo192.png'
import './style/index.css'
const contentStyle: React.CSSProperties = {
  position: 'relative',
  height: '360px',
  color: '#fff',
  lineHeight: '360px',
  textAlign: 'center',
  background: '#364d79',
}
const imgStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '360px',
  height: '200px',
}
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com">
            2nd menu item
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com">
            3rd menu item
          </a>
        ),
      },
    ]}
  />
)

const App: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }

  return (
    <>
      <Carousel afterChange={onChange} autoplay>
        <div>
          <div className="contentStyle">
            <img src={vueLogo} className="imgStyle" />
          </div>
        </div>
        <div>
          <div className="contentStyle">
            <img src={reactLogo} className="imgStyle" />
          </div>
        </div>
        <div>
          <div className="contentStyle">
            <img src={reactLogo} className="imgStyle" />
          </div>
        </div>
        <div>
          <div className="contentStyle">
            <img src={reactLogo} className="imgStyle" />
          </div>
        </div>
      </Carousel>
      <Dropdown
        overlay={menu}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}>
        <Button>bottomLeft</Button>
      </Dropdown>
      <Dropdown
        overlay={menu}
        placement="bottom"
        arrow={{ pointAtCenter: true }}>
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}>
        <Button>bottomRight</Button>
      </Dropdown>
      <br />
      <Dropdown
        overlay={menu}
        placement="topLeft"
        arrow={{ pointAtCenter: true }}>
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown overlay={menu} placement="top" arrow={{ pointAtCenter: true }}>
        <Button>top</Button>
      </Dropdown>
      <Dropdown
        overlay={menu}
        placement="topRight"
        arrow={{ pointAtCenter: true }}>
        <Button>topRight</Button>
      </Dropdown>
    </>
  )
}

export default App
