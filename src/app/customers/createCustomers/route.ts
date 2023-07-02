import { NextResponse } from 'next/server';

const stripe = require('stripe')(
  'sk_test_51NNUBQF6ve8FNl5RxEKCceFWSU2t17C7rmBzUuDfmB5c6qPSdrVEpAOv1ya5BwpJqqvVBRRkL4EzFCnFh66IdGc100Xnd2C7RH'
);

export async function POST(request: Request) {
  const requestBody = await request.json();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    description,
    address,
    city,
    country,
  } = requestBody;

  const customer = await stripe.customers.create({
    name: firstName + ' ' + lastName,
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

