import { error } from '@sveltejs/kit'
import {RequestEvent} from "@sveltejs/kit"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function load(RequestEvent) {

    const cookies = RequestEvent.cookies

    if (cookies.get('token')) {
        const token = cookies.get('token')
        const privateKey = Buffer.from(process.env.JWT_SECRET, "base64")
        const jwtUser = jwt.verify(token, privateKey)
        const userEmail = jwtUser.email.S
    } else {
        const credentials = {"email":"kyfr59@gmail.com", "password":"passss"}
        const response = await fetch('https://fk7npstkma.execute-api.us-east-1.amazonaws.com/dev/login',
        {
            "method": "POST",
            "body": JSON.stringify(credentials)

        })
        const json = await response.json()
        cookies.set('token', json.token, {
            "path": '/',
        })
    }
}
