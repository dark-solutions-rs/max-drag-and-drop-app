import { DragEvent, FC, createContext, useCallback, useContext, useRef } from "react";
import { DragAreaProps, DragContextProps, DragContextType, DragItemProps } from "./Types";

const DragAndDropContext = createContext<DragContextType | undefined>(undefined);

export const DragContext: FC<DragContextProps> = ({ children }) => {
  const startPos = useRef<number>();
  const endPos = useRef<number>();

  const contextValue: DragContextType = {
    getStartPos: () => startPos.current,
    getEndPos: () => endPos.current,
    setStartPos: (pos: number) => {
      startPos.current = pos;
    },
    setEndPos: (pos: number) => {
      endPos.current = pos
    },
    resetPos: () => {
      startPos.current = undefined;
      endPos.current = undefined;
    }
  }

  return <DragAndDropContext.Provider value={contextValue}>
    {children}
  </DragAndDropContext.Provider>;
}

export const DragArea: FC<DragAreaProps> = ({ as: Tag = 'div', items, onSortList, children, ...otherProps }) => {
  const context = useContext(DragAndDropContext);

  const onDragOver = useCallback((ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    return false
  }, []);

  const onDrop = useCallback(() => {
    if (context) {
      const { getStartPos, getEndPos, resetPos } = context;
      const startIndex = getStartPos();
      const enterIndex = getEndPos();
      if (startIndex !== undefined && enterIndex !== undefined && startIndex !== enterIndex) {
        let newItems = [...items];

        const draggedItem = newItems.splice(startIndex, 1)[0];
        newItems.splice(enterIndex, 0, draggedItem);

        onSortList(newItems);
      }
      resetPos();
    }
  }, [context, items, onSortList]);

  return <Tag onDragOver={onDragOver} onDrop={onDrop} {...otherProps}>
    {children}
  </Tag>;
}

export const DragItem: FC<DragItemProps> = ({ children, index, as: Tag = 'div', ...otherProps }) => {
  const context = useContext(DragAndDropContext);

  return <Tag draggable {...otherProps}
    onDrag={() => context?.setStartPos(index)}
    onDragEnter={() => context?.setEndPos(index)}>
    {children}
  </Tag>;
}
