const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Channel = require("./channel.schema");

const subscribe_channel = async ({ params, user }) => {
  let channel = await Channel.findById({ _id: params.id });
  if (!channel) {
    throw new NotFoundError("Channel not found");
  }

  const isSubscribed = channel.subscribers.some(
    (subscriber) => subscriber._id.toString() == user.id
  );
  if (isSubscribed) {
    channel.subscribers = channel.subscribers.filter(
      (subscriber) => subscriber._id.toString() != user.id
    );
    await channel.save();
    return "Foydalanuvchi kanaldan chiqdi";
  }

  channel.subscribers.push(user.id);
  await channel.save();
  return "Foydalanuvchi muvaffaqiyatli kanalga obuna bo'ldi.";
};

module.exports = subscribe_channel;
