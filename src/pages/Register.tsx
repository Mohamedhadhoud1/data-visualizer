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

const FormSchema = z.object({
  FirstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  LastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("This is not a valid email."),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  RepeatPassword: z.string().min(8, {
    message: "repeated password must be at least 8 characters.",
  }),
});

export function Register() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      FirstName:"",
      LastName:'',
      email:'',
      username: "",
      password:"",
      RepeatPassword:"",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    navigate("/login");
  }

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
          <FormField
            control={form.control}
            name="FirstName"
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
            name="LastName"
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
            name="username"
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

          <FormField
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
          />
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
