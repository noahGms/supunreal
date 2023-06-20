import {Friendship, User} from "@supunreal/database";
import {friendshipMapper} from "@supunreal/mapper";

const population = [
  {
    path: 'user1',
  },
  {
    path: 'user2',
  },
];

export async function findAll(req, res) {
  const friendships = await Friendship.find({
    $or: [
      {
        user1: req.user.id,
      },
      {
        user2: req.user.id,
      },
    ],
    $and: [
      {
        approvedAt: {
          $ne: null,
        }
      },
    ],
  }).populate(population);

  return res.status(200).json({
    data: friendships.map(friendship => friendshipMapper(friendship)),
  });
}

export async function findAllRequests(req, res) {
  const friendships = await Friendship.find({
    $and: [
      {
        user1: req.user.id,
      },
      {
        approvedAt: null,
      },
    ],
  }).populate(population);

  return res.status(200).json({
    data: friendships.map(friendship => friendshipMapper(friendship)),
  });
}

export async function findAllInvitations(req, res) {
  const friendships = await Friendship.find({
    $and: [
      {
        user2: req.user.id,
      },
      {
        approvedAt: null,
      },
    ],
  }).populate(population);

  return res.status(200).json({
    data: friendships.map(friendship => friendshipMapper(friendship)),
  });
}

export async function create(req, res) {
  const {userId} = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found !',
      });
    }

    const friendshipExists = await Friendship.findOne({
      $or: [
        {
          user1: req.user.id,
        },
        {
          user2: req.user.id,
        },
      ],
    });

    if (friendshipExists) {
      return res.status(400).json({
        error: 'Friendship already exists !',
      });
    }

    await Friendship.create({
      user1: req.user.id,
      user2: userId,
    });

    return res.status(201).json({
      message: 'Friendship created !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function approve(req, res) {
  const {id} = req.params;

  try {
    const friendship = await Friendship.findById(id);

    if (!friendship) {
      return res.status(404).json({
        error: 'Friendship not found !',
      });
    }

    if (
      friendship.user1.toString() !== req.user.id.toString()
      && friendship.user2.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        error: 'You are not allowed to delete this friendship !',
      });
    }

    if (friendship.user1.toString() === req.user.id.toString()) {
      return res.status(403).json({
        error: 'You are not allowed to approve this friendship !',
      });
    }

    if (friendship.approvedAt) {
      return res.status(403).json({
        error: 'Friendship already approved !',
      });
    }

    await Friendship.updateOne({
      _id: friendship._id,
    }, {
      $set: {
        approvedAt: new Date(),
      }
    });

    return res.status(200).json({
      message: 'Friendship approved !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function deny(req, res) {
  const {id} = req.params;

  try {
    const friendship = await Friendship.findById(id);

    if (!friendship) {
      return res.status(404).json({
        error: 'Friendship not found !',
      });
    }

    if (
      friendship.user1.toString() !== req.user.id.toString()
      && friendship.user2.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        error: 'You are not allowed to delete this friendship !',
      });
    }

    if (friendship.user1.toString() === req.user.id.toString()) {
      return res.status(403).json({
        error: 'You are not allowed to deny this friendship !',
      });
    }

    if (friendship.approvedAt) {
      return res.status(403).json({
        error: 'Friendship already approved !',
      });
    }

    await Friendship.deleteOne({
      _id: friendship._id,
    });

    return res.status(200).json({
      message: 'Friendship denied !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function destroy(req, res) {
  const {id} = req.params;

  try {
    const friendship = await Friendship.findById(id);

    if (!friendship) {
      return res.status(404).json({
        error: 'Friendship not found !',
      });
    }

    if (
      friendship.user1.toString() !== req.user.id.toString()
      && friendship.user2.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        error: 'You are not allowed to delete this friendship !',
      });
    }

    if (
      friendship.user1.toString() !== req.user.id.toString()
      && !friendship.approvedAt
    ) {
      return res.status(403).json({
        error: 'You are not allowed to delete this friendship !',
      });
    }

    await Friendship.deleteOne({
      _id: friendship._id,
    });

    return res.status(200).json({
      message: 'Friendship deleted !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}