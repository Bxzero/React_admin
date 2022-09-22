import { Typography, Layout, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style/style.css'
const { Title } = Typography
const { Header, Footer, Content } = Layout

function App() {
  let navigate = useNavigate()

  return (
    <>
      <Layout className="loginLayout">
        <Header className="loginHeader">
          <Title>L o g i n</Title>
        </Header>
        <Content>
          <div className="loginForm">
            <Title level={4} className="inputTitle">
              User
            </Title>
            <Input placeholder="UserName" />
            <Title level={4} className="inputTitle">
              password
            </Title>
            <Input placeholder="password" type="password" />
          </div>
        </Content>
        <Footer>
          <Button
            type="primary"
            onClick={() => navigate('/home', { replace: true, state: {} })}>
            Login
          </Button>
        </Footer>
      </Layout>
    </>
  )
}

export default App
