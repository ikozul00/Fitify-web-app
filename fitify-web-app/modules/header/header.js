import Navbar from "../../components/navigation/navbar";
import Logo from "../../components/logo";
import RightNavbar from "../../components/navigation/rightNavbar";
import BurgerNav from "@/components/navigation/burgerNav";


const Header=()=>{
    return(
            <div className=" bg-fitify-black flex justify-between items-center">
                <Logo/>
                <Navbar/>
                <div className="md:flex hidden">
                <RightNavbar mobile={false}/>
                </div>
                <BurgerNav isOpen={true}/>
            </div>
    )
}

export default Header;