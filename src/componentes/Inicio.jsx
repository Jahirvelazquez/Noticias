// src/componentes/Inicio.js
import React from 'react';
import Carrusel from './Inicio/Carrusel';
import LatestArticles from './Inicio/LatestArticles';
import BlogBlockIntroPage from './Inicio/BlogBlockIntroPage';
import BlogBanner from './Inicio/BlogBanner ';
import MostPopular from './Inicio/MostPopular ';
import Categories from './Inicio/Categories ';
import CardVideo from './Inicio/CardVideo';

const Inicio = () => {
 

  return (
    <div>
      <Carrusel></Carrusel>
      <LatestArticles></LatestArticles>
      <BlogBanner></BlogBanner>
      <CardVideo></CardVideo>
      <Categories></Categories>
      <MostPopular></MostPopular>
      <BlogBlockIntroPage></BlogBlockIntroPage>
     
      
    </div>
  );
};

export default Inicio;
