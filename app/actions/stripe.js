"use server"

const CURRENCY = "USD"
import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { getCourseDetails } from "@/queries/courses";
import { headers } from "next/headers";

export async function createCheckoutSession(data) {
   const ui_mode = "hosted";
   const origin = headers().get("origin");
   const courseId = data.get("courseId");

   const course = await getCourseDetails(courseId);

   if(!course) return new Error("Course not found");
   const courseName = course?.title;
   const coursePrice = course?.price;

  //  const courseName = data.get("courseName");
  //  const coursePrice = data.get("coursePrice");


   const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "auto",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: courseName
          },
          unit_amount: formatAmountForStripe(coursePrice, CURRENCY),
        }
      }
    ],
    ...(ui_mode === "hosted" && {
      // client_reference_id: data.id,
      // customer_email: data.email,
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
      cancel_url: `${origin}/courses`
    }),
    ui_mode,
   })

   return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url
   }
};

export async function createPaymentIntent(data) {
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: formatAmountForStripe(coursePrice, CURRENCY),
    currency: CURRENCY,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return {
    client_secret: paymentIntent.client_secret,
  };
}