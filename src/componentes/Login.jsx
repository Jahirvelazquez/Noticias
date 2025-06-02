import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  // Redirigir a la página de administrador si el usuario ya está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/administrador");
      }
    });
    return unsubscribe;
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Inicio de sesión exitoso ✅');
      navigate('/administrador');
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <MDBContainer fluid className='mt-5'>
      <section className='text-center text-lg-start'>
        <div className='container py-4'>
          <MDBRow className='g-0 align-items-center'>
            <MDBCol lg='6' className='mb-5 mb-lg-0'>
              <div
                className='card cascading-right'
                style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}
              >
                <div className='card-body p-5 shadow-5 text-center'>
                  <h2 className='fw-bold mb-5'>Login</h2>
                  <form onSubmit={handleSubmit}>
                    <MDBInput
                      className='mb-4'
                      type='email'
                      label='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <MDBInput
                      className='mb-4'
                      type='password'
                      label='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <MDBBtn type='submit' block className='mb-4'>
                      Login
                    </MDBBtn>
                  </form>
                </div>
              </div>
            </MDBCol>

            <MDBCol lg='6' className='mb-5 mb-lg-0'>
              <img
                src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg'
                className='w-100 rounded-4 shadow-4'
                alt='Login visual'
              />
            </MDBCol>
          </MDBRow>
        </div>
      </section>
    </MDBContainer>
  );
};

export default Login;
