const malScraper = require("mal-scraper");

module.exports = async function (context, req) {
  const search = req.body && req.body.search;
  const endpoint = req.params.endpoint;

  let responseMessage;
  try {
    switch (endpoint) {
      case "anime":
        responseMessage = await malScraper.search.search("anime", {
          term: search,
        });
        break;
      case "manga":
        responseMessage = await malScraper.search.search("manga", {
          term: search,
        });
        break;
      case "watchlist":
        responseMessage = await malScraper.getWatchListFromUser(search);
        break;
      case "helpers":
        responseMessage = malScraper.search.helpers;
        break;
      default:
        responseMessage = "Invalid endpoint";
        break;
      }
    } catch (error) {
      context.res = {
        status: 500,
        body: `Error: ${error}`,
      };
    return;
    }

  context.res = {
    body: responseMessage,
  };
};
