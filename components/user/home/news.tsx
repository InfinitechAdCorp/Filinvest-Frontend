"use client";

import React from "react";
import { Card, CardBody, CardHeader, Image, Link } from "@heroui/react";
import SectionTitle from "@/components/globals/sectionTitle";
import { Article } from "@/types/user";
import { formatDate } from "@/utils/formatters";

type Props = {
  news: Article[];
};

const News = ({ news }: Props) => {
  return (
    <div>
      <SectionTitle
        title="Corporate News"
        subtitle="Stay Updated with the Latest from Filinvest"
      />

      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 mt-2">
        <div className="p-2 flex gap-4 justify-center mx-60 w-full">
          {news.map((newsItem) => (
            <Card key={newsItem.id} className="py-2 w-[20rem]">
              <CardHeader className="pb-0">
                <Image
                  alt="News"
                  className="object-cover h-[11rem] w-full rounded-xl transform transition duration-500 ease-in-out hover:scale-110"
                  src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${newsItem.image}`}
                />
              </CardHeader>
              <CardBody className="overflow-visible py-2 space-y-2">
                <h3 className="font-bold text-large">{newsItem.name}</h3>

                <p className="text-default-500 line-clamp-3">
                  {newsItem.description}
                </p>
                <h3 className="text-sm font-semibold">
                  {formatDate(newsItem.date)}
                </h3>

                <Link
                  href={`/user/news/${newsItem.id}`}
                  className="text-primary text-xs sm:text-sm md:text-base font-semibold"
                >
                  Read More
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
