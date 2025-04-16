import React, { useState } from 'react';
import { database, storage } from '../firebaseConfig';
import { ref, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const SubirNoticia = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadVideo, setUploadVideo] = useState(false);

    const categoriasDisponibles = [
        'COAHUILA', 'La Laguna', 'NACIONAL', 'San Pedro',
        'Parras', 'Fco.l.Madero', 'Matamoros', 'Especiales',
    ];

    const handleCategoryToggle = (cat) => {
        setCategory(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const handleAddVideoUrl = () => {
        setVideoUrls([...videoUrls, '']);
    };

    const handleVideoUrlChange = (index, value) => {
        const newUrls = [...videoUrls];
        newUrls[index] = value;
        setVideoUrls(newUrls);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const newsId = Date.now().toString();
        const dateTime = new Date().toISOString();
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
        setCategory([]);
        setVideoUrls([]);
        setFiles([]);
        setUploadVideo(false);
    };

    return (
        <form onSubmit={handleUpload} style={styles.form}>
            <h2 style={styles.title}>Subir Nueva Noticia</h2>

            <div style={styles.section}>
                <label style={styles.label}>Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                    required
                />
            </div>

            <div style={styles.section}>
                <label style={styles.label}>Contenido</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={styles.textarea}
                    required
                />
            </div>

            <div style={styles.section}>
                <label style={styles.label}>Categorías</label>
                <div style={styles.checkboxGroup}>
                    {categoriasDisponibles.map((cat) => (
                        <label key={cat} style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={category.includes(cat)}
                                onChange={() => handleCategoryToggle(cat)}
                            />
                            <span style={{ marginLeft: 6 }}>{cat}</span>
                        </label>
                    ))}
                </div>
                {category.length > 0 && (
                    <div style={styles.tagContainer}>
                        {category.map((cat) => (
                            <div key={cat} style={styles.tag}>{cat}</div>
                        ))}
                    </div>
                )}
            </div>

            <div style={styles.section}>
                <label style={styles.label}>Tipo de Video</label>
                <div style={styles.radioGroup}>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            checked={!uploadVideo}
                            onChange={() => setUploadVideo(false)}
                        /> Enlace
                    </label>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            checked={uploadVideo}
                            onChange={() => setUploadVideo(true)}
                        /> Subir archivo
                    </label>
                </div>

                {!uploadVideo ? (
                    <>
                        {videoUrls.map((url, index) => (
                            <input
                                key={index}
                                type="url"
                                placeholder="https://youtube.com/..."
                                value={url}
                                onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                                style={styles.input}
                            />
                        ))}
                        <button type="button" onClick={handleAddVideoUrl} style={styles.secondaryButton}>
                            + Agregar otro enlace
                        </button>
                    </>
                ) : (
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFiles(Array.from(e.target.files))}
                        style={styles.input}
                    />
                )}
            </div>

            <div style={styles.section}>
                <label style={styles.label}>Imágenes</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                    style={styles.input}
                />
            </div>

            <button type="submit" style={styles.button}>📤 Subir Noticia</button>
        </form>
    );
};

const styles = {
    form: {
        maxWidth: 700,
        margin: '40px auto',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333'
    },
    section: {
        marginBottom: 20
    },
    label: {
        display: 'block',
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        fontSize: 16,
        border: '1px solid #ccc',
        borderRadius: 6
    },
    textarea: {
        width: '100%',
        minHeight: 120,
        padding: '10px 12px',
        fontSize: 16,
        border: '1px solid #ccc',
        borderRadius: 6,
        resize: 'vertical'
    },
    checkboxGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14
    },
    tagContainer: {
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
    },
    tag: {
        backgroundColor: '#e7f1ff',
        color: '#0056b3',
        padding: '6px 12px',
        borderRadius: 20,
        fontSize: 13,
        fontWeight: '500'
    },
    radioGroup: {
        display: 'flex',
        gap: 20,
        marginTop: 8
    },
    radioLabel: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 15
    },
    button: {
        width: '100%',
        padding: '12px 16px',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    secondaryButton: {
        marginTop: 10,
        padding: '8px 12px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 14
    }
};

export default SubirNoticia;
