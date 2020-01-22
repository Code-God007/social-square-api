const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deletUser,
  userPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  searchUser,
  userByName
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deletUser);

// photo
router.get("/user/photo/:userId", userPhoto);

// who to follow
router.get("/user/findpeople/:userId", requireSignin, findPeople);

router.get("/user/search-people/:userName", searchUser);

// any route contatining :userId our app will execute userById function
router.param("userId", userById);

router.param("userName", userByName);

module.exports = router;
