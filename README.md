# Setup

1. Install Node.js 24.
2. Create a BrowserStack account with App Automate access. Get your BrowserStack username and access key from your account settings.
3. Download the [Sauce Labs Mobile Sample App 2.7.1](https://github.com/saucelabs/sample-app-mobile/releases/tag/2.7.1) **iOS real-device** package. In BrowserStack **App Automate → App Management → Upload App**, upload the `.ipa` for App automate and copy the returned `bs://` app URL. You can also reuse an app already uploaded to your account.
4. In a terminal at the project root, install dependencies and create your local configuration:

   ```bash
   npm ci
   cp .env.example .env
   ```

5. Fill in `.env` with your own values:

   ```dotenv
   BROWSERSTACK_USERNAME=your_username
   BROWSERSTACK_ACCESS_KEY=your_access_key
   BROWSERSTACK_APP_URL=bs://your_uploaded_app_id
   ```

BrowserStack runs the Appium server, so no local Appium server is needed.

# Execution

Run every spec on each enabled device:

```bash
npm run test:ios
```

Run one spec:

```bash
npm run test:ios -- --spec ./src/specs/product-sorting.spec.ts
npm run test:ios -- --spec ./src/specs/drawing-clear.spec.ts
npm run test:ios -- --spec ./src/specs/screen-rotation.spec.ts
```
