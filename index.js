

/*require('dotenv').config();

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Events, GatewayIntentBits, InteractionType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.TOKEN_KEY; // Replace with your actual bot token

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
});

// Define the CSV file path
const csvFilePath = path.join(__dirname, 'user_data.csv');

// Check if the file exists and create the header if it does not
if (!fs.existsSync(csvFilePath)) {
    fs.writeFileSync(csvFilePath, 'Name,Email,Location,Role,UserID,JoiningTimestamp,LeavingTimestamp,Status\n'); // Creating header with Status column
}

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;

    let button = new ActionRowBuilder();
    button.addComponents(
        new ButtonBuilder()
            .setCustomId('verification-button')
            .setStyle(ButtonStyle.Primary)
            .setLabel('Open modal dialog')
    );

    message.reply({ components: [button] });
});

function getISTTimestamp() {
    const utcDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds for IST
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate.toISOString().replace('T', ' ').substring(0, 16).replace(/-/g, '/'); // Format: yyyy/mm/dd hh:mm
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'verification-button') {
            const modal = new ModalBuilder()
                .setCustomId('verification-modal')
                .setTitle('Verify yourself')
                .addComponents([
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('name-input')
                            .setLabel('Name')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('email-input')
                            .setLabel('Email')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('location-input')
                            .setLabel('Location: Enter "IN", "US", or "BOTH".')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                ]);
            await interaction.showModal(modal);
        }
    } else if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === 'verification-modal') {
            const name = interaction.fields.getTextInputValue('name-input');
            const email = interaction.fields.getTextInputValue('email-input');
            const location = interaction.fields.getTextInputValue('location-input');

            let roleName;
            if (location.toUpperCase() === 'IN') {
                roleName = 'IN Business'; // Changed from 'IN-Viewer' to 'IN Business'
            } else if (location.toUpperCase() === 'US') {
                roleName = 'US Business'; // Changed from 'US-Viewer' to 'US Business'
            } else if (location.toUpperCase() === 'BOTH') {
                roleName = 'Member'; // Assuming 'Member' remains unchanged
            } else {
                return interaction.reply('Invalid location. Please enter "IN", "US", or "BOTH".');
            }

            const userId = interaction.user.id;
            const currentTimestamp = getISTTimestamp();

            // Logic to add the role to the user
            const role = interaction.guild.roles.cache.find(role => role.name === roleName);
            if (role) {
                await interaction.member.roles.add(role); // Add new role

                // Code to update or append user data in CSV
                const existingData = fs.readFileSync(csvFilePath, 'utf-8');
                const lines = existingData.split('\n');
                const userExists = lines.some(line => {
                    const [existingName, existingEmail] = line.split(',');
                    return existingEmail === email;
                });

                if (userExists) {
                    interaction.reply(`Your information has been updated.\nName: ${name}\nEmail: ${email}\nLocation: ${location}\nRole assigned: ${roleName}\nUserID: ${userId}\nJoining Timestamp: ${currentTimestamp}\nStatus: Active`);
                } else {
                    const csvDataToAppend = `${name},${email},${location},${roleName},${userId},${currentTimestamp},,Active\n`;
                    fs.appendFileSync(csvFilePath, csvDataToAppend);
                    interaction.reply(`Thank you for your submission!\nName: ${name}\nEmail: ${email}\nLocation: ${location}\nRole: ${roleName}\nUserID: ${userId}\nJoining Timestamp: ${currentTimestamp}\nStatus: Active`);
                }
            } else {
                return interaction.reply(`Role "${roleName}" does not exist in this server.`);
            }
        }
    }
});

// Event listener for when a member leaves the server
client.on(Events.GuildMemberRemove, async (member) => {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = csvData.split('\n');
    const updatedLines = lines.map((line) => {
        const [existingName, existingEmail, location, role, userId, joiningTimestamp, leavingTimestamp, status] = line.split(',');

        // Update the leaving timestamp and toggle status if this user ID matches
        if (userId === member.id) {
            const leavingTimestamp = getISTTimestamp(); // Use the IST function for leaving timestamp
            return `${existingName},${existingEmail},${location},${role},${userId},${joiningTimestamp},${leavingTimestamp},Inactive`;
        }

        return line; // Return the original line if no match
    });

    // Write the updated lines back to the CSV file
    fs.writeFileSync(csvFilePath, updatedLines.join('\n'));
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.login(TOKEN);*/


require('dotenv').config();

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Events, GatewayIntentBits, InteractionType, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const fs = require('fs');
const path = require('path');

const TOKEN = process.env.TOKEN_KEY; // Replace with your actual bot token

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
});

// Define the CSV file path
const csvFilePath = path.join(__dirname, 'user_data.csv');

// Check if the file exists and create the header if it does not
if (!fs.existsSync(csvFilePath)) {
    fs.writeFileSync(csvFilePath, 'Name,Email,Location,Role,UserID,JoiningTimestamp,LeavingTimestamp,Status\n'); // Creating header with Status column
}

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;

    let button = new ActionRowBuilder();
    button.addComponents(
        new ButtonBuilder()
            .setCustomId('verification-button')
            .setStyle(ButtonStyle.Primary)
            .setLabel('Open modal dialog')
    );

    message.reply({ components: [button] });
});

function getISTTimestamp() {
    const utcDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds for IST
    const istDate = new Date(utcDate.getTime() + istOffset);
    return istDate.toISOString().replace('T', ' ').substring(0, 16).replace(/-/g, '/'); // Format: yyyy/mm/dd hh:mm
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'verification-button') {
            const modal = new ModalBuilder()
                .setCustomId('verification-modal')
                .setTitle('Verify yourself')
                .addComponents([
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('name-input')
                            .setLabel('Name')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('email-input')
                            .setLabel('Email')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('location-input')
                            .setLabel('Location: Enter "IN", "US", or "BOTH".')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    ),
                ]);

            await interaction.showModal(modal);
        }
    }else if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.customId === 'verification-modal') {
        const name = interaction.fields.getTextInputValue('name-input');
        const email = interaction.fields.getTextInputValue('email-input');
        const location = interaction.fields.getTextInputValue('location-input');
        let roleName;

        if (location.toUpperCase() === 'IN') {
            roleName = 'IN Business';
        } else if (location.toUpperCase() === 'US') {
            roleName = 'US Business';
        } else if (location.toUpperCase() === 'BOTH') {
            roleName = 'Member';
        } else {
            return interaction.reply('Invalid location. Please enter "IN", "US", or "BOTH".');
        }

        const userId = interaction.user.id;
        const currentTimestamp = getISTTimestamp();

        // Logic to add the role to the user
        const role = interaction.guild.roles.cache.find(role => role.name === roleName);

        if (role) {
            await interaction.member.roles.add(role); // Add new role
            
            // Code to update or append user data in CSV
            const existingData = fs.readFileSync(csvFilePath, 'utf-8');
            const lines = existingData.split('\n');
            const userExists = lines.some(line => {
                const [_, existingEmail] = line.split(',');
                return existingEmail === email;
            });

            if (!userExists) {
                const csvDataToAppend = `${name},${email},${location},${roleName},${userId},${currentTimestamp},Active\n`;
                fs.appendFileSync(csvFilePath, csvDataToAppend);
            } else {
                // Update existing user's information without showing details
                const updatedLines = lines.map(line => {
                    const [existingName, existingEmail] = line.split(',');
                    if (existingEmail === email) {
                        return `${existingName},${email},${location},${roleName},${userId},${currentTimestamp},Active`;
                    }
                    return line; // Keep existing lines the same
                });
                fs.writeFileSync(csvFilePath, updatedLines.join('\n'));
            }

            // This line is the only output now
            interaction.reply(`Thank you for your submission!`);
        } else {
            return interaction.reply(`Role "${roleName}" does not exist in this server.`);
        }
    }
}
});

// Event listener for when a member leaves the server
client.on(Events.GuildMemberRemove, async (member) => {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = csvData.split('\n');

    const updatedLines = lines.map((line) => {
        const [existingName, existingEmail, location, role, userId, joiningTimestamp, leavingTimestamp, status] = line.split(',');

        // Update the leaving timestamp and toggle status if this user ID matches
        if (userId === member.id) {
            const leavingTimestamp = getISTTimestamp(); // Use the IST function for leaving timestamp
            return `${existingName},${existingEmail},${location},${role},${userId},${joiningTimestamp},${leavingTimestamp},Inactive`;
        }

        return line; // Return the original line if no match
    });

    // Write the updated lines back to the CSV file
    fs.writeFileSync(csvFilePath, updatedLines.join('\n'));
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.login(TOKEN);








