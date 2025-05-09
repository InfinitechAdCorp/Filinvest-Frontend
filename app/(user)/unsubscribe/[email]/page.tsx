import Body from "@/components/user/unsubscribe/body";
import axios from "axios";

const Page = async ({ params }: { params: Promise<{ email: string }> }) => {
  const email = (await params).email.replace("%40", "@");

  let code;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subscribers/unsubscribe/${email}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    code = response.status;
  } catch (error: any) {
    console.error(error);
    code = error.status;
  }

  return <Body code={code} />;
};

export default Page;
