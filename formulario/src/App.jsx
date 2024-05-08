import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaFormulario from './Components/PaginaFormulario';
import Pagina2 from './Components/Pagina2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaFormulario />} />
        <Route path="/pagina2" element={<Pagina2 />} />
      </Routes>
    </Router>
  );
}

export default App;