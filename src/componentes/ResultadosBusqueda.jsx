// ResultadosBusqueda.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import './Categorias.css'; // Asegúrate de que este archivo tenga el estilo adecuado

const ResultadosBusqueda = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [noticias, setNoticias] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const noticiasRef = ref(db, 'news/');

    onValue(noticiasRef, (snapshot) => {
      const data = snapshot.val();
      const noticiasArray = data
        ? Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
        : [];
      setNoticias(noticiasArray);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Filtrar los resultados cada vez que cambie `query` o `noticias`
    const filteredResults = noticias.filter(noticia =>
      noticia.title.toLowerCase().includes(query.toLowerCase())
    );
    setResultados(filteredResults);
  }, [noticias, query]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="header-container">
        <div className="header-content">
          <div className="header-padding">
            <h1 className="header-title">Resultados de búsqueda para: "{query}"</h1>
          </div>
        </div>
      </div>

      {resultados.length > 0 ? (
        resultados.map((noticia) => (
          <Link to={`/news/${noticia.id}`} key={noticia.id} className="news-item-link">
            <div className="news-item">
              <h2 className="news-title">{noticia.title}</h2>
              <p className="date">{noticia.dateTime ? new Date(noticia.dateTime).toLocaleString() : 'Fecha no disponible'}</p>
              <p className="news-content">
                {noticia.content.split(' ').slice(0, 20).join(' ')}...
              </p>

              {noticia.fileUrls && noticia.fileUrls.length > 0 && (
                <img src={noticia.fileUrls[0]} alt={noticia.title} className="news-image" />
              )}

              {noticia.videoUrls && noticia.videoUrls.length > 0 && (
                <iframe
                  src={noticia.videoUrls[0]}
                  title="Video de Noticia"
                  allowFullScreen
                  className="news-video"
                />
              )}
            </div>
          </Link>
        ))
      ) : (
        <p>No se encontraron resultados para tu búsqueda.</p>
      )}
    </div>
  );
};

export default ResultadosBusqueda;
