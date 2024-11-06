import { NextResponse } from "next/server";

import { timeline } from "@/app/lib/placeholder-data";

export async function GET() {
  return NextResponse.json(
    { 
      headers: { "Content-Type": "application/json" },
      status: 200 ,
      data: timeline
    }
  );
}