import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import './NewsDetail.css';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        const newsRef = ref(database, `news/${id}`);
        onValue(newsRef, (snapshot) => {
            const data = snapshot.val();
            setNewsItem(data);
        });
    }, [id]);

    if (!newsItem) {
        return <div>Loading...</div>;
    }

    const getEmbedUrl = (link) => {
        if (link.includes('youtube.com') || link.includes('youtu.be')) {
            const videoId = link.includes('youtu.be') ? link.split('/').pop() : link.split('v=')[1].split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (link.includes('facebook.com')) {
            return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(link)}`;
        } else if (link.includes('drive.google.com')) {
            const fileId = link.split('/d/')[1].split('/')[0];
            return `https://drive.google.com/file/d/${fileId}/preview`;
        } else if (link.includes('firebasestorage.googleapis.com')) {
            return link;
        }
        return null;
    };

    return (
        <div className="news-detail">
            <h1>{newsItem.title}</h1>
            <p>{newsItem.content}</p>
            <div className="media-container">
                {(newsItem.fileUrls || []).map((fileUrl, index) => (
                    <img key={index} src={fileUrl} alt="News" className="media" />
                ))}
                {(newsItem.videoUrls || []).map((videoUrl, index) => (
                    <iframe
                        key={index}
                        src={getEmbedUrl(videoUrl)}
                        title={`External Video ${index}`}
                        className="iframe"
                        allowFullScreen
                    />
                ))}
            </div>
            <p className="date">{newsItem.dateTime ? new Date(newsItem.dateTime).toLocaleString() : 'Fecha no disponible'}</p>
            <p className="category">{newsItem.category}</p>
        </div>
    );
};

export default NewsDetail;
