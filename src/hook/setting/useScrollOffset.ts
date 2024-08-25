/**
 * @description: 元素滚动定位
 * @param {HTMLElement} element dom元素
 * @return {*}
 */
export function useScrollOffset(
  element: HTMLElement | undefined | null | Ref<HTMLElement | undefined | null>,
) {
  function setScrollTop(scrollTop: number) {
    if (!unref(element)) return;
    unref(element)!.scrollTop = scrollTop;
  }

  function setScrollLeft(scrollLeft: number) {
    if (!unref(element)) return;
    unref(element)!.scrollTop = scrollLeft;
  }

  function isScrollToOptions<T>(options: T): boolean {
    return (
      typeof options === 'object' &&
      options !== null &&
      ('left' in options || 'top' in options || 'behavior' in options)
    );
  }

  function setScrollTo(left: number, top: number): void;
  function setScrollTo(options: ScrollToOptions): void;
  function setScrollTo(leftOrOptions: number | ScrollToOptions, top: number = 0) {
    if (!unref(element)) return;
    if (isScrollToOptions(leftOrOptions)) {
      unref(element)!.scrollTo(leftOrOptions as ScrollToOptions);
    }
    if (typeof leftOrOptions === 'number') {
      unref(element)!.scrollTo(leftOrOptions, top);
    }
  }

  return {
    setScrollTop,
    setScrollLeft,
    setScrollTo,
  };
}
