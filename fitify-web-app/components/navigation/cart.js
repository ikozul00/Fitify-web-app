import { connect } from "react-redux";
import Link from "next/link";
import { useRouter } from 'next/router';

const Cart = ({counter, isOpen}) => {
    const router = useRouter();
    
    return (
        <div className = {`${isOpen ? '-translate-x-20' : ''} transform translate transition duration-500 ease-in-out pr-4`}>
        <Link href="/cart" key="cart" passHref>
        <a className=" px-4 ">
            <div className={`hover:opacity-60 ${router.pathname=="/cart" ? "text-fitify-green" : "text-white"}`}>
                <div className="flex text-2xl">
                    <i className={`fas fa-shopping-cart`}></i> 
                    <p className="px-1">{counter}</p>
                </div>
                {/* <p className=" font-open-sans text-sm">Items</p> */}
            </div>
        </a>
    </Link>
    </div>
    );
}

const mapStateToProps = (state) => ({
    counter:state.cartReducer.quantity[0],
});

export default connect(mapStateToProps, null)(Cart); 