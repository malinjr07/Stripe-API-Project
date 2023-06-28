import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface createCustomer extends NextApiRequest {
  body: {
    name: string;
    email: string;
    phoneNumber: string;
    description: string;
    address: string;
    city: string;
    country: string;
  };
}

export async function POST(request: createCustomer) {
  const { name, email, phoneNumber, description, address, city, country } =
    request.body;
  const customer = await stripe.customers.create({
    name,
    email,
    phone: phoneNumber,
    description,
    address: {
      city,
      country,
      line1: address,
    },
  });

  return NextResponse.json({
    message: 'customer creation in stripe successfully!',
    data: customer,
  });
}

