import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href={"/"} passHref>
        <p className="text-white bg-fitify-black w-min px-3 mt-0 md:h-16 h-10 flex items-center hover:cursor-pointer">
          <span className=" w-min text-4xl uppercase font-logo-allerta-stencil">
            Fit
          </span>
          <span className=" w-min text-3xl font-logo-pacifico">ify</span>
        </p>
      </Link>
    </>
  );
};

export default Logo;
