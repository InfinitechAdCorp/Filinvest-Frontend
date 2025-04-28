"use client";

import React from "react";
import { Accordion, AccordionItem, Card, Image } from "@heroui/react";
import { FAQ } from "@/types/globals";

type Props = {
  faqs: FAQ[];
};

const FAQs = ({ faqs }: Props) => {
  return (
    <>
      {faqs.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-start justify-between gap-8 md:flex-nowrap">
          <div className="relative flex w-full justify-center md:w-1/2">
            <Image
              src="/images/faq.png"
              alt="Filinvest Image"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="w-full md:w-1/2">
            <Card className="border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
              <Accordion>
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    aria-label={faq.question}
                    title={faq.question}
                    classNames={{
                      title: "text-primary",
                    }}
                  >
                    <p>{faq.answer}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h3 className="font-semibold">No FAQs Found</h3>
        </div>
      )}
    </>
  );
};

export default FAQs;
