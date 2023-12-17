'use server'

import { z } from 'zod'
import { FormSchema } from '@/lib/schema'

type Inputs = z.infer<typeof FormSchema>

export async function addEntry(data: Inputs) {
  const result = FormSchema.safeParse(data)
  
  if (result.success) {
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: result.data.title,
        price: result.data.price,
        rating: result.data.rating,
        stock: result.data.stock,
        brand: result.data.brand,
        category: result.data.category,
        description: result.data.description,
      }),
    });
    const data = await res.json();
    return { success: true, data: data }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}

export async function editEntry(data: Inputs, id: string) {
  const result = FormSchema.safeParse(data)
  
  if (result.success) {
    const res = await fetch("https://dummyjson.com/products/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: result.data.title,
        price: result.data.price,
        rating: result.data.rating,
        stock: result.data.stock,
        brand: result.data.brand,
        category: result.data.category,
        description: result.data.description,
      }),
    });
    const data = await res.json();
    return { success: true, data: data }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}

export async function deleteEntry(id: string) {

    const res = await fetch("https://dummyjson.com/products/" + id, {
      method: "DELETE",
  })
    const data = await res.json();
    return { success: true, data: data }

}

export async function fetchCategory() {
  const category = await fetch("https://dummyjson.com/products/categories");

  if (!category.ok) {
    throw new Error("Failed to fetch data");
  }
  return category.json();
}