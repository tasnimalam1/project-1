import React from 'react';
import LatestVisa from '../Component/LatestVisa';
import PopularDestinations from '../Component/PopularDestinations';
import Slider from '../Component/Slider';
import Testimonials from '../Component/Testimonials';


const Home = () => {
    return (
        <div>
            <banner>
                <Slider></Slider>
            </banner>
            <section>
                <LatestVisa></LatestVisa>
            </section>
            <section>
                <Testimonials></Testimonials>
            </section>
            <section>
                <PopularDestinations></PopularDestinations>
            </section>
        </div>
    );
};

export default Home;