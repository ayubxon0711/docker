const { NotFoundError } = require("../../shared/errors");
const Videos = require("./Videos.schema");
const ListAdmin = async ({ query }) => {
  if (!query.search_query) {
    let all_videos = await Videos.find();
    return all_videos;
  }

  let exists = await Videos.findOne({ title: query.search_query });
  if (!exists) {
    throw new NotFoundError("not found video");
  }
};
module.exports = ListAdmin;
