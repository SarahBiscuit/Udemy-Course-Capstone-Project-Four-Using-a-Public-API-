This website uses HTML, CSS, JavaScript, Node.js, Express.js and ejs.

Use Node.js 24.22.1 or a later release in the 24.x major line. The `.node-version` file pins the runtime version for supported version managers and Render; `package.json` declares the supported Node.js range.

Install dependencies with `npm install`, then start the server with `npm start`.

The website generates a random character from the Wiki of Ice and Fire API and then invites users to submit their own facts about the character.

## Render deployment

Deploy the latest commit so Render rebuilds the service with the patched Node.js runtime and updated system certificate store. If `NODE_VERSION` is set in the Render Dashboard, update it to `24.22.1` or a later 24.x release because that setting takes precedence over the repository version file.

After deployment, verify from the running Render service that requests to both `https://dv-g3b-emudhra.we-have-a-problem.com/` and `https://dv-g3b-aaa-emudhra.we-have-a-problem.com/` fail with a certificate verification error. The checks must use the service's Node.js HTTPS client; a local request or shell `curl` is not equivalent.
