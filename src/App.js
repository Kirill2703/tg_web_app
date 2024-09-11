import { useEffect } from 'react';
import './App.css';
import Header from './components/header/header';
const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready()
  })

  
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
