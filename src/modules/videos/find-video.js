const { NotFoundError } = require("../../shared/errors");
const Author = require("../author/Author");
const Videos = require("./Videos.schema");

const FindByVideo = async ({ params, user }) => {
  const video = await Videos.findById(params.id).populate([
    {
      path: "author",
    },
    {
      path: "video_comments",
    },
    {
      path: "video_channel",
    },
    {
      path: "viewed_users.user",
    },
  ]);
  if (!video) {
    throw new NotFoundError("video not found");
  }

  const viewedUser = { user: user.id };
  const isUserExist = video.viewed_users.map(
    (e) => e.user._id.toString() === user.id.toString()
  );

  if (!isUserExist[0]) {
    video.viewed_users.push(viewedUser);
    video.save();
  }

  let findAuhtor = await Author.findById(user.id);
  let IsUserExist = findAuhtor.viewed_videos.map(
    (j) => j.video.toString() === params.id.toString()
  );
  if (!IsUserExist[0]) {
    findAuhtor.viewed_videos.push({ video: params.id });
    await findAuhtor.save();
  }
  return video;
};

module.exports = FindByVideo;
