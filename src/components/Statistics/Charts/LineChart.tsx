// TODO - cleanup props, beautify function calculations, use props as attribute

import React from 'react';

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

type ColumnProps = {
  item: {
    label: string;
  };
  index: any;
  width: any;
  height: any;
  top: any;
  left: any;
  labelColor: any;
  labelHeight: any;
};

function Column(props: ColumnProps) {
  let label = props.item.label;
  let i = props.index;
  let width = props.width;
  let height = props.height;
  let top = props.top;
  let left = props.left + width * i;
  let bottom = top + height;
  let labelColor = props.labelColor || '#fff';
  let labelHeight = props.labelHeight || 20;
  let barFill = i % 2 === 0 ? '#5fa2d3' : 'none';
  return (
    <g className="chart-bar">
      <rect fill={barFill} x={left} y={top} width={width} height={height} />
      <line
        className="chart-bar__separator"
        x1={left}
        y1={top}
        x2={left}
        y2={bottom}
        stroke="#4984af"
      />
      <text
        className="chart-bar__label"
        textAnchor="middle"
        x={left + width / 2}
        y={top + labelHeight}
        fill={labelColor}
      >
        {label}
      </text>
    </g>
  );
}

type LineChartProps = {
  data: {
    type: string;
    toolTipContent: string;
    dataPoints: { label: string; y: number }[];
  };
  dropShadowAAngle: any;
  graphWidth: any;
  graphHeight: any;
  graphX: any;
  graphY: any;
  graphPaddingTop: any;
  graphPaddingBottom: any;
  width: any;
  barHeight: any;
  height: any;
  lineClassModifier: any;
  stroke: any;
  strokeWallHeight: any;
  strokeWallColor: any;
  strokeLinecap: any;
  strokeWidth: any;
  strokeDasharray: any;
  strokeDashoffset: any;
};

export default class LineChart extends React.Component<LineChartProps> {
  render() {
    // props
    let data = this.props.data || {
      type: 'line',
      toolTipContent: '{label}: {y} billion USD',
      dataPoints: [
        { label: '2001', y: 6 },
        { label: '2002', y: 6.9 },
        { label: '2003', y: 7 },
        { label: '2004', y: 7.3 },
        { label: '2005', y: 6.9 },
        { label: '2006', y: 7.3 },
        { label: '2007', y: 9.5 },
        { label: '2008', y: 11.7 },
        { label: '2009', y: 10.1 },
        { label: '2010', y: 17.1 },
      ],
    };
    let dataPoints = data.dataPoints;

    let graphWidth = this.props.graphWidth || 400;
    let graphHeight = this.props.graphHeight || 180;
    let graphX = this.props.graphX || 20;
    let graphY = this.props.graphY || 10;
    let graphPaddingTop = this.props.graphPaddingTop || 30;
    let graphPaddingBottom = this.props.graphPaddingBottom || 30;

    let barWidth = this.props.width || graphWidth / dataPoints.length;
    let barHeight = this.props.barHeight || 180;

    let width = this.props.width || 500;
    let height = this.props.height || 250;
    // styling
    let lineClassModifier = this.props.lineClassModifier || 'default';
    let stroke = this.props.stroke || 'white';
    let strokeWallHeight = this.props.strokeWallHeight || 10;
    let strokeWallColor = this.props.strokeWallColor || '#71bbf1';
    let strokeLinecap = this.props.strokeLinecap || 'round';
    let strokeWidth = this.props.strokeWidth || 5;
    let strokeDasharray = this.props.strokeDasharray || '';
    let strokeDashoffset = this.props.strokeDashoffset || '';

    // calculated
    let graphMaxY = Math.max.apply(
      Math,
      dataPoints.map(function (o) {
        return o.y;
      })
    );
    let graphMinY = Math.min.apply(
      Math,
      dataPoints.map(function (o) {
        return o.y;
      })
    );
    let graphDiff = graphMaxY - graphMinY;
    let graphScaleY =
      (graphHeight - strokeWallHeight - graphPaddingTop - graphPaddingBottom) /
      graphDiff;

    let graphLineY = graphY - strokeWallHeight + graphHeight - graphPaddingTop;
    let graph = '';
    for (let i = 0; i < dataPoints.length; i++) {
      let y = dataPoints[i].y;
      let command = i === 0 ? 'M' : 'L';
      graph +=
        command +
        (graphX + barWidth * i + barWidth / 2) +
        ' ' +
        (graphLineY - (y - graphMinY) * graphScaleY);
    }

    let blurGraph = '';
    for (let i = 0; i < dataPoints.length; i++) {
      let y = dataPoints[i].y;
      let command = i === 0 ? 'M' : 'L';
      blurGraph +=
        command +
        (graphX + barWidth * i + barWidth / 2) +
        ' ' +
        (graphLineY + strokeWallHeight - (y - graphMinY) * graphScaleY);
    }

    let dropShadowGraph = '';
    for (let i = 0; i < dataPoints.length; i++) {
      let y = dataPoints[i].y;
      let command = i === 0 ? 'M' : 'L';
      dropShadowGraph +=
        command +
        (graphX + barWidth * i + barWidth / 2) +
        ' ' +
        (graphLineY + strokeWallHeight - (y - graphMinY) * graphScaleY);
    }
    let dropShadowAAngle = this.props.dropShadowAAngle || 30;
    let dropShadowBAngle = 90;
    let dropShadowCAngle = 90 - dropShadowAAngle; // summa must be 180
    let dropShadowStartHeight =
      graphY +
      graphHeight -
      (graphLineY - (dataPoints[0].y - graphMinY) * graphScaleY);
    let dropShadowEndHeight =
      graphY +
      graphHeight -
      (graphLineY -
        (dataPoints[dataPoints.length - 1].y - graphMinY) * graphScaleY);

    let dropShadowStartShift =
      (dropShadowStartHeight / Math.sin(toRadians(dropShadowCAngle))) *
      Math.sin(toRadians(dropShadowAAngle));
    let dropShadowEndShift =
      (dropShadowEndHeight / Math.sin(toRadians(dropShadowCAngle))) *
      Math.sin(toRadians(dropShadowAAngle));

    if (dropShadowEndShift > barWidth / 2) {
      let dropShadowBarY =
        (barWidth / 2 / Math.sin(toRadians(dropShadowAAngle))) *
        Math.sin(toRadians(dropShadowCAngle));

      dropShadowGraph +=
        'L' +
        (graphX + graphWidth) +
        ' ' +
        (graphY + graphHeight - dropShadowEndHeight + dropShadowBarY);
      dropShadowGraph +=
        'L' + (graphX + graphWidth) + ' ' + (graphY + graphHeight);
    } else {
      dropShadowGraph +=
        'L' +
        (graphX + graphWidth - barWidth / 2 + dropShadowEndShift) +
        ' ' +
        (graphY + graphHeight);
    }
    dropShadowGraph +=
      'L' +
      (graphX + barWidth / 2 + dropShadowStartShift) +
      ' ' +
      (graphY + graphHeight) +
      'Z';

    let wallGraph = '';
    for (let i = 0; i < dataPoints.length; i++) {
      let y = dataPoints[i].y;
      let command = i === 0 ? 'M' : 'L';
      wallGraph +=
        command +
        (graphX + barWidth * i + barWidth / 2) +
        ' ' +
        (graphLineY - (y - graphMinY) * graphScaleY);
    }
    let reversed = dataPoints.reverse();
    for (let i = 0; i < reversed.length; i++) {
      let y = reversed[i].y;
      wallGraph +=
        'L' +
        (graphX + barWidth * (reversed.length - i - 1) + barWidth / 2) +
        ' ' +
        (graphLineY + strokeWallHeight - (y - graphMinY) * graphScaleY);
    }
    wallGraph += 'Z';

    return (
      <svg
        className={'line-chart line-chart--' + lineClassModifier}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dropShadowGradient" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopOpacity=".8" stopColor="#4984af" />
            <stop offset="100%" stopOpacity=".2" stopColor="#4984af" />
          </linearGradient>

          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          fill="#65aadc"
          x={graphX}
          y={graphY}
          width={graphWidth}
          height={graphHeight}
        />

        {dataPoints.map(function (item, index) {
          return (
            // @ts-ignore
            <Column
              key={index}
              index={index}
              item={item}
              top={graphY}
              left={graphX}
              width={barWidth}
              height={graphHeight}
            />
          );
        })}

        <path
          className="line-chart__drop-shadow"
          d={dropShadowGraph}
          stroke="none"
          fill={`url(#dropShadowGradient)`}
          strokeLinecap={strokeLinecap}
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />

        <path
          className="line-chart__blur"
          d={blurGraph}
          stroke={stroke}
          fill="none"
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          filter={`url(#dropshadow)`}
          opacity=".3"
        />

        <path
          className="line-chart__wall"
          d={wallGraph}
          stroke={strokeWallColor}
          fill={strokeWallColor}
          strokeLinecap={strokeLinecap}
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
        <path
          className="line-chart__stroke"
          d={graph}
          stroke={stroke}
          fill="none"
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    );
  }
}
