import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'secreto'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const secret = new TextEncoder().encode(JWT_SECRET)
    
    const { payload } = await jwtVerify(token, secret)

    return NextResponse.json({
      user: {
        id: payload.id,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        role: payload.role
      },
      token 
    })
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    )
  }
}
