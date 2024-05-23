import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const axiosPublic = useAxiosPublic();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

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

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }

    switch (sortOption) {
      case "priceLowToHigh":
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "ratingHighToLow":
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (productsLoading || categoriesLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (productsError || categoriesError) {
    return <p className="text-center text-red-500">Error fetching data</p>;
  }

  const brands = Array.from(new Set(products.map((product) => product.brand)));

  return (
    <div className="container mx-auto flex max-lg:flex-col">
      <div className="w-full lg:w-1/4 bg-gray-100 p-6 -mt-4 border-r-2 border-solid shadow-md mb-6 lg:mb-0 lg:fixed lg:left-0 lg:h-full">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Search Product</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Type product name here"
            className="input w-full mb-4 p-2 border rounded-md text-base"
          />
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Category</h2>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Brand</h2>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Sort By</h2>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="ratingHighToLow">Rating: High to Low</option>
          </select>
        </div>
      </div>
      <div className="w-full lg:ml-1/4 lg:pl-80">
        {!currentProducts.length && (
          <p className="text-center text-gray-600">No products found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
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
        <div className="mt-6 flex justify-center">
          <div className="btn-group">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`btn ${currentPage === i + 1 ? "btn-active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;