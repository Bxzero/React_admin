import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  TranslationOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import './style/style.css'
const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('test', 'hooks', <DesktopOutlined />),
  getItem('平台设置', 'hooks1', <PieChartOutlined />),
  getItem('404', '404', <FileOutlined />),
  getItem('AntdDesign', 'practise', <FileOutlined />),
  getItem('commit', 'commit', <FileOutlined />),
  getItem('翻译', 'dict', <TranslationOutlined />),
  getItem('权限管理', 'author', <TeamOutlined />),
  getItem('词汇维护', 'vocabu', <TeamOutlined />),
]

const App: React.FC = () => {
  let navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const navClick = (e: any) => {
    navigate(e.key, { replace: true, state: {} })
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={navClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}>
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
