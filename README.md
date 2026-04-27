# Drop-in AI Chatbot

A simple AI chatbot you can drag into a GitHub repo and run with Node.js.

## Setup

```bash
npm install
cp .env.example .env
```

Open `.env` and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_key_here
```

## Run

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Files

```text
server.js              Backend API proxy
public/index.html      Chatbot page
public/style.css       Styling
public/script.js       Frontend chat logic
.env.example           Environment variable template
```

## Important

Do not put your real API key in frontend JavaScript or commit `.env` to GitHub.
