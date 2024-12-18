import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import bank from './bank.jpg';
import bank2 from './bank2.jpg';
import bank3 from './bank3.jpg';

export default function Homepage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
            <Carousel style={{ width: '80%' }}>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto"
                        src={bank}
                        alt="First slide"
                        style={{ height: '500px', width: '100%' }}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block mx-auto"
                        src={bank2}
                        alt="Second slide"
                        style={{ height: '500px', width: '100%' }}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block mx-auto"
                        src={bank3}
                        alt="Third slide"
                        style={{ height: '500px', width: '100%' }}
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
