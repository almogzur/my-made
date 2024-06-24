import {getSession} from "next-auth/react"

export default async function hendler (req,res){

    const session = await getSession({ req });



}