import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


// Import local images
import FastProcessingImg from "../assets/img1.jpg";
import GlobalReachImg from "../assets/img2.jpg";
import SecureApplicationImg from "../assets/img3.jpg";

const Slider = () => {
  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="relative h-[500px] flex items-center justify-center text-center text-white rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${FastProcessingImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
              {/* Gradient Overlay */}
              <div className="relative">
                <h3 className="text-3xl font-semibold mb-4">Fast Processing</h3>
                <p className="text-lg">
                  Get your visa processed quickly and efficiently, with most
                  applications completed within 7-14 days.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="relative h-[500px] flex items-center justify-center text-center text-white rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${SecureApplicationImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
              {/* Gradient Overlay */}
              <div className="relative">
                <h3 className="text-3xl font-semibold mb-4">
                  Secure Application
                </h3>
                <p className="text-lg">
                  Our platform ensures your personal information is secure with
                  the highest levels of encryption and privacy.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="relative h-[500px] flex items-center justify-center text-center text-white rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${GlobalReachImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
              {/* Gradient Overlay */}
              <div className="relative">
                <h3 className="text-3xl font-semibold mb-4">Global Reach</h3>
                <p className="text-lg">
                  We support visa applications for over 100 countries worldwide,
                  helping you explore new destinations with ease.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
