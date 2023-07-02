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
  console.log('🚀 ~ file: route.ts:22 ~ POST ~ country:', request.body);

  const token = await stripe.tokens.create({
    card: {
      number: '4000056655665556',
      exp_month: 6,
      exp_year: 2024,
      cvc: '314',
    },
  });

  return NextResponse.json({
    message: 'customer creation in stripe successfully!',
    data: token,
  });
}

