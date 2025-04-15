import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
} from 'mdb-react-ui-kit';

const categories = [
  { name: 'Nacional', icon: 'flag-usa', color: 'primary' },
  { name: 'Internacional', icon: 'globe', color: 'success' },
  { name: 'Política', icon: 'balance-scale', color: 'danger' },
  { name: 'Deportes', icon: 'futbol', color: 'warning' },
  { name: 'Tecnología', icon: 'microchip', color: 'info' },
  { name: 'Entretenimiento', icon: 'film', color: 'secondary' },
];

export default function NewsCategories() {
  return (
    <MDBContainer className='my-5'>
     

      <MDBRow className='g-4'>
        {categories.map((cat, index) => (
          <MDBCol md='4' sm='6' xs='12' key={index}>
            <MDBCard className='h-100 shadow-3-strong hover-shadow'>
              <MDBCardBody className='text-center'>
                <MDBIcon
                  icon={cat.icon}
                  size='3x'
                  className={`text-${cat.color} mb-3`}
                />
                <h5 className='fw-bold'>{cat.name}</h5>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}
