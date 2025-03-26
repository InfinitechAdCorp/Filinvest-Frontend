import React from "react";
import Hero from "@/components/user/home/hero";
import Others from "@/components/user/home/others";
import toast from "react-hot-toast";
import axios from "axios";
import { Testimonial } from "@/types/user";
import Testimonials from "@/components/user/home/testimonials";

const Home = async () => {
  let testimonials: Testimonial[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    testimonials = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }

  

  return (
    <>
      <Hero />
      <Testimonials testimonials={testimonials} />
      <Others />
    </>
  );
};

export default Home;
