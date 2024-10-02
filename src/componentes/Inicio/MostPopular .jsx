import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCardImage
} from 'mdb-react-ui-kit';

const MostPopular = () => {
  const articles = [
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
      category: 'QUIZ',
      title: 'Computers for decades - will you recognize them all? QUIZ'
    },
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
      category: 'POSTER',
      title: 'How an attempt was made to interest the society in science - a poster in the 20th century'
    },
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
      category: 'DESIGN',
      title: 'New ready-to-use color palette from Pantone for spring and summer'
    },
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
      category: 'DESIGN',
      title: 'A set of high-quality 3D illustrations with some free ones for digital projects'
    },
    {
      img: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
      category: 'ACQUIRING SKILLS',
      title: 'Books every designer should read in 2022'
    }
  ];

  // Función para dividir el texto en fragmentos de 7 palabras
  const formatText = (text, wordsPerLine) => {
    const words = text.split(' ');
    const lines = [];

    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }

    return lines;
  };

  return (
    <MDBContainer>
      <MDBTypography tag="h4" className="mb-4">
        Most Popular
      </MDBTypography>
      {articles.map((article, index) => (
        <MDBRow key={index} className="mb-4 align-items-center">
          <MDBCol size="auto">
            {/* Ajusta el tamaño de las imágenes */}
            <MDBCardImage 
              src={article.img} 
              alt={article.title} 
              className="rounded" 
              style={{ width: '150px' }} // Aumenté el tamaño de la imagen
            />
          </MDBCol>
          <MDBCol>
            <MDBTypography tag="small" className="text-uppercase" style={{ fontWeight: 'bold', color: '#9E9E9E' }}>
              {article.category}
            </MDBTypography>
            <MDBTypography 
              tag="div" 
              className="mb-0" 
              style={{ 
                fontWeight: 'bold',  // Texto en negrita
                textAlign: 'justify'  // Justificar el texto
              }}
            >
              {/* Dividir el texto en fragmentos de 7 palabras */}
              {formatText(article.title, 7).map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      ))}
    </MDBContainer>
  );
};

export default MostPopular;
