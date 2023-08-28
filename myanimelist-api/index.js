const malScraper = require("mal-scraper");

module.exports = async function (context, req) {
  const searchInput = req.body && req.body.search;

  if (!searchInput) {
    context.res = {
      status: 400,
      body: "Please provide a 'search' term in the request body.",
    };
    return;
  }

  const handleSearch = async () => {
    try {
      return await malScraper.search.search("anime", {
        term: searchInput,
      });
    } catch (error) {
      return error;
    }
  };

  const responseMessage = await handleSearch(searchInput);

  context.res = {
    body: responseMessage,
  };
};
