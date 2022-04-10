import { sendReply } from "enmity-api/clyde";
import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command, EnmitySectionID } from "enmity-api/commands";
import { Plugin, registerPlugin } from "enmity-api/plugins";
import { getItem, removeItem, setItem } from "enmity-api/storage";

// Plugin for managing tags
const TagsPlugin: Plugin = {
  name: "Tags",
  commands: [],

  onStart() {
    // Send tag command
    const tag_command: Command = {
      id: "tag-command",
      applicationId: EnmitySectionID,

      name: "tag",
      displayName: "tag",

      description: "Sends a tag.",
      displayDescription: "Sends a tag.",

      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,

      options: [
        {
          name: "name",
          displayName: "name",

          description: "Name of the tag to send",
          displayDescription: "Name of the tag to send",

          type: ApplicationCommandOptionType.String,
          required: true
        },
      ],

      execute: async function (args, message) {
        const tagName = args[0].value;
        const channel = message.channel;
        var tagText = "";

        getItem(`tag.${tagName}`).then((text) => {
          if (text == null) {
            sendReply(channel.id, `Tag \`${tagName}\` not found.`);
            return {};
          } else {
            tagText = text;
            //sendReply(channel.id, `Tag Content: ${text}`);
            //getModuleByProps('sendMessage').sendMessage(channel.id, { content: `TESTING TESTING KSHIHDSHN ${text}` });
          }
        });

        return { content: tagText };
      }
    }

    // Add tag command
    const tagadd_command: Command = {
      id: "tagadd-command",
      applicationId: EnmitySectionID,

      name: "tagadd",
      displayName: "tagadd",

      description: "Adds a tag.",
      displayDescription: "Adds a tag.",

      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,

      options: [
        {
          name: "name",
          displayName: "name",

          description: "Name of the tag to add",
          displayDescription: "Name of the tag to add",

          type: ApplicationCommandOptionType.String,
          required: true
        },
        {
          name: "content",
          displayName: "content",

          description: "Content for the tag to add",
          displayDescription: "Content for the tag to add",

          type: ApplicationCommandOptionType.String,
          required: true
        },
      ],

      execute: async function (args, message) {
        const tagName = args[0].value;
        const tagContent = args[1].value;
        const channel = message.channel;

        setItem(`tag.${tagName}`, tagContent).then(() => {
          sendReply(channel.id, `Tag \`${tagName}\` added.`);
          return {};
        });
      }
    }

    // Remove tag command
    const tagremove_command: Command = {
      id: "tagremove-command",
      applicationId: EnmitySectionID,

      name: "tagremove",
      displayName: "tagremove",

      description: "Removes a tag.",
      displayDescription: "Removes a tag.",

      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,

      options: [
        {
          name: "name",
          displayName: "name",

          description: "Name for the tag to remove",
          displayDescription: "Name for the tag to remove",

          type: ApplicationCommandOptionType.String,
          required: true
        },
      ],

      execute: async function (args, message) {
        const tagName = args[0].value;
        const channel = message.channel;

        removeItem(`tag.${tagName}`).then((tag) => {
          sendReply(channel.id, `Tag \`${tagName}\` removed.`);
          return {};
        });
      }
    }

    // Register commands
    this.commands.push(tag_command);
    this.commands.push(tagadd_command);
    this.commands.push(tagremove_command);
  },

  onStop() {
    this.commands = [];
  }
}

registerPlugin(TagsPlugin);
