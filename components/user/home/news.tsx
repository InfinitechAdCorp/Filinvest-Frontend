"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
} from "@heroui/react";
import SectionTitle from "@/components/globals/sectionTitle";
import { Article } from "@/types/user";
import { formatDate } from "@/utils/formatters";
// import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

type Props = {
  news: Article[];
};

const News = ({ news }: Props) => {
  news = news.sort((a, b) => {
    return Number(new Date(a.date)) - Number(new Date(b.date));
  });

  return (
    <div>
      <SectionTitle
        title="Corporate News"
        subtitle="Stay Updated with the Latest from Filinvest"
      />

      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 mt-2">
        <div className="p-2 flex gap-4 mx-72">
          {news.map((newsItem) => (
            <Card key={newsItem.id} className="w-full bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative w-full overflow-hidden rounded-t-2xl">
                  <Image
                    alt="News"
                    className="object-cover w-full h-full transform transition duration-500 ease-in-out hover:scale-110"
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${newsItem.image}`}
                  />
                </div>
              </CardHeader>
              <CardBody className="p-5 rounded-b-2xl flex justify-between h-[10rem]">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {newsItem.name}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {newsItem.description}
                  </p>
                  <p className="text-sm text-start text-gray-600 font-semibold">
                    {formatDate(newsItem.date)}
                  </p>
                </div>
                <Link
                  href={`/users/news/${newsItem.id}`}
                  className="text-primary text-xs sm:text-sm md:text-base font-semibold"
                >
                  Read More
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* <div className="px-6">
          <h1 className="text-xl lg:text-2xl text-primary">
            Other <span className="font-bold">Headlines</span>
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Catch up on the latest updates and developments from Filinvest.
          </p>
          <ul className="mt-4 space-y-4 text-medium text-primary">
            {latestHeadlines.map((item, index) => (
              <li
                key={index}
                className="hover:text-blue-600 cursor-pointer transition duration-300"
              >
                <Link
                  href={`/articles/news/${generateUID(item.id)}`}
                  className="text-primary text-sm md:text-base font-semibold"
                >
                  {item.title.length > 60
                    ? `${item.title.slice(0, 60)}...`
                    : item.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/articles/news">
            <Button className="mt-4 p-3 bg-primary text-white w-2/6 shadow-lg hover:bg-blue-800">
              See All <ArrowLongRightIcon className="w-5" />
            </Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default News;
