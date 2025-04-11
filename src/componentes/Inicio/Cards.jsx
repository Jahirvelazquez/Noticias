import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBBadge,
} from "mdb-react-ui-kit";

const Cards = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const newsRef = ref(db, "news");

    onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let newsArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        newsArray = newsArray.sort(() => 0.5 - Math.random()).slice(0, 3);
        setNews(newsArray);
      }
    });
  }, []);

  const truncateText = (text, limit = 20) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  return (
    <MDBContainer className="my-5">
      <MDBRow className="justify-content-center">
        {news.map((item) => (
          <MDBCol md="4" key={item.id} className="d-flex justify-content-center mb-4">

            <MDBCard
              className="shadow-2"
              style={{ width: "22rem", borderRadius: "15px", cursor: "pointer" }}
              onClick={() => navigate(`/news/${item.id}`)}
            >
              <MDBCardImage
                src={item.fileUrls?.[0] || "https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(16).jpg"}
                alt="News"
                position="top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
              <MDBCardBody className="text-left">
                <MDBBadge
                  color={item.category === "Travel" ? "info" : item.category === "Business" ? "secondary" : "primary"}
                  pill
                  className="mb-2"
                  style={{ fontSize: "14px", padding: "5px 10px", fontWeight: "600" }}
                >
                  {item.category || "General"}
                </MDBBadge>
                <MDBCardTitle style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {item.title}
                </MDBCardTitle>
                <MDBCardText style={{ fontSize: "14px", color: "#6c757d" }}>
                  {truncateText(item.content)}
                </MDBCardText>
                <p className="text-muted" style={{ fontSize: "13px" }}>
                  {new Date(item.dateTime).toLocaleDateString()}
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default Cards;