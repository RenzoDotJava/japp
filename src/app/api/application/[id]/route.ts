import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Application } from "@/types";


export async function POST(request: Request, { params }: any) {
  const { id } = params;

  const data: Application = await request.json()

  try {
    const application = await db.application.update({
      where: {
        id: id
      },
      data: {
        jobPosition: data.jobPosition,
        jobType: data.jobType,
        company: data.company,
        salary: Number(data.salary),
        column: data.column.toString(),
        url: data.url
      }
    })
    
    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar la aplicación de trabajo' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: any) {
  const { id } = params;

  try {
    const application = await db.application.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la aplicación de trabajo' }, { status: 500 })
  }
}