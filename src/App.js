import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Inicio from './components/Inicio';
import { NextUIProvider } from "@nextui-org/react";
import { NuestrosCoches } from './components/NuestrosCoches';
import { Login } from './components/Login';

function App() {
  return (
    <NextUIProvider>
      <main className="light text-foreground bg-background">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path='/NuestrosCoches' element={<NuestrosCoches/>}/>
            <Route path='/Login' element={<Login/>}/>
          </Routes>
        </Router>
      </main>
    </NextUIProvider>
  );
}

export default App;