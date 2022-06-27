// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Runner from '../../../services/runner';
import { responseMessageBasic } from '../../../types/api';

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | responseMessageBasic>
) {
    const session = await getSession({ req })
    if (session === null) res.status(400).json({ body: 'User not logged in.' })
    Runner.runScript('bash', [
        '/home/petar/Projects/server_dashboard/scripts/deployment/clone-project.sh',
        'https://github.com/ASentientBanana/PortfolioV1.git',
        '/home/petar/Desktop/dump/'
    ])
    res.status(200).json({ body: 'User logged in.' })
}
// /home/petar/Projects/server_dashboard/scripts/deployment/clone-project.sh https://github.com/ASentientBanana/PortfolioV1