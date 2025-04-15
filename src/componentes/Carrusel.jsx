import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Asegúrate de importar correctamente la configuración de Firebase
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from "mdb-react-ui-kit";

const Carrusel = () => {
  const [publicidades, setPublicidades] = useState([]);

  useEffect(() => {
    const publicidadRef = ref(database, "carrusel");
    const unsubscribe = onValue(publicidadRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const array = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setPublicidades(array); // Guardamos las publicidades en el estado
      } else {
        setPublicidades([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Verifica si publicidades tiene datos antes de renderizar el carrusel
  if (publicidades.length === 0) {
    return <p>No hay publicidades disponibles</p>;
  }

  return (
    <MDBCarousel showIndicators showControls fade interval={3000} pause={false}>
      {publicidades.map((publi, index) => (
        <MDBCarouselItem key={publi.id} itemId={index + 1}>
          {publi.fileUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              className="d-block w-100"
              alt={`Publicidad ${index + 1} - Imagen ${idx + 1}`}
              style={{ height: "500px", objectFit: "cover" }}
            />
          ))}
          <MDBCarouselCaption>
            <h5>Publicidad {index + 1}</h5>
            <p>Descripción de la publicidad.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      ))}
    </MDBCarousel>
  );
};

export default Carrusel;
