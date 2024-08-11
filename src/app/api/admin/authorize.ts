import { authenticate } from "@/app/api/authenticate"
import { auth } from "@/firebase/server"
import { DecodedIdToken } from "firebase-admin/auth"
import { NextRequest, NextResponse } from "next/server"

export async function authorize(request: NextRequest, next: () => Promise<NextResponse>) {
  return authenticate(request, async () => {
    const decodedToken: DecodedIdToken = JSON.parse(request.headers.get("x-decoded-token") as string)
    const user = await auth.getUser(decodedToken.uid)
    if (user.customClaims && user.customClaims.admin)
      return await next()
    
    return NextResponse.json({}, { status: 401, statusText: "Unauthorized" })
  })
}