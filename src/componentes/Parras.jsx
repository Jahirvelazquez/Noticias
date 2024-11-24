import React, { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBRow,
  MDBBadge,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from 'mdb-react-ui-kit';
import './Categorias.css';

const Nacional = () => {
  const [nationalNews, setNationalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10; // Número de noticias por página

  useEffect(() => {
    const nationalNewsRef = ref(database, 'news/');
    onValue(nationalNewsRef, (snapshot) => {
      const data = snapshot.val();
      const newsArray = data
        ? Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .filter((item) => item.category === 'Parras')
        : [];
      setNationalNews(newsArray.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
      setLoading(false);
    });
  }, []);

  // Calcular total de páginas
  const totalPages = Math.ceil(nationalNews.length / newsPerPage);

  // Manejo de cambio de página
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Desplazar al principio de la página
  };

  // Noticias a mostrar en la página actual
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = nationalNews.slice(indexOfFirstNews, indexOfLastNews);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="header-container">
        <div className="header-content">
          <div className="header-padding">
            <h1 className="header-title">CATEGORÍA: Parras</h1>
          </div>
        </div>
      </div>
      <div className='mt-4'>

{currentNews.map((item) => (
  <Link to={`/news/${item.id}`} key={item.id} className="news-item-link">
    <div className="news-card"> {/* Usar la clase CSS aquí */}
      <MDBCard className='mb-3'>
        <MDBRow className='g-0'>
          {/* Contenedor Simétrico para Imagen o Video */}
          <MDBCol md='5' className="d-flex align-items-center justify-content-center" style={{ height: '300px', padding: 0 }}>
            {item.fileUrls && item.fileUrls.length > 0 && (
              <MDBCardImage
                src={item.fileUrls[0]} // Asegúrate de que esta URL sea válida
                alt="Imagen noticia"
                fluid
                className='rounded-start'
                style={{
                  height: '100%', // Asegurar que la imagen ocupe toda la altura del contenedor
                  width: '100%', // Asegurar que la imagen ocupe todo el ancho del contenedor
                  objectFit: 'cover', // Mantener la proporción
                  padding: 0, // Eliminar padding de la imagen
                  margin: 0, // Eliminar margen de la imagen
                }}
              />
            )}
            {item.videoUrls && item.videoUrls.length > 0 && (
              <iframe
                src={item.videoUrls[0].replace('watch?v=', 'embed/')} // Cambiar la URL para incrustar
                title="Video de Noticia Parras"
                allowFullScreen
                width="100%" // Ajustar el ancho
                height="100%" // Ajustar la altura para que se vea bien
                className="rounded-start"
                style={{
                  border: 'none',
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover', // Asegura que el video ocupe todo el espacio
                }}
              />
            )}
          </MDBCol>

          {/* Contenido */}
          <MDBCol md='7'> {/* Aumentar a 7 para balancear el espacio */}
            <MDBCardBody>
              {/* Etiqueta de categoría */}
              <MDBBadge color='primary' pill>
                Parras
              </MDBBadge>
              
              {/* Título de la noticia */}
              <h5 className='mt-2'>{item.title}</h5>

              {/* Fecha de la noticia */}
              <p className='text-muted'>
                {item.dateTime ? new Date(item.dateTime).toLocaleDateString() : 'Fecha no disponible'}
              </p>

              {/* Descripción */}
              <p className='card-text'>
                {item.content.split(' ').slice(0, 40).join(' ')}...
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  </Link>
))}
</div>
      {/* Paginación con MDBootstrap */}
      <nav aria-label='Page navigation example'>
        <MDBPagination className='mb-0'>
          <MDBPaginationItem disabled={currentPage === 1}>
            <MDBPaginationLink onClick={() => handleClick(1)} tabIndex="-1">
              «
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem disabled={currentPage === 1}>
            <MDBPaginationLink onClick={() => handleClick(currentPage - 1)}>
              ‹
            </MDBPaginationLink>
          </MDBPaginationItem>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(Math.max(0, currentPage - 3), currentPage + 2)
            .map(pageNumber => (
              <MDBPaginationItem active={currentPage === pageNumber} key={pageNumber}>
                <MDBPaginationLink onClick={() => handleClick(pageNumber)}>
                  {pageNumber}
                </MDBPaginationLink>
              </MDBPaginationItem>
            ))}
          <MDBPaginationItem disabled={currentPage === totalPages}>
            <MDBPaginationLink onClick={() => handleClick(currentPage + 1)}>
              ›
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem disabled={currentPage === totalPages}>
            <MDBPaginationLink onClick={() => handleClick(totalPages)}>
              »
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      </nav>
    </div>
  );
};

export default Nacional;
