import { z } from "zod";

const zodNumber = (name: string) => {
    return z
      .string()
      .regex(/^\d*\.?\d*$/, { message: name + " Must be Number" })
      .min(1, { message: name + " This field is required" });
  };

  const zodString = (name: string) => {
    return z
      .string()
      .min(1, { message: name + " This field is required" });
  };

export const FormSchema = z.object({
    title: zodString("Title"),
    price: zodNumber("Price"),
    rating: zodNumber("Rating"),
    stock: zodNumber("Stock"),
    brand: zodString("Brand"),
    category: zodString("Category"),
    description: zodString("Description"),
  });