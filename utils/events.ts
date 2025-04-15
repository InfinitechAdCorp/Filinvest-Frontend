import toast from "react-hot-toast";
import { revalidate } from "./serverActions";

export const onPostSubmit = async (
  url: string,
  code: number,
  message: string,
  reset: () => void,
  close: () => void
) => {
  if (code == 200) {
    await revalidate(url, code);
    reset();
    close();
    toast.success(message);
  } else {
    toast.error(message);
  }
};
