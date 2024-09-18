// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from "./componentes/Inicio";
import BarraNavegacion from "./componentes/BarraNavegacio";
import Contacto from "./componentes/Contacto";
import PiePagina from "./componentes/PiePagina";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Administrador from "./componentes/Administrador";
import NewsDetail from "./componentes/NewsDetail";
import Nacional from "./componentes/Nacional";

function App() {
  return (
    <div>
      <BrowserRouter>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/nacional" element={<Nacional />} />
          <Route path="/news/:id" element={<NewsDetail />} />{/* Ruta para la noticia individual */}
        </Routes>
        <PiePagina />
      </BrowserRouter>
    </div>
  );
}

export default App;
