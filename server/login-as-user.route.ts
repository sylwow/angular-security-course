export function loginAsUser(req, res) {
    return res.status(200).json({
        id: 1,
        email: 'temp@gmail.com',
        roles: ['STUDENT']
    });
}