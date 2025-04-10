import * as Yup from "yup";

export const faq = {
  question: Yup.string().trim().required(),
  answer: Yup.string().trim().required(),
};