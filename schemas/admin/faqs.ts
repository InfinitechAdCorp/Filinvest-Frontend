import * as Yup from "yup";

const rules = {
  question: Yup.string().trim().required(),
  answer: Yup.string().trim().required(),
};

export const create = Yup.object().shape({
  ...rules,
});

export const update = Yup.object().shape({
  ...rules,
  id: Yup.string().trim().required(),
});
