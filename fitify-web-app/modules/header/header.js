import Navbar from "../../components/navigation/navbar";
import Logo from "../../components/logo";
import RightNavbar from "../../components/navigation/rightNavbar";


const Header=()=>{
    return(
            <div className=" bg-fitify-black flex justify-between items-center">
                <Logo/>
                <Navbar/>
                <RightNavbar/>
            </div>
    )
}

export default Header;