import React from "react";

interface Props {
  image: string;
  title: string;
  description: string;
}

const Hero = ({ image, title, description }: Props) => {
  return (
    <div
      className="relative w-full h-[12rem] flex items-center justify-center bg-cover bg-center dark:bg-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent"></div>

      <div className="relative text-center text-white shadow-black px-5">
        <h1 className="text-4xl md:text-5xl font-thin">{title}</h1>
        <p className="text-lg md:text-xl mt-2 max-w-2xl">{description}</p>
      </div>
    </div>
  );
};

export default Hero;
