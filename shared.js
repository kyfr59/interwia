import jwt from 'jsonwebtoken'

/**
 * @param {String} token
 */
async function verifyToken(token) {

    const privateKey = Buffer.from(import.meta.env.VITE_JWT_SECRET, "base64")
    try {
        const userToken = jwt.verify(token, privateKey)
        return {
            userToken: userToken
        }
    } catch(err) {
        return {
            error: "Jeton de connexion invalide"
        }
    }
}

export {
    verifyToken
}