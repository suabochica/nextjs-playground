import { firestore } from "@/firebase/admin";
import { NextRequest, NextResponse } from "next/server";
import { DocumentData } from "@google-cloud/firestore";

interface DevitData extends DocumentData {
  createdAt: FirebaseFirestore.Timestamp;
}

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const doc = await firestore.collection("devits").doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const data = doc.data() as DevitData;
    const { createdAt } = data;

    const responseData = {
      ...data,
      id: doc.id,
      createdAt: +createdAt.toDate(),
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('ln#36 error', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
