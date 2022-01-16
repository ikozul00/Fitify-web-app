import Footer from './footer/footer';
import Header from './header/header'

const Layout = ({ children}) => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
};

export default Layout;