import { FiTruck } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { FaUndo } from "react-icons/fa";

const ExtraSupport = () => {
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <div className="flex flex-col items-center justify-center rounded-lg shadow-lg p-6 bg-gradient-to-r from-blue-500 to-blue-700">
        <MdSupportAgent className="text-5xl mb-4 text-white"></MdSupportAgent>
        <h1 className="text-xl font-bold text-white">24/7 Customer Support</h1>
        <p className="text-center text-sm text-white">
          Our dedicated team is here to assist you anytime, day or night.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg shadow-lg p-6 bg-gradient-to-r from-green-500 to-green-700">
        <FiTruck className="text-5xl mb-4 text-white"></FiTruck>
        <h1 className="text-xl font-bold text-white">Fast Shipping</h1>
        <p className="text-center text-sm text-white">
          Enjoy quick and reliable delivery on all your orders.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg shadow-lg p-6 bg-gradient-to-r from-yellow-500 to-yellow-700">
        <FaUndo className="text-5xl mb-4 text-white"></FaUndo>
        <h1 className="text-xl font-bold text-white">Easy Returns</h1>
        <p className="text-center text-sm text-white">
          Hassle-free returns and exchanges for your convenience.
        </p>
      </div>
    </div>
  );
};

export default ExtraSupport;