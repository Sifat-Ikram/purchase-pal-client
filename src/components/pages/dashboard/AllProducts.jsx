import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/product");
      return res.data;
    },
  });

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you really want to delete this test?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/product/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Test Deleted!",
              text: "Test has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="w-11/12 py-10 mx-auto">
      <div className="w-full bg-[#04734C] py-5 mb-10">
        <h1 className="text-4xl text-center text-white uppercase text-extrabold">
          all products
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full mx-auto">
        {products.map((item) => (
          <div key={item._id} className="text-base w-4/5 mx-auto">
            <div className="flex items-center border-b-2 border-solid shadow rounded-lg transition duration-300 transform hover:scale-105">
              <div>
                <img
                  src={item.image}
                  className="w-40 h-36 rounded-l-lg"
                  alt=""
                />
              </div>
              <div className="py-2 px-4">
                <div className="flex flex-col text-xl mb-2">
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="">${item.price}</p>
                </div>
                <div className="flex justify-end px-5 mt-3">
                  <a>
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-red-700 hover:bg-red-900 rounded-md flex items-center gap-2 px-2 py-1 text-lg font-semibold text-white hover:text-white"
                    >
                      <MdDelete className="text-2xl"></MdDelete>Delete
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
