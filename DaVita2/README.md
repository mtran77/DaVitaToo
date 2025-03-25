# Forge Hello World

This project contains a Forge app written in Javascript that displays `Hello World!` in a Confluence macro. 

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app frontend by editing the `src/frontend/index.jsx` file.

- Modify your app backend by editing the `src/resolvers/index.js` file to define resolver functions. See [Forge resolvers](https://developer.atlassian.com/platform/forge/runtime-reference/custom-ui-resolver/) for documentation on resolver functions.

- Build and deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

To do:
create .env file 
add api keys to that file

<!-- From Cloned UI -->

# ChatGPT

ChatGPT clone with added features

# Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPrasadBroo%2FChatGPT&install-command=npm%20install&output-directory=dist)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/PrasadBroo/ChatGPT)

# Demo

<img src="demo/demo.gif" width="700px" alt="demo gif"/>

## Features

- Multiple chats completions simultaneously😲
- Send chat with/without history 🧐
- Choose model from a variety of GPT-3/GPT-4 models 😃
- Stores your chats in local storage 👀
- Same user interface as the original ChatGPT 📺
- Custom chat titles 💬
- Export/Import your chats 🔼🔽

## To-Do

- [x] Add DALL-E1 & DALL-E2 Image Generation Models
- [x] Add Code Highlight
- [ ] [Add ChatGPT Pre Made Prompts](https://github.com/f/awesome-chatgpt-prompts)
## Requirements

- Node JS
- npm
- [Create Open AI account](https://beta.openai.com/signup/)

## Setup

1. Clone the repository

```
git clone https://github.com/PrasadBroo/ChatGPT.git
```

2. Install client dependencies

```
cd ChatGPT
npm install
```

3. Get your Open AI API key from [Open AI API Key](https://platform.openai.com/account/api-keys)

## Usage

1. Start the app

```
npm run dev
```

## Contribution

All contributions are welcome. Feel free to open an issue or create a pull request.

<a href="https://www.buymeacoffee.com/prasadbro" target="_blank"><img src="./demo/bmac.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 200px !important;" ></a>

## Liscence

[MIT](https://github.com/PrasadBroo/ChatGPT/blob/main/LICENSE)
