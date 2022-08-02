// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import getConfig from 'next/config';
import Runner from '../../../services/runner';
import { responseMessageBasic } from '../../../types/api';

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | responseMessageBasic>
) {
    const { serverRuntimeConfig } = getConfig();
    const session = await getSession({ req });
    if (session === null) {
        res.status(400).json({ body: 'User not logged in.' });
        return;
    }
    if (req.method === 'POST') {
        const { projectName, gitLink, projectType } = req.body;
        if (!(projectName && gitLink && projectType)) {
            res.status(400).json({ body: 'Bad request' });
            return;
        }
        await Runner.runScript('bash', [
            `${serverRuntimeConfig.baseDir}/scripts/shared/clone.sh`,
            gitLink,
            `${serverRuntimeConfig.baseDir}/tmpDump/${projectName}`,
        ]);
        // await Runner.runScript('bash', [
        //     `${serverRuntimeConfig.baseDir}/scripts/deployment/${projectType}`,
        //     gitLink,
        //     `${serverRuntimeConfig.baseDir}/tmpDump/${projectName}`,
        // ]);
    }
    res.status(200).json({ body: 'Script run success!' });
}