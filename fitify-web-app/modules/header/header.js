import Navbar from "../../components/navbar";
import Logo from "../../components/logo";


const Header=()=>{
    return(
        <>
            <div className="flex">
                <Logo/>
                <Navbar/>
            </div>
        </>
    )
}

export default Header;