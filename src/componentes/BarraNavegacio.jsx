import React from "react";

const BarraNavegacion = () => {
  return (


    <div>

      <nav className="navbar navbar-expand-lg" style={{ background: '#2549a4', padding: '10px' }}>
        <div className="container">
          {/* Botón de colapso para pantallas pequeñas - Alineado a la derecha */}
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation" style={{ position: 'absolute', right: '20px' }}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenedor para centrar el logo y el menú */}
          <div className="d-flex flex-column align-items-center mx-auto">
            {/* Logo centrado - Se coloca aquí para que esté arriba del menú */}
            <a className="navbar-brand" href="#">
              <img
                style={{ width: '170px', height: '170px' }}
                src="https://firebasestorage.googleapis.com/v0/b/imagenes-37984.appspot.com/o/logonoticias.jpg?alt=media&token=8cc7eddf-dbe9-4e2b-83a1-8504b977f3da"
                alt="Logo"
              />
            </a>

            {/* Menú colapsable */}
            <div className="collapse navbar-collapse mt-3" id="navbarContent">
              <div className="d-flex flex-column w-100 align-items-center">
                {/* Primer grupo de enlaces - Arriba */}
                <ul className="navbar-nav mb-2 text-center">
                <li class="nav-item">
                <a class="nav-link" href="/" style={{ color: '#d6d6d6' }} ><strong>INICIO</strong></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contacto" style={{ color: '#d6d6d6' }} ><strong>COAHUILA</strong></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="administrador" style={{ color: '#d6d6d6' }} ><strong>LA LAGUNA</strong></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="nacional" style={{ color: '#d6d6d6' }} ><strong>NACIONAL</strong></a>
              </li>
                </ul>

                {/* Segundo grupo de enlaces - Abajo */}
                <ul className="navbar-nav text-center">
                  <li className="nav-item">
                    <a className="nav-link text-light" href="#">San Pedro</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="#">Parras</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="#">Fco.I.Madero</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="#">Matamoros</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>


    </div>


  );
};

export default BarraNavegacion;
