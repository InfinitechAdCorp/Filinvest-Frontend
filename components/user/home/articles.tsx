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
      <div className="mt-2 flex flex-wrap items-start justify-between gap-8 md:flex-nowrap">
        <div className="mx-60 flex w-full flex-wrap justify-center gap-4 p-2">
          {articles.length > 0 ? (
            <>
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="w-[20rem] p-1"
                  isPressable
                  onPress={() => {
                    setSelected(article);
                    onOpen();
                  }}
                >
                  <CardHeader className="pb-0 flex justify-center">
                    <Image
                      alt="News"
                      className="h-[11rem] w-[18rem] rounded-xl object-cover"
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
