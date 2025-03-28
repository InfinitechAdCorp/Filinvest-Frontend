"use client";

import React from "react";
import { Card, CardBody, CardHeader, Image, Link } from "@heroui/react";
import { Article } from "@/types/user";
import { formatDate } from "@/utils/formatters";

type Props = {
  articles: Article[];
};

const Articles = ({ articles }: Props) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 mt-2">
      <div className="p-2 flex flex-wrap gap-4 justify-center mx-60 w-full">
        {articles.length > 0 ? (
          <>
            {articles.map((article) => (
              <Card key={article.id} className="py-2 w-[20rem]">
                <CardHeader className="pb-0">
                  <Image
                    alt="News"
                    className="object-cover h-[11rem] w-full rounded-xl transform transition duration-500 ease-in-out hover:scale-110"
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${article.image}`}
                  />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <h3 className="font-bold text-large text-primary">{article.name}</h3>
                  <h3 className="text-sm font-semibold text-primary">
                    {formatDate(article.date)}
                  </h3>

                  <p className="text-default-500 line-clamp-3 my-3">
                    {article.description}
                  </p>

                  <div className="text-center">
                    <Link
                      href={`/user/news/${article.id}`}
                      className="text-primary text-xs sm:text-sm md:text-base font-semibold"
                    >
                      Read More
                    </Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </>
        ) : (
          <h3 className="text-xl font-bold">No Articles Found</h3>
        )}
      </div>
    </div>
  );
};

export default Articles;
