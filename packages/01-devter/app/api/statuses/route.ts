import { NextRequest, NextResponse } from "next/server";

import { timeline } from "@/app/lib/placeholder-data";

export async function GET(request: NextRequest) {
  console.log('ln#6 test', request);
  return NextResponse.json(
    { 
      headers: { "Content-Type": "application/json" },
      status: 200 ,
      data: timeline
    }
  );
}