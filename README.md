# YouTube Downloader Telegram Bot

A Telegram bot that can download videos and audio from YouTube links.

## Features

- Download YouTube videos as MP4
- Download YouTube videos as MP3 audio
- Simple and easy to use interface
- Automatic file cleanup after sending

## Setup

1. First, create a new Telegram bot:
   - Open Telegram and search for "@BotFather"
   - Send `/newbot` command
   - Follow the instructions to create your bot
   - Copy the API token provided by BotFather

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the bot:
   - Create a `.env` file in the root directory
   - Add your bot token: `TELEGRAM_BOT_TOKEN=your_bot_token_here`

4. Start the bot locally:
   ```bash
   npm start
   ```

## Hosting Instructions

### Option 1: Render.com (Recommended for beginners)

1. Create a free account on [Render.com](https://render.com)

2. Create a new Web Service:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - Name: `youtube-downloader-bot`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Add Environment Variable:
       - Key: `TELEGRAM_BOT_TOKEN`
       - Value: Your bot token from BotFather

3. Click "Create Web Service"

### Option 2: Railway.app

1. Create a free account on [Railway.app](https://railway.app)

2. Create a new project:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Add Environment Variable:
     - Key: `TELEGRAM_BOT_TOKEN`
     - Value: Your bot token from BotFather

3. Deploy the project

### Option 3: Heroku

1. Create a free account on [Heroku](https://heroku.com)

2. Create a new app:
   - Click "New" → "Create new app"
   - Connect your GitHub repository
   - Go to "Settings" → "Config Vars"
   - Add Config Var:
     - Key: `TELEGRAM_BOT_TOKEN`
     - Value: Your bot token from BotFather

3. Deploy the app

## Usage

1. Start a chat with your bot on Telegram
2. Send `/start` to see the welcome message
3. Send a YouTube link to the bot
4. Choose whether you want to download as video or audio:
   - Use `/video <youtube-link>` to download as video
   - Use `/audio <youtube-link>` to download as audio

## Notes

- The bot will automatically create a `downloads` directory to temporarily store files
- Files are automatically deleted after being sent to the user
- There might be size limitations depending on your Telegram bot's configuration
- For hosting, make sure to add your bot token as an environment variable
- The free tier of these platforms may have some limitations on storage and bandwidth 