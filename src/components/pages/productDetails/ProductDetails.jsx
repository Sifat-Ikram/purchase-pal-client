import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import useReview from "../../hooks/useReview";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [review, refetch] = useReview();

  console.log(review);

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

  const moreProducts = products.filter(
    (item) => item.category === selectedProduct.category
  );

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewInfo = {
      username: user?.displayName,
      rating,
      text: reviewText,
      productName: selectedProduct.name,
      date: new Date().toISOString(),
    };

    try {
      console.log(reviewInfo);
      const res = await axiosPublic.post(`/review`, reviewInfo);
      if (res.status === 200) {
        setReviewText("");
        setRating(0);
      }
      refetch();
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire("Failed to submit review");
    }
  };

  const handleOrder = (item) => {
    const cartItem = {
      productId: item._id,
      email: user.email,
      name: item.name,
      category: item.category,
      image: item.image,
      price: parseFloat(item.price),
      brand: item.brand,
      type: item.type,
      details: item.details,
    };

    axiosPublic.post("/cart", cartItem).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "This item is added to the cart",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const selectedReview = review.filter(
    (rev) => rev.productName === selectedProduct.name
  );

  const handleReplyText = (e) => {
    setReplyText(e.target.value);
  };

  const handleLike = async (reviewId) => {
    try {
      await axiosPublic.post(`/review/${reviewId}/like`);
      refetch();
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      await axiosPublic.post(`/review/${reviewId}/dislike`);
      refetch();
    } catch (error) {
      console.error("Error disliking review:", error);
    }
  };

  const handleReply = async (reviewId) => {
    const replyInfo = {
      username: user?.displayName,
      text: replyText,
      date: new Date().toISOString(),
    };

    try {
      await axiosPublic.post(`/review/${reviewId}/reply`, replyInfo);
      setReplyText(""); // Clearing reply text after submission
      refetch(); // Refetching reviews after reply
    } catch (error) {
      console.error("Error replying to review:", error);
    }
  };

  const handleFacebookShare = () => {
    // You can replace the URL with your actual product URL
    const productUrl = window.location.href;

    // Using Facebook Share Dialog API
    window.FB.ui(
      {
        method: "share",
        href: productUrl,
      },
      function () {}
    );
  };

  const handleTwitterShare = () => {
    // You can replace the URL with your actual product URL
    const productUrl = window.location.href;
    const text = encodeURIComponent("Check out this awesome product!");

    // Open Twitter share dialog
    window.open(
      `https://twitter.com/intent/tweet?url=${productUrl}&text=${text}`,
      "_blank"
    );
  };

  const handleInstagramShare = () => {
    // Instagram doesn't provide a direct API for sharing from web applications
    // You can suggest the user to share manually or provide instructions
    // Or you can redirect the user to your Instagram profile or product page
    window.open("https://www.instagram.com/", "_blank");
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
        {/* Selected Product Information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
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
            <button
              onClick={() => handleOrder(selectedProduct)}
              className="buttons w-3/4 mx-auto"
            >
              Add to Cart
            </button>
            <div className="mt-10">
              <h1 className="text-2xl font-semibold">Share this product</h1>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={handleFacebookShare}
                  className="flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  <FaFacebook className="mr-2" /> Share on Facebook
                </button>
                <button
                  onClick={handleTwitterShare}
                  className="flex items-center bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-500 transition duration-300"
                >
                  <FaTwitter className="mr-2" /> Share on Twitter
                </button>
                <button
                  onClick={handleInstagramShare}
                  className="flex items-center bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-3 py-2 rounded hover:from-pink-600 hover:to-yellow-600 transition duration-300"
                >
                  <FaInstagram className="mr-2" /> Share on Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p>{selectedProduct.details}</p>
      </div>

      <div className="mb-32">
        <h1 className="text-4xl font-bold mb-4">Products You may also like</h1>
        <div className="flex justify-center gap-2">
          {moreProducts.slice(0, 5).map((product) => (
            <Link key={product._id} to={`/details/${product._id}`}>
              <div className="w-[200px] bg-base-200 shadow border-2 border-solid rounded-md pb-2">
                <img
                  src={product.image}
                  className="h-[150px] w-full"
                  alt={product.name}
                />
                <div className="p-3 h-[150px]">
                  <h1 className="text-2xl font-semibold">{product.name}</h1>
                  <h1 className="text-lg font-medium">
                    <span className="font-semibold">Brand:</span>{" "}
                    {product.brand}
                  </h1>
                  <h1 className="text-lg font-medium text-green-700">
                    <span className="text-gray-600 font-semibold">Price: </span>
                    ${product.price}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
          <button type="submit" className="buttons">
            Submit Review
          </button>
        </form>
      </div>

      {/* User Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div>
          {selectedReview.length > 0 ? (
            selectedReview.map((review, index) => (
              <div key={index} className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{review.username}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review.rating ? "gold" : "gray"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.text}</p>
                <div className="ml-3">
                  <h1 className="text-lg font-semibold">Replies:</h1>
                  <div className="ml-5">
                    {review?.replies.map((reply) => (
                      <div key={reply._id} className="p-2 rounded-md mb-2">
                        <h3 className="text-lg font-semibold">
                          {reply.username}
                        </h3>
                        <p className="text-gray-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(review._id)}
                    className="flex items-center text-gray-600 hover:text-blue-500"
                  >
                    <FaThumbsUp className="mr-1" /> {review.likes || 0}
                  </button>
                  <button
                    onClick={() => handleDislike(review._id)}
                    className="flex items-center text-gray-600 hover:text-red-500"
                  >
                    <FaThumbsDown className="mr-1" /> {review.dislikes || 0}
                  </button>
                  <div className="flex items-center text-gray-600 hover:text-green-500">
                    <details className="collapse">
                      <summary className="collapse-title flex flex-row justify-center items-center">
                        Reply
                      </summary>
                      <div className="collapse-content bg-base-200 p-2 rounded-md">
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          name="reply"
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={handleReplyText}
                        />
                        <button
                          onClick={() => handleReply(review._id)} // Pass reviewId to handleReply
                          className="buttons mt-2"
                        >
                          Submit Reply
                        </button>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>There are no reviews yet!!!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
