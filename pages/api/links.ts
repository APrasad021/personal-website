import { NextApiRequest, NextApiResponse } from "next";
import notion, { getLinksFilter } from "../../util/notion";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tags } = JSON.parse(req.body);

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: getLinksFilter(tags),
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

  res.status(200).json(response.results);
}
