"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // Preprocess the string to a number
  price: z.preprocess(
    (val) => Number(val), // Attempt to convert the value to a number
    z
      .number()
      .min(0, {
        message: "Price must be a positive number.",
      })
      .max(100000000, {
        message: "Price must not exceed 10,000.",
      })
  ),
  description: z.string().optional(),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });

  function onSubmit(values: {
    name: string;
    price: number;
    description?: string;
  }) {
    // handle form submission
    console.log(values);
    form.reset(); // Reset the form after submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                {/* Ensure the value passed to Input is a string, even if it's a number internally */}
                <Input
                  type="number"
                  placeholder="100"
                  {...field}
                  onChange={(event) => field.onChange(event.target.value)}
                  value={field.value !== undefined ? String(field.value) : ""}
                />
              </FormControl>
              <FormDescription>Enter the price of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="A brief description of the product."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a short description of the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
