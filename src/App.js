// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
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
import ResultadosBusqueda from './componentes/ResultadosBusqueda';
import Noticias from "./componentes/Noticias";
import Login from "./componentes/Login";
import NewsDashboard from "./componentes/Inicio/NewsDashboard";
import SubirNoticia from "./componentes/SubirNoticia";
import AdminPublicidad from "./componentes/AdminPublicidad";
import AdminCarrusel from "./componentes/AdminCarrusel";
import ProtectedRoute from './componentes/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Noticias" element={<Noticias />} />
          <Route path="/Coahuila" element={<Coahuila />} />
          <Route path="/Laguna" element={<LaLaguna />} />
          <Route path="/Nacional" element={<Nacional />} />
          <Route path="/Sanpedro" element={<SanPedro />} />
          <Route path="/Parras" element={<Parras />} />
          <Route path="/FcoIMadero" element={<FcoIMadero />} />
          <Route path="/Matamoros" element={<Matamoros />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/news/:id" element={<NewsDetail />} />{/* Ruta para la noticia individual */}
          <Route path="/resultados" element={<ResultadosBusqueda />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Login" element={<NewsDashboard />} />

          {/* Rutas protegidas */}
          <Route path="/administrador" element={<ProtectedRoute><Administrador /></ProtectedRoute>} />
          <Route path="/admin/publicidad" element={<AdminPublicidad />} />
          <Route path="/admin/carrusel" element={<AdminCarrusel />} />
          <Route path="/SubirNoticia" element={<SubirNoticia />} />

          <Route path="/SubirNoticia" element={<SubirNoticia />} />
        </Routes>
        <PiePagina />
      </BrowserRouter>
    </div>
  );
}

export default App;
