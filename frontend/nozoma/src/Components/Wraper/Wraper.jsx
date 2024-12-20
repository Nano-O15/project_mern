import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Wrapper = ({children}) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />  
        </div>
    );
};

export default Wrapper;