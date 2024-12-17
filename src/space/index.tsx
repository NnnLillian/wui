import React, { ReactNode } from "react";
import styled from "styled-components";

export interface SpaceProps {
  children: ReactNode;
  /**
   * @description 子元素间隙
   */
  gap?: number;
}

const SpaceContainer = styled.div<{ $gap: number }>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  flex-wrap: no-wrap;
`;

const SpaceItem = styled.div<{ $columns: number }>`
  flex: 1 0 calc(${({ $columns }) => 100 / $columns}% - 10px);
`;

const Space: React.FC<SpaceProps> = ({ children,  gap = 10 }) => {
  return (
    <SpaceContainer $gap={gap}>
      {React.Children.map(children, (child, index) => (
        <SpaceItem
          key={index}
          $columns={Array.isArray(children) ? children.length : 1}
        >
          {child}
        </SpaceItem>
      ))}
    </SpaceContainer>
  );
};

export default Space;
