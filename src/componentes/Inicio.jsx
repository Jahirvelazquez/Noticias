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
import HLalaguna from './Inicio/HLalaguna';
import HSanpedro from './Inicio/HSanpedro';
import HParras from './Inicio/HParras';
import HMadero from './Inicio/HMadero';
import HMatamoros from './Inicio/HMatamoros';


const Inicio = () => {
 

  return (
    <div>
      <Carrusel></Carrusel>
      
      <HCoahuila></HCoahuila> 
      <LatestArticles></LatestArticles>  
      <HNacional></HNacional>

      <CardVideo></CardVideo>
      <HLalaguna></HLalaguna>
      <Publicidad></Publicidad>
      <HSanpedro></HSanpedro>
      <Cards></Cards>
      <HParras></HParras>
      <Cards></Cards>
      <HMadero></HMadero>
      <HMatamoros></HMatamoros>
      <NewsDashboard></NewsDashboard>
      
    </div>
  );
};

export default Inicio;
