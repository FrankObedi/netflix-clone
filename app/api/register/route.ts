import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'
 
export async function POST(request: Request) {
  try{
    const body = await request.json()
    const {email, name, password} = body

    const existingUser = await prismadb.user.findUnique({
      where: {
        email
      }
    })

    // check if users exists based on email
    if (existingUser) {
      return NextResponse.json({error: 'Email take'}, {status: 422})
    }

    // incrypt the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // create the new user
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date()
      }
    })
    
    return NextResponse.json({user}, {status: 200})
  }catch(error){
    return NextResponse.json({error: `Something went wrong: ${error}`}, {status: 400})
  }
}