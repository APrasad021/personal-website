import { NextApiRequest, NextApiResponse } from "next";
import notion, { getLinksFilter } from "../../util/notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tags, cursor } = JSON.parse(req.body);
  const start_cursor = cursor ? cursor : undefined;
  const response = await notion.databases.query({
    // @ts-ignore
    database_id: process.env.NOTION_DATABASE_ID,
    filter: getLinksFilter(tags),
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
    start_cursor,
  });

  res.status(200).json(response);
}
