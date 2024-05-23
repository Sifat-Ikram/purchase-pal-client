import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaStar, FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error fetching data</p>;
  }

  const selectedProduct = products?.find((product) => product._id === id);

  if (!selectedProduct) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const ReviewInfo = {
        name: user.displayName,
        rating: e.rating,
        reviewText: e.reviewText,
      };
  
      const ReviewRes = await axiosPublic.post(`/review`, ReviewInfo);
  
      if (ReviewRes.data.modifiedCount) {
        Swal.fire("Review updated successfully");
      }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Image Gallery */}
        <div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="rounded-lg w-full mb-4"
          />
        </div>
        {/* selectedProduct Information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
          <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
          <p className="text-2xl font-bold mb-2">
            Price: ${selectedProduct.price}
          </p>
          <p
            className={`mb-4 ${
              selectedProduct.availability ? "text-red-500" : "text-green-500"
            }`}
          >
            {selectedProduct.availability ? "Out of Stock" : "In Stock"}
          </p>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Specifications:</h2>
            <ul className="list-disc pl-5">
              <li>Brand: {selectedProduct.brand}</li>
              <li>Type: {selectedProduct.type}</li>
              <li>Category: {selectedProduct.category}</li>
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Overall Rating:</h2>
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold">
                {selectedProduct.rating.toFixed(1)}
              </span>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < selectedProduct.rating ? "gold" : "gray"}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <button className="buttons w-3/4 mx-auto">Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p>{selectedProduct.details}</p>
      </div>

      {/* Review Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < rating ? "gold" : "gray"}
                  onClick={() => setRating(i + 1)}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="buttons"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* User Reviews */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {selectedProduct.reviews?.map((review, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">{review.username}</h3>
                <p className="text-gray-600 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < review.rating ? "gold" : "gray"} />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.text}</p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-blue-500">
                <FaThumbsUp className="mr-1" /> {review.likes}
              </button>
              <button className="flex items-center text-gray-600 hover:text-red-500">
                <FaThumbsDown className="mr-1" /> {review.dislikes}
              </button>
              <button className="flex items-center text-gray-600 hover:text-green-500">
                <FaReply className="mr-1" /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
