import React from "react";
import Hero from "@/components/user/home/hero";
import Others from "@/components/user/home/others";
import toast from "react-hot-toast";
import axios from "axios";
import { Article, FAQ, Property, Testimonial } from "@/types/globals";
import Testimonials from "@/components/user/home/testimonials";
import Articles from "@/components/user/home/articles";
import { sortByDate, sortRecords } from "@/utils/formatters";
import SectionTitle from "@/components/globals/sectionTitle";
import FAQs from "@/components/user/home/faqs";
import FeaturedProperties from "@/components/user/home/featuredProperties";

const Page = async () => {
  let testimonials: Testimonial[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    testimonials = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something Went Wrong");
  }

  testimonials = testimonials.filter(
    (testimonial) => testimonial.isPublished == 1
  );
  testimonials = testimonials.slice(0, 5);

  let articles: Article[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    articles = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something Went Wrong");
  }

  let news = articles.filter((article) => article.type == "News");
  news = sortByDate(news, "date", "desc");
  news = news.slice(0, 5);

  let awards = articles.filter((article) => article.type == "Award");
  awards = sortByDate(awards, "date", "desc");
  awards = awards.slice(0, 5);

  let faqs: FAQ[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/faqs`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    faqs = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something Went Wrong");
  }

  faqs = faqs.slice(0, 7);

  let properties: Property[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/properties`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    properties = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something Went Wrong");
  }

  properties = sortRecords(properties, "name");
  properties = properties.filter((property) => {
    return property.isPublished == 1 && property.isFeatured == 1;
  });
  properties = properties.slice(0, 7);

  return (
    <>
      <Hero />

      <div className="my-3 lg:my-10 space-y-3 lg:space-y-10">
        <div>
          <SectionTitle
            title="Featured Properties"
            subtitle="Find your dream home today"
          />
          <FeaturedProperties properties={properties} />
        </div>

        <div>
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Real feedback from our satisfied customers"
          />
          <Testimonials testimonials={testimonials} />
        </div>

        <div>
          <SectionTitle
            title="Corporate News"
            subtitle="Stay updated with the latest from Filinvest"
          />
          <Articles articles={news} />
        </div>

        <div>
          <SectionTitle
            title="Awards"
            subtitle="Celebrating excellence and achievements at Filinvest"
          />
          <Articles articles={awards} />
        </div>

        <div className="container mx-auto px-4">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="We're here to help with your questions and answers all in one place."
          />
          <FAQs faqs={faqs} />
        </div>
      </div>
      <Others />
    </>
  );
};

export default Page;
