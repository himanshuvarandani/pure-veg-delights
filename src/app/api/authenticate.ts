import { auth } from "@/firebase/server"
import { FirebaseAppError } from "firebase-admin/app"
import { NextRequest, NextResponse } from "next/server"

export async function authenticate(request: NextRequest, next: () => Promise<NextResponse>) {
  // Verify user token from request headers
  const token = request.headers.get("authorization")?.split("Bearer ")[1]
  if (!token) {
    return NextResponse.json({}, { status: 401, statusText: "Unauthorized" })
  }

  try {
    const decodedToken = await auth.verifyIdToken(token)
    request.headers.set("x-decoded-token", JSON.stringify(decodedToken))
    return await next()
  } catch (err: any) {
    const error: FirebaseAppError = err
    switch (error.code) {
      case "auth/id-token-expired":
        return NextResponse.json({}, { status: 401, statusText: "Token expired" })
      case "auth/argument-error":
        return NextResponse.json({}, { status: 401, statusText: "Invalid token" })
      case "auth/id-token-revoked":
        return NextResponse.json({}, { status: 401, statusText: "Token revoked" })
      case 'auth/invalid-id-token':
        return NextResponse.json({}, { status: 401, statusText: "Invalid ID token" })
      case 'auth/invalid-uid':
        return NextResponse.json({}, { status: 401, statusText: "Invalid ID" })
      case 'auth/user-disabled':
        return NextResponse.json({}, { status: 401, statusText: "User account is disabled" })
      default:
        return NextResponse.json({}, { status: 401, statusText: "Authentication error" })
    }
  }
}
