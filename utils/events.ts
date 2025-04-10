import toast from "react-hot-toast";

export const onPostSubmit = (
  code: number,
  message: string,
  reset: () => void,
  close: () => void
) => {
  if (code == 200) {
    reset();
    close();
    toast.success(message);
  } else {
    toast.error(message);
  }
};
