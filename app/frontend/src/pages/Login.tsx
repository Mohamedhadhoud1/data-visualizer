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
import { Link ,useNavigate } from "react-router-dom";
import { ModeToggle } from "../components/mode-toggle";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

const FormSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(1, {
    message: "password musn't be empty.",
  }),
});

export function Login() {
  const navigate= useNavigate();
  const [error, setError] = useState("");
  const {user, setUser} = useContext(UserContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password:""
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,"Origin":"*"},
      credentials: "include",
      body: JSON.stringify(
       data
      ),
    });

    const content = await response.json();
    console.log(content);
     if (content.message==='success') {
       navigate('/')
     }else{
      setError(content.message)
     } 
  };


  return (
    <>
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
      <div className="mx-auto my-20 text-center text-3xl font-extrabold">
        <p>Log In</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 mx-auto my-20"
        >
          <p className="text-red-500 text-center">{error ? error : null}</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PassWord</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log In</Button>
          <p className="sm:inline sm:ml-5">
            Don't have an accout
            <Link to="/register" className="underline ml-2">
              Register
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
}
