import React, { useState, useEffect } from "react";
import { FaSearch, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Importar Link de react-router-dom
import './navbar.css';

const BarraNavegacion = () => {
  const [searchVisible, setSearchVisible] = useState(false); 
  const [searchValue, setSearchValue] = useState(""); 
  const navigate = useNavigate(); 

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      setSearchValue(""); // Limpiar el campo de búsqueda al abrir
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleBlur = () => {
    if (searchValue === "") {
      setSearchVisible(false);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (searchValue.trim()) { // Solo buscar si hay texto
      navigate(`/resultados?query=${encodeURIComponent(searchValue)}`); // Redirigir a la página de resultados
    }
    setSearchValue(""); // Limpiar el campo de búsqueda
    setSearchVisible(false); // Ocultar el campo de búsqueda
  };

  return (
   <div>
      <nav
        className={`navbar navbar-expand-lg`}
        style={{
          background: 'linear-gradient(135deg, #2549a4, #1e3a7b)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease-in-out',
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

          <div className="d-flex flex-column align-items-center mx-auto">
            <Link to="/" className="navbar-brand">
              <img
                style={{
                  width: '170px',
                  height: '170px',
                }}
                src="https://firebasestorage.googleapis.com/v0/b/imagenes-37984.appspot.com/o/logonoticias.jpg?alt=media&token=8cc7eddf-dbe9-4e2b-83a1-8504b977f3da"
                alt="Logo"
              />
            </Link>

            <div className="collapse navbar-collapse mt-0" id="navbarContent">
              <div className="d-flex flex-column w-100 align-items-center">
                <ul className="navbar-nav mb-0 text-center">
                  <li>
                    <Link to="/" className="text-light" style={{ fontSize: '24px', marginRight: '0px' }}>
                      <FaHome />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Noticias" className="nav-link text-light"><strong>NOTICIAS</strong></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Coahuila" className="nav-link text-light"><strong>COAHUILA</strong></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Laguna" className="nav-link text-light"><strong>LA LAGUNA</strong></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Nacional" className="nav-link text-light"><strong>NACIONAL</strong></Link>
                  </li>
                </ul>

                <ul className="navbar-nav text-center">
                  <li className="nav-item">
                    <Link to="/San pedro" className="nav-link text-light">San Pedro</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Parras" className="nav-link text-light">Parras</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/FcoIMadero" className="nav-link text-light">Fco.I.Madero</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Matamoros" className="nav-link text-light">Matamoros</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Contacto" className="nav-link text-light">Contacto</Link>
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
                  <form onSubmit={handleSearchSubmit}>
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
                      onFocus={() => setSearchVisible(true)}
                      autoFocus
                    />
                  </form>
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
