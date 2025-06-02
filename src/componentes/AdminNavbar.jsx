import React, { useEffect, useState } from "react";
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"; // Asegúrate de importar onAuthStateChanged
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Verificar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Si hay un usuario autenticado, guardamos el estado
      } else {
        setUser(null); // Si no hay usuario, solo redirigimos si no estamos ya en la página de login
        if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/admin")) {
          navigate("/login"); // Redirige a la página de login si no está autenticado
        }
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [auth, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("Sesión cerrada correctamente ✅");
        navigate("/login"); // Redirige a la página de login después de cerrar sesión
      })
      .catch((error) => {
        console.error(error);
        alert("Error al cerrar sesión: " + error.message);
      });
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light" className="w-100">
      <MDBContainer fluid>
        <MDBNavbarBrand>Admin Panel</MDBNavbarBrand>
        <MDBNavbarNav className="ms-auto">
          <MDBNavbarItem>
            <MDBNavbarLink href="/administrador">Gestionar Noticias</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/admin/publicidad">Publicidad</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/admin/carrusel">Carrusel</MDBNavbarLink>
          </MDBNavbarItem>

          {/* Botón de Cerrar sesión */}
          <MDBNavbarItem>
            <MDBBtn
              color="link"
              onClick={handleSignOut}
              className="d-flex align-items-center"
              style={{
                fontSize: '16px',
                color: '#007bff',
                textDecoration: 'none',
                marginLeft: '15px',
                padding: '5px 10px',
              }}
            >
              <MDBIcon fas icon="sign-out-alt" className="me-2" />
              Cerrar sesión
            </MDBBtn>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default AdminNavbar;
