import { NextResponse } from "next/server";

export async function getData() {
  try {
    const header = {
      keys: '6a729b8c2539d2358ab59e329f314583'
    }
    const response = await fetch('https://api.rajaongkir.com/starter/city');
    return response;
  } catch (err) {
    return err
    // return NextResponse.json({ message: "Internal server error" });
  }
}
