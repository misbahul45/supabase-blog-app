'use server'
import prisma from "@/lib/db"
import UserSchema from "@/schema/user-schema"
import { z } from "zod"

type UserRegisterType=z.infer<typeof UserSchema.UserRegisterSchema>
export const createUser=async(userRegister:UserRegisterType)=>{

    const isValidSchema=UserSchema.validateUserRegistration(userRegister)
    if(!isValidSchema) return null

    const { confirmPassword, ...data }=userRegister


    console.log(data)

    try {
        const user=await prisma.user.create({
            data:data
        })
        return user
    } catch (error) {
        console.log(error)  
        return null
    }
}