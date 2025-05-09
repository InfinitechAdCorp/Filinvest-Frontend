"use client";

import { Article } from "@/types/globals";
import { formatDate } from "@/utils/formatters";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import ArticleModal from "./articleModal";

type Props = {
  articles: Article[];
};

const Articles = ({ articles }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Article | null>(null);

  return (
    <>
      <div className="mt-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Card
                key={article.id}
                className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md p-1"
                isPressable
                onPress={() => {
                  setSelected(article);
                  onOpen();
                }}
              >
                <CardHeader className="pb-0 flex justify-center">
                  <Image
                    alt="News"
                    className="h-44 w-full rounded-xl object-cover"
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${article.image}`}
                  />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <h3 className="text-large font-bold text-primary">
                    {article.name}
                  </h3>
                  <h3 className="text-sm font-semibold text-primary">
                    {formatDate(article.date)}
                  </h3>
                  <p className="my-3 line-clamp-3 text-default-500">
                    {article.description}
                  </p>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="flex justify-center w-full">
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
