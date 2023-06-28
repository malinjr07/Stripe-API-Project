import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function GET(request: Request) {
  /*  const customer = await stripe.customers.create({
    description:
      'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
  }); */

  const customers = await stripe.customers.list();

  console.log('customer data is', customers);

  return NextResponse.json({
    message: 'customers retrieve from stripe successfully!',
    data: customers?.data,
    hasMore: customers?.has_more,
  });
}

