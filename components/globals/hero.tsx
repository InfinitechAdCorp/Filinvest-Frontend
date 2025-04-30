interface Props {
  image: string;
  title: string;
  description?: string;
}

const Hero = ({ image, title, description }: Props) => {
  return (
    <div
      className="relative flex h-[12rem] w-full items-center justify-center bg-cover bg-center dark:bg-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent"></div>

      <div className="relative px-5 text-center text-white shadow-black">
        <h3 className="text-4xl font-thin md:text-5xl">{title}</h3>
        <p className="mt-2 max-w-2xl text-lg md:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default Hero;
