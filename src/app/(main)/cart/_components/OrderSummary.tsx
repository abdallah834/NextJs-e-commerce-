import { useCart } from "@/app/(context)/CartContextProvider";
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
import { checkOutCOD, checkOutCredit } from "@/lib/services/cart";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function OrderSummary() {
  // getting cart info
  const { cartData } = useCart();

  const formSchema = z.object({
    details: z.string().min(5, "Please enter a valid address"),
    phone: z
      .string()
      .min(11, "Please enter an Egyptian number")
      .max(11, "Please enter an Egyptian number"),
    city: z.string(),
    payment_method: z.enum(["COD", "Credit"], "Pick a payment method"),
  });
  type checkOutSchema = z.infer<typeof formSchema>;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { details: "", phone: "", city: "" },
  });
  async function onCheckOut(data: checkOutSchema) {
    // the format of the data going to the backend before getting stringified
    // creating a non mutating object that has necessary data going to back end without the extra payment_method key
    const { payment_method, ...filteredData } = data;
    const address = { shippingAddress: filteredData };
    if (data.payment_method === "COD") {
      await toast.promise(checkOutCOD(address, cartData?.cartId), {
        loading: "Processing yor order...",
        success: "Your order has been confirmed (test)",
        error: "Failed to Process yor order",
      });
    } else {
      const creditResponse = await checkOutCredit(address, cartData?.cartId);
      console.log("credit", creditResponse);
    }
  }
  return (
    <div className="bg-zinc-200 py-12 px-13 rounded-xl w-sm md:w-md lg:w-[415px]">
      <h3 className="mb-14 text-xl font-semibold">Order summary</h3>
      <div className="summary-container flex flex-col gap-5">
        <div className="flex justify-between items-center gap-23">
          <span className="text-sm font-bold">Subtotal</span>
          <span>20 EGP</span>
        </div>
        <div className="flex justify-between items-center gap-23">
          <span className="text-sm font-bold">Discount</span>
          <span>20 EGP</span>
        </div>
        <div className="flex justify-between items-center gap-23 border-1 border-b-black/30 pb-6">
          <span className="text-sm font-bold">Delivery fee</span>
          <span>20 EGP</span>
        </div>
        <div className="flex justify-between items-center gap-23 mt-2">
          <span className="text-2xl font-semibold">Total</span>
          <span className="font-bold">20 EGP</span>
        </div>
        <div className="min-h-92 flex justify-center mt-15">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onCheckOut)}
              className="space-y-8 min-w-92 mx-auto flex flex-col justify-center"
            >
              {/******************** details ********************/}
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order details</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        className="border-2 border-black/40"
                      />
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
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        type="string"
                        className="border-2 border-black/40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/******************** city ********************/}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Governorate</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: Cairo"
                        {...field}
                        type="string"
                        className="border-2 border-black/40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                {/******************** payment method COD********************/}
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel>COD</FormLabel>
                      <FormControl className="size-6">
                        <Input
                          placeholder="ex: Cairo"
                          {...field}
                          type="radio"
                          value={"COD"}
                          className="cursor-pointer size-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/******************** payment method COD********************/}
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel>Credit or Debit card</FormLabel>
                      <FormControl className="size-6">
                        <Input
                          placeholder="ex: Cairo"
                          {...field}
                          type="radio"
                          value={"Credit"}
                          className="cursor-pointer size-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-2"></div>
              <Button className="mt-10">Proceed to checkout</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
