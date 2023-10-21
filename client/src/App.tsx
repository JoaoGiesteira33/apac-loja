import { useState } from 'react'
import Button from '@mui/material/Button';

import logoFile from './assets/logo_apac.png';

function App() {
  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   fetch('http://localhost:3000/').then((res) => res.json()).then((data) => console.log(data))
  // }, [])

  return (
    <>
      <img src={logoFile} alt="logo" />
      <p className='text-base'>{count}</p>
      <Button 
      className='text-base'
      onClick={() => setCount(count + 1)}
      variant="contained">Click on me!</Button>
    </>
  )
}

export default App
