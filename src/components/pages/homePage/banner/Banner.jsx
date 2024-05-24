import banner1 from "../../../../assets/banner/banner_1.jpg";
import banner2 from "../../../../assets/banner/banner_2.jpg";
import banner3 from "../../../../assets/banner/banner_3.jpg";
import banner4 from "../../../../assets/banner/banner_4.jpeg";
import banner5 from "../../../../assets/banner/banner_5.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  const banner = [
    {
      id: 1,
      title: "banner1",
      img: banner1,
    },
    {
      id: 2,
      title: "banner2",
      img: banner2,
    },
    {
      id: 4,
      title: "banner4",
      img: banner4,
    },
    {
      id: 5,
      title: "banner5",
      img: banner5,
    },
    {
      id: 3,
      title: "banner3",
      img: banner3,
    },
  ];

  return (
    <div>
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
        {banner.map((rev) => (
          <SwiperSlide key={rev.id}>
            <div className="flex flex-col justify-center items-center">
              <img
                src={rev.img}
                className="w-full h-[550px]"
                alt={rev.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
