import { NextRequest, NextResponse } from "next/server"

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ district: string }> }
) {
  try {
    const { district } = await params
    const response = await fetch(`${BACKEND_API_URL}/delivery-fees/districts/${encodeURIComponent(district)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Bairro não encontrado' },
        { status: 404 }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data)
  } catch (error) {
    console.error('Erro ao buscar taxa de entrega:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar taxa de entrega' },
      { status: 500 }
    )
  }
}
