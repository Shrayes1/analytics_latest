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

const margin = { top: 20, right: 30, bottom: 40, left: 100 };
const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'white',
  border: '1px solid #999',
  padding: '8px',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    // Use data in original order (no sorting)
    const chartData = data;

    // Debounced showTooltip handler
    const debouncedShowTooltip = useCallback(
      debounce(
        (tooltipData: { name: string; value: number }, tooltipLeft: number, tooltipTop: number) => {
          showTooltip({
            tooltipData,
            tooltipLeft,
            tooltipTop,
          });
        },
        100,
        { leading: true, trailing: false }
      ),
      [showTooltip]
    );

    // Debounced hideTooltip handler
    const debouncedHideTooltip = useCallback(
      debounce(() => {
        hideTooltip();
      }, 200),
      [hideTooltip]
    );

    return (
      <div className={`relative h-64 ${className}`}>
        <ParentSize>
          {({ width, height }) => {
            // Bounds
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            // Ensure bounds are positive
            if (xMax <= 0 || yMax <= 0) return null;

            // Scales
            const xScale = scaleLinear<number>({
              domain: [0, Math.max(100, ...chartData.map(d => d.value))],
              range: [0, xMax],
              nice: true,
            });

            const yScale = scalePoint<string>({
              domain: chartData.map(d => d.name),
              range: [0, yMax],
              padding: 0.5,
            });

            const barHeight = Math.min(20, (yMax / chartData.length) * 0.6);

            return (
              <svg width={width} height={height}>
                <Group left={margin.left} top={margin.top}>
                  <GridColumns
                    scale={xScale}
                    height={yMax}
                    strokeDasharray="3,3"
                    stroke="#e0e0e0"
                  />
                  {chartData.map((d, i) => {
                    const y = yScale(d.name) ?? 0;
                    const barWidth = xScale(d.value);
                    return (
                      <Bar
                        key={`bar-${d.name}-${i}`} // Added index to key to handle duplicate names
                        x={0}
                        y={y - barHeight / 2}
                        width={barWidth}
                        height={barHeight}
                        fill={`rgba(10, 49, 97, ${1 - i * 0.15})`}
                        rx={4}
                        onMouseMove={(event) => {
                          const svg = event.currentTarget.ownerSVGElement;
                          if (!svg) return;
                          const point = svg.createSVGPoint();
                          point.x = event.clientX;
                          point.y = event.clientY;
                          const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
                          debouncedShowTooltip(
                            d,
                            svgPoint.x,
                            svgPoint.y - barHeight / 2 - 10
                          );
                        }}
                        onMouseLeave={() => {
                          debouncedShowTooltip.cancel();
                          debouncedHideTooltip();
                        }}
                      />
                    );
                  })}
                  <AxisLeft
                    scale={yScale}
                    label="Modules"
                    labelProps={{ fontSize: 12, textAnchor: 'middle', dx: -45 }}
                    tickLabelProps={() => ({
                      fontSize: 12,
                      textAnchor: 'end',
                      dx: -8,
                    })}
                  />
                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    label="Time (in ms)"
                    labelProps={{ fontSize: 12, textAnchor: 'middle', dy: 0 }}
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
          <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
            <div>
              <strong>{tooltipData.name}</strong>
              <div>{tooltipData.value}</div>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);

export default FunnelChart;