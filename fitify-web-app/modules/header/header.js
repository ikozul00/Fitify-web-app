import Navbar from "../../components/navigation/navbar";
import Logo from "../../components/logo";
import RightNavbar from "../../components/navigation/rightNavbar";
import BurgerNav from "@/components/navigation/burgerNav";


const Header=()=>{
    return(
            <div className=" bg-fitify-black flex justify-between items-center">
                <Logo/>
                <Navbar/>
                <RightNavbar/>
                <BurgerNav isOpen={true}/>
            </div>
    )
}

export default Header;