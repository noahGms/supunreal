import {Conversation, Message} from "@supunreal/database";
import {createAndUpdateMessageSchema} from "@supunreal/validation";
import {messageMapper} from "@supunreal/mapper";

const population = [
  {
    path: 'user',
  },
  {
    path: 'conversation',
    populate: [
      {
        path: 'user1',
      },
      {
        path: 'user2',
      },
    ],
  },
];

export async function findAllMessagesForConversation(req, res) {
  const {id} = req.params;

  try {
    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found !',
      });
    }

    if (conversation.user1.toString() !== req.user.id.toString() && conversation.user2.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    const messages = await Message.find({
      conversation: conversation._id,
    }).populate(population);

    return res.status(200).json({
      data: messages.map(message => messageMapper(message)),
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

export async function createMessage(req, res) {
  const {id} = req.params;
  const body = req.body;

  try {
    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found !',
      });
    }

    if (conversation.user1.toString() !== req.user.id.toString() && conversation.user2.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    const value = await createAndUpdateMessageSchema.validateAsync(body);

    await Message.create({
      ...value, conversation: conversation.id, user: req.user.id,
    });

    return res.status(201).json({
      message: 'Message created !',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

export async function updateMessage(req, res) {
  const {id, messageId} = req.params;
  const body = req.body;

  try {
    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found !',
      });
    }

    if (conversation.user1.toString() !== req.user.id.toString() && conversation.user2.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        error: 'Message not found !',
      });
    }

    if (message.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    const value = await createAndUpdateMessageSchema.validateAsync(body);

    await Message.updateOne({
      _id: message._id,
    }, {
      $set: value,
    });

    return res.status(200).json({
      message: 'Message updated !',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

export async function destroyMessage(req, res) {
  const {id, messageId} = req.params;

  try {
    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found !',
      });
    }

    if (conversation.user1.toString() !== req.user.id.toString() && conversation.user2.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        error: 'Message not found !',
      });
    }

    if (message.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized !',
      });
    }

    await Message.deleteOne({
      _id: message._id,
    });

    return res.status(200).json({
      message: 'Message deleted !',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}