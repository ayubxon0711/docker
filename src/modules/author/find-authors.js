const Author = require("./Author");

const FindByAuthors = async ({ params }) => {
  let findbyAuthors = await Author.findById(params.id).populate("channelId");
  if (!findbyAuthors) {
    throw new Error("Author not found");
  }
  return findbyAuthors;
};
module.exports = FindByAuthors;
