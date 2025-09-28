import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface VirtualGridProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  columnsConfig: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap: number;
  renderItem: (item: T, index: number, isVisible: boolean) => React.ReactNode;
  className?: string;
  overscan?: number; // Number of items to render outside viewport
}

function VirtualGrid<T>({
  items,
  itemHeight,
  containerHeight,
  columnsConfig,
  gap,
  renderItem,
  className = "",
  overscan = 2
}: VirtualGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size and update container width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);

      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Use ResizeObserver for more accurate container width updates
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  // Calculate grid properties
  const gridProps = useMemo(() => {
    const columns = isMobile
      ? columnsConfig.mobile
      : isTablet
        ? columnsConfig.tablet
        : columnsConfig.desktop;

    const totalGaps = (columns - 1) * gap;
    const itemWidth = containerWidth > 0 ? (containerWidth - totalGaps) / columns : 300;
    const rowHeight = itemHeight + gap;
    const totalRows = Math.ceil(items.length / columns);
    const totalHeight = Math.max(0, totalRows * rowHeight - gap);

    return {
      columns,
      itemWidth,
      rowHeight,
      totalRows,
      totalHeight
    };
  }, [items.length, containerWidth, itemHeight, gap, columnsConfig, isMobile, isTablet]);

  // Calculate visible range with overscan
  const visibleRange = useMemo(() => {
    const startRow = Math.max(0, Math.floor(scrollTop / gridProps.rowHeight) - overscan);
    const endRow = Math.min(
      gridProps.totalRows - 1,
      Math.ceil((scrollTop + containerHeight) / gridProps.rowHeight) + overscan
    );

    const startIndex = startRow * gridProps.columns;
    const endIndex = Math.min(items.length - 1, (endRow + 1) * gridProps.columns - 1);

    return { startIndex, endIndex, startRow, endRow };
  }, [scrollTop, containerHeight, gridProps, items.length, overscan]);

  // Get visible items with positioning
  const visibleItems = useMemo(() => {
    const result = [];
    const visibleStart = Math.floor(scrollTop / gridProps.rowHeight) * gridProps.columns;
    const visibleEnd = Math.ceil((scrollTop + containerHeight) / gridProps.rowHeight) * gridProps.columns;

    for (let i = visibleRange.startIndex; i <= visibleRange.endIndex; i++) {
      if (i >= items.length) break;

      const row = Math.floor(i / gridProps.columns);
      const col = i % gridProps.columns;
      const x = col * (gridProps.itemWidth + gap);
      const y = row * gridProps.rowHeight;

      // Determine if item is actually visible (not just in overscan)
      const isVisible = i >= visibleStart && i < visibleEnd;

      result.push({
        item: items[i],
        index: i,
        x,
        y,
        width: gridProps.itemWidth,
        height: itemHeight,
        isVisible
      });
    }

    return result;
  }, [items, visibleRange, gridProps, gap, itemHeight, scrollTop, containerHeight]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
  };

  // Early return if no items or invalid dimensions
  if (items.length === 0 || containerWidth === 0) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center ${className}`}
        style={{ height: containerHeight }}
      >
        <div className="text-gray-500">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      {/* Virtual container with full height */}
      <div
        style={{
          height: gridProps.totalHeight,
          position: 'relative'
        }}
      >
        {/* Render only visible items */}
        {visibleItems.map(({ item, index, x, y, width, height, isVisible }) => (
          <motion.div
            key={`${index}-${width}`} // Include width in key to force re-render on resize
            className="absolute"
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
              width,
              height
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: isVisible ? Math.min(0.05 * (index % 6), 0.2) : 0
            }}
          >
            {renderItem(item, index, isVisible)}
          </motion.div>
        ))}
      </div>

      {/* Scroll progress indicator */}
      {gridProps.totalHeight > containerHeight && (
        <div className="absolute top-2 right-2 w-1 h-16 bg-black bg-opacity-20 rounded-full overflow-hidden">
          <div
            className="w-full bg-yellow-500 transition-all duration-150 rounded-full"
            style={{
              height: `${Math.min(100, (containerHeight / gridProps.totalHeight) * 100)}%`,
              transform: `translateY(${(scrollTop / (gridProps.totalHeight - containerHeight)) * (100 - (containerHeight / gridProps.totalHeight) * 100)}%)`
            }}
          />
        </div>
      )}

      {/* Performance debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs p-2 rounded">
          Rendering {visibleItems.length}/{items.length} items
        </div>
      )}
    </div>
  );
}

export default VirtualGrid;