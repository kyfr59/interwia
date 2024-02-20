import jwt from 'jsonwebtoken'
import { redirect } from '@sveltejs/kit'
import { verifyToken } from '../shared.js'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    const token = event.cookies.get('token')

    if (event.url.pathname != '/login') {

        // Redirects to login page if no token
        if (!token) {
            throw redirect(302, '/login')
        }

        // Validate the auth token
        const {error, userToken} = await verifyToken(token)

        // Redirects to login page if invalid token
        if (!userToken) {
            event.locals.userEmail = null
            throw redirect(302, '/login')
        }

        // Store the user profile data in the locals object
        // @ts-ignore
        const email = userToken.email.S
        event.locals.userEmail = email

        return await resolve(event)

    } else {

        if (token) {

            const {error, userToken} = await verifyToken(token)

            if (error) {
                event.locals.userEmail = null
                event.cookies.delete('token', { path: '/' })
            }

            if (userToken) {
                throw redirect(302, '/')
            }
        }
    }
    return await resolve(event)
}
