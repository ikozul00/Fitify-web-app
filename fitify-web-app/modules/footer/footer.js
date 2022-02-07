import Logo from "../../components/logo";
import Image from 'next/image';

const Footer = () => {
    const facebookIcon='/FacebookIcon.png';
    return(
        <>
        <section className=" bg-fitify-black flex justify-between items-center">
        <div className="flex justify-between items-center w-3/6">
        <Logo/>

        <div className=" text-white font-open-sans py-10">
            <p className=" py-2 font-bold">Customer Support</p>
            <p className=" py-2 font-light">FAQ</p>
            <p className=" py-2 font-light">Order Status</p>
            <p className=" py-2 font-light">Shipping and Delivery</p>
            <p className=" py-2 font-light">Returns</p>
        </div>

        <div className=" text-white font-open-sans py-10">
            <p className=" py-2 font-bold">Additional Information</p>
            <p className=" py-2 font-light">Contact Us</p>
            <p className=" py-2 font-light">Help</p>
            <p className=" py-2 font-light">Terms and Conditions</p>
            <p className=" py-2 font-light">About Us</p>
        </div>
        </div>
        <div className=" text-white font-open-sans pr-">
            <p className=" uppercase font-bold">Follow us:</p>
            <div className="flex pt-2">
                <div className=" w-10 h-10 rounded-full flex items-center justify-around mr-5">
                <Image src='/FacebookIconGray.png' width={40} height={40} alt="Facebook" layout="fixed"/>
                </div>
                <div className=" w-10 h-10 rounded-full flex items-center justify-around mr-5">
                <Image src='/InstagramIconGray.png' layout="fixed" width={40} height={40} alt="Instagram"/>
                </div>
                <div className=" w-10 h-10 bg-fitify-gray rounded-full flex items-center justify-around mr-5">
                <Image src='/SnapchatIcon.png' width={35} height={30} layout="fixed"/>
                </div>
                <div className=" w-10 h-10 rounded-full flex items-center justify-around mr-48">
                <Image src='/TwitterIconGray.png' width={40} height={40} alt="Twitter" layout="fixed"/>
                </div>

            </div>
        </div>
        </section>
        </>
    );
}

export default Footer;