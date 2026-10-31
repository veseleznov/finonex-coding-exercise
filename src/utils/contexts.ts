/** Waits for the first available WebView context. */
export async function getWebviewContext(): Promise<string> {
  let webviewContext = '';

  await driver.waitUntil(
    async () => {
      const contexts = await driver.getContexts();
      webviewContext = contexts.map(String).find((context) => context.startsWith('WEBVIEW_')) ?? '';
      return Boolean(webviewContext);
    },
    { timeoutMsg: 'WebView context did not become available' },
  );

  return webviewContext;
}

/**
 * Runs an operation in the requested Appium context and restores the original
 * context afterward, including when the operation fails.
 */
export async function runInContext<T>(context: string, operation: () => Promise<T>): Promise<T> {
  const originalContext = await driver.getContext();

  await driver.switchContext(context);
  try {
    return await operation();
  } finally {
    await driver.switchContext(originalContext);
  }
}

/** Runs an operation in the first available WebView and restores the original context. */
export async function runInWebview<T>(operation: () => Promise<T>): Promise<T> {
  const webviewContext = await getWebviewContext();
  return runInContext(webviewContext, operation);
}
