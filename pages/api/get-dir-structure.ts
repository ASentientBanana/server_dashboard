// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DBAdapter } from '../../services/database';
import { Files } from '../../services/files';
import { DirectoryStructure, DirStruct } from '../../types/file';

type Data = {
    data: any | string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | null>
) {
    if (req.method === 'GET') {
        res.status(401).json({ data: 'Bad request. No path.' })
        const result = await Files.getFolderContentsRecursive('/')

        res.status(200).json({ data: result })
    } else {
        res.statusCode = 400;
        res.send({ data: '8====D' })
    }
}
