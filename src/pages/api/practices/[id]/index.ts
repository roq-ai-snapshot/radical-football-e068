import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { practiceValidationSchema } from 'validationSchema/practices';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.practice
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPracticeById();
    case 'PUT':
      return updatePracticeById();
    case 'DELETE':
      return deletePracticeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPracticeById() {
    const data = await prisma.practice.findFirst(convertQueryToPrismaUtil(req.query, 'practice'));
    return res.status(200).json(data);
  }

  async function updatePracticeById() {
    await practiceValidationSchema.validate(req.body);
    const data = await prisma.practice.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePracticeById() {
    const data = await prisma.practice.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
