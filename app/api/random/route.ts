import { NextRequest, NextResponse } from "next/server";

import prismadb from '@/libs/prismadb'
import serverAuth from "@/libs/serverAuth";

const handler = async () =>{
    try{
        await serverAuth()

        const moviewCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * moviewCount)

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })

        return NextResponse.json(randomMovies[0], {status: 200})

    }catch(error){
        console.log(error)
        return NextResponse.json({error: error}, {status: 400})
    }

}

export {handler as GET}