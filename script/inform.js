module.exports.config = {
    name: "inform",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "GeoDevz69",
    description: "Sends a message to all groups and can only be done by the admin.",
    usePrefix: true,
    commandCategory: "noti",
    usages: "[Text]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const threadList = await api.getThreadList(25, null, ['INBOX']);
    let sentCount = 0;
    const custom = args.join(' ');

    async function sendMessage(thread) {
        try {
            await api.sendMessage(`╭─『 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 』✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙁𝙧𝙤𝙢 𝘼𝙙𝙢𝙞𝙣: ${custom}\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, thread.threadID);
            sentCount++;
        } catch (error) {
            console.error("Error sending a message:", error);
        }
    }

    for (const thread of threadList) {
        if (sentCount >= 20) {
            break;
        }
        if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
            await sendMessage(thread);
        }
    }

    if (sentCount > 0) {
        api.sendMessage(`╭─『 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 』✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙎𝙚𝙣𝙩: › Sent the notification successfully.\n╰─────────────✧✧✧\n╭✧✧✧───────────✧\n   ᴏᴡɴᴇʀ : ɢᴇᴏʀɢᴇ ɴᴀᴋɪʟᴀ\n╰─────────────✧✧✧`, event.threadID);
    } else {
        api.sendMessage("› No eligible group threads found to send the message to.", event.threadID);
    }
};
