import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchProduct = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/products/${searchTerm}`);
    };

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center">Search your desired product</h1>
            <div className='mt-5'>
                <form className="flex justify-center items-center" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Type product name" 
                        className="input input-bordered w-full max-w-xs" 
                        value={searchTerm} 
                        onChange={handleInputChange} 
                    />
                    <button type="submit" className="buttons">Search</button>
                </form>
            </div>
        </div>
    );
};

export default SearchProduct;
