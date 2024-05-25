import { FaBars, FaTools, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';
// import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
    // const [ isAdmin ] = useAdmin();
    const isAdmin = true;

    
    return (
        <div className='w-11/12 mx-auto flex'>
            <div className='w-60 min-h-screen fixed p-3 bg-[#04734C] uppercase'>
                <a className="font-cinzel block text-center text-white cursor-pointer mb-10" href='/'>
                    <h1 className='text-2xl font-extrabold'>Purchase Pal</h1>
                </a>
                <ul className='space-y-5 my-10'>
                    {
                        isAdmin &&
                            <>
                                <li><NavLink to={'/dashboard/allUser'} style={({ isActive }) => ({ background: isActive ? "#04734C" : "" })} className='flex items-center text-white font-cinzel gap-2 text-base p-2 rounded-md'>
                                    <FaUsers></FaUsers>
                                    <h1 className='font-bold'>All Users</h1>
                                </NavLink></li>
                                <li><NavLink to={'/dashboard/allProduct'} style={({ isActive }) => ({ background: isActive ? "#04734C" : "" })} className='flex items-center  text-white font-cinzel gap-2 text-base p-2 rounded-md'>
                                    <FaTools></FaTools>
                                    <h1 className='font-bold'>Products</h1>
                                </NavLink></li>
                                <li><NavLink to={'/dashboard/AllReview'} style={({ isActive }) => ({ background: isActive ? "#04734C" : "" })} className='flex items-center text-white font-cinzel gap-2 text-base p-2 rounded-md'>
                                    <FaBars></FaBars>
                                    <h1 className='font-bold '>Reviews</h1>
                                </NavLink></li>
                            </>
                    }
                </ul>
            </div>
            <div className='flex-1 ml-52'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;