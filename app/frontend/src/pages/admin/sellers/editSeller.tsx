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
import { useContext, useState } from "react";
import { ClientContext } from "../../../context/clientContext";
import { Seller } from "@/interface/seller";

const FormSchema = z.object({
  mainSellerName: z.string(),
  mainSellerMail: z.string(),
  subSellerName: z.string(),
  subSellerMail: z.string(),
  code: z.string(),
});

export function EditSeller(props:{seller:Seller|undefined}) {
  console.log(props.seller)
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { client } = useContext(ClientContext);
  console.log(client, "llll");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mainSellerName:props.seller?.mainSellerName,
      mainSellerMail: props.seller?.mainSellerMail,
      subSellerName: props.seller?.subSellerName,
      subSellerMail: props.seller?.subSellerMail,
      code: props.seller?.code,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch(
      `https://data-visualizer-production.up.railway.app/sellers/${props.seller?.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const content = await response.json();
    if (content.affected === 1) {
      setError("");
      toast({
        title: "Seller Added Successfully",
      });
      navigate("/sellers");
    } else {
      setError(content.message);
    }
  };

  return (
    <>
      <div className="absolute right-5 top-5"></div>
      <div className="mx-auto my-20  text-center text-3xl font-extrabold">
        <p>Edit Client</p>
      </div>
      {props.seller ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6 mx-auto my-20"
          >
            <p className="text-red-500 text-center">{error ? error : null}</p>
            <FormField
              control={form.control}
              name="mainSellerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>mainSellerName</FormLabel>
                  <FormControl>
                    <Input placeholder="mainSellerName" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainSellerMail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>mainSellerMail</FormLabel>
                  <FormControl>
                    <Input placeholder="mainSellerMail" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subSellerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>subSellerName</FormLabel>
                  <FormControl>
                    <Input placeholder="subSellerName" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subSellerMail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>subSellerMail</FormLabel>
                  <FormControl>
                    <Input placeholder="subSellerMail" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Add</Button>
          </form>
        </Form>
      ) : (
        <div className="mx-auto my-20  text-center text-2xl font-extrabold text-red-500">
          <p>Please Select A Seller From The Table To Edit</p>
        </div>
      )}
    </>
  );
}
