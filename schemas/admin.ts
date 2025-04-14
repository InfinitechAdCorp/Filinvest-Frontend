import * as Yup from "yup";

export const destroy = Yup.object().shape({
  id: Yup.string().trim().required("ID is a required field"),
});

export const faq = {
  question: Yup.string().trim().required(),
  answer: Yup.string().trim().required(),
};
