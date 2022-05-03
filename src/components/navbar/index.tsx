import React from 'react';

type Props = {
    onLogout: () => void
}

const Navbar:React.FC<Props> = (props) => {
    return(
        <nav className="bg-white shadow border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <p>Eccomerce CMS</p>
                <div className="flex md:order-2">
                    <button 
                        onClick={props.onLogout} 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 ">
                            Logout
                    </button>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;