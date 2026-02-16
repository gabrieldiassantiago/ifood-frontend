import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Token não fornecido' },
        { status: 401 }
      )
    }

    const response = await fetch(`${BACKEND_API_URL}/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data.data || data)
  } catch (error) {
    console.error('Erro ao buscar pedido:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar pedido' },
      { status: 500 }
    )
  }
}
