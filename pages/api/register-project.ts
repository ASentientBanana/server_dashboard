// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DBAdapter } from '../../services/DatabaseAdapter';

type Data = {
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | null>
) {
    if (req.method === 'POST') {
        await DBAdapter.createProjectEntry({
            name: req.body.name,
            location: req.body.location,
            type: req.body.type,
            userID: req.body.userID,
            isLocal: req.body.isLocal
        });
        res.statusCode = 200;
    } else {
        res.statusCode = 400;
    }
    res.send({ msg: '8====D' })
}
