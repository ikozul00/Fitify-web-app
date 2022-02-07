import Image from "next/image";

export const CustomImage = (props) => {
    console.log(props);
    return (
        <div className="relative w-3/5 h-96 my-7 mx-auto">
            <Image
            src={`https:${props.src}`}
            alt={props.alt}
            layout="fill"
            objectFit="cover"
            />
        </div>
    );
}