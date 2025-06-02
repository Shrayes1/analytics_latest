import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import {
  withTooltip,
  Tooltip,
} from '@visx/tooltip';
import { ParentSize } from '@visx/responsive';
import debounce from 'lodash/debounce';

interface LineChartData {
  [key: string]: string | number; // Adjust this based on your actual data structure
}

interface LineChartProps {
  data: LineChartData[];
  xDataKey: string;
  lineDataKey: string;
  lineColor?: string;
  targetValue?: number;
  className?: string;
}

const margin = { top: 20, right: 30, bottom: 50, left: 60 };

const LineChartComponent: React.FC<
  LineChartProps & any
> = ({
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
}) => {
  const tooltipStyles = {
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '8px',
    borderRadius: '4px',
  };

  const debouncedShowTooltip = useCallback(
    debounce((tooltipData: any, tooltipLeft: number, tooltipTop: number) => {
      showTooltip({
        tooltipData,
        tooltipLeft,
        tooltipTop,
      });
    }, 100),
    [showTooltip]
  );

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
          if (xMax <= 0 || yMax <= 0) return null;

          const xScale = scalePoint<string>({
            domain: data.map((d: LineChartData) => d[xDataKey] as string),
            range: [0, xMax],
            padding: 0.5,
          });

          const yScale = scaleLinear<number>({
            domain: [0, 100],
            range: [yMax, 0],
          });

          const dataValues = data.map((d: LineChartData) => d[lineDataKey] as number);
          const allValues = targetValue ? [...dataValues, targetValue] : dataValues;
          const dataMin = Math.min(...allValues);
          const dataMax = Math.max(...allValues);

          const scaleToUptimeRange = (value: number) => {
            if (dataMax === dataMin) return 85;
            const scaled =
              85 + ((value - dataMin) / (dataMax - dataMin)) * (99 - 85);
            return Math.round(scaled * 100) / 100;
          };

          const scaledData = data.map((d: LineChartData) => ({
            ...d,
            [lineDataKey]: scaleToUptimeRange(Number(d[lineDataKey])),
          }));

          const scaledTargetValue = targetValue
            ? scaleToUptimeRange(targetValue)
            : undefined;

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
                  x={(d: LineChartData) => xScale(d[xDataKey] as string) ?? 0}
                  y={(d) => yScale(d[lineDataKey] as number)}
                  stroke={lineColor}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />

                {scaledData.map((d: LineChartData, i: number) => (
                  <circle
                    key={`point-${i}`}
                    cx={xScale(d[xDataKey] as string)}
                    cy={yScale(d[lineDataKey] as number)}
                    r={4}
                    fill="white"
                    stroke={lineColor}
                    strokeWidth={2}
                    style={{
                      filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))',
                    }}
                    onMouseEnter={(event) => {
                      const svg = event.currentTarget.ownerSVGElement;
                      if (!svg) return;
                      const point = svg.createSVGPoint();
                      point.x = event.clientX;
                      point.y = event.clientY;
                      const svgPoint = point.matrixTransform(
                        svg.getScreenCTM()?.inverse()
                      );
                      debouncedShowTooltip(d, svgPoint.x, svgPoint.y - 20);
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
                  tickValues={tickValues}
                  label="Uptime (%)"
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
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div>
            <strong className="block mb-1">{tooltipData[xDataKey]}</strong>
            <span className="text-sm">{tooltipData[lineDataKey]}%</span>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

// ✅ Properly wrapped withTooltip and exported
const LineChart = withTooltip<LineChartProps, any>(LineChartComponent);
export default LineChart;
