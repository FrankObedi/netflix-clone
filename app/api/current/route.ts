import { NextResponse, NextRequest } from 'next/server'
import serverAuth from "@/libs/serverAuth";

async function handler(){
    try{
        const {currentUser} = await serverAuth()
        return NextResponse.json(currentUser, {status: 200})    
    }catch(error){
        console.log(error)
        return NextResponse.json({error: error}, {status: 400})
    }
}

export { handler as GET }