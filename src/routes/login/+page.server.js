import { error } from '@sveltejs/kit'
import 'dotenv/config'
import { fail } from '@sveltejs/kit'
import { verifyToken } from '../../../shared.js'

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {

        const cookies = event.cookies
        const request = event.request

        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')
        if (!email) {
            return fail(400, {
                email: "L'adresse e-mail est obligatoire"
            })
        }
        if (!password) {
            return fail(400, {
                password: "Le mot de passe est obligatoire"
            })
        }

        const { error, token } = await loginUser(email, password)

        if (error) {
            return fail(400, {
                password: error
            })
        }

        cookies.set('token', token, {
            "path": '/',
        })
    }
}


/**
 * @param {FormDataEntryValue} email
 * @param {FormDataEntryValue} password
 */
async function loginUser(email, password) {

    const credentials = {"email": email, "password": password}
    const response = await fetch('https://fk7npstkma.execute-api.us-east-1.amazonaws.com/dev/login',
    {
        "method": "POST",
        "body": JSON.stringify(credentials)
    })

    const json = await response.json()
    if (!json.auth) {
        return {
            error: "Identifiant ou mot de passe incorrect"
        }
    }

    const token = json.token

    const { error, userToken } = await verifyToken(token)
    if (error) {
        return { error}
    }
    return { token }
}
