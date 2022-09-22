import './index.css'
import avatar from './images/avatar.png'
// 依赖的数据
import React, { useEffect, useState } from 'react'
const App: React.FC = () => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: '热度',
      type: 'hot',
    },
    {
      id: 2,
      name: '时间',
      type: 'time',
    },
  ])
  const [lists, setLists] = useState([
    {
      id: 1,
      author: '刘德华',
      comment: '给我一杯忘情水',
      time: new Date('2021-10-10 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 1,
    },
    {
      id: 2,
      author: '周杰伦',
      comment: '哎哟，不错哦',
      time: new Date('2021-10-11 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 0,
    },
    {
      id: 3,
      author: '五月天',
      comment: '不打扰，是我的温柔',
      time: new Date('2021-10-11 10:09:00'),

      // 1: 点赞 0：无态度 -1:踩
      attitude: -1,
    },
  ])
  const [active, setActive] = useState('hot')
  const tabsChange = (item: any) => {
    setActive(item)
  }

  const formatTime = (time: any) => {
    //时间格式化
    return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}  ${
      time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    }:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
  }

  return (
    <div className="App">
      <div className="comment-container">
        {/* 评论数 */}
        <div className="comment-head">
          <span>5 评论</span>
        </div>
        {/* 排序 */}
        <div className="tabs-order">
          <ul className="sort-container">
            {tabs.map((item) => (
              <li
                key={item.id}
                className={item.type == active ? 'on' : ''}
                onClick={() => tabsChange(item.type)}>
                按{item.name}排序
              </li>
            ))}
          </ul>
        </div>

        {/* 添加评论 */}
        <div className="comment-send">
          <div className="user-face">
            <img className="user-head" src={avatar} alt="" />
          </div>
          <div className="textarea-container">
            <textarea placeholder="发条友善的评论" className="ipt-txt" />
            <button className="comment-submit">发表评论</button>
          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="comment-list">
          {lists.map((item) => (
            <div className="list-item">
              <div className="user-face">
                <img className="user-head" src={avatar} alt="" />
              </div>
              <div className="comment">
                <div className="user">{item.author}</div>
                <p className="text">{item.comment}</p>
                <div className="info">
                  <span className="time">{formatTime(item.time)}</span>
                  <span className={item.attitude == 1 ? 'like liked' : 'like'}>
                    <i className="icon" />
                  </span>
                  <span className={item.attitude == 0 ? 'hate hated' : 'hate'}>
                    <i className="icon" />
                  </span>
                  <span className="reply btn-hover">删除</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
