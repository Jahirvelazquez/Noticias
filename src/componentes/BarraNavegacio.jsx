import React, { useState, useEffect } from "react";
import { FaSearch, FaHome } from 'react-icons/fa'; // Importa los iconos de búsqueda y home

const BarraNavegacion = () => {
  const [showNavbar, setShowNavbar] = useState(true); 
  const [lastScrollY, setLastScrollY] = useState(0); 
  const [searchVisible, setSearchVisible] = useState(false); 
  const [searchValue, setSearchValue] = useState(""); 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); 
      } else {
        setShowNavbar(true);  
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleBlur = () => {
    if (searchValue === "") {
      setSearchVisible(false);
    }
  };

  return (
   <div style={{ paddingTop: '280px' }}>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${showNavbar ? 'show' : 'hide'}`}
        style={{
          background: 'linear-gradient(135deg, #2549a4, #1e3a7b)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease-in-out',
          transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
          borderBottom: '4px solid #1c2a6b',
        }}
      >
        <div className="container">
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ position: 'absolute', right: '20px' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenedor para centrar el logo y el menú */}
          <div className="d-flex flex-column align-items-center mx-auto">
            {/* Logo visible siempre */}
            <a className="navbar-brand" href="#">
              <img
                style={{
                  width: '170px',
                  height: '170px',
                }}
                src="https://firebasestorage.googleapis.com/v0/b/imagenes-37984.appspot.com/o/logonoticias.jpg?alt=media&token=8cc7eddf-dbe9-4e2b-83a1-8504b977f3da"
                alt="Logo"
              />
            </a>

            {/* Menú colapsable */}
            <div className="collapse navbar-collapse mt-0" id="navbarContent">
              <div className="d-flex flex-column w-100 align-items-center">
                <ul className="navbar-nav mb-0 text-center">
                   {/* Ícono de Home visible */}
                  <li>
                  <a href="/" className="text-light" style={{ fontSize: '24px', marginRight: '0px' }}>
                   <FaHome />
                  </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="Coahuila"><strong>COAHUILA</strong></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="Laguna"><strong>LA LAGUNA</strong></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="Nacional"><strong>NACIONAL</strong></a>
                  </li>
                </ul>

                <ul className="navbar-nav text-center">
                  <li className="nav-item">
                    <a className="nav-link text-light" href="San pedro">San Pedro</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="Parras">Parras</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="Fco.I.Madero">Fco.I.Madero</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="Matamoros">Matamoros</a>
                  </li>
                </ul>
              </div>

              {/* Contenedor para el icono y el campo de búsqueda */}
              <div
                className="d-none d-lg-block"
                style={{
                  position: 'absolute',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {searchVisible ? (
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Busque sus noticias"
                    aria-label="Search"
                    style={{
                      borderRadius: '20px',
                      padding: '5px 10px',
                      fontSize: '14px',
                      width: '250px',
                    }}
                    value={searchValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    autoFocus
                  />
                ) : (
                  <FaSearch
                    onClick={toggleSearch}
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '20px',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BarraNavegacion;
