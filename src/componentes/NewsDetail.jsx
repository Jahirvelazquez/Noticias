import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database, db  } from '../firebaseConfig';
import { ref, onValue, update } from 'firebase/database';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBTypography,
    MDBIcon,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';

const NewsDetail = ({ currentCategory, currentNewsId }) => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
    const navigate = useNavigate();
    const [relatedNews, setRelatedNews] = useState([]);

    useEffect(() => {
        if (!id) return;

        // Obtener detalles de la noticia actual
        const newsRef = ref(database, `news/${id}`);
        onValue(newsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setNewsItem(data);
            }
        });

        // Obtener todas las noticias para buscar relacionadas
        const newsListRef = ref(database, "news");
        onValue(newsListRef, (snapshot) => {
            if (snapshot.exists()) {
                const newsArray = Object.entries(snapshot.val()).map(([newsId, news]) => ({
                    id: newsId,
                    ...news,
                }));

                // Filtrar noticias relacionadas por categoría y excluir la actual
                if (newsItem?.category) {
                    const filteredNews = newsArray.filter(
                        (news) =>
                            news.category.toLowerCase() === newsItem.category.toLowerCase() &&
                            news.id !== id
                    );
                    setRelatedNews(filteredNews.slice(0, 3)); // Mostrar solo 3 noticias relacionadas
                }
            }
        });
    }, [id, newsItem?.category]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment({ ...newComment, [name]: value });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.name && newComment.email && newComment.content) {
            const updatedComments = [...comments, newComment];
            const newsRef = ref(database, `news/${id}`);
            await update(newsRef, { comentarios: updatedComments });
            setComments(updatedComments);
            setNewComment({ name: '', email: '', content: '' });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    const getEmbedUrl = (link) => {
        if (link.includes('youtube.com') || link.includes('youtu.be')) {
            const videoId = link.includes('youtu.be') ? link.split('/').pop() : link.split('v=')[1].split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (link.includes('facebook.com')) {
            return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(link)}`;
        } else if (link.includes('drive.google.com')) {
            const fileId = link.split('/d/')[1].split('/')[0];
            return `https://drive.google.com/file/d/${fileId}/preview`;
        } else if (link.includes('firebasestorage.googleapis.com')) {
            return link;
        }
        return null;
    };

    if (!newsItem) {
        return <div>Loading...</div>;
    }

    return (
        <MDBContainer className="py-5">
            <MDBRow>
                <MDBCol md="8" className="mx-auto">
                    <MDBCard className="shadow-3">
                        {/* Imagen principal */}
                        <MDBCardImage
                            src={newsItem.fileUrls?.[0] || 'https://via.placeholder.com/800x400'}
                            position="top"
                            alt="News"
                            className="rounded-top"
                        />

                        {/* Contenido */}
                        <MDBCardBody>
                            <MDBTypography tag="h1" className="fw-bold mb-3">
                                {newsItem.title}
                            </MDBTypography>

                            <MDBCardText className="text-muted mb-4">
                                <MDBIcon far icon="calendar-alt" className="me-2" />
                                {newsItem.dateTime ? new Date(newsItem.dateTime).toLocaleString() : 'Fecha no disponible'}
                                <span className="mx-3">|</span>
                                <MDBIcon fas icon="tag" className="me-2" /> {newsItem.category}
                            </MDBCardText>

                            <MDBCardText className="mb-4" style={{ lineHeight: '1.6' }}>
                                {newsItem.content}
                            </MDBCardText>

                            {/* Medios (Imágenes y videos) */}
                            <div className="media-container">
                                {(newsItem.fileUrls || []).map((fileUrl, index) => (
                                    <img
                                        key={index}
                                        src={fileUrl}
                                        alt="News"
                                        className="img-fluid rounded shadow-sm mb-3"
                                    />
                                ))}
                                {(newsItem.videoUrls || []).map((videoUrl, index) => (
                                    <iframe
                                        key={index}
                                        src={getEmbedUrl(videoUrl)}
                                        title={`External Video ${index}`}
                                        className="w-100 rounded shadow-sm mb-3"
                                        style={{ height: '400px' }}
                                        allowFullScreen
                                    />
                                ))}
                            </div>

                            {/* Botones sociales */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div>
                                    <MDBBtn tag="a" floating color="primary" className="me-2">
                                        <MDBIcon fab icon="facebook-f" />
                                    </MDBBtn>
                                    <MDBBtn tag="a" floating color="info" className="me-2">
                                        <MDBIcon fab icon="twitter" />
                                    </MDBBtn>
                                    <MDBBtn tag="a" floating color="danger" className="me-2">
                                        <MDBIcon fab icon="instagram" />
                                    </MDBBtn>
                                    <MDBBtn tag="a" floating color="success">
                                        <MDBIcon fas icon="share-alt" />
                                    </MDBBtn>
                                </div>
                                <MDBBtn color="dark" onClick={() => navigate(-1)}>
                                    <MDBIcon fas icon="arrow-left" className="me-2" /> Regresar
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    {/* Noticias relacionadas */}
<div className="related-news mt-5">
    <MDBTypography tag="h3" className="fw-bold mb-4">
        Noticias relacionadas
    </MDBTypography>
    <MDBRow>
        {relatedNews.length > 0 ? (
            relatedNews.map((news) => (
                <MDBCol md="4" key={news.id}>
                    <MDBCard className="shadow-sm">
                        <MDBCardImage
                            src={news.fileUrls?.[0] || "https://via.placeholder.com/300x200"}
                            alt={news.title}
                            className="rounded-top"
                            style={{
                                width: '100%',  // Asegura que la imagen ocupe el 100% del espacio disponible en el contenedor
                                height: '200px', // Fija una altura fija para todas las imágenes
                                objectFit: 'cover', // Asegura que la imagen mantenga su proporción sin distorsión, cubriendo el área asignada
                            }}
                        />
                        <MDBCardBody>
                            <MDBTypography tag="h5" className="fw-bold">
                                {news.title}
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                                {news.content.slice(0, 100)}...
                            </MDBCardText>
                            <MDBBtn size="sm" onClick={() => navigate(`/news/${news.id}`)}>
                                Leer más
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            ))
        ) : (
            <p>No hay noticias relacionadas disponibles.</p>
        )}
    </MDBRow>
</div>


                    {/* Sección de comentarios */}
                    <hr />
                    <h4>Deja tu comentario</h4>
                    <form onSubmit={handleCommentSubmit}>
                        <MDBRow className="mb-3">
                            <MDBCol md="6">
                                <MDBInput
                                    label="Nombre"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={newComment.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBInput
                                    label="Correo electrónico"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={newComment.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBInput
                            label="Comentario"
                            id="content"
                            name="content"
                            type="textarea"
                            rows="3"
                            value={newComment.content}
                            onChange={handleInputChange}
                            required
                        />
                        <MDBBtn type="submit" color="primary" className="mt-3">
                            Enviar comentario <MDBIcon fas icon="paper-plane" />
                        </MDBBtn>
                    </form>

                    {/* Mostrar comentarios */}
                    <hr />
                    <h4>Comentarios</h4>
                    {comments.length > 0 ? (
                        <ul className="list-group mb-4">
                            {comments.map((comment, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>{comment.name}:</strong> {comment.content}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                    )}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default NewsDetail;
