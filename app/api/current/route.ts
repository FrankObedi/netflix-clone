import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from 'next/server'
import serverAuth from "@/libs/serverAuth";

async function handler(){
    try{
        const {currentUser} = await serverAuth()
        return NextResponse.json(currentUser, {status: 200})
        // res.status(200).json(currentUser)        
    }catch(error){
        console.log(error)
        return NextResponse.json({error: error}, {status: 400})
        //  res.status(400).end
    }
}

export { handler as GET }