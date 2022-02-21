import { connect } from "react-redux";
import Link from "next/link";
import { useRouter } from 'next/router';
import {FaShoppingCart} from "react-icons/fa";
import { useEffect, useState } from "react";

const Cart = ({items, isOpen}) => {
    const router = useRouter();
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
        let c=0;
        for(let i=0; i<items.lenght; i++){
            c+=items[i].amount;
        }
        setCounter(c);

    }, [items]);
    return (
        <div className = {`${isOpen ? ' -translate-x-20' : ''} transform translate transition duration-500 ease-in-out pr-4`}>
        <Link href="/cart" key="cart" passHref>
        <a className=" px-4 ">
            <div className={`hover:text-fitify-green-light ${router.pathname=="/cart" ? " text-fitify-green-light" : "text-white"}`}>
                <div className="flex text-2xl">
                   <FaShoppingCart/>
                    <p className="px-1">{counter}</p>
                </div>
            </div>
        </a>
    </Link>
    </div>
    );
}

const mapStateToProps = (state) => ({
    items:state.cartReducer,
});

export default connect(mapStateToProps, null)(Cart); 