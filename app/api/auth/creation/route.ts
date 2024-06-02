// import prisma from "@/app/libs/db";
import prisma from "@/app/libs/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import {unstable_noStore as nocache} from 'next/cache'

export async function GET() {
    nocache();
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || user == null) {
            throw new Error("User not found");
        }

        let dbUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    email: user.email ?? "",
                    firstName: user.given_name ?? "",
                    lastName: user.family_name ?? "",
                    id: user.id,
                    profileName: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
                },
            });
        }

        return NextResponse.redirect(process.env.URL as string);
    } catch (error) {
        console.error("Error in GET function:", error);
        throw new Error("An error occurred");
    }
}
