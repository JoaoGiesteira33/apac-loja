import MobileComponent from './components/mobileComponent';
import DesktopComponent from './components/desktopComponent';
import useViewport from './hooks/useViewport';

function App() {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}

export default App