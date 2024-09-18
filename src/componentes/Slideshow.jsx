import React from 'react';
import './slideShow.css'; // Estilos CSS locales

const SlideShow = () => {
    const nextSlide = () => {
        const slide = document.querySelector('.my-slide');
        slide.appendChild(slide.firstElementChild);
    };

    const prevSlide = () => {
        const slide = document.querySelector('.my-slide');
        slide.insertBefore(slide.lastElementChild, slide.firstElementChild);
    };

    return (
        <div className="my-container">
            <div className="my-slide">
                <div className="my-item" style={{backgroundImage: "url(https://images.pexels.com/photos/3656267/pexels-photo-3656267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}>
                    <div className="my-content">
                        <div className="name">San pedro</div>
                        <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div className="my-item" style={{backgroundImage: "url(https://images.pexels.com/photos/2893330/pexels-photo-2893330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}>
                    <div className="my-content">
                        <div className="name">Torreon</div>
                        <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div className="my-item" style={{backgroundImage: "url(https://images.pexels.com/photos/13071328/pexels-photo-13071328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}>
                    <div className="my-content">
                        <div className="name">Coahuila</div>
                        <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div className="my-item" style={{backgroundImage: "url(https://images.pexels.com/photos/8389275/pexels-photo-8389275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}>
                    <div className="my-content">
                        <div className="name">Casa de nestor</div>
                        <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div className="my-item" style={{backgroundImage: "url(https://images.pexels.com/photos/10824705/pexels-photo-10824705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}>
                    <div className="my-content">
                        <div className="name">Nacional</div>
                        <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
                <div className="my-item" style={{backgroundImage: "url(https://images.pexels.com/photos/5451412/pexels-photo-5451412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}>
                    <div className="my-content">
                        <div className="name">Del valle</div>
                        <div className="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div>
                </div>
            </div>
            <div className="my-button">
                <button className="prev" onClick={prevSlide}><i className="fas fa-arrow-left"></i></button>
                <button className="next" onClick={nextSlide}><i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    );
}

export default SlideShow;
