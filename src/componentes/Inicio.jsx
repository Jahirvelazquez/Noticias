// src/componentes/Inicio.js
import React from 'react';
import Carrusel from './Carrusel';
import LatestArticles from './Inicio/LatestArticles';
import MostPopular from './Inicio/MostPopular ';
import Categories from './Inicio/Categories ';
import CardVideo from './Inicio/CardVideo';
import NewsDashboard from './Inicio/NewsDashboard';
import Publicidad from './Inicio/Publicidad';
import Cards from './Inicio/Cards';


const Inicio = () => {
 

  return (
    <div>
      <Carrusel></Carrusel>
      <LatestArticles></LatestArticles>
      <CardVideo></CardVideo>
      <MostPopular></MostPopular>
      <Publicidad></Publicidad>
      <Cards></Cards>
      <Cards></Cards>
      <NewsDashboard></NewsDashboard>
      
    </div>
  );
};

export default Inicio;
