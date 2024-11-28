import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Verkrijg de gegevens van het verzoek
    const { email, password } = await req.json();

    // Controleer of de velden aanwezig zijn
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Kijk of de gebruiker al bestaat
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    // Hasht het wachtwoord met bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Maak de nieuwe gebruiker aan
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Geef succesbericht terug
    return NextResponse.json(
      { message: "User registered successfully.", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user.", error },
      { status: 500 }
    );
  }
}
