let express = require("express");
const Comments = require("./Comments-schema");
const AllComments = require("./all-comments");
const AddComment = require("./add-comment");
const DeleteComment = require("./delete-comment");
const findComment = require("./findbyid-comments");

let all_comments = async (req, res, next) => {
  try {
    let result = await AllComments();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

let create_video = async (req, res, next) => {
  try {
    let result = await AddComment({
      params: req.params,
      user: req.user,
      body: req.body,
    });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

let delete_comment = async (req, res, next) => {
  try {
    let result = await DeleteComment({ params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

let find_comment = async (req, res, next) => {
  try {
    let result = await findComment({ params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
module.exports = { all_comments, create_video, delete_comment, find_comment };
