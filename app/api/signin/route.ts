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

    // Zoek de gebruiker in de database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Vergelijk het ingevoerde wachtwoord met het gehashte wachtwoord
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Geef succesbericht terug
    return NextResponse.json(
      { message: "Login successful.", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in.", error },
      { status: 500 }
    );
  }
}
