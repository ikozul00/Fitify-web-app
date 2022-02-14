const BurgerNavIcon = ({clicked, setIsClicked}) => {
    return(
        <button className={`flex flex-col md:hidden h-10 justify-around mr-5 ml-5 hover:cursor-pointer`} aria-label="burger nav icon" onClick={() => setIsClicked(!clicked)}>
            <div className={`w-10 h-1 bg-white transition-all ease-linear duration-500 ${clicked ? "transform rotate-45 translate-y-5" : ""}`}></div>
            <div className={`w-10 h-1 bg-white transition-all ease-linear duration-500 ${clicked ? "transform rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-10 h-1 bg-white transition-all ease-linear duration-500 ${clicked ? "transform -rotate-45 -translate-y-2" : ""}`}></div>
        </button>
    );
}

export default BurgerNavIcon;