"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// register data structure
const formSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "please make sure to match the password format"
      ),
    name: z.string().min(3, "name must be at least 3 characters"),
    phone: z
      .string("make sure to enter a phone number")
      .regex(
        /^012|011|010|015[0-9]+$/,
        "phone number must be an Egyptian phone number"
      )
      .min(11, "phone number must be at lest 11 numbers")
      .max(11, "phone number can't exceed 11 number"),
    rePassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Please make sure passwords match"
      ),
  })
  .refine((data) => data.password === data.rePassword, {
    error: "Make sure passwords match",
  });
// refine defines a condition that only submits the user info based on
// the data type from the register form
type registerSchema = z.infer<typeof formSchema>;
export default function RegisterPage() {
  const passwordValue = useRef<HTMLInputElement | null>(null);
  const [hideFormat, setHideFormat] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      rePassword: "",
      phone: "",
    },
  });
  // submit function has to be async
  async function onSubmitForm(data: registerSchema) {
    // to link next auth signin page with our custom we use signIn function from next-auth/react
    try {
      setIsLoading(true);
      const response = fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      setIsLoading(false);
      if ((await response).status === 409) {
        toast.error("This account already exists");
      } else if ((await response).status === 200) {
        toast.success(`Account created successfully`);
        router.replace("/auth/login");
      }

      // router.replace("/auth/login");
    } catch (error) {
      toast.error(`${error})`);
    }
  }
  return (
    <div className="flex justify-center mt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="space-y-8 min-w-92 mx-auto flex flex-col justify-center"
        >
          {/******************** name ********************/}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} type="string" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          {/******************** phone ********************/}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="010*********" {...field} type="string" />
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
                <FormControl
                  onChange={() =>
                    passwordValue?.current?.value
                      ? setHideFormat(null)
                      : setHideFormat(true)
                  }
                >
                  <Input
                    placeholder="*********"
                    {...field}
                    type="password"
                    ref={passwordValue}
                  />
                </FormControl>
                <FormMessage />
                <div
                  className={`flex justify-center mt-2 ${
                    hideFormat === null ? `` : `hidden`
                  }`}
                >
                  <ul className="list-disc bg-zinc-100 list-inside w-80 p-3 rounded-2xl text-zinc-500 text-sm font-semibold tracking-wide">
                    <li>Minimum eight characters</li>
                    <li>At least one uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li> one number and one special character</li>
                  </ul>
                </div>
              </FormItem>
            )}
          />

          {/******************** rePassword ********************/}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="*********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading === true ? (
            <Button type="submit" disabled>
              <Loader2Icon className="animate-spin" />
              Submit
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </div>
  );
}
