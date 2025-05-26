import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridColumns } from '@visx/grid';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { ParentSize } from '@visx/responsive';
import debounce from 'lodash/debounce';

interface FunnelChartProps {
  data: {
    name: string;
    value: number;
  }[];
  className?: string;
}

const margin = { top: 20, right: 30, bottom: 40, left: 120 };
const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'white',
  border: '1px solid #999',
  padding: '8px',
  borderRadius: '4px',
};

const FunnelChart = withTooltip<FunnelChartProps, { name: string; value: number }>(
  ({
    data,
    className = '',
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  }: FunnelChartProps & WithTooltipProvidedProps<{ name: string; value: number }>) => {
    // Sort data from highest to lowest
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    // Function to split the value equally among three modules
    const splitValueAmongModules = (value: number) => {
      const split = value / 3; // Equal split among Module A, B, C
      return {
        moduleA: split,
        moduleB: split,
        moduleC: split,
      };
    };

    // Debounced showTooltip handler
    const debouncedShowTooltip = useCallback(
      debounce((tooltipData, tooltipLeft, tooltipTop) => {
        showTooltip({
          tooltipData,
          tooltipLeft,
          tooltipTop,
        });
      }, 100),
      [showTooltip]
    );

    return (
      <div className={`h-64 ${className}`}>
        <ParentSize>
          {({ width, height }) => {
            // Bounds
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            // Scales
            const xScale = scaleLinear<number>({
              domain: [0, 100],
              range: [0, xMax],
              nice: true,
            });

            const yScale = scalePoint<string>({
              domain: sortedData.map(d => d.name),
              range: [0, yMax],
              padding: 0.5,
            });

            const barHeight = Math.min(20, (yMax / sortedData.length) * 0.6);

            return (
              <svg width={width} height={height}>
                <Group left={margin.left} top={margin.top}>
                  <GridColumns
                    scale={xScale}
                    height={yMax}
                    strokeDasharray="3,3"
                    stroke="#e0e0e0"
                  />
                  {sortedData.map((d, i) => {
                    const y = yScale(d.name) ?? 0;
                    return (
                      <Bar
                        key={`bar-${d.name}`}
                        x={0}
                        y={y - barHeight / 2}
                        width={xScale(d.value)}
                        height={barHeight}
                        fill={`rgba(10, 49, 97, ${1 - i * 0.15})`}
                        rx={4}
                        onMouseMove={(event) => {
                          const coords = event.currentTarget.getBoundingClientRect();
                          debouncedShowTooltip(d, coords.x + coords.width / 2, coords.y);
                        }}
                        onMouseLeave={() => {
                          debouncedShowTooltip.cancel(); // Cancel any pending debounced calls
                          hideTooltip();
                        }}
                      />
                    );
                  })}
                  <AxisLeft
                    scale={yScale}
                    tickLabelProps={() => ({
                      fontSize: 12,
                      textAnchor: 'end',
                      dx: -8,
                    })}
                  />
                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    tickFormat={(value) => `${value}`}
                    tickLabelProps={() => ({
                      fontSize: 12,
                      textAnchor: 'middle',
                    })}
                  />
                </Group>
              </svg>
            );
          }}
        </ParentSize>
        {tooltipOpen && tooltipData && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <div>
              <strong>{tooltipData.name}</strong>
              <div>Total: {tooltipData.value}</div>
              <div>
                {(() => {
                  const split = splitValueAmongModules(tooltipData.value);
                  return (
                    <>
                      <div>Module A: {split.moduleA.toFixed(2)}</div>
                      <div>Module B: {split.moduleB.toFixed(2)}</div>
                      <div>Module C: {split.moduleC.toFixed(2)}</div>
                    </>
                  );
                })()}
              </div>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);

export default FunnelChart;