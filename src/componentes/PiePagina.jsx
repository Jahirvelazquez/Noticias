import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function PiePagina() {
  const empresaURL = 'https://lasnoticiascoahuila.com/';
  const desarrolladorURL = 'https://www.facebook.com/profile.php?id=61576582937224'; // <-- cámbialo por el tuyo

  const hoverStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  };

  const handleRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <MDBFooter
  className='bg-light text-center text-lg-start text-muted'
  style={{ marginTop: '60px' }}
>

      {/* Sección de redes sociales */}
      <MDBContainer className='p-4'>

        {/* Sección Empresa y Desarrolladores */}
        <section className='mb-4'>
          <MDBRow className='align-items-center'>

            {/* Empresa */}
            <MDBCol md='6' className='mb-4 mb-md-0 text-center'>
              <h5 className='text-primary mb-3'>
                <MDBIcon icon='building' className='me-2' />
                Empresa
              </h5>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/imagenes-37984.appspot.com/o/logonoticias.jpg?alt=media&token=8cc7eddf-dbe9-4e2b-83a1-8504b977f3da"
                alt="Logo Empresa"
                style={{
                  ...hoverStyle,
                  maxWidth: '150px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                onClick={() => handleRedirect(empresaURL)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
              />
            </MDBCol>

            {/* Desarrollador */}
            <MDBCol md='6' className='text-center'>
              <h5 className='text-success mb-3'>
                <MDBIcon icon='code' className='me-2' />
                Desarrollado por:
              </h5>
              <div
                style={{
                  background: 'linear-gradient(135deg,rgb(3, 16, 49),rgb(19, 44, 100))',
                  display: 'inline-block',
                  padding: '15px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/noticias-7d250.appspot.com/o/images%2FVariante1.png?alt=media&token=15ea1209-962c-4e16-9603-984a3569b2c1"
                  alt="Logo Desarrollador"
                  style={{
                    ...hoverStyle,
                    maxWidth: '150px',
                    borderRadius: '8px'
                  }}
                  onClick={() => handleRedirect(desarrolladorURL)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                />
              </div>
            </MDBCol>

          </MDBRow>
        </section>
      </MDBContainer>

      {/* Footer inferior */}
      <div
        className='text-center p-3 text-white'
        style={{
          background: 'linear-gradient(135deg, #2549a4, #1e3a7b)',
          fontWeight: '500',
        }}
      >
        © 2025 Copyright:
        <a
          className='text-white ms-1 text-decoration-underline'
          href='https://lasnoticiascoahuila.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          lasnoticiascoahuila.com
        </a>
      </div>
    </MDBFooter>
  );
}
