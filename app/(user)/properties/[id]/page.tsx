import Amenities from "@/components/user/property/amenities";
import Details from "@/components/user/property/details";
import Map from "@/components/user/property/map";
import Offerings from "@/components/user/property/offerings";
import { Property } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  let property: Property | null = null;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/main/properties/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    property = response.data.record;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  return (
    <>
      {property ? (
        <div className="flex w-full justify-center">
          <div className="relative mx-60 my-7 flex max-w-[57rem] flex-col items-start justify-start space-y-5">
            <Details property={property} />
            <Amenities property={property} />
            <Map property={property} />
            <Offerings property={property} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h3 className="font-semibold">Property Not Found</h3>
        </div>
      )}
    </>
  );
};

export default Page;
