import { Ref } from 'vue';

interface UsePaginationParams<T> {
  rows: Ref<T[]> | T[];
  pageSize?: number;
  currentPage?: number;
  callback?: Function;
}

/**
 * @description: 数据切片，用于分页
 */
export const usePaginationData = <T>({
  rows,
  pageSize = 10,
  currentPage = 1,
  callback,
}: UsePaginationParams<T>) => {
  const page = reactive({
    pageSize,
    currentPage,
    total: 0,
    totalPages: 0,
  });
  const data = shallowRef<T[]>([]);

  watch(
    () => [page.currentPage, page.pageSize, unref(rows)],
    () => {
      const startIndex = (page.currentPage - 1) * page.pageSize;
      const endIndex = Math.min(startIndex + page.pageSize, unref(rows).length);
      data.value = unref(rows).slice(startIndex, endIndex);
      page.total = unref(rows).length;
      page.totalPages = Math.ceil(unref(rows).length / page.pageSize);
      callback && callback();
    },
    {
      immediate: true,
    },
  );

  function setCurrentPage(currentPage: number) {
    page.currentPage = currentPage;
  }

  function setPageSize(pageSize: number) {
    page.pageSize = pageSize;
  }

  return {
    ...toRefs(page),
    data,
    setCurrentPage,
    setPageSize,
  };
};
