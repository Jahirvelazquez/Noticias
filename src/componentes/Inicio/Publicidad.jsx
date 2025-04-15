import React, { useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBBadge,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import { database } from "../../firebaseConfig";
import { ref, get } from "firebase/database"; // Funciones para leer desde la base de datos

const Publicidad = () => {
  const [publicidad, setPublicidad] = useState([]);

  useEffect(() => {
    // Obtener las URLs de las imágenes de la publicidad desde Firebase
    const fetchPublicidad = async () => {
      const publicidadRef = ref(database, "publicidad");
      const snapshot = await get(publicidadRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const publicidadArray = Object.values(data); // Convertir el objeto a un arreglo
        setPublicidad(publicidadArray);
      } else {
        console.log("No hay publicidad disponible");
      }
    };

    fetchPublicidad();
  }, []);

  return (
    <MDBContainer className="my-5">
      <MDBRow className="mb-5">
        <MDBCol md="12">
          <MDBCard className="text-center">
            <MDBCardBody>
              {publicidad.length > 1 ? (
                // Añadir la propiedad fade para la transición de desvanecimiento
                <MDBCarousel showControls={false} interval={3000} fade>
                  {publicidad.map((item, index) => (
                    <MDBCarouselItem key={index}>
                      <MDBCardImage
                        src={item.fileUrls[0]} // Suponiendo que hay al menos una URL de imagen
                        alt="Publicidad"
                        position="top"
                        style={{ height: "450px", objectFit: "cover" }} // Estilo para que se ajuste a 800x450
                      />
                    </MDBCarouselItem>
                  ))}
                </MDBCarousel>
              ) : (
                publicidad.length === 1 && (
                  <MDBCardImage
                    src={publicidad[0].fileUrls[0]} // Mostrar la única imagen
                    alt="Publicidad"
                    position="top"
                    style={{ height: "450px", objectFit: "cover" }} // Ajuste para una sola imagen
                  />
                )
              )}
              <MDBBadge color="primary" pill className="mb-2">
                Publicidad
              </MDBBadge>
              <MDBCardTitle>Publicidad Destacada</MDBCardTitle>
              <MDBCardText>
                Las mejores ofertas de publicidad aquí.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Publicidad;
