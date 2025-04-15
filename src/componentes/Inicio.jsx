// src/componentes/Inicio.js
import React from 'react';
import Carrusel from './Carrusel';
import LatestArticles from './Inicio/LatestArticles';
import Categories from './Inicio/Categories ';
import CardVideo from './Inicio/CardVideo';
import NewsDashboard from './Inicio/NewsDashboard';
import Publicidad from './Inicio/Publicidad';
import Cards from './Inicio/Cards';
import HCoahuila from './Inicio/HCoahuila';
import HNacional from './Inicio/HNacional';


const Inicio = () => {
 

  return (
    <div>
      <Carrusel></Carrusel>
      
      <HCoahuila></HCoahuila> 
      <LatestArticles></LatestArticles>  
      <CardVideo></CardVideo>
      <HNacional></HNacional>
      <Publicidad></Publicidad>
      <Cards></Cards>
      <Cards></Cards>
      <NewsDashboard></NewsDashboard>
      
    </div>
  );
};

export default Inicio;
