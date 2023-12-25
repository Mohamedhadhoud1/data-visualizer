"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { toast } from "../components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../components/mode-toggle";
import { useState } from "react";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("This is not a valid email."),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  // repeatPassword: z.string().min(8, {
  //   message: "repeated password must be at least 8 characters.",
  // }),
});

export function Register() {
  const navigate = useNavigate();
  const [error,setError] = useState('');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName:"",
      lastName:'',
      email:'',
      userName: "",
      password:"",
      // repeatPassword:"",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
       data
    ),
    });

    const content = await response.json();
     if (content.message) {
      setError(content.message);
     }
      if (content.firstName) {
        navigate("/login");
      }
  };
    
  

  return (
    <>
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
      <div className="mx-auto my-20  text-center text-3xl font-extrabold">
        <p>Register</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 mx-auto my-20"
        >
          <p className="text-red-500 text-center">{error ? error : null}</p>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Name@gamil.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PassWord</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="RepeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat PassWord</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repeat password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Register</Button>
          <p className="sm:inline sm:ml-5">
            already have an accout{" "}
            <Link to="/login" className="underline ml-2">
              Log In
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
}
