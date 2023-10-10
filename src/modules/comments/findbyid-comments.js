let Comments = require("./Comments-schema");
const { BadRequestError } = require("../../shared/errors");

const findComment = async ({ params }) => {
  let findcomment = await Comments.findById(params.id).populate(
    "comment_videos"
  );
  if (!findcomment) {
    throw new BadRequestError("not found comment");
  }
  return findcomment;
};
module.exports = findComment;
