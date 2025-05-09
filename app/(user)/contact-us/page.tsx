import Hero from "@/components/globals/hero";
import Body from "@/components/user/contact-us/body";
import { Property } from "@/types/globals";
import { sortRecords } from "@/utils/formatters";
import axios from "axios";
import toast from "react-hot-toast";

const Page = async () => {
  let properties: Property[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/main/properties`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    properties = response.data.records;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  properties = properties.filter((property) => {
    return property.isPublished == 1;
  });
  properties = sortRecords(properties, "name");

  return (
    <>
      <Hero
        image="/images/banner.jpg"
        title="Contact Us"
        description="Get in touch with us for inquiries, partnerships, or assistance. We're here to help!"
      />

<div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-72 my-7 flex justify-center">

        <Body properties={properties} />
      </div>
    </>
  );
};

export default Page;
