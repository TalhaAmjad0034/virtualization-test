import React, { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FixedSizeList as ListWindow } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const Container = styled.div`
  width: 100%;
`;

const SearchBox = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
`;

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListItem = styled.div<{ index: number }>`
  padding: 8px;
  background-color: ${(props) => (props.index % 2 ? "#f0f0f0" : "#ffffff")};
`;

export interface ListProps {
  items: string[];
}

const List: FC<ListProps> = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState<string[]>(items);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVisibleItems(filteredItems);
  }, [items, searchTerm]);

  return (
    <Container>
      <SearchBox
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ScrollWrapper>
        <SafelyRenderChildren>
          <AutoSizer>
            {({ height, width }) => (
              <ListWindow
                height={height}
                itemCount={visibleItems.length}
                itemSize={35}
                width={width}
              >
                {({ index, style }) => (
                  <ListItem key={index} style={style} index={index}>
                    {visibleItems[index]}
                  </ListItem>
                )}
              </ListWindow>
            )}
          </AutoSizer>
        </SafelyRenderChildren>
      </ScrollWrapper>
    </Container>
  );
};

export default List;
