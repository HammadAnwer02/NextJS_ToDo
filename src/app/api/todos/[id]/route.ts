// src/app/api/todos/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request, { params }: { params: Record<string, string> }) {
  const { id } = params;  
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  return NextResponse.json(todo);
}

export async function PUT(req: Request, { params }: { params: Record<string, string> }) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { title } = await req.json();
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { title },
  });
  return NextResponse.json(updatedTodo);
}
