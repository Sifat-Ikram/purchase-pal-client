import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Banner from "./banner/Banner";
import { Link } from "react-router-dom";
import img from "../../../assets/home/exclusive.jpg";
import NewProducts from "./arrived/NewProducts";
import ExtraSupport from "./extraSupport/ExtraSupport";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: categoriesData = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  if (categoriesLoading || categoriesError) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <div className="space-y-16">
      <div className="flex flex-row">
        <div className="md:w-2/5 px-5 z-10 flex-1 bg-[#04734C] max-md:hidden">
          <h1 className="text-3xl text-center font-bold my-4 text-white">
            Categories
          </h1>
          <div className="bg-white rounded-md">
            {categoriesData.map((category) => (
              <Link
                to={`/categoryDetails/${category.name}`}
                key={category._id}
                className="block mb-1 py-3 rounded-md text-center text-2xl font-semibold text-[#04734C] hover:bg-[#e0f7ef] transition-colors duration-300"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-3/4 flex-1">
          <Banner />
        </div>
      </div>
      <div>
        <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src={img}
                className="rounded-lg shadow-2xl"
                alt="Product Image"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-center">
                Exclusive Products
              </h1>
              <p className="py-6 px-14">
                Discover the features and benefits of our latest product.
                Crafted with high-quality materials and designed to provide the
                best experience. Limited stock available!
              </p>
              <div className="flex justify-end">
                <Link to="/allProduct">
                  <button className="buttons mr-14">Explore</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <NewProducts />
      </div>
      <div>
        <ExtraSupport />
      </div>
    </div>
  );
};

export default Home;
