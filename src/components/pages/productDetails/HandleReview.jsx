import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const HandleReview = () => {

    

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
  const handleReplyText = e =>{
    const reply = e.target.value;
    console.log(reply);
  }
  const handleLike = e =>{
console.log(e);
  }
  const handleDisLike = e =>{
    console.log(e);
  }
  return (
    <div>
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
          {selectedReview ? (
            <>
              {selectedReview?.map((review, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {review.username}
                      </h3>
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
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-blue-500">
                      <FaThumbsUp onClick={handleLike()} className="mr-1" /> {}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-red-500">
                      <FaThumbsDown
                        className="mr-1"
                        onClick={handleDisLike()}
                      />{" "}
                      {}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-green-500">
                      <details className="collapse">
                        <summary className="collapse-title flex flex-row justify-center items-center">
                          Reply
                        </summary>
                        <div className="collapse-content bg-base-200">
                          <input
                            type="text"
                            className="text-black"
                            name="reply"
                            onChange={handleReplyText}
                          />
                        </div>
                      </details>
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h1>There is no review yet!!!</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleReview;
