import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from 'mdb-react-ui-kit';

const categories = [
  { name: 'Relevantes', icon: 'star', color: 'warning', link: 'Relevantes' },
  { name: 'NOTICIAS', icon: 'newspaper', color: 'primary', link: 'Noticias' },
  { name: 'COAHUILA', icon: 'map-marker-alt', color: 'success', link: 'Coahuila' },
  { name: 'LA LAGUNA', icon: 'water', color: 'info', link: 'Laguna' },
  { name: 'NACIONAL', icon: 'flag', color: 'danger', link: 'Nacional' },
  { name: 'San Pedro', icon: 'city', color: 'warning', link: 'Sanpedro' },
  { name: 'Parras', icon: 'leaf', color: 'secondary', link: 'Parras' },
  { name: 'Fco.I.Madero', icon: 'landmark', color: 'dark', link: 'FcoIMadero' },
  { name: 'Matamoros', icon: 'road', color: 'primary', link: 'Matamoros' },
];

export default function NewsCategories() {
  return (
    <MDBContainer className='my-5'>
      <MDBRow className='g-4'>
        {categories.map((cat, index) => (
          <MDBCol md='4' sm='6' xs='12' key={index}>
            <a
              href={cat.link}
              style={{ textDecoration: 'none' }}
            >
              <MDBCard
                className='h-100 shadow-3-strong'
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <MDBCardBody className='text-center'>
                  <MDBIcon
                    fas
                    icon={cat.icon}
                    size='3x'
                    className={`text-${cat.color} mb-3`}
                  />
                  <h5 className='fw-bold text-dark'>{cat.name}</h5>
                </MDBCardBody>
              </MDBCard>
            </a>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}
