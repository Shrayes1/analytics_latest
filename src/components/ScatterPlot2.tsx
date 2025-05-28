import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { ParentSize } from '@visx/responsive';
import debounce from 'lodash/debounce';

interface ScatterPlotProps {
  data: {
    name: string;
    engagementScore: number;
    healthScore: number;
    users: number;
    quadrant: string;
    color: string;
  }[];
  className?: string;
}

const margin = { top: 20, right: 60, bottom: 50, left: 60 };

const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'white',
  border: '1px solid #999',
  padding: '8px',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const ScatterPlot2 = withTooltip<
  ScatterPlotProps,
  { name: string; engagementScore: number; healthScore: number; users: number; quadrant: string }
>(
  ({
    data,
    className = '',
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    showTooltip,
    hideTooltip,
  }: ScatterPlotProps &
    WithTooltipProvidedProps<{
      name: string;
      engagementScore: number;
      healthScore: number;
      users: number;
      quadrant: string;
    }>) => {
    const debouncedShowTooltip = useCallback(
      debounce((tooltipData, tooltipLeft, tooltipTop) => {
        showTooltip({
          tooltipData,
          tooltipLeft,
          tooltipTop,
        });
      }, 100, { leading: true, trailing: false }),
      [showTooltip]
    );

    const debouncedHideTooltip = useCallback(
      debounce(() => {
        hideTooltip();
      }, 200),
      [hideTooltip]
    );

    return (
      <div className={`relative w-full h-full ${className}`}>
        <ParentSize>
          {({ width, height }) => {
            const fallbackWidth = 600;
            const fallbackHeight = 500;

            const adjustedWidth = width || fallbackWidth;
            const effectiveHeight = height || fallbackHeight;

            const xMax = adjustedWidth - margin.left - margin.right;
            const yMax = effectiveHeight - margin.top - margin.bottom;

            if (xMax <= 0 || yMax <= 0) {
              return <div className="text-red-500">Invalid dimensions for scatter plot.</div>;
            }

            const xScale = scaleLinear<number>({
              domain: [0, 100],
              range: [0, xMax],
              nice: true,
            });

            const yScale = scaleLinear<number>({
              domain: [0, 100],
              range: [yMax, 0],
              nice: true,
            });

            const yTickValues = Array.from({ length: 11 }, (_, i) => i * 10);
            const xTickValues = Array.from({ length: 21 }, (_, i) => i * 5);

            return (
              <svg width={adjustedWidth} height={effectiveHeight} style={{ background: 'white' }}>
                <Group left={margin.left} top={margin.top}>
                  <GridRows
                    scale={yScale}
                    width={xMax}
                    strokeDasharray="3,3"
                    stroke="#e0e0e0"
                    tickValues={yTickValues}
                  />
                  <GridColumns
                    scale={xScale}
                    height={yMax}
                    strokeDasharray="3,3"
                    stroke="#e0e0e0"
                    tickValues={xTickValues}
                  />
                  {data.map((d, i) => {
                    const cx = xScale(d.engagementScore);
                    const cy = yScale(d.healthScore);
                    return (
                      <Circle
                        key={`dot-${d.name}-${i}`}
                        cx={cx}
                        cy={cy}
                        r={8}
                        fill={d.color}
                        onMouseMove={(event) => {
                          const svg = event.currentTarget.ownerSVGElement;
                          if (!svg) return;
                          const point = svg.createSVGPoint();
                          point.x = event.clientX;
                          point.y = event.clientY;
                          const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
                          debouncedShowTooltip(d, svgPoint.x, svgPoint.y - 10);
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
                    label="Product Health Score"
                    labelProps={{ fontSize: 12, textAnchor: 'middle' }}
                    tickValues={yTickValues}
                    tickLabelProps={() => ({ fontSize: 12, textAnchor: 'end', dx: -3 })}
                  />
                  <AxisBottom
                    top={yMax}
                    scale={xScale}
                    label="Product Engagement Score"
                    labelProps={{ fontSize: 12, textAnchor: 'middle', dy: 10 }}
                    tickValues={xTickValues.filter((v) => v % 10 === 0)}
                    tickLabelProps={() => ({ fontSize: 10, textAnchor: 'middle' })}
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
              <div>Engagement Score: {tooltipData.engagementScore}</div>
              <div>Health Score: {tooltipData.healthScore}</div>
              <div>Users: {tooltipData.users}</div>
              <div>Quadrant: {tooltipData.quadrant}</div>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
);

export default ScatterPlot2;
