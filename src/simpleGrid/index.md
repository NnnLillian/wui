---
# 单独设置导航名称
nav: 组件
group:
  title: 基础
  order: 2
order: 1
---

# SimpleGrid

简单的Grid布局组件，响应式网格，其中每个项目占据相等的空间。

## 基础用法

cols代表列数，gap（默认10px），组件间间隔

```jsx
/**
 * defaultShowCode: true
 */
import { SimpleGrid } from "jui";
export default () => (
  <SimpleGrid cols={4}>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </SimpleGrid>
);
```

<API id="SimpleGridProps"></API>
