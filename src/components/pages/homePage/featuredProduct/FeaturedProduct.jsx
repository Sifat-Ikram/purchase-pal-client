import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
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

    return (
        <div className="w-11/12 mx-auto">
            <h1 className="text-4xl font-bold mb-4">Featured Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0,6).map(product => (
                    <div key={product._id} className="card max-lg:w-4/5 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <figure className="h-48">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </figure>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="text-gray-700">Brand: {product.brand}</p>
                      <p className="text-gray-700">Price: ${product.price}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
            <Link to={"/allProduct"}>
              <button className="buttons">View All</button>
            </Link>
            </div>
        </div>
    );
};

export default FeaturedProducts;
