import { ReactNode } from "react";
import { FixedSizeList } from "react-window";
import { cn } from "@/lib/utils";

interface VirtualListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  overscanCount?: number;
}

export function VirtualList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className,
  overscanCount = 5,
}: VirtualListProps<T>) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>{renderItem(items[index], index)}</div>
  );

  return (
    <div className={cn("relative", className)}>
      <FixedSizeList
        height={height}
        itemCount={items.length}
        itemSize={itemHeight}
        width="100%"
        overscanCount={overscanCount}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}