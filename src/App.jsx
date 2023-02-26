import { useState } from 'react'
import reactLogo from './assets/react.svg'
import AppNavigation from './Routes/AppNavigation'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppNavigation/>
    </div>
  )
}

export default App
