const Discord = require("discord.js"); const { Client, Attachment, MessageEmbed } = require("discord.js");
const bot = new Discord.Client();
const ms = require("ms");
const fs = require("fs");
const parsems = require("parse-ms")
const money = require("./money.json")
const mongoose = require("mongoose");
const Data = require("./data")
const mongoPass = "mongodb://om86052:er29ma07@primus-shard-00-00.ylufd.mongodb.net:27017,primus-shard-00-01.ylufd.mongodb.net:27017,primus-shard-00-02.ylufd.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-65ny01-shard-0&authSource=admin&retryWrites=true&w=majority"

const token = "NzE3NTMzNDQyOTQ1ODQzMzIx.XvpLxw.hmHLaGN6PIiGT_jK2qNqB0OOe4Y";

const PREFIX = "r!";

var version = "Official Release 1.3.0";

bot.on("ready", () => {
    bot.user.setActivity("with the rules of the universe", { type: "PLAYING" })
    console.log("Primus is always watching...");
})
var blacklist = [];

bot.on("message", message => {
    if (blacklist.includes(message.author.id)) return;

    let args = message.content.substring(PREFIX.length).split(" ")

    if (!message.guild) return;
    let channel = message.channel;
    let person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
    let roles = message.guild.roles;
    let lockRole = roles.cache.find(r => r.name === "Verified");
    let mainrole = message.guild.roles.cache.find(role => role.name === "Verified")
    let muterole = message.guild.roles.cache.find(role => role.name === "Muted")
    var warnNum = 0;
    const warn1 = message.guild.roles.cache.find(r => r.name === "Warning 1")
    const warn2 = message.guild.roles.cache.find(r => r.name === "Warning 2")
    const warn3 = message.guild.roles.cache.find(r => r.name === "Warning 3")
    const warn4 = message.guild.roles.cache.find(r => r.name === "Warning 4")
    const warn5 = message.guild.roles.cache.find(r => r.name === "Warning 5")
    let warnTarget = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
    var blacklistMessage = ("Are you **__ABSOLUTELY__** sure that you want to blacklist this user? This will mean that I will no longer respond to any of their commands.")
    const logChannel = bot.channels.cache.get("704448219618345001");
    const logChannel2 = bot.channels.cache.get("599401836167954433");

    switch (args[0]) {
        case "blacklist":
            if (!message.member.roles.cache.some(r => r.name === "Bot Developer")) return message.channel.reply("Don't even think about it.")

            if (!args[1]) return message.reply("Please specify which user you would like to blacklist.")

            if (person) {
                message.reply("Are you **__ABSOLUTELY__** sure that you want to blacklist this user? This will mean that I will no longer respond to any of their commands.")
                    .then(message => {
                        message.react("✅")
                        message.awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.name === "✅"),
                            { max: 1, time: 10000 }).then(collected => {
                                if (collected.first().emoji.name === "✅") {
                                    blacklist.push(person.id);
                                    message.channel.send("Successfully blacklisted `" + person.user.tag + "`. They will no longer be able to use commands.")
                                } else {
                                    message.reply("Operation canceled.")
                                }
                            }).catch(() => {
                                message.reply("No reaction in 10 seconds, operation canceled.")
                            });
                    })
            }
            break;
        case "invite":
            const inviteEmbed = new Discord.MessageEmbed()
                .setTitle("Primus Invite")
                .setDescription("Click on this link in order to invite Primus to your server. You may need to temporarily disable two-factor authentication.\nhttps://discord.com/oauth2/authorize?client_id=717533442945843321&scope=bot&permissions=2110258295")
                .setColor("RANDOM")
            message.channel.send(inviteEmbed);
            break;
        case "ping":
            message.channel.send(`pong! Your ping is \`${Date.now() - message.createdTimestamp}\` ms.`)
            break;
        case "help":
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle("Commands")
                .addField("General", "`help`, `about`, `info`, `rules`")
                .addField("Moderation", "`clear`, `kick`, `ban`, `mute`, `unmute`, `lock`, `unlock`, `warn`, `deletewarn`")
                .addField("Lenny", "`lenny`, `tableflip`, `tableplace`, `cry`, `sunglasses`, `middlefinger`, `creepyshrug`, `wink`")
                .addField("Fun", "`8ball`")
                .addField("Currency", "`bal`, `daily`, `bet`, `give`, `work`")
                .setColor("#f93a2f")
                .setDescription("To view any of the rules, type r! and what the rule is about (e.g. to view Rule 1 you would type r!nsfw")
                .setFooter("The default prefix is: r!")

            message.author.send(helpEmbed);
            break;
        case "about":
            const aboutEmbed = new MessageEmbed()
                .setTitle("About")
                .addField("Version", version)
                .addField("Creator/Developer", "`The Gaming Complex#3879`")
                .addField("Beta Tester", "`SansMLGDunker#6909`")
                .addField("Special Thanks to", "`Milk#0628`, `Nekuskus(a♡)#6078`, `jemand2001#0666`")
                .setColor("#0099e1")
                .setThumbnail("https://cdn.discordapp.com/attachments/583074971916435478/720365830709313640/RanchoServerIcon.jpg")

            message.channel.send(aboutEmbed);
            break;
        case "info":
            if (!args[1]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("User Information")
                    .addField("User Name", message.author.username)
                    .addField("User Discriminator", message.author.discriminator)
                    .addField("Account Creation Date", message.author.createdAt)
                    .addField("Server Join Date", message.member.joinedAt)
                    .setColor("RANDOM")
                    .setThumbnail(message.author.displayAvatarURL())

                message.channel.send(embed);
            } else {
                let user = message.mentions.users.first();
                const userEmbed = new Discord.MessageEmbed()
                    .setTitle("User Information")
                    .addField("User Name", user.username)
                    .addField("User Discriminator", user.discriminator)
                    .addField("Account Creation Date", user.createdAt)
                    .addField("Server Join Date", message.guild.member(message.mentions.users.first()).joinedAt)
                    .setColor("#00d166")
                    .setThumbnail(user.displayAvatarURL())
                message.channel.send(userEmbed);
            }
            break;
        case "clear":
            if (!message.member.roles.cache.some(r => r.name === "Moderators")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            if (!args[1]) return message.reply("Please specify the amount of messages you want to delete.")
            message.channel.bulkDelete(args[1]);
            message.channel.send("Successfully cleared `" + (args[1]) + "` message(s)");
            break;
        case "kick":
            if (!message.member.roles.cache.some(r => r.name === "Moderators") && !message.member.roles.cache.some(r => r.name === "Bot Developer")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            if (message.member.roles.cache.some(r => r.name === "Bot Developer")) return message.reply("don't even try. Just because you coded me doesn't mean you can abuse your power.")

            if (!args[1]) return message.reply("Please specify what user you would like to kick.")

            if (!args[2]) return message.reply("Please specify a reason for the kick.")

            if (person) {
                person.kick("You were kicked from`" + message.guild.name + "`.").then(() => {
                    const kickEmbed = new Discord.MessageEmbed()
                        .setTitle("Member Kicked")
                        .setDescription(`Successfully kicked \`${person.user.tag}\`.`)
                        .addField("Reason", args[2])
                        .addField("Moderator", message.author)
                        .setColor("#f0ad4e")
                    message.channel.send(kickEmbed);
                    logChannel.send(kickEmbed);
                }).catch(err => {
                    message.reply("Unable to kick member, might be because of permissions.")
                    message.channel.send(`\`\`\`${err}\`\`\``)
                    console.log(err);
                });

            } else {
                message.reply("This user is not kickable.")
            }
            break;
        case "ban":
            if (!message.member.roles.cache.some(r => r.name === "Moderators") && !message.member.roles.cache.some(r => r.name === "Bot Developer")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            if (message.member.roles.cache.some(r => r.name === "Bot Developer")) return message.reply("don't even try. Just because you coded me doesn't mean you can abuse your power.")

            if (!args[1]) return message.reply("Please specify what user you would like to ban.")

            if (person) {
                person.ban({ reason: "You were banned from " + (message.guild.name + ".") }).then(() => {
                    const banEmbed = new Discord.MessageEmbed()
                        .setTitle("Member Banned")
                        .setDescription(`Successfully banned \`${person.user.tag}\`.`)
                        .addField("Reason", args[2])
                        .addField("Moderator", message.author)
                        .setColor("")
                    message.channel.send(banEmbed);
                    logChannel.send(banEmbed);
                }).catch(err => {
                    message.reply("Unable to ban member, might be because of permissions.")
                    message.channel.send(`\`\`\`${err}\`\`\``)
                    console.log(err);
                });
            } else {
                message.reply("That user isn't in this server.")
            }
            break;
        case "mute":
            if (!message.member.roles.cache.some(r => r.name === "Moderators")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            if (!person) return message.reply("That user isn't in this server.")

            if (!muterole) return message.reply("I couldn't find a mute role.");

            let time = args[2];

            if (!time) {
                return message.reply("Please specify the amount of time you would like to mute the selected person for.");
            }

            person.roles.add(muterole.id);
            person.roles.add(mainrole.id);

            const muteEmbed = new Discord.MessageEmbed()
                .setTitle("Member Muted")
                .addField("Duration", ms(ms(time)))
                .addField("Moderator", message.author)
                .setDescription("Successfully muted`" + person.user.tag + "` for `" + ms(ms(time)) + "`.")
                .setColor("#45241c")

            message.channel.send(muteEmbed);
            logChannel.channel.send(muteEmbed);

            setTimeout(function () {
                person.roles.add(mainrole.id);
                person.roles.remove(muterole.id);

                const expireEmbed = new Discord.MessageEmbed()
                    .setTitle("Mute Duration Expired")
                    .addField("Duration", ms(ms(time)))
                    .setDescription("`" + person.user.tag + "` has been unmuted.")
                    .setColor("#008369")

                message.channel.send(expireEmbed);
                logChannel.channel.send(expireEmbed);
            }, ms(time));
            break;
        case "unmute":
            if (!message.member.roles.cache.some(r => r.name === "Moderators")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
            if (!person) return message.reply("That user isn't in this server.")

            person.roles.remove(muterole.id);

            const unmuteEmbed = new Discord.MessageEmbed()
                .setTitle("Member Unmuted")
                .addField("Moderator", message.author)
                .setDescription("Successfully unmuted `" + person.user.tag + "`.")
                .setColor("#008369")

            message.channel.send(unmuteEmbed);
            logChannel.channel.send(unmuteEmbed);
            break;

        case "lock":
            if (!message.member.roles.cache.some(r => r.name === "Moderators")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            if (!args[1]) {
                channel.updateOverwrite(
                    lockRole,
                    { SEND_MESSAGES: false }
                );
                channel.updateOverwrite(
                    "Moderators",
                    { SEND_MESSAGES: true }
                );

                message.channel.send("Successfully locked down `" + message.channel.name + "`.");
            } else {
                channel.updateOverwrite(
                    lockRole,
                    { SEND_MESSAGES: false }
                );
                channel.updateOverwrite(
                    "Moderators",
                    { SEND_MESSAGES: true }
                );

                const lockEmbed = new Discord.MessageEmbed()
                    .setTitle("Channel Lockdown")
                    .addField("Reason", args[1])
                    .addField("Moderator", message.author)
                    .setThumbnail("https://image.flaticon.com/icons/png/512/891/891399.png")
                    .setColor("#ffc107")
                    .setDescription("`" + message.channel.name + "` has been locked down.")
                    .setFooter("Don't use the other channels to talk because this one is locked down. The channel was locked down for a reason.")

                message.channel.send(lockEmbed);
                logChannel.channel.send(lockEmbed);
            }

            break;
        case "unlock":
            if (!message.member.roles.cache.some(r => r.name === "Moderators")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            channel.permissionOverwrites.get(lockRole.id).delete();
            const unlockEmbed = new Discord.MessageEmbed()
                .setTitle("Channel Unlock")
                .addField("Moderator", message.author)
                .setThumbnail("https://cdn.discordapp.com/attachments/717823988986019956/723998060207669298/unknown.png")
                .setColor("#008e44")
                .setDescription("`" + message.channel.name + "` has been unlocked.")

            message.channel.send(unlockEmbed);
            logChannel.channel.send(unlockEmbed);
            break;
        case "warn":
            if (!args[1]) return message.reply("please specify the member you would like to warn.");

            if (!args[2]) return message.reply("please specify a reason for the warning.")

            if (warnTarget.roles.cache.some(r => r.name === "Warning 1") && !(warnTarget.roles.cache.some(r => r.name === "Warning 2")) && !(warnTarget.roles.cache.some(r => r.name === "Warning 3"))) {
                warnTarget.roles.add(warn2);
                warnNum = "2";
            } else {
                if (warnTarget.roles.cache.some(r => r.name === "Warning 2") && !(warnTarget.roles.cache.some(r => r.name === "Warning 3"))) {
                    warnTarget.roles.add(warn3);
                    warnNum = "3";
                } else {
                    if (warnTarget.roles.cache.some(r => r.name === "Warning 3") && !(warnTarget.roles.cache.some(r => r.name === "Warning 4"))) {
                        warnTarget.roles.add(warn4)
                        warnNum = "4";
                    } else {
                        if (warnTarget.roles.cache.some(r => r.name === "Warning 4") && !(warnTarget.roles.cache.some(r => r.name === "Warning 5"))) {
                            warnTarget.roles.add(warn5)
                            warnNum = "5";
                        } else {
                            warnTarget.roles.add(warn1);
                            warnNum = "1";
                        }
                    }
                }
            }
            const warnEmbed = new Discord.MessageEmbed()
                .setTitle("Member Warned")
                .setDescription("`" + warnTarget.user.tag + "` was warned.")
                .addField("Reason", args[2])
                .addField("Warning Number", warnNum)
                .addField("Moderator", message.author)
                .setColor("#d9534f")
            message.channel.send(warnEmbed);
            logChannel.send(warnEmbed);

            break;
        case "deletewarn":
            if (!message.member.roles.cache.some(r => r.name === "Moderators")) return message.channel.send("You need to have the `Moderators` role in order to use this command.")

            if (!args[1]) return message.reply("please specify the member you would like to delete a warn for.");

            if (warnTarget.roles.cache.some(r => r.name === "Warning 1") && !(warnTarget.roles.cache.some(r => r.name === "Warning 2")) && !(warnTarget.roles.cache.some(r => r.name === "Warning 3"))) {
                warnTarget.roles.remove(warn1);
                warnNum = "0";
            } else {
                if (warnTarget.roles.cache.some(r => r.name === "Warning 2") && !(warnTarget.roles.cache.some(r => r.name === "Warning 3"))) {
                    warnTarget.roles.remove(warn2);
                    warnNum = "1";
                } else {
                    if (warnTarget.roles.cache.some(r => r.name === "Warning 3") && !(warnTarget.roles.cache.some(r => r.name === "Warning 4"))) {
                        warnTarget.roles.remove(warn3);
                        warnNum = "2";
                    } else {
                        if (warnTarget.roles.cache.some(r => r.name === "Warning 4") && !(warnTarget.roles.cache.some(r => r.name === "Warning 5"))) {
                            warnTarget.roles.remove(warn4);
                            warnNum = "3";
                        } else {
                            if (warnTarget.roles.cache.some(r => r.name === "Warning 5")) {
                                warnTarget.roles.remove(warn5);
                                warnNum = "4";
                            } else {
                                message.channel.send("This user does not have any warnings.")
                            }
                        }
                    }
                }
            }
            const unwarnEmbed = new Discord.MessageEmbed()
                .setTitle("Member Unwarned")
                .setDescription("`" + warnTarget.user.tag + "` was unwarned.")
                .addField("Warning Number", warnNum)
                .addField("Moderator", message.author)
                .setColor("#5cb85c")
            message.channel.send(unwarnEmbed);
            logChannel.send(unwarnEmbed);

            break;
        case "8ball":
            var answers = [
                "Yes, ofc!",
                "Ofc not.",
                "Maybe 🤔",
                "wE'lL nEvEr KnOw... 👐",
                "Only if you say that Primus is best bot in <#598727852103565332>",
                "Ask again later 🕒",
                "What part of \"Ask again Later\" don't you understand??? 😒",
                "Only if my nickname is `Primus // r!`",
                "Not now, but maybe later.",
                "Yes, but only for the time being.",
                "ur mum gae LMAO roted!!!11!1!!!!funniiiiiiii!!!11!1!!!roasted-->rosted-->roted-->!!!11!!1!",
                "Always.",
                "Never!"
            ]

            if (!args[1]) return message.channel.send("Mate, I can't give an answer to nothing.");

            const ballEmbed = new Discord.MessageEmbed()
                .setTitle("Primus's Magic 8 Ball 🎱")
                .addField("Question", args.slice(1).join(" "))
                .addField("Answer", (answers[Math.floor(Math.random() * answers.length)]))
                .addField("Asked by", message.author)
                .setColor("#603084")
                .setThumbnail("https://static.thenounproject.com/png/124586-200.png")
            message.channel.send(ballEmbed);
            logChannel2.send(ballEmbed);
            break;
        case "ecoinit":
            if (!args[1]) {
                person = message.author;
            } else {
                person = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
            }

            const ecoinitEmbed = new Discord.MessageEmbed()
                .setTitle("Operation Completed Successfully")
                .addField("User", message.author)
                .setFooter("Make sure to contact The Gaming Complex#3879 if any bugs/errors occur")
                .setThumbnail("https://img.icons8.com/cotton/2x/economic-growth-.png")
                .setColor("32cd32")

            mongoose.connect(mongoPass, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            Data.findOne({
                userID: person.id

            }, (err, data) => {
                if (err) message.channel.send(`\`\`\`${err}\`\`\``)
                const newData = new Data({
                    name: bot.users.cache.get(person.id).username,
                    userID: person.id,
                    leaderboard: "all",
                    money: 500,
                    daily: 0,
                    job: "",
                    jobHours: 0
                })
                newData.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));
                message.channel.send(ecoinitEmbed
                    .setDescription("you have successfully been initialized into the currency system and given `500` coins.")
                )
            })
            break;
        case "bal":
            if (!args[1]) {
                person = message.author;
            } else {
                person = message.mentions.users.first()
            }

            mongoose.connect(mongoPass, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            Data.findOne({
                userID: person.id

            }, (err, data) => {
                if (err) message.channel.send(`\`\`\`${err}\`\`\``)
                if (!data) return message.channel.send("This user is not initialized into the currency system.")

                const balEmbed = new Discord.MessageEmbed()
                    .setTitle(`\`${person.tag}\`'s Balance`)
                    .setDescription(`Wallet: \`${data.money}\`\n`)
                    .setColor("RANDOM")
                message.channel.send(balEmbed)
            });
            break;
        case "give":
            mongoose.connect(mongoPass, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            Data.findOne({
                userID: message.author.id
            }, (err, authorData) => {
                if (err) message.channel.send(`\`\`\`${err}\`\`\``)
                if (!authorData) return message.channel.send("You're not in the currency system yet. Run `ecoinit` to start using currency commands.")

                Data.findOne({
                    userID: person.id
                }, (err, personData) => {
                    if (err) message.channel.send(`\`\`\`${err}\`\`\``)
                    if (!personData) return message.channel.send("This user is not initialized in the currency system.");

                    if (!args[1]) return message.channel.send("Please specify which user you would like to transfer money to.");
                    if (!person) return message.channel.send("I couldn't find that user.");
                    if (!args[2]) return message.channel.send("Please specify the amount of money you are giving.");
                    if (person.id === message.author.id) return message.channel.send("You cannot give money to yourself.");

                    try {
                        var giveAmount = parseFloat(args[2]);
                    } catch {
                        return message.channel.send("You can only pay in numbers.");
                    }

                    if (giveAmount != Math.floor(giveAmount)) return message.channel.send("You can only pay in numbers.");
                    if (giveAmount < 1) return message.channel.send(`You can't give less than 1 coin.`);
                    if (authorData.money < giveAmount) return message.channel.send("You don't have enough money to complete this transfer.");

                    personData.money += giveAmount;
                    authorData.money -= giveAmount;
                    personData.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));
                    authorData.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                    const giveEmbed = new Discord.MessageEmbed()
                        .setTitle("Transaction Completed Successfully")
                        .setDescription(`\`${message.author.tag}\` gave \`${giveAmount}\` coins.`)
                        .setFooter("Sharing is caring but I don't care")
                        .setColor("RANDOM")
                    message.channel.send(giveEmbed);
                })
            });

            break;
        case "board":
            mongoose.connect(mongoPass, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            Data.find({
                leaderboard: "all"
            }).sort([
                ["money", "descending"]
            ]).exec((err, res) => {
                if (err) message.channel.send(`\`\`\`${err}\`\`\``);

                var page = Math.ceil(res.length / 10);

                const lbEmbed = new Discord.MessageEmbed()
                    .setTitle(`Leaderboard for ${message.guild}`)
                    .setThumbnail("https://img.icons8.com/bubbles/2x/leaderboard.png")
                    .setColor("#ffaa1d")

                let pg = parseInt(args[1]);
                if (!pg) pg = 1;
                if (pg != Math.floor(pg)) pg = 1;
                let end = pg * 10;
                let start = (pg * 10) - 10;

                if (res.length === 0) {
                    lbEmbed.addField("Error", "No leaderboard pages found");
                } else if (res.length <= start) {
                    lbEmbed.addField("Error", "Leaderboard page not found");
                } else if (res.length <= end) {
                    lbEmbed.setFooter(`Page ${pg} of ${page}`);
                    for (i = start; i < res.length; i++) {
                        lbEmbed.addField(`${i + 1}. ${res[i].name}`, `${res[i].money.toLocaleString()} coins`);
                    }
                } else {
                    lbEmbed.setFooter(`Page ${pg} of ${page}`);
                    for (i = start; i < end; i++) {
                        lbEmbed.addField(`${i + 1}. ${res[i].name}`, `${res[i].money.toLocaleString()} coins`)
                    }
                }
                message.channel.send(lbEmbed);
            })
            break;
        case "daily":
            let timeout = 86400000;
            let reward = 2000;

            let dailyEmbed = new Discord.MessageEmbed()
                .setTitle("Daily Coins")

            mongoose.connect(mongoPass, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            Data.findOne({
                userID: message.author.id
            }, (err, data) => {
                if (err) message.channel.send(`\`\`\`${err}\`\`\``)
                if (!data) return message.channel.send("You're not in the currency system yet. Run `ecoinit` to start using currency commands.")

                if (timeout - (Date.now() - data.daily) > 0) {
                    let timee = parsems(timeout - (Date.now() - data.daily));

                    return message.channel.send(dailyEmbed
                        .setColor("RANDOM")
                        .setDescription("You already claimed your daily coins.")
                        .addField("Claim in", `\`${timee.hours}h ${timee.minutes}m ${timee.seconds}s\``)
                        .addField("User", message.author)
                    );
                } else {
                    data.money += reward;
                    data.daily = Date.now()
                    data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                    return message.channel.send(dailyEmbed.setDescription(`You claimed your daily reward and recieved \`${reward}\` coins. You now have \`${money[message.author.id].money}\` coins.`)
                        .setColor("RANDOM")
                    );
                }
            })
            break;
        case "bet":
            mongoose.connect(mongoPass, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            Data.findOne({
                userID: message.author.id
            }, (err, data) => {
                if (err) message.channel.send(`\`\`\`err\`\`\``);
                if (!data) return message.channel.send("You're not in the currency system yet. Run `ecoinit` to start using currency commands.")

                var maxBet = 100000;

                const betEmbed = new Discord.MessageEmbed()
                    .setTitle("Primus's Money-Dissolving Gambling Table 🎲")

                if (!args[1]) return message.channel.send("Please specify an amount to bet.");

                if (args[1].toLowerCase() === "all") args[1] = data.money;

                try {
                    var bet = parseFloat(args[1]);
                } catch {
                    return message.channel.send("You can only bet whole numbers.");
                }

                if (bet != Math.floor(bet)) return message.channel.send("You can only bet whole numbers.");

                if (money[message.author.id].money < bet) return message.channel.send("You don't have enough money to cover your bet.");

                if (bet > maxBet) return message.channel.send(`You can't bet more than \`${maxBet.toLocaleString()}\` coins.`)

                let betOutcomes = ["win", "lose"]
                var pick = betOutcomes[Math.floor(Math.random() * betOutcomes.length)];

                if (pick === "lose") {
                    data.money -= bet;
                    data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                    betEmbed.setDescription(`\`${message.author.tag}\` lost \`${bet}\` coins.`)
                        .setFooter(`You now have ${data.money} coins.`)
                        .setColor("#8b0000")
                    return message.channel.send(betEmbed);
                } else {
                    data.money += bet;
                    data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                    betEmbed.setDescription(`\`${message.author.tag}\` won \`${bet}\` coins.`)
                        .setFooter(`You now have ${data.money} coins.`)
                        .setColor("#32cd32")
                    return message.channel.send(betEmbed);
                }
            });
            break;
        case "work":
            //list of jobs
            const careers = [
                "Gas_Station_Clerk",
                "Grocery_Store_Cashier",
                "Fast_Food_Cook",
                "Lawyer"
            ]

            mongoose.connect(mongoPass, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            Data.findOne({
                userID: message.author.id
            }, (err, data) => {
                if (err) message.channel.send(`\`\`\`err\`\`\``);
                if (!data) return message.channel.send("You're not in the currency system yet. Run `ecoinit` to start using currency commands.")

                if (!args[1]) {
                    if (!data.job) {
                        //if user has no job
                        const noWorkEmbed = new Discord.MessageEmbed()
                            .setTitle("Command Failed")
                            .setDescription("You don't currently have a job to work at.")
                            .setFooter("Type r!work <job name here> to apply for that job.")
                        message.channel.send(noWorkEmbed);
                    } else {
                        //job minigames here
                        var salary;

                        const workEmbed = new Discord.MessageEmbed()
                            .setTitle(`Work for ${data.job}`)
                            .setThumbnail("https://img.favpng.com/8/3/11/office-icon-work-icon-png-favpng-0XRkELhR9NkkM5xVrh6bRrsz5.jpg")
                            .setColor("RANDOM")
                        const workFinEmbed = new Discord.MessageEmbed()
                            .setTitle("Successfully Finished Work")
                            .setThumbnail("https://imageog.flaticon.com/icons/png/512/1019/1019607.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF")
                            .setColor("RANDOM")
                        const workFailEmbed = new Discord.MessageEmbed()
                            .setTitle("Work Failed")
                            .setDescription("You did not type the correct message in the allowed time frame.")
                            .setColor("RANDOM")

                        const workFilter = m => m.author.id === message.author.id;

                        switch (data.job) {
                            case "Oliver":
                                const salary = 100000;

                                message.channel.send(workEmbed
                                    .setDescription("What is the 690th line of code for this bot?")
                                ).then(() => {
                                    message.channel.awaitMessages(workFilter, {
                                        max: 1,
                                        time: 10000
                                    }).then(collected => {
                                        if (collected.first().content === "if (err) message.channel.send(err);") {
                                            message.channel.bulkDelete(1);
                                            data.money += salary;
                                            data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                                            message.channel.send(workFinEmbed
                                                .setDescription(`\`${message.author.tag}\` earned ${salary} coins at work for ${money[message.author.id].job} today.`)
                                            );
                                        }
                                    }).catch(collected => {
                                        message.channel.send(workFailEmbed);
                                    });
                                })
                                break;
                            case "Gas_Station_Clerk":
                                const gscsalary = 500;

                                message.channel.send(`🏪 ⛽ 🏎️`)
                                message.channel.send(workEmbed
                                    .setDescription("Pump the gas for the customer! Type `pump`.")
                                ).then(() => {
                                    message.channel.awaitMessages(workFilter, {
                                        max: 1,
                                        time: 4000
                                    }).then(collected => {
                                        if (collected.first().content === "pump") {
                                            data.money += gscsalary;
                                            data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                                            message.channel.send(workFinEmbed
                                                .setDescription(`\`${message.author.tag}\` earned ${gscsalary} coins at work for ${money[message.author.id].job} today.`)
                                            );
                                        } else return message.channel.send(workFailEmbed);
                                    }).catch(collected => {
                                        message.channel.send(workFailEmbed);
                                    });
                                });
                                break;
                            case "Grocery_Store_Cashier":
                                const gscashsalary = 800;
                                const groceryItems = [
                                    "🍎",
                                    "🍊",
                                    "🍇",
                                    "🍓",
                                    "🍒",
                                    "🍑",
                                    "🍍",
                                    "🍅",
                                    "🍆",
                                    "🥦",
                                    "🥬",
                                    "🌽",
                                    "🧅",
                                    "🧄",
                                    "🥔",
                                    "🍞"
                                ]
                                let cashierItem1 = groceryItems[Math.floor(Math.random() * groceryItems.length)]
                                let cashierItem2 = groceryItems[Math.floor(Math.random() * groceryItems.length)]
                                let cashierItem3 = groceryItems[Math.floor(Math.random() * groceryItems.length)]
                                let cashierItems = `${cashierItem1} ${cashierItem2} ${cashierItem3}`;

                                message.channel.send(`🛒 ${cashierItems} 🖥️`)
                                message.channel.send(workEmbed
                                    .setDescription("Type the produce emojis in the order they come to the register!")
                                ).then(() => {
                                    message.channel.awaitMessages(workFilter, {
                                        max: 1,
                                        time: 10000
                                    }).then(collected => {
                                        if (collected.first().content === (`${cashierItem3} ${cashierItem2} ${cashierItem1}`)) {
                                            data.money += gscashsalary;
                                            data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                                            message.channel.send(workFinEmbed
                                                .setDescription(`\`${message.author.tag}\` earned ${gscashsalary} coins at work for ${money[message.author.id].job} today.`)
                                            );
                                        } else return message.channel.send(workFailEmbed);
                                    }).catch(collected => {
                                        message.channel.send(workFailEmbed);
                                    });
                                })
                            case "Fast_Food_Cook":
                                const ffcsalary = 1000;
                                const burgers = [
                                    "hamburger",
                                    "cheeseburger",
                                    "hamburger with lettuce",
                                    "cheeseburger with lettuce",
                                    "hamburger with onion",
                                    "cheeseburger with onion",
                                    "hamburger with tomato",
                                    "cheeseburger with tomato",
                                    "hamburger with lettuce and onion",
                                    "cheeseburger with lettuce and onion",
                                    "hamburger with onion and tomato",
                                    "cheeseburger with onion and tomato",
                                    "hamburger with lettuce and tomato",
                                    "cheeseburger with lettuce and tomato",
                                    "hamburger with everything",
                                    "cheeseburger with everything"
                                ]
                                let currentBurger = burgers[Math.floor(Math.random() * burgers.length)];

                                var correctBurger;
                                switch (currentBurger) {
                                    //🥖🥩🧀🥬🧅🍅
                                    case "hamburger":
                                        correctBurger = "🥖 🥩🥖"
                                        break;
                                    case "cheeseburger":
                                        correctBurger = "🥖 🧀 🥩 🥖"
                                        break;
                                    case "hamburger with lettuce":
                                        correctBurger = "🥖 🥬 🥩 🥖"
                                        break;
                                    case "cheeseburger with lettuce":
                                        correctBurger = "🥖 🥬 🧀 🥩 🥖"
                                        break;
                                    case "hamburger with onion":
                                        correctBurger = "🥖 🧅 🥩 🥖"
                                        break;
                                    case "cheeseburger with onion":
                                        correctBurger = "🥖 🧅 🧀 🥩 🥖"
                                        break;
                                    case "hamburger with tomato":
                                        correctBurger = "🥖 🍅 🥩 🥖"
                                        break;
                                    case "cheeseburger with tomato":
                                        correctBurger = "🥖 🍅 🧀 🥩 🥖"
                                        break;
                                    case "hamburger with lettuce and onion":
                                        correctBurger = "🥖 🥬 🧅 🥩 🥖"
                                        break;
                                    case "cheeseburger with lettuce and onion":
                                        correctBurger = "🥖 🥬 🧅 🧀 🥩 🥖"
                                        break;
                                    case "hamburger with onion and tomato":
                                        correctBurger = "🥖 🧅 🍅 🥩 🥖"
                                        break;
                                    case "cheeseburger with onion and tomato":
                                        correctBurger = "🥖 🧅 🍅 🧀 🥩 🥖"
                                        break;
                                    case "hamburger with lettuce and tomato":
                                        correctBurger = "🥖 🥬 🍅 🥩 🥖"
                                        break;
                                    case "cheeseburger with lettuce and tomato":
                                        correctBurger = "🥖 🥬 🍅 🧀 🥩 🥖"
                                        break;
                                    case "hamburger with everything":
                                        correctBurger = "🥖 🥬 🧅 🍅 🥩 🥖"
                                        break;
                                    case "cheeseburger with everything":
                                        correctBurger = "🥖 🥬 🧅 🍅 🧀 🥩 🥖"
                                        break;
                                }

                                message.channel.send(workEmbed
                                    .setDescription(`🤵 This customer wants a ${currentBurger}.\nMake the burger by typing the ingredients from left to right.\nBread = 🥖 Patty = 🥩 Cheese = 🧀 lettuce = 🥬 onion = 🧅 Tomato = 🍅`)
                                ).then(() => {
                                    message.channel.awaitMessages(workFilter, {
                                        max: 1,
                                        time: 30000
                                    }).then(collected => {
                                        if (collected.first().content === (correctBurger)) {
                                            data.money += ffcsalary;
                                            data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                                            message.channel.send(workFinEmbed
                                                .setDescription(`\`${message.author.tag}\` earned ${ffcsalary} coins at work for ${money[message.author.id].job} today.`)
                                            );
                                        } else return message.channel.send(workFailEmbed);
                                    }).catch(collected => {
                                        message.channel.send(workFailEmbed);
                                    });
                                })
                            case "Lawyer":
                                let courtOptions = [
                                    "guilty",
                                    "not guilty",
                                    "objection",
                                    "witness",
                                    "relavance"
                                ]
                                let currentCourt = courtOptions[Math.floor(Math.random() * courtOptions.length)];

                                var correctCourt;
                                switch (currentCourt) {
                                    case "guilty":
                                        correctCourt = "I hereby find the defendant guilty"
                                        break;
                                    case "not guilty":
                                        correctCourt = "I hereby find the defendant not guilty"
                                        break;
                                    case "objection":
                                        correctCourt = "Objection, your Honor"
                                        break;
                                    case "witness":
                                        correctCourt = "I hereby call the witness to the stand"
                                        break;
                                    case "relavance":
                                        correctCourt = "Objection, relavance?"
                                        break;
                                }

                                message.channel.send(workEmbed
                                    .setDescription(`The jury has decided! Call a(n) ${currentCourt}`)
                                ).then(() => {
                                    message.channel.awaitMessages(workFilter, {
                                        max: 1,
                                        time: 12000
                                    }).then(collected => {
                                        if (collected.first().content === (correctCourt)) {
                                            data.jobHours += 1;
                                            data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                                            message.channel.send(workFinEmbed
                                                .setDescription("One hour of work was added to your paycheck.")
                                            );
                                        } else return message.channel.send(workFailEmbed);
                                    }).catch(collected => {
                                        message.channel.send(workFailEmbed);
                                    });
                                })
                        }
                    }
                }
                //🟦⬜
                if (args[1] === "Oliver" && message.author.id === "546208503841292288") {
                    data.job = "Oliver";
                    message.channel.send("yes master")
                    data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));
                }
                if (args[1] === "paycheck") {
                    if (!data.jobHours) return message.channel.send("lmao you're not even fully initialized into the currency system. Use ")

                    if (data.jobHours < 20) return message.channel.send(`You can't claim your paycheck yet. You still need to work for \`${20 - money[message.author.id].jobHours}\` hours.`)

                    var wage;

                    switch (money[message.author.id].job) {
                        case "Lawyer":
                            wage = 5000;
                    }
                    data.money += (wage * 20);

                    const paycheckEmbed = new Discord.MessageEmbed()
                        .setTitle("Paycheck Recieved")
                        .setDescription(`You claimed your paycheck and recieved \`${wage * money[message.author.id].jobHours}\` coins.`)
                        .addField("Job", money[message.author.id].job)
                        .addField("Hours Worked", money[message.author.id].jobHours)
                        .setThumbnail("https://cdn0.iconfinder.com/data/icons/jumpicon-financial-line-1/32/-_Paycheck-Salary-Envelope-Money-512.png")
                        .setColor("RANDOM")
                    message.channel.send(paycheckEmbed);

                    data.jobHours = 0;
                    data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));
                }
                if (args[1] === "careers") {
                    //job listings
                    const careersEmbed = new Discord.MessageEmbed()
                        .setTitle("Available Job Listings  👨‍💼")
                        .setFooter("Type r!work <job name here> to apply for that job.")
                        .setColor("RANDOM")
                        .addField("🟦  Gas_Station_Clerk", "`500` coins/hr")
                        .addField("🟦  Grocery_Store_Cashier", "`800` coins/hr")
                        .addField("🟦  Fast_Food_Cook", "`1000` coins/hr")
                        .addField("⬜  Lawyer", "`100000` coin paycheck")
                    message.channel.send(careersEmbed);
                } else {
                    if (careers.includes(args[1])) {

                        //save job in money.json
                        data.job = args[1];
                        data.save().catch(err => message.channel.send(`\`\`\`${err}\`\`\``));

                        //if user started a job
                        const jobStart = new Discord.MessageEmbed()
                            .setTitle("Job Accepted")
                            .setDescription(`\`${message.author.tag}\` has started working as a \`${args[1]}\`.`)
                            .setFooter("Use r!work to earn money at your job")
                            .setThumbnail("https://img.favpng.com/8/3/11/office-icon-work-icon-png-favpng-0XRkELhR9NkkM5xVrh6bRrsz5.jpg")
                            .setColor("RANDOM")
                        message.channel.send(jobStart);
                    }
                }
            });
            break;
        case "confiemra":
            if (!args[1]) {
                message.channel.send("smh choose someone to confiemra")
            } else {
                message.channel.send(`confiemra?@A?!AQ!?!lmao funni rosted!!1!!!!11!1!!!!!${person}is a nob at mc lmao funni!!1!!!!11!1!!!!!`)
            }
            break;
        case "lenny":
            message.channel.send("( ͡° ͜ʖ ͡°)")
            break;
        case "tableflip":
            message.channel.send("(╯°□°)╯︵ ┻━┻")
            break;
        case "tableplace":
            message.channel.send("┬──┬◡ﾉ(° -°ﾉ)")
            break;
        case "cry":
            message.channel.send("ಥʖ̯ಥ")
            break;
        case "sunglasses":
            message.channel.send("(▀̿Ĺ̯▀̿ ̿)")
            break;
        case "gun":
            message.member.roles.lowest
            message.channel.send("━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)")
            break;
        case "middlefinger":
            message.channel.send("╭∩╮( ͡° ͜ʖ ͡°)╭∩╮")
            break;
        case "creepyshrug":
            message.channel.send("┐(͠≖ ͜ʖ͠≖)┌")
            break;
        case "wink":
            message.channel.send("° ͜ʖ ͡ – ✧")
            break;
        case "requestcmd":
            let reqer = message.author;

            if (!args[1]) return message.reply("Please enter your suggestion.")

            const reqEmbed = new Discord.MessageEmbed()
                .setTitle("Command Request Sent")
                .addField("Requestor", reqer)
                .addField("Request", args[1])
                .setColor("#f93a2f")
                .setFooter("Thanks for submitting your request!")

            message.channel.send(reqEmbed);
            message.channel.send("<@546208503841292288>, there's a suggestion waiting for you.")
            break;
        case "video":
            message.channel.send("<https://www.youtube.com/watch?v=dQw4w9WgXcQ>")
            break;
    }
    if (message.content.includes("no u")) {
        message.react("663955085729988639");
    }
    if (message.content.includes("norman")) {
        message.react("713121792281018468");
    }
    if (message.content.includes("kamran")) {
        message.react("🤮");
    }
    if (message.author.id === "159985870458322944" && message.content.includes("you just advanced to level")) {

        let levelUpTarget = message.mentions.users.first;
        if (!money[levelUpTarget.id]) return message.channel.send(`Level up reward failed; user has not been initialized into the currency system.`)

        money[levelUpTarget.id].money += 10000;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) message.channel.send(`\`\`\`${err}\`\`\``)
        });
        const levelUpEmbed = new Discord.MessageEmbed()
            .setTitle("User Level Up! ⏫")
            .setDescription(`Congrats for leveling up ${levelUpTarget.tag}!\n\`10000\` coins were placed in your wallet.`)
            .setFooter("Continue chatting and being active on the server for more level up rewards!")
            .setThumbnail("https://image.flaticon.com/icons/svg/1469/1469840.svg")
            .setColor("RANDOM")
        message.channel.send(levelUpEmbed);
    }
})

bot.login(token);