import { NextRequest, NextResponse } from "next/server";

import prismadb from '@/libs/prismadb'
import serverAuth from "@/libs/serverAuth";

const handler = async () => {
    try{
        await serverAuth()
        const movies = await prismadb.movie.findMany()
        return NextResponse.json(movies)

    }catch(error){
        console.log(error)
        return NextResponse.json({error: error})
    }
}

export {handler as GET }