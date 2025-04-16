import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn,
  MDBTypography, MDBInput, MDBTable, MDBTableHead, MDBTableBody,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdb-react-ui-kit";
import { FaTrash, FaFilter, FaPlus, FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { getDatabase, ref, get, remove } from "firebase/database";
import AdminNavbar from "./AdminNavbar";
import SubirNoticia from "./SubirNoticia";

Modal.setAppElement("#root");

const AdminDashboard = () => {
  const [newsData, setNewsData] = useState([]);
  const [filters, setFilters] = useState({ category: "", search: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' o 'asc'
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  useEffect(() => {
    const fetchNews = async () => {
      const db = getDatabase();
      const newsRef = ref(db, "news");

      try {
        const snapshot = await get(newsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedNewsData = Object.keys(data).map((key) => ({
            id: key,
            title: data[key].title,
            category: data[key].category,
            content: data[key].content,
            dateTime: data[key].dateTime,
            fileUrls: data[key].fileUrls || []
          }));
          setNewsData(formattedNewsData);
        } else {
          setNewsData([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const filterNews = () => {
    const filtered = newsData.filter(
      (news) =>
        news.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.category ? news.category === filters.category : true)
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };


  const filteredNews = filterNews();
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category });
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setCurrentPage(1);
  };

  const deleteNews = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
      const db = getDatabase();
      remove(ref(db, `news/${id}`))
        .then(() => {
          setNewsData(newsData.filter((news) => news.id !== id));
        })
        .catch((error) => console.error("Error al eliminar noticia:", error));
    }
  };

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handleNextPage = () => setCurrentPage(Math.min(currentPage + 1, totalPages));
  const handlePrevPage = () => setCurrentPage(Math.max(currentPage - 1, 1));

  return (
    <>
      <AdminNavbar />
      <MDBContainer className="my-5">
        <MDBRow>
          <MDBCol md="12">
            <MDBTypography tag="h3" className="fw-bold mb-4">
              Dashboard de Administrador
            </MDBTypography>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="shadow-sm mb-4">
              <MDBCardBody>
                <MDBCardTitle>
                  <div className="d-flex justify-content-between">
                    <span>Gestionar Noticias</span>
                    <MDBBtn size="sm" color="primary" onClick={() => setIsModalOpen(true)}>
                      <FaPlus /> Subir Noticia
                    </MDBBtn>
                  </div>
                </MDBCardTitle>

                <div className="d-flex justify-content-between mb-3 gap-2 flex-wrap">
                  <MDBInput label="Buscar Noticias" size="sm" onChange={handleSearchChange} />
                  <MDBDropdown>
                    <MDBDropdownToggle size="sm" color="info">
                      <FaFilter /> Filtrar por Categoría
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      {["COAHUILA", "La Laguna", "NACIONAL", "San Pedro", "Parras", "Fco.l.Madero", "Matamoros", "Especiales", ""].map((category) => (
                        <MDBDropdownItem key={category} onClick={() => handleCategoryChange(category)}>
                          {category || "Todos"}
                        </MDBDropdownItem>
                      ))}
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  <MDBBtn size="sm" color="info" onClick={toggleSortOrder}>
                    {sortOrder === "asc" ? "Más antiguas primero" : "Más recientes primero"}
                  </MDBBtn>
                </div>


                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Portada</th>
                      <th>Título</th>
                      <th>Categoría</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {currentNews.length > 0 ? (
                      currentNews.map((news) => (
                        <tr key={news.id}>
                          <td>
                            {news.fileUrls.length > 0 ? (
                              <img src={news.fileUrls[0]} alt="Portada" style={{ width: "100px", height: "60px", objectFit: "cover" }} />
                            ) : (
                              "Sin imagen"
                            )}
                          </td>
                          <td>{news.title}</td>
                          <td>{news.category}</td>
                          <td>{new Date(news.dateTime).toLocaleDateString()}</td>
                          <td>
                            <MDBBtn color="danger" size="sm" onClick={() => deleteNews(news.id)}>
                              <FaTrash /> Eliminar
                            </MDBBtn>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No hay noticias disponibles.
                        </td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-3">
                    {/* Flecha para ir a la primera página */}
                    <MDBBtn
                      size="sm"
                      color="secondary"
                      onClick={() => {
                        handleFirstPage();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <FaAngleDoubleLeft />
                    </MDBBtn>

                    {/* Flecha para ir a la página anterior */}
                    <MDBBtn
                      size="sm"
                      color="secondary"
                      onClick={() => {
                        handlePrevPage();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <FaChevronLeft />
                    </MDBBtn>

                    {/* Páginas numeradas */}
                    {[...Array(totalPages)].map((_, index) => (
                      <MDBBtn
                        key={index + 1}
                        size="sm"
                        color={currentPage === index + 1 ? "primary" : "secondary"}
                        className="mx-1"
                        onClick={() => {
                          handlePageChange(index + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {index + 1}
                      </MDBBtn>
                    ))}

                    {/* Flecha para ir a la página siguiente */}
                    <MDBBtn
                      size="sm"
                      color="secondary"
                      onClick={() => {
                        handleNextPage();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <FaChevronRight />
                    </MDBBtn>

                    {/* Flecha para ir a la última página */}
                    <MDBBtn
                      size="sm"
                      color="secondary"
                      onClick={() => {
                        handleLastPage();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <FaAngleDoubleRight />
                    </MDBBtn>
                  </div>
                )}

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            width: "80%",
            height: "80%",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          X
        </button>
        <h2>Subir Nueva Noticia</h2>
        <SubirNoticia />
      </Modal>
    </>
  );
};

export default AdminDashboard;
