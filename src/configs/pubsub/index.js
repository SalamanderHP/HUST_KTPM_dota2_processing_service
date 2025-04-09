require("dotenv").config();
const {PubSub} = require("@google-cloud/pubsub");
const {PUBSUB_PROJECT_ID} = require("../../consts/pubsub.const");
const pubSubClient = new PubSub({
  projectId: PUBSUB_PROJECT_ID,
  keyFilename: `./keys/${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
});

const publishMessage = async (topicName, message, customAttributes = {}) => {
  const topic = pubSubClient.topic(topicName);
  const msg = JSON.stringify(message);
  const msgBuffer = Buffer.from(msg);
  const messageId = await topic.publishMessage({
    data: msgBuffer,
    attributes: customAttributes,
  });
  console.log(`Message ${messageId} published.`);
};

module.exports = {
  publishMessage,
};
