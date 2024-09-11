import { useEffect } from 'react';
import './App.css';
import Header from './components/header/header';

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
