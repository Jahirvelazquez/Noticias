import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const HLalaguna = () => {
  const [nationalNews, setNationalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    
    
    mainGrid: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      marginTop: '20px',
      gap: '20px',
    },

    mainNews: {
      flex: isMobile ? 'unset' : 2,
      position: 'relative',
      color: 'white',
      height: isMobile ? '250px' : '400px',
    },

    mainNewsImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '4px',
    },
    mainOverlay: {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      right: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '15px',
      borderRadius: '4px',
    },
    mainCategory: {
      backgroundColor: '#0056D2',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '2px',
      fontSize: '12px',
      display: 'inline-block',
      marginBottom: '10px',
    },
    mainTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    mainDate: {
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    sideNews: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    newsCard: {
      display: 'flex',
      gap: '10px',
      backgroundColor: '#f5f5f5',
      padding: '10px',
      borderRadius: '4px',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transición para la animación
    },
    newsCardHover: {
      transform: 'scale(1.05)', // Aumentar ligeramente el tamaño
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Sombra para resaltar
    },
    thumbnail: {
      width: isMobile ? '60px' : '150px',
      height: isMobile ? '45px' : '60px',
      objectFit: 'cover',
      borderRadius: '4px',
    },

    newsInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    newsTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    newsDate: {
      fontSize: '12px',
      color: '#555',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    tag: {
      backgroundColor: '#0056D2',
      color: 'white',
      fontSize: '10px',
      padding: '2px 4px',
      borderRadius: '2px',
      marginBottom: '4px',
      display: 'inline-block',
    },
    // Estilo para el carrusel
    carouselContainer: {
      width: '100%',
      maxWidth: isMobile ? '100%' : '800px',
      margin: '0 auto',
      height: isMobile ? '250px' : '400px',
      overflow: 'visible',
    },

    carouselImage: {
      width: '800px',
      height: '450px',
      objectFit: 'cover', // O "contain" si no quieres recortes
      display: 'block',
      margin: '0 auto', // Centra la imagen si el contenedor es más grande
      borderRadius: '8px', // Opcional: bordes suaves
      cursor: 'pointer',

    },


  };

  const responsiveStyles = {
    mainGrid: {
      flexDirection: isMobile ? 'column' : 'row',
    },
    mainNews: {
      height: isMobile ? '250px' : '400px',
    },
    carouselContainer: {
      height: isMobile ? '250px' : '400px',
      maxWidth: isMobile ? '100%' : '800px',
    },
    thumbnail: {
      width: isMobile ? '60px' : '80px',
      height: isMobile ? '45px' : '60px',
    },
  };


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const newsRef = ref(db, 'news');
  
    // Cambiar el `onValue` para ordenar y limitar los resultados
    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Ordenar las noticias por fecha descendente (más reciente primero)
        const newsArray = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .filter(news => news.category === "NACIONAL")  // Filtrar por categoría
          .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));  // Ordenar por fecha
  
        // Tomar solo las primeras 15 noticias
        setNationalNews(newsArray.slice(0, 15));
        setLoading(false);
      } else {
        setError('No data available');
        setLoading(false);
      }
    }, (err) => {
      setError('Failed to fetch data');
      setLoading(false);
    });
  }, []);
  
  const CustomPrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '8px',
        borderRadius: '50%',
      }}
    >
      ←
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '8px',
        borderRadius: '50%',
      }}
    >
      →
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true, // Activando el efecto fade para la transición entre imágenes
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    adaptiveHeight: false,
    pauseOnHover: false, // <- Esta es la línea clave
    pauseOnFocus: false,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const getYouTubeThumbnail = (url) => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/);
    return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : null;
  };
  
  return (
    <div style={styles.container}>
      <div style={{ position: 'relative', marginBottom: '30px' }}>
        <div style={{
          backgroundColor: '#0056e0',
          color: 'white',
          fontWeight: 'bold',
          padding: '12px 25px',
          display: 'inline-block',
          clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)',
          fontSize: '16px',
          position: 'relative',
          zIndex: 2
        }}>
          LA LAGUNA
        </div>
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: -5,
          width: '100%',
          height: '3px',
          backgroundColor: '#0056e0',
          zIndex: 1
        }}></div>
      </div>
  
      <div style={{ ...styles.mainGrid, ...responsiveStyles.mainGrid }}>
        {/* Cards a la izquierda */}
        <div style={styles.sideNews}>
          {nationalNews.slice(1, 6).map((news, index) => {
            const videoUrl = news.videoUrls?.[0];
            const thumbnail = videoUrl ? getYouTubeThumbnail(videoUrl) : news.fileUrls?.[0] || '/path/to/default-thumbnail.jpg';
  
            return (
              <div
                key={index}
                style={{
                  ...styles.newsCard,
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/news/${news.id}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.05)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              >
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  style={styles.thumbnail}
                />
                <div style={styles.newsInfo}>
                  <div style={styles.tag}>{news.category}</div>
                  <div style={styles.newsTitle}>{news.title}</div>
                  <div style={styles.newsDate}>⏰ {formatDate(news.dateTime)}</div>
                </div>
              </div>
            );
          })}
        </div>
  
        {/* Carrusel a la derecha */}
        {nationalNews.length > 0 && (
          <div style={styles.carouselContainer}>
            <Slider {...settings}>
              {nationalNews.slice(0, 5).map((news, index) => {
                const videoUrl = news.videoUrls?.[0];
                const thumbnail = videoUrl ? getYouTubeThumbnail(videoUrl) : news.fileUrls?.[0] || '/path/to/default-image.jpg';
  
                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/news/${news.id}`)}
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={thumbnail}
                      alt="Main news"
                      style={styles.carouselImage}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        right: '20px',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '10px 15px',
                        borderRadius: '10px',
                        maxWidth: '90%',
                      }}
                    >
                      {news.title}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
  

};

export default HLalaguna;


