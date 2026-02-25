import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, rating, message } = await req.json();

    if (!email || !rating) {
      return NextResponse.json({ error: 'Email and rating are required' }, { status: 400 });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Environment variables GMAIL_USER or GMAIL_PASS are missing');
      return NextResponse.json({ 
        error: 'Server configuration error', 
        details: 'Missing environment variables' 
      }, { status: 500 });
    }

    // Configure Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'rameezrahman17@gmail.com',
      subject: 'New Feedback Received',
      text: `
        New feedback from: ${email}
        Rating: ${rating} / 5 stars
        
        Opinion:
        ${message}
      `,
    });

    return NextResponse.json({ message: 'Feedback submitted successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      error: 'Error sending feedback', 
      details: error.message 
    }, { status: 500 });
  }
}
