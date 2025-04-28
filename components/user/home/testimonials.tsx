"use client";

import "swiper/css";
import "swiper/css/navigation";

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useDisclosure } from "@heroui/modal";
import { Testimonial } from "@/types/globals";
import TestimonialModal from "./testimonialModal";

type Props = {
  testimonials: Testimonial[];
};

const Testimonials = ({ testimonials }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Testimonial | null>(null);

  return (
    <>
      {testimonials.length > 0 ? (
        <div className="text-center dark:bg-white">
          <div className="p-6">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mx-auto bg-white lg:w-[81.25rem]"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="shadow-lg">
                  <Card
                    isPressable
                    className="flex h-[12.5rem] w-full flex-col justify-center rounded-2xl border border-blue-900 bg-white p-5 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
                    onPress={() => {
                      setSelected(testimonial);
                      onOpen();
                    }}
                  >
                    <CardBody>
                      <p className="text-lg font-semibold text-primary">
                        {testimonial.name}
                      </p>
                      <p className="mt-2 cursor-pointer overflow-hidden text-ellipsis text-sm text-gray-600">
                        {testimonial.message}
                      </p>
                    </CardBody>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h3 className="font-semibold">No Testimonials Found</h3>
        </div>
      )}

      <TestimonialModal selected={selected} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Testimonials;
