import {Conversation, Message} from "@supunreal/database";
import {conversationMapper} from "@supunreal/mapper";

const population = [
  {
    path: 'user1',
  },
  {
    path: 'user2',
  },
];

export async function findAll(req, res) {
  const conversations = await Conversation.find({
    $or: [
      {
        user1: req.user.id,
      },
      {
        user2: req.user.id,
      },
    ],
  }).populate(population);

  return res.status(200).json({
    data: conversations.map(conversation => conversationMapper(conversation)),
  });
}

export async function findOne(req, res) {
  const {id} = req.params;

  try {
    const conversation = await Conversation.findById(id).populate(population);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found !',
      });
    }

    if (
      conversation.user1.toString() !== req.user.id.toString()
      && conversation.user2.toString() !== req.user.id.toString()
    ) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    return res.status(200).json({
      data: conversationMapper(conversation),
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

export async function create(req, res) {
  const {userId} = req.params;

  try {
    const conversationExists = await Conversation.findOne({
      $or: [
        {
          user1: req.user.id,
          user2: userId,
        },
        {
          user1: userId,
          user2: req.user.id,
        }
      ],
    });

    if (conversationExists) {
      return res.status(409).json({
        error: 'Conversation already exists !',
      });
    }

    await Conversation.create({
      user1: req.user.id,
      user2: userId,
    });

    return res.status(201).json({
      message: 'Conversation created !',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

export async function destroy(req, res) {
  const {id} = req.params;

  try {
    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found !',
      });
    }

    if (
      conversation.user1.toString() !== req.user.id.toString()
      && conversation.user2.toString() !== req.user.id.toString()
    ) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    await Conversation.deleteOne({
      _id: conversation._id,
    });

    await Message.deleteMany({
      conversation: conversation._id,
    });

    return res.status(200).json({
      message: 'Conversation deleted !',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}