import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const CategoryDetails = () => {
  const { id } = useParams();
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

  

  const selectedProduct = products.filter(cat => cat.category === id);
  
  if (!selectedProduct) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <div>
      <h1 className="text-center text-6xl font-bold mt-40">{id}</h1>
      <div className="w-11/12 mx-auto mt-40">
        {!selectedProduct.length && (
          <p className="text-center text-gray-600">No products found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedProduct.map((product) => (
            <div key={product._id} className="card w-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <figure className="h-48">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </figure>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">Brand: {product.brand}</p>
                <p className="text-gray-800 font-bold">${product.price}</p>
                <p className="text-yellow-500">Rating: {product.rating}</p>
                <div className="mt-4">
                  <Link to={`/details/${product._id}`}>
                    <button className="buttons w-full">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
