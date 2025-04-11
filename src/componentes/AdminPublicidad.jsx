import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { storage, database } from "../firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  ref,
  set,
  get,
  remove,
  onValue,
} from "firebase/database";

const AdminPublicidad = () => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [publicidades, setPublicidades] = useState([]);

  useEffect(() => {
    const publicidadRef = ref(database, "publicidad");
    const unsubscribe = onValue(publicidadRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const array = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setPublicidades(array);
      } else {
        setPublicidades([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Selecciona al menos un archivo.");

    setIsUploading(true);

    const newsId = Date.now().toString();
    const publicidadUrls = [];

    for (let file of files) {
      const fileRef = storageRef(storage, `publicidad/${newsId}_${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);
      publicidadUrls.push(fileUrl);
    }

    await set(ref(database, "publicidad/" + newsId), {
      fileUrls: publicidadUrls,
      dateTime: new Date().toISOString(),
    });

    alert("Publicidad subida con éxito!");
    setFiles([]);
    setIsUploading(false);
  };

  const handleDelete = async (id, urls) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar esta publicidad?");
    if (!confirmDelete) return;

    // Eliminar archivos del storage
    for (const url of urls) {
      const path = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
      const fileRef = storageRef(storage, path);
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error("Error al eliminar del storage:", error);
      }
    }

    // Eliminar entrada de la base de datos
    await remove(ref(database, "publicidad/" + id));
    alert("Publicidad eliminada.");
  };

  return (
    <>
      <AdminNavbar />
      <h1>Subir Publicidad</h1>
      <form onSubmit={handleUpload} style={formStyle}>
        <input
          type="file"
          multiple
          accept="image/*, video/*"
          onChange={handleFileChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} disabled={isUploading}>
          {isUploading ? "Subiendo..." : "Subir Publicidad"}
        </button>
      </form>

      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Publicidad Subida</h2>
      <div style={gridStyle}>
        {publicidades.map((publi) => (
          <div key={publi.id} style={cardStyle}>
            {publi.fileUrls.map((url, idx) =>
              url.includes("video") ? (
                <video key={idx} src={url} controls style={mediaStyle} />
              ) : (
                <img key={idx} src={url} alt="Publicidad" style={mediaStyle} />
              )
            )}
            <button
              onClick={() => handleDelete(publi.id, publi.fileUrls)}
              style={deleteBtnStyle}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "300px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};

const inputStyle = {
  marginBottom: "10px",
  padding: "10px",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
  padding: "20px",
};

const cardStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const mediaStyle = {
  width: "100%",
  maxHeight: "200px",
  objectFit: "cover",
  marginBottom: "10px",
};

const deleteBtnStyle = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "8px",
  width: "100%",
  cursor: "pointer",
  borderRadius: "4px",
};

export default AdminPublicidad;
