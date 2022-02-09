import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-2/3">
      <Image
        src={require("/public/HomepageImage.png")}
        alt="Product image"
        layout="fill"
        objectFit="cover"
      />
      <h1 className="absolute bottom-1/2 left-32 text-6xl my-8 text-white font-semibold">
        Shop here
      </h1>
      <p className="w-1/5 absolute bottom-1/3 left-32 text-4xl my-8 text-white font-semibold">
        Newest sport fashion and equipment
      </p>
    </div>
  );
}
