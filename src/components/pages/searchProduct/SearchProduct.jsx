import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {
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

  const selectedProduct = products.filter((product) =>
    product.name.toLowerCase().includes(id.toLowerCase())
  );

  console.log(selectedProduct);

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-semibold text-center my-16">Search Result</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {selectedProduct.map((product) => (
          <div
            key={product._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <figure className="h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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
  );
};

export default SearchProduct;
