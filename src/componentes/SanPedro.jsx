import React, { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import './Categorias.css';

const SanPedro = () => {
    const [sanPedroNews, setSanPedroNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 10; // Número de noticias por página

    useEffect(() => {
        const sanPedroNewsRef = ref(database, 'news/');
        onValue(sanPedroNewsRef, (snapshot) => {
            const data = snapshot.val();
            const newsArray = data
                ? Object.entries(data)
                    .map(([key, value]) => ({ id: key, ...value }))
                    .filter((item) => item.category === 'San Pedro')
                : [];
            setSanPedroNews(newsArray.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
            setLoading(false);
        });
    }, []);

    // Calcular total de páginas
    const totalPages = Math.ceil(sanPedroNews.length / newsPerPage);

    // Manejo de cambio de página
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Desplazar al principio de la página
    };

    // Noticias a mostrar en la página actual
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = sanPedroNews.slice(indexOfFirstNews, indexOfLastNews);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="header-container">
                <div className="header-content">
                    <div className="header-padding">
                        <h1 className="header-title">CATEGORÍA: San Pedro</h1>
                    </div>
                </div>
            </div>

            {currentNews.map((item) => (
                <Link to={`/news/${item.id}`} key={item.id} className="news-item-link">
                    <div className="news-item">
                        <h2 className="news-title">{item.title}</h2>
                        <p className="date">{item.dateTime ? new Date(item.dateTime).toLocaleString() : 'Fecha no disponible'}</p>
                        <p className="news-content">
                            {item.content.split(' ').slice(0, 20).join(' ')}...
                        </p>

                        {item.fileUrls && item.fileUrls.length > 0 && (
                            <img src={item.fileUrls[0]} alt="San Pedro News" className="news-image" />
                        )}

                        {item.videoUrls && item.videoUrls.length > 0 && (
                            <iframe
                                src={item.videoUrls[0]}
                                title="Video de Noticia SAN PEDRO"
                                allowFullScreen
                                className="news-video"
                            />
                        )}
                    </div>
                </Link>
            ))}

            {/* Paginación */}
            <div className="pagination">
                <button 
                    onClick={() => handleClick(1)} 
                    disabled={currentPage === 1}
                    className="page-button first-last-button"
                >
                    «
                </button>

                <button 
                    onClick={() => handleClick(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="page-button"
                >
                    ‹ 
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .slice(Math.max(0, currentPage - 3), currentPage + 2)
                    .map(pageNumber => (
                        <button
                            key={pageNumber}
                            onClick={() => handleClick(pageNumber)}
                            className={`page-button ${currentPage === pageNumber ? 'active' : ''}`}
                        >
                            {pageNumber}
                        </button>
                    ))}

                <button 
                    onClick={() => handleClick(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="page-button"
                >
                     ›
                </button>

                <button 
                    onClick={() => handleClick(totalPages)} 
                    disabled={currentPage === totalPages}
                    className="page-button first-last-button"
                >
                    »
                </button>
            </div>
        </div>
    );
};

export default SanPedro;
