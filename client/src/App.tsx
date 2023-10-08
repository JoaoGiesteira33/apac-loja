import { useState } from 'react'
import Button from '@mui/material/Button';

function App() {
  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   fetch('http://localhost:3000/').then((res) => res.json()).then((data) => console.log(data))
  // }, [])

  return (
    <>
      <p className='text-base'>{count}</p>
      <Button 
      className='text-base'
      onClick={() => setCount(count + 1)}
      variant="contained">Click on me!</Button>
    </>
  )
}

export default App
