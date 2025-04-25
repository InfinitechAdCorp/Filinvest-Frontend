"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  useDisclosure,
} from "@heroui/react";
import { Article } from "@/types/globals";
import { formatDate } from "@/utils/formatters";
import ArticleModal from "./articleModal";

type Props = {
  articles: Article[];
};

const Articles = ({ articles }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Article | null>(null);

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 mt-2">
        <div className="p-2 flex flex-wrap gap-4 justify-center mx-60 w-full">
          {articles.length > 0 ? (
            <>
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="p-1 w-[20rem]"
                  isPressable
                  onPress={() => {
                    setSelected(article);
                    onOpen();
                  }}
                >
                  <CardHeader className="pb-0">
                    <Image
                      alt="News"
                      className="object-cover h-[11rem] w-full rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${article.image}`}
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <h3 className="font-bold text-large text-primary">
                      {article.name}
                    </h3>
                    <h3 className="text-sm font-semibold text-primary">
                      {formatDate(article.date)}
                    </h3>

                    <p className="text-default-500 line-clamp-3 my-3">
                      {article.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <div className="flex justify-center">
              <h3 className="font-semibold">No Articles Found</h3>
            </div>
          )}
        </div>
      </div>

      <ArticleModal selected={selected} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Articles;
