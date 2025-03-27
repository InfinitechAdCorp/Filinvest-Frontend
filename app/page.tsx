import React from "react";
import Hero from "@/components/user/home/hero";
import Others from "@/components/user/home/others";
import toast from "react-hot-toast";
import axios from "axios";
import { Article, Testimonial } from "@/types/user";
import Testimonials from "@/components/user/home/testimonials";
import Articles from "@/components/user/home/articles";
import { sortByDate } from "@/utils/formatters";
import SectionTitle from "@/components/globals/sectionTitle";

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

  let awards = articles.filter((article) => article.type == "Award");
  awards = sortByDate(awards, "date", "desc");
  awards = awards.slice(0, 5);

  return (
    <>
      <Hero />

      <div className="my-3 lg:my-10 space-y-3 lg:space-y-10">
        <Testimonials testimonials={testimonials} />

        <div>
          <SectionTitle
            title="Corporate News"
            subtitle="Stay Updated with the Latest from Filinvest"
          />
          <Articles articles={news} />
        </div>

        <div>
          <SectionTitle
            title="Awards"
            subtitle="Celebrating Excellence and Achievements at Filinvest"
          />
          <Articles articles={awards} />
        </div>
      </div>

      <Others />
    </>
  );
};

export default Home;
