---
# 单独设置导航名称
nav: 组件
group:
  title: 基础
  order: 5
order: 1
---

# Space

组件间间距

## 基础用法

gap（默认10px），组件间间隔

```jsx
/**
 * defaultShowCode: true
 */
import { Space } from "jui";
export default () => (
  <Space gap={20}>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </Space>
);
```
