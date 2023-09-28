import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import prismadb from '@/lib/prismadb'
import {compare} from 'bcrypt'

export default NextAuth({
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email:{
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: "Password",
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password){
                    throw new Error('Email and password required')
                }

                // get user by email
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // check if user exists
                if(!user || !user.hashedPassword){
                    throw new Error('Email does not exist')
                }

                // varify user password
                const isCorrectPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                );
                
                // throw error if password is incorrect
                if(!isCorrectPassword){
                    throw new Error("Incorrect password")
                }

                // return user upon successful login
                return user

            }
        })
    ],
    pages: {
        signIn: '/auth',        
    },
    debug: process.env.NODE_ENV == 'development',
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
})