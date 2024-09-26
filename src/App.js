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
import Coahuila from "./componentes/Coahuila";
import LaLaguna from "./componentes/LaLaguna";
import SanPedro from "./componentes/SanPedro";
import Parras from "./componentes/Parras";
import FcoIMadero from "./componentes/FcoIMadero";
import Matamoros from "./componentes/Matamoros";

function App() {
  return (
    <div>
      <BrowserRouter>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Coahuila" element={<Coahuila />} />
          <Route path="/Laguna" element={<LaLaguna />} />
          <Route path="/Nacional" element={<Nacional />} />
          <Route path="/San pedro" element={<SanPedro />} />
          <Route path="/Parras" element={<Parras />} />
          <Route path="/Fco.I.Madero" element={<FcoIMadero />} />
          <Route path="/Matamoros" element={<Matamoros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/news/:id" element={<NewsDetail />} />{/* Ruta para la noticia individual */}
        </Routes>
        <PiePagina />
      </BrowserRouter>
    </div>
  );
}

export default App;
