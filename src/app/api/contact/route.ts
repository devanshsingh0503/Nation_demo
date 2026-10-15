import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('Received contact submission:', data)
    return NextResponse.json({ success: true, message: 'Brief received successfully' })
  } catch {
    return NextResponse.json({ success: true })
  }
}
