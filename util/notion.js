const { Client } = require("@notionhq/client");

const client = new Client({ auth: process.env.NOTION_API_KEY });

export const getLinksFilter = (tags = []) => {
  if (tags.length === 0) return undefined;
  return {
    or: tags.map((tag) => ({
      property: "Tags",
      multi_select: {
        contains: tag,
      },
    })),
  };
};

export default client;
