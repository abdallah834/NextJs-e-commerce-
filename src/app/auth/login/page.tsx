"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

// login data structure
const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});
// the data type from the login form
type loginSchema = z.infer<typeof formSchema>;

// form
export default function Login() {
  //userRouter = useNavigate (react-router)
  // make sure to import useRouter from next/navigation
  const router = useRouter();
  async function onSubmitForm(data: loginSchema) {
    // to link next auth signin page with our custom we use signIn function from next-auth/react
    const userResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      // on success returns user to home
      callbackUrl: "/",
      redirect: false,
    });

    if (!userResponse?.ok) {
      toast.error(userResponse?.error);
    } else {
      router.replace("/");
    }
  }
  //1- make sure to always include zodResolver(formSchema) so the handleSubmit function works properly
  //2- to not have the error return as undefined we use defaultValues from useForm({}) and set the value to ""
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  return (
    <div className="min-h-92 flex justify-center mt-15">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="space-y-8 min-w-92 mx-auto flex flex-col justify-center"
        >
          {/******************** Email ********************/}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/******************** Password ********************/}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold">Don't have an account?</span>
            <Link href={"/auth/register"}>
              <span className="bg-black text-white py-0.5 px-3 rounded-lg flex items-center font-semibold transition-all duration-300 border-1 border-black hover:text-black hover:bg-white active:scale-95">
                Sign up
              </span>
            </Link>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
