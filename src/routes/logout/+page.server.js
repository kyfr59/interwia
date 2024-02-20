import { redirect } from '@sveltejs/kit'

export function load({ locals, cookies }) {
	if (locals.userEmail) {
        cookies.delete('token', {
            path : '/'
        })
        locals.userEmail = ''
    }
    redirect(302, '/login')
}
