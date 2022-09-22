import { useState } from 'react'

function Counter(props: any) {
  const [count, setCount] = useState(() => {
    return props.count
  })
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

function App() {
  return (
    <>
      <Counter count={10} />
      <Counter count={20} />
    </>
  )
}

export default App
