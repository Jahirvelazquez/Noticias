import React, { useState } from 'react';
import { database, storage } from '../firebaseConfig';
import { ref, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const Administrador = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [videoUrls, setVideoUrls] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadVideo, setUploadVideo] = useState(false);

    const handleAddVideoUrl = () => {
        setVideoUrls([...videoUrls, '']);
    };

    const handleVideoUrlChange = (index, value) => {
        const newVideoUrls = [...videoUrls];
        newVideoUrls[index] = value;
        setVideoUrls(newVideoUrls);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const newsId = Date.now().toString();
        const dateTime = new Date().toISOString();  // Guardar la fecha en formato ISO
        let fileUrls = [];

        for (let file of files) {
            const fileRef = storageRef(storage, `news_files/${newsId}_${file.name}`);
            await uploadBytes(fileRef, file);
            const fileUrl = await getDownloadURL(fileRef);
            fileUrls.push(fileUrl);
        }

        await set(ref(database, 'news/' + newsId), {
            title,
            content,
            videoUrls,
            dateTime,
            category,
            fileUrls
        });

        alert('Noticia subida con éxito!');
        setTitle('');
        setContent('');
        setCategory('');
        setVideoUrls([]);
        setFiles([]);
        setUploadVideo(false);
    };

    return (
        <form onSubmit={handleUpload} style={formStyle}>
            <input
                type="text"
                placeholder="Título"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={inputStyle}
            />
            <textarea
                placeholder="Contenido"
                value={content || ''}
                onChange={(e) => setContent(e.target.value)}
                required
                style={textareaStyle}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={inputStyle}
            >
                <option value="">Selecciona una categoría</option>
                <option value="COAHUILA">COAHUILA</option>
                <option value="La Laguna">LA LAGUNA</option>
                <option value="NACIONAL">NACIONAL</option>
                <option value="San Pedro">San Pedro</option>
                <option value="Parras">Parras</option>
                <option value="Fco.l.Madero">Fco.l.Madero"</option>
                <option value="Matamoros">Matamoros</option>
            </select>
            <div style={inputStyle}>
                <label>
                    <input
                        type="radio"
                        name="videoOption"
                        checked={!uploadVideo}
                        onChange={() => setUploadVideo(false)}
                    />{' '}
                    Enlace de video
                </label>
                <label>
                    <input
                        type="radio"
                        name="videoOption"
                        checked={uploadVideo}
                        onChange={() => setUploadVideo(true)}
                    />{' '}
                    Subir video
                </label>
            </div>
            {!uploadVideo ? (
                <>
                    {videoUrls.map((url, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                                type="url"
                                placeholder="Enlace de video"
                                value={url}
                                onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddVideoUrl} style={buttonStyle}>
                        Agregar otro enlace
                    </button>
                </>
            ) : (
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                    style={inputStyle}
                />
            )}
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Subir Noticia</button>
        </form>
    );
};


const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
};

const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px'
};

const textareaStyle = {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    height: '100px'
};

const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

export default Administrador;
