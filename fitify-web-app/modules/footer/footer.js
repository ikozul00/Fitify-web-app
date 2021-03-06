import Logo from "../../components/logo";
import Image from 'next/image';
import Link from "next/link";

const Footer = () => {
    const facebookIcon='/FacebookIcon.png';
    return(
        <>
        <section className=" bg-fitify-black flex justify-between items-center sm:flex-row flex-col mm:pt-0 pt-4">
        <Logo/>
        <div className="flex justify-between items-center lg:w-2/6 sm:w-6/12 w-5/6 ">
        

        <div className=" text-white font-open-sans py-10 sm:text-base text-sm">
            <p className=" py-2 font-bold">Customer Support</p>
            <Link href="/errorPage" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">FAQ</p>
            </Link>
            <Link href="/errorPage" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">Order Status</p>
            </Link>
            <Link href="/errorPage" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">Shipping and Delivery</p>
            </Link>
            <Link href="/errorPage" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">Returns</p>
            </Link>
        </div>

        <div className=" text-white font-open-sans py-10 sm:ml-0 ml-8 sm:text-base text-sm">
            <p className=" py-2 font-bold">Additional Information</p>
            <Link href="/contactUs" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">Contact Us</p>
            </Link>
            <Link href="/errorPage" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">Help</p>
            </Link>
            <Link href="/errorPage" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">Terms and Conditions</p>
            </Link>
            <Link href="/errorPage" passHref>
            <p className=" py-2 font-light hover:cursor-pointer">About Us</p>
            </Link>
        </div>
        </div>
        <div className=" text-white font-open-sans pb-10 sm:pb-0 sm:text-base text-sm">
            <p className=" uppercase font-bold">Follow us:</p>
            <div className="flex pt-2">
                <div className=" w-10 h-10 rounded-full flex items-center justify-around md:mr-5 mr-3">
                <Image src='/FacebookIcon.png' width={40} height={40} alt="Facebook" layout="fixed"/>
                </div>
                <div className=" w-10 h-10 rounded-full flex items-center justify-around md:mr-5 mr-3">
                <Image src='/InstagramIcon.png' layout="fixed" width={40} height={40} alt="Instagram"/>
                </div>
                <div className=" w-10 h-10 bg-fitify-gray rounded-full flex items-center justify-around md:mr-5 mr-3">
                <Image src='/SnapchatIcon.png' width={35} height={30} alt="Snapchat" layout="fixed"/>
                </div>
                <div className=" w-10 h-10 rounded-full flex items-center justify-around lg:mr-48 md:mr-5 mr-3">
                <Image src='/TwitterIcon.png' width={40} height={40} alt="Twitter" layout="fixed"/>
                </div>

            </div>
        </div>
        </section>
        </>
    );
}

export default Footer;