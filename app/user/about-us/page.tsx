import Hero from "@/components/globals/hero";
import Images from "@/components/user/about-us/images";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <Hero
        image="/images/banner.jpg"
        title="About-Us"
        description="Learn more about Filinvest and our journey in building Filipino dreams."
      />

      <div className="flex flex-col items-center p-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 text-left max-w-xl">
            <p className="mb-4">
              The name Filinvest has become synonymous with property
              development. From humble beginnings over 60 years ago, it has
              diversified into a leading full-range property developer with
              strategic interests in high-growth industries.
            </p>
            <p className="mb-4">
              Filinvest Development Corporation (FDC), the holding company of
              the Filinvest Group, traces its origins to the consumer finance
              business established by Andrew L. Gotianun, Sr. and his family in
              1955. Today, FDC is one of the Philippines’ leading conglomerates,
              with interests in real estate, banking and financial services,
              hotel and resort management, power generation, and the sugar
              industry.
            </p>
            <p className="mb-4">
              FDC entered the real estate business in 1967 and has proven its
              mettle in a diverse range of real estate developments: residential
              subdivisions, shopping centers, central business districts,
              mid-rise and high-rise offices and condominiums, recreational
              farms, industrial estates, leisure clubs, and IT zones – covering
              more than 2,500 hectares.
            </p>
            <p>
              Driven by its commitment to building the Filipino dream, Filinvest
              has built homes for over 160,000 families. With each new endeavor,
              the company continues to fulfill Filipino dreams, making it
              possible for more Filipinos to acquire their first home, a lasting
              legacy, or their most desired lifestyle.
            </p>
          </div>

          <Images />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
