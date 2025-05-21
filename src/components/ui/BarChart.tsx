import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridColumns, GridRows } from '@visx/grid';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { ParentSize } from '@visx/responsive';

interface BarChartProps {
  data: any[];
  xDataKey: string;
  barDataKey: string;
  barColor?: string;
  className?: string;
  horizontal?: boolean;
}

const margin = { top: 20, right: 30, bottom: 40, left: 120 };
const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'white',
  border: '1px solid #E5E7E9',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  padding: '12px',
  color: '#333F48',
};

const BarChart = withTooltip<BarChartProps, any>(
  ({
    data,
    xDataKey,
    barDataKey,
    barColor = '#0A3161',
    className = '',
    horizontal = false,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  }: BarChartProps & WithTooltipProvidedProps<any>) => {
    return (
      <div className={`h-64 ${className}`}>
        <ParentSize>
          {({ width, height }) => {
            // Bounds
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            // Scales for vertical bars
            const verticalXScale = scalePoint<string>({
              domain: data.map(d => d[xDataKey]),
              range: [0, xMax],
              padding: 0.5,
            });

            const verticalYScale = scaleLinear<number>({
              domain: [0, Math.max(...data.map(d => d[barDataKey])) * 1.1],
              range: [yMax, 0],
              nice: true,
            });

            // Scales for horizontal bars
            const horizontalXScale = scaleLinear<number>({
              domain: [0, Math.max(...data.map(d => d[barDataKey])) * 1.1],
              range: [0, xMax],
              nice: true,
            });

            const horizontalYScale = scalePoint<string>({
              domain: data.map(d => d[xDataKey]),
              range: [0, yMax],
              padding: 0.5,
            });

            const barWidth = Math.min(40, (xMax / data.length) * 0.6);
            const barHeight = Math.min(20, (yMax / data.length) * 0.6);

            return (
              <svg width={width} height={height}>
                <Group left={margin.left} top={margin.top}>
                  {horizontal ? (
                    <>
                      <GridColumns
                        scale={horizontalXScale}
                        height={yMax}
                        strokeDasharray="3,3"
                        stroke="#E5E7E9"
                        strokeOpacity={0.8}
                      />
                      {data.map((d, i) => {
                        const y = horizontalYScale(d[xDataKey]) ?? 0;
                        const barWidth = horizontalXScale(d[barDataKey]);
                        return (
                          <Bar
                            key={`bar-${i}`}
                            x={0}
                            y={y - barHeight / 2}
                            width={barWidth}
                            height={barHeight}
                            fill={barColor}
                            rx={4}
                            opacity={0.9}
                            onMouseMove={(event) => {
                              const coords = event.currentTarget.getBoundingClientRect();
                              showTooltip({
                                tooltipData: d,
                                tooltipLeft: coords.x + coords.width,
                                tooltipTop: coords.y,
                              });
                            }}
                            onMouseLeave={() => hideTooltip()}
                          />
                        );
                      })}
                      <AxisLeft
                        scale={horizontalYScale}
                        tickLabelProps={() => ({
                          fontSize: 12,
                          textAnchor: 'end',
                          dx: -8,
                          fill: '#4A5761',
                        })}
                        stroke="#E5E7E9"
                      />
                      <AxisBottom
                        top={yMax}
                        scale={horizontalXScale}
                        tickLabelProps={() => ({
                          fontSize: 12,
                          textAnchor: 'middle',
                          fill: '#4A5761',
                        })}
                        stroke="#E5E7E9"
                      />
                    </>
                  ) : (
                    <>
                      <GridRows
                        scale={verticalYScale}
                        width={xMax}
                        strokeDasharray="3,3"
                        stroke="#E5E7E9"
                        strokeOpacity={0.8}
                      />
                      {data.map((d, i) => {
                        const x = verticalXScale(d[xDataKey]) ?? 0;
                        const barHeight = yMax - verticalYScale(d[barDataKey]);
                        return (
                          <Bar
                            key={`bar-${i}`}
                            x={x - barWidth / 2}
                            y={yMax - barHeight}
                            width={barWidth}
                            height={barHeight}
                            fill={barColor}
                            rx={4}
                            opacity={0.9}
                            onMouseMove={(event) => {
                              const coords = event.currentTarget.getBoundingClientRect();
                              showTooltip({
                                tooltipData: d,
                                tooltipLeft: coords.x + coords.width / 2,
                                tooltipTop: coords.y,
                              });
                            }}
                            onMouseLeave={() => hideTooltip()}
                          />
                        );
                      })}
                      <AxisLeft
                        scale={verticalYScale}
                        tickLabelProps={() => ({
                          fontSize: 12,
                          textAnchor: 'end',
                          dx: -8,
                          fill: '#4A5761',
                        })}
                        stroke="#E5E7E9"
                      />
                      <AxisBottom
                        top={yMax}
                        scale={verticalXScale}
                        tickLabelProps={() => ({
                          fontSize: 12,
                          textAnchor: 'middle',
                          fill: '#4A5761',
                          angle: -45,
                          dy: 10,
                        })}
                        stroke="#E5E7E9"
                      />
                    </>
                  )}
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
              <strong className="block mb-1">{tooltipData[xDataKey]}</strong>
              <span className="text-sm">{tooltipData[barDataKey]}</span>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);

export default BarChart;