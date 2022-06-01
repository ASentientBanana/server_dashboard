// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DBAdapter } from '../../../services/database';
import { AuthRegisterUserResponse } from '../../../types/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthRegisterUserResponse | null>
) {
    console.log(req.method);
    if (req.method !== 'POST') {
        res.status(400).json({ username: '', id: 'masdlknakdn', password: '' });
        return;
    };
    const { username, password } = req.body
    const user = await DBAdapter.createUser(username, password);
    res.status(200).json({ ...user });
}
