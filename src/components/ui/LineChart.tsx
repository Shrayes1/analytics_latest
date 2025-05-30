import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { ParentSize } from '@visx/responsive';
import { curveMonotoneX } from '@visx/curve';
import debounce from 'lodash/debounce';

interface LineChartProps {
  data: any[];
  xDataKey: string;
  lineDataKey: string;
  lineColor?: string;
  targetValue?: number;
  className?: string;
}

const margin = { top: 20, right: 30, bottom: 50, left: 60 };
const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'white',
  border: '1px solid #E5E7E9',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  padding: '12px',
  color: '#333F48',
};

const LineChart = withTooltip<LineChartProps, any>(
  ({
    data,
    xDataKey,
    lineDataKey,
    lineColor = '#0A3161',
    targetValue,
    className = '',
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  }: LineChartProps & WithTooltipProvidedProps<any>) => {
    // Debounced showTooltip handler
    const debouncedShowTooltip = useCallback(
      debounce(
        (tooltipData: any, tooltipLeft: number, tooltipTop: number) => {
          showTooltip({
            tooltipData,
            tooltipLeft,
            tooltipTop,
          });
        },
        100,
        { leading: true, trailing: false } // Only trigger on leading edge
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
            const xMax = width - margin.left - margin.right;
            const yMax = height - margin.top - margin.bottom;

            // Ensure bounds are positive
            if (xMax <= 0 || yMax <= 0) return null;

            const xScale = scalePoint<string>({
              domain: data.map(d => d[xDataKey]),
              range: [0, xMax],
              padding: 0.5,
            });

            const yScale = scaleLinear<number>({
              domain: [0, 100], // Y-axis range remains 0-100
              range: [yMax, 0],
            });

            // Find the min and max of the data and targetValue
            const dataValues = data.map(d => d[lineDataKey]);
            const allValues = targetValue ? [...dataValues, targetValue] : dataValues;
            const dataMin = Math.min(...allValues);
            const dataMax = Math.max(...allValues);

            // Function to scale values from [dataMin, dataMax] to [85, 99]
            const scaleToUptimeRange = (value: number) => {
              if (dataMax === dataMin) return 85; // Avoid division by zero
              const scaled = 85 + ((value - dataMin) / (dataMax - dataMin)) * (99 - 85);
              return Math.round(scaled * 100) / 100; // Round to 2 decimal places
            };

            // Scale the data to fit within 85-99
            const scaledData = data.map(d => ({
              ...d,
              [lineDataKey]: scaleToUptimeRange(d[lineDataKey]),
            }));

            // Scale the targetValue to fit within 85-99
            const scaledTargetValue = targetValue ? scaleToUptimeRange(targetValue) : undefined;

            // Generate tick values at intervals of 10 (0, 10, 20, ..., 100)
            const tickValues = Array.from({ length: 11 }, (_, i) => i * 10);

            return (
              <svg width={width} height={height}>
                <Group left={margin.left} top={margin.top}>
                  <GridRows
                    scale={yScale}
                    width={xMax}
                    strokeDasharray="3,3"
                    stroke="#E5E7E9"
                    strokeOpacity={0.8}
                  />
                  <GridColumns
                    scale={xScale}
                    height={yMax}
                    strokeDasharray="3,3"
                    stroke="#E5E7E9"
                    strokeOpacity={0.8}
                  />

                  {scaledTargetValue && (
                    <line
                      x1={0}
                      y1={yScale(scaledTargetValue)}
                      x2={xMax}
                      y2={yScale(scaledTargetValue)}
                      stroke="#C4B17A"
                      strokeDasharray="4,4"
                      strokeWidth={1.5}
                    />
                  )}

                  <LinePath
                    data={scaledData}
                    x={d => xScale(d[xDataKey]) ?? 0}
                    y={d => yScale(d[lineDataKey])}
                    stroke={lineColor}
                    strokeWidth={2.5}
                    curve={curveMonotoneX}
                    strokeLinecap="round"
                  />

                  {scaledData.map((d, i) => (
                    <circle
                      key={`point-${i}`}
                      cx={xScale(d[xDataKey])}
                      cy={yScale(d[lineDataKey])}
                      r={4}
                      fill="white"
                      stroke={lineColor}
                      strokeWidth={2}
                      className="transition-all duration-200"
                      style={{
                        filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))',
                      }}
                      onMouseEnter={(event) => {
                        const svg = event.currentTarget.ownerSVGElement;
                        if (!svg) return;
                        const point = svg.createSVGPoint();
                        point.x = event.clientX;
                        point.y = event.clientY;
                        const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
                        debouncedShowTooltip(
                          d,
                          svgPoint.x, // Center of the point
                          svgPoint.y - 20 // Above the point
                        );
                      }}
                      onMouseLeave={() => {
                        debouncedShowTooltip.cancel();
                        debouncedHideTooltip();
                      }}
                    />
                  ))}

                  <AxisLeft
                    scale={yScale}
                    stroke="#E5E7E9"
                    tickStroke="#E5E7E9"
                    tickValues={tickValues} // Ticks at intervals of 10
                    label="Uptime (%)" // Updated label to reflect uptime
                    labelProps={{ fontSize: 12, textAnchor: 'middle', dx: -7 }}
                    tickLabelProps={() => ({
                      fontSize: 12,
                      textAnchor: 'end',
                      dx: -8,
                      fill: '#4A5761',
                    })}
                  />
                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    label="Month"
                    labelProps={{ fontSize: 12, textAnchor: 'middle', dy: 2 }}
                    stroke="#E5E7E9"
                    tickStroke="#E5E7E9"
                    tickLabelProps={() => ({
                      fontSize: 12,
                      textAnchor: 'middle',
                      fill: '#4A5761',
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
              <strong className="block mb-1">{tooltipData[xDataKey]}</strong>
              <span className="text-sm">{tooltipData[lineDataKey]}%</span>
              {tooltipData.scaledTargetValue !== undefined && (
                <div className="text-sm mt-1">
                  Target: {tooltipData.scaledTargetValue}%
                </div>
              )}
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);

export default LineChart;
