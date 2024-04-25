import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authConfig } from "@/lib/auth";
import { db } from "@/lib/db";
import { Application } from "@/types";

export async function GET() {
  const session = await getServerSession(authConfig)

  try {
    const applications = await db.application.findMany({
      select: {
        id: true,
        jobPosition: true,
        jobType: true,
        company: true,
        salary: true,
        column: true,
        url: true
      },
      where: {
        userId: session?.user?.id!
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las aplicaciones de trabajo' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authConfig)

  const data: Application = await request.json()

  try {
    const application = await db.application.create({
      data: {
        jobPosition: data.jobPosition,
        jobType: data.jobType,
        company: data.company,
        salary: Number(data.salary),
        column: data.column.toString(),
        url: data.url,
        userId: session?.user?.id!
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear la aplicación de trabajo' }, { status: 500 })
  }
}