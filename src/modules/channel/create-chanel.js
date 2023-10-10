const Channel = require("./channel.schema");
const BadRequestError = require("../../shared/errors");
const CreateChanel = async ({ body }) => {
  let { title, username, ...data } = body;
  let exsited = await Channel.findOne({ title, username });
  if (exsited) {
    throw new BadRequestError("channel already exists");
  }
  let CreateChanel = await Channel.create({ title, username, ...data });
  return CreateChanel;
};
module.exports = CreateChanel;
