// src/componentes/Inicio.js
import React from 'react';
import Carrusel from './Inicio/Carrusel';
import LatestArticles from './Inicio/LatestArticles';
import BlogBlockIntroPage from './Inicio/BlogBlockIntroPage';
import BlogBanner from './Inicio/BlogBanner ';

const Inicio = () => {
 

  return (
    <div>
      <Carrusel></Carrusel>
      <LatestArticles></LatestArticles>
      <BlogBanner></BlogBanner>
      <BlogBlockIntroPage></BlogBlockIntroPage>
    </div>
  );
};

export default Inicio;
