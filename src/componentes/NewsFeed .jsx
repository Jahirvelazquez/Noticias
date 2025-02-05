import React, { useEffect, useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import './NewsFeed.css';
import './Imagenes.css';
import { FaShareAlt } from 'react-icons/fa'; // Import the share icon from react-icons

const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        const newsRef = ref(database, 'news/');
        onValue(newsRef, (snapshot) => {
            const data = snapshot.val();
            const newsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
            newsArray.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
            setNews(newsArray);
            setLoading(false); // Set loading to false once data is fetched
        });
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        ); // Show loading indicator
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

    const truncateContent = (content, maxWords) => {
        const words = content.split(' ');
        if (words.length > maxWords) {
            return {
                text: words.slice(0, maxWords).join(' ') + '...',
                isTruncated: true
            };
        }
        return {
            text: content,
            isTruncated: false
        };
    };

    const handleShowMore = (index) => {
        setExpandedIndex(prevIndex => prevIndex === index ? null : index);
    };

    const handleShare = (newsItem) => {
        const shareUrl = `${window.location.origin}/news/${newsItem.id}`;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

        if (navigator.share) {
            navigator.share({
                title: newsItem.title,
                text: newsItem.content,
                url: shareUrl,
            }).then(() => {
                console.log('Shared successfully');
            }).catch((error) => {
                console.log('Error sharing', error);
            });
        } else {
            window.open(facebookShareUrl, '_blank');
        }
    };

    return (
        <div className="feed">
            {news.map((item, index) => {
                const allFiles = [
                    ...(item.fileUrls || []),
                    ...(item.videoUrls || []).map(url => getEmbedUrl(url))
                ];

                const { text: truncatedContent, isTruncated } = truncateContent(item.content, 80);
                const isExpanded = expandedIndex === index;

                return (
                    <div key={index} className="news-item">
                        <h2 className="title">{item.title}</h2>
                        <p className="content">
                            {isExpanded ? item.content : truncatedContent}
                            {isTruncated && (
                                <span
                                    className="show-more"
                                    onClick={() => handleShowMore(index)}
                                >
                                    {isExpanded ? 'Ver menos...' : 'Ver más...'}
                                </span>
                            )}
                        </p>
                        <div className={`media-container media-container-${Math.min(allFiles.length, 4)}`}>
                            {allFiles.slice(0, 4).map((fileUrl, idx) => (
                                fileUrl.includes('youtube.com') || fileUrl.includes('facebook.com') || fileUrl.includes('drive.google.com') ? (
                                    <iframe
                                        key={idx}
                                        src={fileUrl}
                                        title={`Media Video ${idx}`}
                                        className={`iframe ${allFiles.length === 1 ? 'single-video' : ''}`}
                                        allowFullScreen
                                    />
                                ) : (
                                    <img
                                        key={idx}
                                        src={fileUrl}
                                        alt="News"
                                        className={`media ${allFiles.length === 3 ? (idx === 0 ? 'media-first' : (idx === 1 ? 'media-second' : 'media-third')) : ''}`}
                                    />
                                )
                            ))}
                            {allFiles.length > 4 && (
                                <div className="more-images">
                                    +{allFiles.length - 4} más
                                </div>
                            )}
                        </div>

                        <p className="date">{item.dateTime ? new Date(item.dateTime).toLocaleString() : 'Fecha no disponible'}</p>
                        <p className="category">{item.category}</p>
                        <button className="share-button" onClick={() => handleShare(item)}>
                            <FaShareAlt />
                            Compartir
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default NewsFeed;
