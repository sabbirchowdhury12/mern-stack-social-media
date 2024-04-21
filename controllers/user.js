import User from "../models/user.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res
      .status(200)
      .json({ message: "user retrieved successfully", data: user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // const friends = await User.find({ '_id': { $in: user.friends }});
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json({
      message: "user friends fetched sucessfully",
      data: formattedFriends,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
