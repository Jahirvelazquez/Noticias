import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

// Función para obtener la miniatura del video de YouTube
const getYouTubeThumbnail = (url) => {
  const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]+)/);
  return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : null;
};

const NewsDashboard = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate(); // 🔹 Para manejar la navegación

  useEffect(() => {
    const db = getDatabase();
    const newsRef = ref(db, "news");

    onValue(newsRef, (snapshot) => {
      if (snapshot.exists()) {
        const newsData = Object.entries(snapshot.val()).map(([id, data]) => ({
          id, // 🔹 Agregar el ID para redirigir correctamente
          ...data,
        }));

        const sortedNews = newsData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setNews(sortedNews.slice(0, 6));
      }
    });
  }, []);

  return (
    <MDBContainer className="my-5">
      <MDBRow>
        <MDBCol md="12">
          <h5 className="mb-4">Noticias Recientes</h5>
          <MDBRow>
            {news.map((item, index) => {
              // Verifica si la noticia tiene video y extrae la miniatura del video
              const videoUrl = item.videoUrls?.[0]; // Suponiendo que solo haya un video
              const thumbnail = videoUrl ? getYouTubeThumbnail(videoUrl) : null;

              return (
                <MDBCol md="4" key={index} className="mb-4">
                  <MDBCard
                    className="d-flex flex-row align-items-center"
                    style={{ height: "120px", cursor: "pointer" }} // 🔹 Cursor pointer
                    onClick={() => navigate(`/news/${item.id}`)} // 🔹 Redirigir
                  >
                    <MDBCardImage
                      // Si tiene video, muestra la miniatura del video, si no, muestra la imagen de la noticia
                      src={thumbnail || item.fileUrls?.[0] || "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(16).jpg"}
                      alt="Thumbnail"
                      style={{ width: "100px", height: "100px", objectFit: "cover", marginLeft: "10px" }}
                    />
                    <MDBCardBody className="d-flex flex-column justify-content-between" style={{ flex: 1 }}>
                      <MDBCardText style={{ marginBottom: "5px", fontSize: "14px", lineHeight: "1.2em", maxHeight: "2.4em", overflow: "hidden" }}>
                        {item.title.length > 50 ? item.title.substring(0, 50) + "..." : item.title}
                      </MDBCardText>
                      <MDBCardText style={{ marginBottom: "5px", fontSize: "14px", lineHeight: "1.2em", maxHeight: "2.4em", overflow: "hidden" }}>
                        {item.content.length > 1 ? item.content.substring(0, 50) + "..." : item.content}
                      </MDBCardText>
                      <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                        {new Date(item.dateTime).toLocaleDateString()}
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              );
            })}
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NewsDashboard;
