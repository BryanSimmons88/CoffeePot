import { useState } from 'react'
import viteLogo from './assets/47772-200.png'
import './App.css'
import useWebSocket from "react-use-websocket";

function App() {
  const [time, setTime] = useState('')
  const { sendMessage } = useWebSocket("ws://10.30.14.110:8080", {
    onOpen: () => sendMessage("user 1"),
    onMessage: (m) => {
      console.log(m)
      setTime(m.data)
    },
    shouldReconnect: () => true,
  });

  return (
    <>
      <div>
        <a>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Coffee pot was last brewed: </h1>
      <h1>{time}</h1>
      <div className="card">
        <button onClick={() => sendMessage('brew')}>
          I just brewed a fresh pot
        </button>
      </div>
      <h1>View this page at http://10.30.14.110/ </h1>
    </>
  )
}

export default App
