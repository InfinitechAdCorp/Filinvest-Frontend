import React from "react";
import Hero from "@/components/user/home/hero";
import Others from "@/components/user/home/others";
import toast from "react-hot-toast";
import axios from "axios";
import { Article, Testimonial } from "@/types/user";
import Testimonials from "@/components/user/home/testimonials";
import News from "@/components/user/home/news";
import { sortByDate } from "@/utils/formatters";

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
    testimonials = testimonials.slice(0, 5);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }

  let articles: Article[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    articles = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }

  let news = articles.filter((article) => article.type == "News");
  news = sortByDate(news, "date", "desc");
  news = news.slice(0, 5);

  return (
    <>
      <Hero />
      <Testimonials testimonials={testimonials} />
      <News news={news} />
      <Others />
    </>
  );
};

export default Home;
