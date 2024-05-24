import { Link } from "react-router-dom";


const Success = () => {
    return (
        <div className="text-center mt-40 flex justify-center items-center flex-col">
            <h1 className="text-5xl font-semibold">Your payment was <span className="text-green-600">Successful</span></h1>
           <button className="buttons"><Link to="/">Back Home</Link></button>
        </div>
    );
};

export default Success;