import { useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WepApp
function App() {

  useEffect(() => {
    tg.ready()
  })

  const onClose = () => {
    tg.close()
  }
  return (
    <>
      <button onClick={onClose}>
        Close
      </button>
    </>
  );
}

export default App;
