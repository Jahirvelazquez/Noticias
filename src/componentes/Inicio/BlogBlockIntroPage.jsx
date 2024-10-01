import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBContainer
} from 'mdb-react-ui-kit';

const BlogBlockIntroPage = () => {
  const blogs = [
    {
      imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg',
      title: 'Blog Post 1',
      text: 'This is a short description of the blog post. It provides an introduction to the content.',
    },
    {
      imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(16).jpg',
      title: 'Blog Post 2',
      text: 'This is a short description of the blog post. It provides an introduction to the content.',
    },
    {
      imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
      title: 'Blog Post 3',
      text: 'This is a short description of the blog post. It provides an introduction to the content.',
    },
  ];

  return (
    <MDBContainer className="py-5">
      <h1 className="text-center mb-4">Our Blog</h1>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {blogs.map((blog, index) => (
          <MDBCol key={index}>
            <MDBCard className="h-100">
              <MDBCardImage
                src={blog.imageUrl}
                alt="Blog image"
                position="top"
              />
              <MDBCardBody>
                <MDBCardTitle>{blog.title}</MDBCardTitle>
                <MDBCardText>{blog.text}</MDBCardText>
                <MDBBtn href="#">Read More</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default BlogBlockIntroPage;
