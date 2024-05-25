import { useContext, useState } from "react";
import { SiBigcartel } from "react-icons/si";
import { HiMenu } from "react-icons/hi";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin] = useAdmin();

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      console.log(res.user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const navLinks = (
    <>
      <li>
        <a className="nav-link font-semibold hover:text-[#04734C]" href={"/"}>
          Home
        </a>
      </li>
      <li>
        <a
          className="nav-link font-semibold hover:text-[#04734C]"
          href={"/allProduct"}
        >
          All Products
        </a>
      </li>
      <li>
        {user && (
          <a
            className="nav-link font-semibold hover:text-[#04734C]"
            href={"/shop"}
          >
            Cart
          </a>
        )}
      </li>
      <li>
        {isAdmin && (
          <a
            className="nav-link font-semibold hover:text-[#04734C]"
            href={"/dashboard/allUser"}
          >
            Dashboard
          </a>
        )}
      </li>
      <li>
        {!user && (
          <a
            className="nav-link font-semibold hover:text-[#04734C]"
            href="/register"
          >
            Sign up
          </a>
        )}
      </li>
    </>
  );

  return (
    <nav className="navbar justify-between md:px-8 lg:px-16 z-20 top-0 bg-white shadow fixed w-full">
      <div className="navbar-start md:hidden">
        <div className="dropdown" onClick={toggleDropdown}>
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <HiMenu className="h-6 w-6 hover:text-[#04734C]" />
          </div>
          {dropdownOpen && (
            <ul
              className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-white rounded-box w-52 absolute"
              onClick={closeDropdown}
            >
              {navLinks}
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-start max-md:navbar-center flex items-center">
        <SiBigcartel className="text-3xl mr-2 text-[#04734C]" />
        <a
          className="text-[#04734C] text-4xl font-extrabold italic font-lato"
          href="/"
        >
          PurchasePal
        </a>
      </div>
      <div className="navbar-end gap-10 flex items-center">
        <div className="navbar-center items-center hidden gap-4 md:flex">
          <ul className="flex gap-4">{navLinks}</ul>
          <div>
            {user ? (
              <div
                className="tooltip tooltip-bottom cursor-pointer"
                data-tip="Sign Out"
              >
                <div onClick={handleLogOut} className="flex gap-3 items-center">
                  <h1 className="nav-link font-semibold">{user.displayName}</h1>
                </div>
              </div>
            ) : (
              <Link to={"/logIn"}>
                {" "}
                <h1 className="nav-link font-semibold">Sign in</h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
