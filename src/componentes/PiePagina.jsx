import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function piePagina() {
  return (
    <MDBFooter className='bg-light text-white text-center text-lg-start'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4 text-center'>
          <MDBBtn floating className='m-1' style={{ backgroundColor: '#3b5998' }} href='#!'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          <MDBBtn floating className='m-1' style={{ backgroundColor: '#55acee' }} href='#!'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>
          <MDBBtn floating className='m-1' style={{ backgroundColor: '#dd4b39' }} href='#!'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn floating className='m-1' style={{ backgroundColor: '#ac2bac' }} href='#!'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>
          <MDBBtn floating className='m-1' style={{ backgroundColor: '#0082ca' }} href='#!'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>
          <MDBBtn floating className='m-1' style={{ backgroundColor: '#333333' }} href='#!'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>

        
      </MDBContainer>

      <div
        className='text-center p-3'
        style={{
          background: 'linear-gradient(135deg, #2549a4, #1e3a7b)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {/* Sección estilizada para empresa y desarrolladores */}
        <section className='my-4 p-3 rounded' style={{
    background: 'linear-gradient(135deg, #2549a4, #1e3a7b)',
    color: 'white',
    borderRadius: '0.5rem',
  }}>
          <MDBRow className='text-center'>
            <MDBCol md='6' className='mb-3'>
              <h6>
                <MDBIcon icon='building' className='me-2 text-danger' />
                Empresa
              </h6>
              <p href='https://lasnoticiascoahuila.com/' className='mb-0 fw-bold'>
              Las Noticias Coahuila</p>

            </MDBCol>

            <MDBCol md='6' className='mb-3'>
              <h6>
                <MDBIcon icon='code' className='me-2 text-success' />
                Desarrolladores
              </h6>
              <p className='mb-0 fw-bold'>Ing. Velázquez y Hernandez</p>
            </MDBCol>
          </MDBRow>
        </section>
        © 2025 Copyright:
        <a className='text-white ms-1' href='https://lasnoticiascoahuila.com/'>
          lasnoticiascoahuila.com
        </a>
      </div>
    </MDBFooter>
  );
}
