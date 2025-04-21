require("dotenv").config();
const {PubSub, v1} = require("@google-cloud/pubsub");
const {
  PUBSUB_PROJECT_ID,
  DOTA2_SUBSCRIPTION_NAME,
  SUBSCRIPTION,
  LOL_SUBSCRIPTION_NAME,
} = require("../../consts/pubsub.const");
const pubSubClient = new PubSub({
  projectId: PUBSUB_PROJECT_ID,
  keyFilename: `./keys/${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
});
const subscriber = new v1.SubscriberClient({
  projectId: PUBSUB_PROJECT_ID,
  keyFilename: `./keys/${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
});
const subscriptionPathDota = subscriber.subscriptionPath(
  PUBSUB_PROJECT_ID,
  DOTA2_SUBSCRIPTION_NAME
);
const subscriptionPathLol = subscriber.subscriptionPath(
  PUBSUB_PROJECT_ID,
  LOL_SUBSCRIPTION_NAME
);

const publishMessage = async (topicName, message, customAttributes = {}) => {
  try {
    const topic = pubSubClient.topic(topicName);
    const msg = JSON.stringify(message);
    const msgBuffer = Buffer.from(msg);
    const messageId = await topic.publishMessage({
      data: msgBuffer,
      attributes: customAttributes,
    });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.log("Error publish message", error);
  }
};

const pullMessage = async (
  subscription,
  maxMessages = 50,
  isSendAck = true
) => {
  try {
    const request = {
      subscription:
        subscription == SUBSCRIPTION.DOTA
          ? subscriptionPathDota
          : subscriptionPathLol,
      maxMessages: maxMessages,
    };
    const [response] = await subscriber.pull(request);
    if (response.receivedMessages.length === 0) {
      console.log("No new messages.");
      return;
    }
    if (isSendAck) {
      const ackIds = [];
      response.receivedMessages.forEach(async ({message, ackId}) => {
        ackIds.push(ackId);
        await subscriber.acknowledge({
          subscription:
            subscription == SUBSCRIPTION.DOTA
              ? subscriptionPathDota
              : subscriptionPathLol,
          ackIds,
        });
        console.log("All messages acknowledged.");
      });
    }

    return response.receivedMessages;
  } catch (error) {
    console.log("Error pulling messages", error);
  }
};

module.exports = {
  publishMessage,
  pullMessage,
};
