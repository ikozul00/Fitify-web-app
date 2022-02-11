const HamburgerNavigation = () => {
    return(
        <button className="flex flex-col md:hidden h-10 justify-around mr-5 hover:cursor-pointer">
            <div className="w-10 h-1 bg-white"></div>
            <div className="w-10 h-1 bg-white"></div>
            <div className="w-10 h-1 bg-white"></div>
        </button>
    );
}

export default HamburgerNavigation;