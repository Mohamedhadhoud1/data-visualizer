"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { toast } from "../../../components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../../../components/mode-toggle";
import { useState } from "react";

const FormSchema = z.object({
  folderNumber: z.string(),
  seller: z.string(),
  name: z.string(),
  mail: z.string().email("This is not a valid email."),
  salesAmount: z.string(),
  course: z.string(),
  dateStartCourse: z.string(),
  dateEndCourse: z.string(),
  courseAcivated: z.string(),
  courseLink: z.string(),
  courseCode: z.string(),
});

export function AddClient() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      folderNumber: "",
      salesAmount: "",
      seller: "",
      name: "",
      mail: "",
      course: "",
      dateStartCourse: "",
      dateEndCourse: "",
      courseAcivated: "",
      courseLink: "",
      courseCode: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("haha");
    const response = await fetch(
      "https://data-visualizer-production.up.railway.app/data/addOne",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const content = await response.json();
    if (content) {
      setError("");
      toast({
        title: "Client Added Successfully",
      });
      navigate("/admin");
    } else {
      setError(content.message);
    }
  };

  return (
    <>
      <div className="absolute right-5 top-5"></div>
      <div className="mx-auto my-20  text-center text-3xl font-extrabold">
        <p>Add New Client</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 mx-auto my-20"
        >
          <p className="text-red-500 text-center">{error ? error : null}</p>
          <FormField
            control={form.control}
            name="folderNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>folderNumber</FormLabel>
                <FormControl>
                  <Input placeholder="folderNumber" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seller"
            render={({ field }) => (
              <FormItem>
                <FormLabel>seller</FormLabel>
                <FormControl>
                  <Input placeholder="seller" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>mail</FormLabel>
                <FormControl>
                  <Input placeholder="mail" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salesAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>salesAmount</FormLabel>
                <FormControl>
                  <Input placeholder="salesAmount" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>course</FormLabel>
                <FormControl>
                  <Input placeholder="course" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateStartCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>dateStartCourse</FormLabel>
                <FormControl>
                  <Input placeholder="dateStartCourse" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateEndCourse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>dateEndCourse</FormLabel>
                <FormControl>
                  <Input placeholder="dateEndCourse" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseAcivated"
            render={({ field }) => (
              <FormItem>
                <FormLabel>courseAcivated</FormLabel>
                <FormControl>
                  <Input placeholder="courseAcivated" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>courseLink</FormLabel>
                <FormControl>
                  <Input placeholder="courseLink" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>courseCode</FormLabel>
                <FormControl>
                  <Input placeholder="courseCode" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add</Button>
        </form>
      </Form>
    </>
  );
}
