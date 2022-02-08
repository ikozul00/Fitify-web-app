import Footer from './footer/footer';
import Header from './header/header'

const Layout = ({ children}) => {
    return (
        <>
            <div className='flex flex-col justify-between h-screen'>
            <Header/>
            {children}
            <Footer/>
            </div>
        </>
    );
};

export default Layout;