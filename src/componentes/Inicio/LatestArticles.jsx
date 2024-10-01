import React from 'react';
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
  MDBTypography
} from 'mdb-react-ui-kit';

const LatestArticles = () => {
  const handleImageError = (e) => {
    e.target.src = 'https://mdbcdn.b-cdn.net/img/new/standard/city/placeholder.webp'; // Imagen de respaldo
  };

  try {
    return (
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="8" md="12" className="mb-4">
            <MDBCard>
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                alt="..."
                position="top"
                style={{ height: '400px', objectFit: 'cover' }}
                onError={handleImageError}
              />
              <MDBCardBody>
                <MDBTypography tag="h6" className="text-uppercase text-muted">Web Design</MDBTypography>
                <MDBCardTitle>Weekly design inspiration #345</MDBCardTitle>
                <MDBCardText>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.
                </MDBCardText>
                <MDBBtn href="#">Read more</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="4" md="12">
            <MDBRow className="mb-4">
              <MDBCard>
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                  alt="..."
                  position="top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={handleImageError}
                />
                <MDBCardBody>
                  <MDBTypography tag="h6" className="text-uppercase text-muted">Photography</MDBTypography>
                  <MDBCardTitle>A collection of aesthetic photographs</MDBCardTitle>
                  <MDBBtn href="#">Read more</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>

            <MDBRow>
              <MDBCard>
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/new/standard/city/045.webp"
                  alt="..."
                  position="top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={handleImageError}
                />
                <MDBCardBody>
                  <MDBTypography tag="h6" className="text-uppercase text-muted">Acquiring Skills</MDBTypography>
                  <MDBCardTitle>Books every designer should read</MDBCardTitle>
                  <MDBBtn href="#">Read more</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } catch (error) {
    console.error("Error loading latest articles:", error);
    return <p>Sorry, something went wrong while loading the articles.</p>;
  }
};

export default LatestArticles;
