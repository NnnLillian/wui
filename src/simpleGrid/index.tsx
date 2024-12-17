import React, { ReactNode } from "react";
import styled from "styled-components";

export interface SimpleGridProps {
  children: ReactNode;
  /**
   * @description 列数
   */
  cols?: number;
  /**
   * @description 子元素间隙
   * @default "10px"
   */
  gap?: number;
}

const GridContainer = styled.div<{ $gap: number }>`
  display: flex;
  gap: ${({$gap}) => $gap}px;
  flex-wrap: wrap;
`;

const GridItem = styled.div<{ $columns: number }>`
  flex: 1 0 calc(${({$columns}) => 100 / $columns}% - 10px);
`;

const SimpleGrid: React.FC<SimpleGridProps> = ({
  children,
  cols = 0,
  gap = 10,
}) => {
  return (
    <GridContainer $gap={gap}>
      {React.Children.map(children, (child, index) => (
        <GridItem key={index} $columns={cols}>
          {child}
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default SimpleGrid;
