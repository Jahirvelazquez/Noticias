import React from "react";
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
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const NewsDashboard = () => {
  return (
    <MDBContainer className="my-5">
      {/* Main featured section */}
      <MDBRow className="mb-5">
        <MDBCol md="12">
          <MDBCard className="text-center">
            <MDBCardImage
              src="https://via.placeholder.com/1200x400"
              alt="Featured news"
              position="top"
            />
            <MDBCardBody>
              <MDBBadge color="danger" pill className="mb-2">
                Featured
              </MDBBadge>
              <MDBCardTitle>Facilis consequatur eligendi</MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
                consequatur eligendi fugiat laborum eos. Quia doloribus officia
                quod adipisci.
              </MDBCardText>
              <MDBBtn color="primary">Read more</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {/* News section */}
      <MDBRow>
        {/* Column 1 */}
        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardImage
              src="https://via.placeholder.com/350x200"
              alt="News"
              position="top"
            />
            <MDBCardBody>
              <MDBBadge color="info" pill className="mb-2">
                Travel
              </MDBBadge>
              <MDBCardTitle>This is title of the news</MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
                blanditiis.
              </MDBCardText>
              <p className="text-muted">15/07/2020</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Column 2 */}
        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardImage
              src="https://via.placeholder.com/350x200"
              alt="News"
              position="top"
            />
            <MDBCardBody>
              <MDBBadge color="secondary" pill className="mb-2">
                Business
              </MDBBadge>
              <MDBCardTitle>This is title of the news</MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
                blanditiis.
              </MDBCardText>
              <p className="text-muted">15/07/2020</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* Column 3 */}
        <MDBCol md="4">
          <MDBCard className="mb-4">
            <MDBCardImage
              src="https://via.placeholder.com/350x200"
              alt="News"
              position="top"
            />
            <MDBCardBody>
              <MDBBadge color="warning" pill className="mb-2">
                Technology
              </MDBBadge>
              <MDBCardTitle>This is title of the news</MDBCardTitle>
              <MDBCardText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
                blanditiis.
              </MDBCardText>
              <p className="text-muted">15/07/2020</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {/* Recent news section */}
      <MDBRow>
        <MDBCol md="12">
          <h5 className="mb-4">Recent News</h5>
          <MDBRow>
            {[...Array(6)].map((_, index) => (
              <MDBCol md="4" key={index} className="mb-4">
                <MDBCard className="d-flex flex-row align-items-center">
                  <MDBCardImage
                    src="https://via.placeholder.com/100x100"
                    alt="Thumbnail"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <MDBCardBody>
                    <MDBCardText>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</MDBCardText>
                    <p className="text-muted mb-0">14/07/2020</p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBCol>
      </MDBRow>

      {/* Footer section */}
      <MDBRow className="mt-5">
        <MDBCol md="12" className="text-center">
          <p className="text-muted">&copy; 2024 News Platform. All rights reserved.</p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NewsDashboard;
