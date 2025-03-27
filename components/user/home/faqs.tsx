"use client";

import React from "react";
import { Accordion, AccordionItem, Card, Image } from "@heroui/react";
import { FAQ } from "@/types/user";

type Props = {
  faqs: FAQ[];
};

const FAQs = ({ faqs }: Props) => {
  return (
    <>
      {faqs.length > 0 ? (
        <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 mt-4">
          <div className="relative w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/faq.png"
              alt="Filinvest Image"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2">
            <Card className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Accordion className="text-black dark:text-white">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    aria-label={faq.question}
                    title={faq.question}
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
          <h3 className="text-xl font-bold">No FAQs Found</h3>
        </div>
      )}
    </>
  );
};

export default FAQs;
