import { Dispatch, ElementType, HTMLAttributes, ReactNode } from "react";


export type DragContextProps = {
  note: string;
  children: ReactNode;
}

export type DragContextType = {
  getStartPos: () => number | undefined,
  getEndPos: () => number | undefined,
  setStartPos: (pos: number) => void;
  setEndPos: (pos: number) => void;
  resetPos: () => void;
};

export type DragAreaProps = HTMLAttributes<HTMLElement> & {
  items: Object[];
  onSortList: Dispatch<Object[]>;
  children: ReactNode;
  as?: ElementType;
}

export type DragItemProps = HTMLAttributes<HTMLElement> & {
  note: string;
  index: number;
  children: ReactNode;
  as?: ElementType;
}
