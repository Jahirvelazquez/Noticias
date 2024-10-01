import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTypography
} from 'mdb-react-ui-kit';

const BlogBanner = () => {
  return (
    <div
      className="p-5 text-center bg-image"
      style={{
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.jpg')",
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}
    >
      <MDBContainer className="h-100 d-flex justify-content-center align-items-center">
        <MDBRow>
          <MDBCol>
            <MDBTypography tag="h1" className="mb-3 display-3">
              Welcome to Our Blog
            </MDBTypography>
            <p className="mb-4">
              Stay updated with the latest news, articles, and insights from experts. Explore our curated blog posts.
            </p>
            <MDBBtn color="light" size="lg" href="#blog-posts">
              Explore Blog
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default BlogBanner;
