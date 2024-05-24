import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const NewProducts = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data;
    },
  });

  if (productsLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (productsError) {
    return <p className="text-center text-red-500">Error fetching data</p>;
  }

  const selectedProducts = products.filter(
    (product) => product.type === "Accessory"
  );

  if (selectedProducts.length === 0) {
    return <p className="text-center">No accessories available</p>;
  }

  console.log(selectedProducts);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-4xl font-bold">Newly Arrived Gadgets</h1>
      <div className="mt-5 border-2 border-solid border-gray-400 rounded-md p-2">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, FreeMode]}
          className="mySwiper"
        >
          {selectedProducts.map((rev) => (
            <SwiperSlide key={rev._id}>
              <Link to={`/details/${rev._id}`}>
                <div className="w-[300px] bg-base-200 shadow border-2 border-solid rounded-md pb-5">
                  <img
                    src={rev.image}
                    className="h-[150px] w-full"
                    alt={rev.title}
                  />
                  <div className="p-3">
                    <h1 className="text-2xl font-semibold">{rev.name}</h1>
                    <h1 className="text-lg font-medium">
                      <span className="font-semibold">Brand:</span> {rev.brand}
                    </h1>
                    <h1 className="text-lg font-medium text-green-700">
                      <span className="text-gray-600 font-semibold">
                        Price:{" "}
                      </span>
                      ${rev.price}
                    </h1>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewProducts;
