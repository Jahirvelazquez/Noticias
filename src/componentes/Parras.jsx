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

const getYouTubeThumbnail = (url) => {
  const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/);
  return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : null;
};

const getDriveThumbnail = (url) => {
  const fileIdMatch = url.match(/(?:file\/d\/|id=)([\w-]+)/);
  return fileIdMatch ? `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}` : null;
};

const Parras = () => {
  const [parrasNews, setParrasNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  useEffect(() => {
    const newsRef = ref(database, 'news/');
    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      const newsArray = data
        ? Object.entries(data)
            .map(([key, value]) => ({ id: key, ...value }))
            .filter(
              (item) =>
                item.category === 'Parras' ||
                (item.category && item.category.includes('Parras'))
            )
        : [];
      setParrasNews(newsArray.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(parrasNews.length / newsPerPage);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = parrasNews.slice(indexOfFirstNews, indexOfLastNews);

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
        {currentNews.map((item) => {
          const videoUrl = item.videoUrls && item.videoUrls.length > 0 ? item.videoUrls[0] : null;
          const imageUrl = item.fileUrls && item.fileUrls.length > 0 ? item.fileUrls[0] : null;

          let thumbnail = null;
          if (videoUrl) {
            thumbnail = getYouTubeThumbnail(videoUrl) || getDriveThumbnail(videoUrl) || 'https://via.placeholder.com/640x360?text=Video';
          }

          return (
            <Link to={`/news/${item.id}`} key={item.id} className="news-item-link">
              <div className="news-card">
                <MDBCard className='mb-3'>
                  <MDBRow className='g-0'>
                    <MDBCol md='5' className="d-flex align-items-center justify-content-center" style={{ height: '300px', padding: 0 }}>
                      {imageUrl ? (
                        <MDBCardImage
                          src={imageUrl}
                          alt="Imagen noticia"
                          fluid
                          className='rounded-start'
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            padding: 0,
                            margin: 0,
                          }}
                        />
                      ) : videoUrl ? (
                        <MDBCardImage
                          src={thumbnail}
                          alt="Miniatura del video"
                          fluid
                          className='rounded-start'
                          style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            padding: 0,
                            margin: 0,
                          }}
                        />
                      ) : null}
                    </MDBCol>

                    <MDBCol md='7'>
                      <MDBCardBody>
                        <MDBBadge color='primary' pill>Parras</MDBBadge>
                        <h5 className='mt-2'>{item.title}</h5>
                        <p className='text-muted'>
                          {item.dateTime ? new Date(item.dateTime).toLocaleDateString() : 'Fecha no disponible'}
                        </p>
                        <p className='card-text'>
                          {item.content.split(' ').slice(0, 40).join(' ')}...
                        </p>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </div>
            </Link>
          );
        })}
      </div>

      <nav aria-label='Page navigation example'>
        <MDBPagination className='mb-0'>
          <MDBPaginationItem disabled={currentPage === 1}>
            <MDBPaginationLink onClick={() => handleClick(1)} tabIndex="-1">«</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem disabled={currentPage === 1}>
            <MDBPaginationLink onClick={() => handleClick(currentPage - 1)}>‹</MDBPaginationLink>
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
            <MDBPaginationLink onClick={() => handleClick(currentPage + 1)}>›</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem disabled={currentPage === totalPages}>
            <MDBPaginationLink onClick={() => handleClick(totalPages)}>»</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      </nav>
    </div>
  );
};

export default Parras;
