import { NextRequest, NextResponse } from "next/server";

import { timeline } from "@/app/lib/placeholder-data";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { 
      headers: { "Content-Type": "application/json" },
      status: 200 ,
      data: timeline
    }
  );
}