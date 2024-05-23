import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import login from "../../../assets/authentication.gif";

const LogIn = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <div>
        <div className="w-11/12 mx-auto mt-14 flex items-center max-lg:flex-col">
          <div>
            <img src={login} alt="" />
          </div>
          <div className="flex-col hero-content w-1/2 shadow-2xl ">
            <div className="text-center w-full">
              <h1 className="text-5xl font-bold text-[#04734C]">
                Sign in here!
              </h1>
            </div>
            <div className="w-full card shrink-0">
              <form onSubmit={handleSignIn} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="mt-6 form-control">
                  <button className="btn bg-[#04734C] hover:bg-[#04734C] border-white text-white font-bold text-xl">
                    Sign in
                  </button>
                </div>
                {error && <p className="text-base text-red-800">{error}</p>}
              </form>
              <div className="flex justify-center">
                <Link to={"/register"}>
                  <p>
                    Do not have an account?{" "}
                    <span className="text-[#04734C]">Sign up</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="w-5/6 mx-auto space-y-10">
    //     <div>
    //       <div className="w-2/5 min-h-screen mx-auto mt-14">
    //         <div className="text-center bg-[#04734C] w-full py-10">
    //           <h1 className="text-5xl font-bold text-white">Sign in here!</h1>
    //         </div>
    //         <div>
    //           <form
    //             onSubmit={handleSignIn}
    //             className="space-y-5 card-body bg-base-100"
    //           >
    //             <div className="form-control">
    //               <label className="label">
    //                 <span className="label-text">Email</span>
    //               </label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 placeholder="Type your email"
    //                 className="input input-bordered"
    //                 required
    //               />
    //             </div>
    //             <div className="form-control">
    //               <label className="label">
    //                 <span className="label-text">Password</span>
    //               </label>
    //               <input
    //                 type="password"
    //                 name="password"
    //                 placeholder="password"
    //                 className="input input-bordered"
    //                 required
    //               />
    //             </div>
    //             <div className="mt-6 form-control">
    //               <button className="btn bg-[#04734C] hover:bg-[#04734C] border-white text-white font-bold text-xl">
    //                 Sign in
    //               </button>
    //             </div>
    //             {error && <p className="text-base text-red-800">{error}</p>}
    //             <Link to={"/signUp"}>
    //
    //             </Link>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LogIn;
