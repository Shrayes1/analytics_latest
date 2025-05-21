import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { Circle } from '@visx/shape';
import { GridRows, GridColumns } from '@visx/grid';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';

interface DataPoint {
  client: string;
  adoptionRate: number;
  effectiveness: number;
  users: number;
}

interface QuadrantPlotProps {
  width: number;
  height: number;
  data: DataPoint[];
}

const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: 'white',
  border: '1px solid #E5E7E9',
  borderRadius: '6px',
  padding: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  color: '#333F48',
};

const margin = { top: 40, right: 40, bottom: 60, left: 60 };

function QuadrantPlot({
  width,
  height,
  data,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipLeft,
  tooltipTop,
}: QuadrantPlotProps & WithTooltipProvidedProps<DataPoint>) {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, 100],
        range: [0, xMax],
        nice: true,
      }),
    [xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, 100],
        range: [yMax, 0],
        nice: true,
      }),
    [yMax]
  );

  const sizeScale = scaleLinear({
    domain: [0, Math.max(...data.map(d => d.users))],
    range: [4, 20],
  });

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {/* Background grid */}
          <GridRows
            scale={yScale}
            width={xMax}
            stroke="#E5E7E9"
            strokeOpacity={0.5}
            numTicks={10}
          />
          <GridColumns
            scale={xScale}
            height={yMax}
            stroke="#E5E7E9"
            strokeOpacity={0.5}
            numTicks={10}
          />

          {/* Quadrant lines */}
          <line
            x1={xScale(50)}
            y1={0}
            x2={xScale(50)}
            y2={yMax}
            stroke="#E5E7E9"
            strokeWidth={2}
            strokeDasharray="4,4"
          />
          <line
            x1={0}
            y1={yScale(50)}
            x2={xMax}
            y2={yScale(50)}
            stroke="#E5E7E9"
            strokeWidth={2}
            strokeDasharray="4,4"
          />

          {/* Data points */}
          {data.map((d, i) => (
            <Circle
              key={`point-${i}`}
              cx={xScale(d.adoptionRate)}
              cy={yScale(d.effectiveness)}
              r={sizeScale(d.users)}
              fill="#0A3161"
              fillOpacity={0.6}
              stroke="#0A3161"
              strokeWidth={1}
              className="transition-all duration-200 hover:fill-opacity-80"
              onMouseEnter={() => {
                showTooltip({
                  tooltipData: d,
                  tooltipLeft: xScale(d.adoptionRate),
                  tooltipTop: yScale(d.effectiveness),
                });
              }}
              onMouseLeave={hideTooltip}
            />
          ))}

          {/* Axes */}
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="#333F48"
            tickStroke="#333F48"
            label="Adoption Rate (%)"
            labelProps={{
              fill: '#333F48',
              fontSize: 12,
              textAnchor: 'middle',
              dy: 45,
            }}
            tickLabelProps={() => ({
              fill: '#4A5761',
              fontSize: 12,
              textAnchor: 'middle',
              dy: 4,
            })}
          />
          <AxisLeft
            scale={yScale}
            stroke="#333F48"
            tickStroke="#333F48"
            label="Effectiveness (%)"
            labelProps={{
              fill: '#333F48',
              fontSize: 12,
              textAnchor: 'middle',
              dx: -45,
              angle: -90,
            }}
            tickLabelProps={() => ({
              fill: '#4A5761',
              fontSize: 12,
              textAnchor: 'end',
              dx: -4,
            })}
          />

          {/* Quadrant labels */}
          <text x={xMax - 100} y={30} className="text-sm fill-charcoal font-medium">
            High Performance
          </text>
          <text x={10} y={30} className="text-sm fill-charcoal font-medium">
            Needs Attention
          </text>
          <text x={xMax - 100} y={yMax - 10} className="text-sm fill-charcoal font-medium">
            Growth Potential
          </text>
          <text x={10} y={yMax - 10} className="text-sm fill-charcoal font-medium">
            At Risk
          </text>
        </Group>
      </svg>

      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="space-y-1">
            <strong className="block text-navy">{tooltipData.client}</strong>
            <div className="text-sm text-charcoal">
              <div>Adoption: {tooltipData.adoptionRate}%</div>
              <div>Effectiveness: {tooltipData.effectiveness}%</div>
              <div>Users: {tooltipData.users}</div>
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export default withTooltip<QuadrantPlotProps, DataPoint>(QuadrantPlot);