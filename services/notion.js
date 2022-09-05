const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');

const database_id = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

module.exports = getVideos = async () => {
  const payload = {
    path: `databases/${database_id}/query`,
    method: 'POST',
  };

  const { results } = await notion.request(payload);
  //   console.log(results.length);
  //   console.log(results);

  const videos = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].plain_text,
      date: page.properties.Date.date.start,
      tags: page.properties.Tags.rich_text[0]?.plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
      created_time: page.created_time,
    };
  });

  return videos;
};
