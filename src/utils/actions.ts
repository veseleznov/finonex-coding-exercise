interface RelativeOffset {
  x?: number;
  y?: number;
}

interface RelativePosition {
  x: number;
  y: number;
}

interface SwipeOptions {
  start: RelativePosition;
  end: RelativePosition;
  duration?: number;
}

/**
 * Taps an element at an offset relative to its center.
 *
 * Offsets are expressed as fractions of the element's dimensions. Omitted axes
 * remain centered. Positive values move right or down; negative values move
 * left or up. For example, `{ y: 0.25 }` taps horizontally in the center and
 * 25% of the element's height below its vertical center.
 *
 * The action skips WebDriver's release cleanup because some BrowserStack
 * Appium sessions do not support `DELETE /actions`.
 *
 * @example
 * await tapElementWithRelativeOffset(menuButton, { y: 0.25 });
 */
export async function tapElementWithRelativeOffset(
  element: ReturnType<typeof $>,
  offset: RelativeOffset,
) {
  const { x, y } = await element.getLocation();
  const { width, height } = await element.getSize();

  await driver
    .action('pointer', { parameters: { pointerType: 'touch' } })
    .move({
      duration: 0,
      x: Math.round(x + width * (0.5 + (offset.x ?? 0))),
      y: Math.round(y + height * (0.5 + (offset.y ?? 0))),
    })
    .down({ button: 0 })
    .up({ button: 0 })
    .perform(true);
}

/**
 * Swipes between two positions relative to an element's dimensions.
 * For example, `{ x: 0.5, y: 0.5 }` represents the element's center.
 */
export async function swipeOnElement(
  element: ReturnType<typeof $>,
  { start, end, duration = 700 }: SwipeOptions,
) {
  const { x, y } = await element.getLocation();
  const { width, height } = await element.getSize();

  await driver
    .action('pointer', { parameters: { pointerType: 'touch' } })
    .move({
      duration: 0,
      x: Math.round(x + width * start.x),
      y: Math.round(y + height * start.y),
    })
    .down({ button: 0 })
    .move({
      duration,
      x: Math.round(x + width * end.x),
      y: Math.round(y + height * end.y),
    })
    .up({ button: 0 })
    .perform(true);
}
