import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Hooks from './pages/hooks'
import Hooks1 from './pages/hooks1'
import Practise from './pages/practise'
import Commit from './pages/commit'
import Dict from './pages/dict'
import Author from './pages/authority'
import Vocabu from './pages/vocabulary'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route path="hooks" element={<Hooks />} />
            <Route path="hooks1" element={<Hooks1 />} />
            <Route path="practise" element={<Practise />} />
            <Route path="commit" element={<Commit />} />
            <Route path="dict" element={<Dict />} />
            <Route path="author" element={<Author />} />
            <Route path="vocabu" element={<Vocabu />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
// 用来作为 404 页面的组件
const NotFound = () => {
  return <div>你来到了没有知识的荒原</div>
}
export default App
