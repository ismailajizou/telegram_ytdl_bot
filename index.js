require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 
        'Welcome to YouTube Downloader Bot! 🎥\n\n' +
        'Send me a YouTube link and I will download it for you.\n' +
        'Use /video to download as video\n' +
        'Use /audio to download as audio'
    );
});

// Handle /video command
bot.onText(/\/video (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];

    if (!ytdl.validateURL(url)) {
        return bot.sendMessage(chatId, 'Please provide a valid YouTube URL');
    }

    try {
        const info = await ytdl.getInfo(url);
        const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const outputPath = path.join(downloadsDir, `${videoTitle}.mp4`);

        bot.sendMessage(chatId, '⏳ Downloading video... Please wait.');

        ytdl(url, { quality: 'highest' })
            .pipe(fs.createWriteStream(outputPath))
            .on('finish', () => {
                bot.sendVideo(chatId, outputPath)
                    .then(() => {
                        fs.unlinkSync(outputPath); // Delete the file after sending
                    })
                    .catch((error) => {
                        console.error('Error sending video:', error);
                        bot.sendMessage(chatId, 'Error sending video. The file might be too large.');
                    });
            })
            .on('error', (error) => {
                console.error('Error downloading video:', error);
                bot.sendMessage(chatId, 'Error downloading video. Please try again.');
            });
    } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'Error processing video. Please try again.');
    }
});

// Handle /audio command
bot.onText(/\/audio (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];

    if (!ytdl.validateURL(url)) {
        return bot.sendMessage(chatId, 'Please provide a valid YouTube URL');
    }

    try {
        const info = await ytdl.getInfo(url);
        const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const outputPath = path.join(downloadsDir, `${videoTitle}.mp3`);

        bot.sendMessage(chatId, '⏳ Downloading audio... Please wait.');

        ytdl(url, { quality: 'highestaudio' })
            .pipe(fs.createWriteStream(outputPath))
            .on('finish', () => {
                bot.sendAudio(chatId, outputPath)
                    .then(() => {
                        fs.unlinkSync(outputPath); // Delete the file after sending
                    })
                    .catch((error) => {
                        console.error('Error sending audio:', error);
                        bot.sendMessage(chatId, 'Error sending audio. The file might be too large.');
                    });
            })
            .on('error', (error) => {
                console.error('Error downloading audio:', error);
                bot.sendMessage(chatId, 'Error downloading audio. Please try again.');
            });
    } catch (error) {
        console.error('Error:', error);
        bot.sendMessage(chatId, 'Error processing audio. Please try again.');
    }
});

// Handle direct YouTube URLs
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (ytdl.validateURL(text)) {
        bot.sendMessage(chatId,
            'I found a YouTube link! What would you like to do?\n\n' +
            'Use /video ' + text + ' to download as video\n' +
            'Use /audio ' + text + ' to download as audio'
        );
    }
});

console.log('Bot is running...');
