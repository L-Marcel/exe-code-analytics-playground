// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
const { execute } = require("code-complexity");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { repository } = req.query;

  let params: Command = {
    target: "https://github.com/" + (repository || "l-marcel/exe-classwork")
  };

  const result = await execute(params);

  res.status(200).json({
    repo: params.target,
    result
  });
};
