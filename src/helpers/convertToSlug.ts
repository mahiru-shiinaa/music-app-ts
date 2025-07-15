import unidecode from "unidecode";

export const convertToSlug = (Text: string) : string => {
  Text = unidecode(Text.trim());
  return Text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
};