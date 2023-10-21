import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';

import logoFile from './assets/logo_apac.png';

import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(0);

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
      variant="contained">{t('title')}</Button>
    </>
  )
}

export default App
