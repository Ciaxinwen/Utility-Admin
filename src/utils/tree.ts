import { orderBy } from 'lodash';

interface GenTreeDataArgs {
  list: any[];
  linkField?: string;
  orderFiled?: string;
}

interface GenListDataArgs {
  treeData: any[];
}

/**
 * @description: 生成树形数据
 * @return {*}
 */
export const listToTree = ({ list, linkField = 'parentId', orderFiled }: GenTreeDataArgs) => {
  const res: unknown[] = [];
  list.forEach((item) => {
    const parent = list.find((node) => node.id === item[linkField]);
    if (parent) {
      parent.children =
        (orderFiled ? orderBy(parent.children, [orderFiled, 'desc']) : parent.children) || [];
      parent.children.push(item);
    } else {
      res.push(item);
    }
  });

  return res;
};

/**
 * @description: 树形数据扁平化
 * @return {*}
 */
export const treeToList = ({ treeData = [] }: GenListDataArgs) => {
  return treeData.reduce((res, item) => {
    const { children, ...i } = item;
    return res.concat(i, children && children.length ? treeToList({ treeData: children }) : []);
  }, []);
};
