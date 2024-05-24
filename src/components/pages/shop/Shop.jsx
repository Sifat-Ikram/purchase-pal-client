import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useCart from "../../hooks/useCart";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [cart, refetch] = useCart();
  const [voucherCode, setVoucherCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [amounts, setAmounts] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialAmounts = {};
    cart.forEach((item) => {
      initialAmounts[item.name] = 1;
    });
    setAmounts(initialAmounts);

    setDiscountedAmount(calculateTotalCost());
  }, [cart]);

  

  const incrementQuantity = (itemId) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [itemId]: (prevAmounts[itemId] || 0) + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    if (amounts[itemId] > 0) {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [itemId]: (prevAmounts[itemId] || 0) - 1,
      }));
    }
  };

  const calculateTotalCost = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (amounts[item.name] || 0);
    });
    return total;
  };

  const handleDiscountVoucher = (voucherCode) => {
    let newDiscountedAmount = calculateTotalCost();
    if (voucherCode === "discount") {
      newDiscountedAmount -= 20;
    }
    setDiscountedAmount(newDiscountedAmount);
  };

  const handleOrderCard = async() => {
    const stripe = await loadStripe(import.meta.env.VITE_strip_hosting_key);
    const body = {
      products: cart
    }
    const headers = {
      "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:4321/checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });
    if(result.error){
      console.log(result.error);
    }
  };

  const handleOrderFinal = () => {
    const orderedItems = [];
    cart.forEach((item) => {
      if (amounts[item.name] > 0) {
        orderedItems.push({ name: item.name, amount: amounts[item.name] });
      }
    });

    const orderInfo = {
      userName: user.displayName,
      userEmail: user.email,
      cart: cart,
      discountedAmount: discountedAmount,
      totalCost: calculateTotalCost(),
      amounts: orderedItems,
      payment: "Cash on Delivery",
    };

    axiosPublic.post("/order", orderInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your order placed!!!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate(location?.state ? location.state : "/");
      }
    });
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/cart/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Item Deleted!",
                text: "This item has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="flex">
      <div className="w-full">
        <div className="w-11/12 mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-5">Your Ordered Items</h1>
          <div className="flex gap-20">
            <div className="w-1/2 border-t-2">
              {cart?.map((item) => (
                <div key={item._id} className="p-4 border-b-2">
                  <div className="flex justify-between">
                    <p className="font-bold">Name: {item.name}</p>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h1 className="text-lg">Select quantity:</h1>
                    <div className="flex items-center">
                      <button
                        onClick={() => decrementQuantity(item.name)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-l"
                      >
                        -
                      </button>
                      <h1 className="mx-5">{amounts[item.name]}</h1>
                      <button
                        onClick={() => incrementQuantity(item.name)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-2 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-bold mt-2">
                    Total: ${item.price * (amounts[item.name] || 0)}
                  </p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-red-700 hover:bg-red-900 rounded-md flex items-center gap-2 px-2 py-1 text-lg font-semibold text-white hover:text-white"
                    >
                      <MdDelete className="text-2xl"></MdDelete>Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-gray-200 h-fit p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <p className="text-lg mb-4">
                Total Cost: ${calculateTotalCost()}
              </p>

              <div className="mb-6">
                <label>Enter voucher</label>
                <input
                  type="text"
                  placeholder="Enter discount voucher"
                  className="border border-gray-300 p-2 rounded-md w-full mb-2"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button
                  onClick={() => handleDiscountVoucher(voucherCode)}
                  className="buttons w-full"
                >
                  Apply Voucher
                </button>
              </div>

              <p className="text-lg mb-4">
                Total Amount: $
                {discountedAmount !== 0
                  ? discountedAmount
                  : calculateTotalCost()}
              </p>

              <div>
                <p className="text-lg font-bold mb-5">Select Payment Method:</p>
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleOrderCard}
                    className="buttons w-full"
                  >
                    Card Payment
                  </button>
                </div>
              </div>
              <h1 className="text-lg my-5 text-center">or</h1>
              <button
                className="buttons w-full"
                onClick={handleOrderFinal}
              >
                Cash on delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
