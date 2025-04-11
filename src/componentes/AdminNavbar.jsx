import React from "react";
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit";

const AdminNavbar = () => {
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand>Admin Panel</MDBNavbarBrand>
        <MDBNavbarNav>
          <MDBNavbarItem>
            <MDBNavbarLink href="/administrador">Gestionar Noticias</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/admin/publicidad">Publicidad</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/admin/carrusel">Carrusel</MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default AdminNavbar;
