import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCard,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';

const CategoryGrid = () => {
  const categories = [
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
      title: 'TECHNOLOGY'
    },
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(47).jpg',
      title: 'POSTER'
    },
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(57).jpg',
      title: 'PRODUCTIVITY'
    },
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(67).jpg',
      title: 'PHOTOGRAPHY'
    }
  ];

  return (
    <MDBContainer className='mt-4'>
      <MDBTypography tag="h4" className="mb-4 text-center" style={{ fontWeight: 'bold' }}>
        Read by the category
      </MDBTypography>
      <MDBRow>
        {categories.map((category, index) => (
          <MDBCol key={index} md="3" className="mb-4">
            <MDBCard className="text-white">
              <MDBCardImage
                src={category.img}
                position="top"
                alt={category.title}
                style={{
                  height: '200px', // Altura fija para las imágenes
                  objectFit: 'cover' // Ajustar la imagen para que cubra todo el espacio
                }}
              />
              <MDBCardBody className="d-flex justify-content-center align-items-center p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <MDBTypography tag="h6" className="text-uppercase text-center" style={{ fontWeight: 'bold' }}>
                  {category.title}
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default CategoryGrid;
