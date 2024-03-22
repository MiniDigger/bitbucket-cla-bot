# bitbucket-cla-bot

Small bot that listens for pull request events on Bitbucket and checks if the PR author has signed the CLA.

## Building

1. install deps via `pnpm install`
2. build the project via `pnpm run build`

## Setup

1. Create a webhook on your Bitbucket repo
    * Set the URL to `http://<your-server>:3000/webhook`
    * Set the events to `pullrequest:created, pullrequest:comment_created`
2. Create an access token on your Bitbucket repo
   * Give it the scopes `pullrequest:read`, `pullrequest:write`
3. Configure the bot by setting the following environment variables:
   ```
   BITBUCKET_TOKEN=<your-token>
   BITBUCKET_REPO=<your/repo>
   ```
4. Run the bot `pnpm run start` (see https://nitro.unjs.io/deploy for more info on running a nitro app)
5. Configure the CLAs in data/cla.json
