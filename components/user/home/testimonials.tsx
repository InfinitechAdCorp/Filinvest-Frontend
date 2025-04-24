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
              className="lg:w-[81.25rem] mx-auto bg-white"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="shadow-lg">
                  <Card
                    isPressable
                    className="w-full h-[12.5rem] bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300 border border-blue-900 p-5 flex flex-col justify-center"
                    onPress={() => {
                      setSelected(testimonial);
                      onOpen();
                    }}
                  >
                    <CardBody>
                      <p className="text-lg font-semibold text-primary">
                        {testimonial.name}
                      </p>
                      <p className="overflow-hidden text-ellipsis text-sm text-gray-600 mt-2 cursor-pointer">
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
