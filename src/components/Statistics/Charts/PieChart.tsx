import React from 'react';

// TODO figure out types
export type PieChartProps = {
  unitAll: any;
  unitPart: any;
  percent: number;
  pieClassModifier: any;
  archWidth: any;
  r: any;
  transform: any;
  bgcolor: any;
  circleFill: any;
  color: any;
  rArch: any;
  rotation: number;
  strokeLinecap: any;
  filter: any;
  floodColor: any;
  labeled: any;
  textColor: any;
  dur: any;
  decorated: any;
  decoStrokeWidth: any;
  decoStroke: any;
  decoFill: any;
  decoStrokeDashWidth: any;
  decoR: any;
  decoStrokeDasharray: any;
  strokeDasharray: any;
  repeatCount: number;
  padding: number;
};

type PieChartDecoProps = {
  decorated: any;
  cx: any;
  cy: any;
  r: any;
  stroke: any;
  fill: any;
  strokeDashoffset: any;
  strokeDasharray: any;
  strokeWidth: any;
  transform: any;
};

type PieChartLabelProps = {
  labeled: any;
  x: any;
  y: any;
  textColor: any;
  label: any;
};

// helpers
function toDegrees(angle: number) {
  return angle * (180 / Math.PI);
}

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

function PieChartDeco1(props: PieChartDecoProps) {
  if (props.decorated) {
    return (
      <circle
        className="pie-chart__decor"
        cx={props.cx}
        cy={props.cy}
        r={props.r}
        stroke={props.stroke}
        fill={props.fill}
        strokeWidth={props.strokeWidth}
        strokeDasharray={props.strokeDasharray}
        strokeDashoffset={props.strokeDashoffset || 0}
        transform={props.transform}
      />
    );
  } else {
    return null;
  }
}

function PieChartLabel(props: PieChartLabelProps) {
  if (props.labeled) {
    return (
      <text
        className="pie-chart__label"
        x={props.x}
        y={props.y + 10}
        textAnchor="middle"
        fill={props.textColor}
      >
        {props.label}
      </text>
    );
  } else {
    return null;
  }
}

export default class PieChart extends React.Component<PieChartProps> {
  render() {
    const {
      // props
      unitAll,
      unitPart,
      archWidth = 10,
      bgcolor,
      circleFill = 'none',
      color,
      padding = 20,
      percent = (unitPart / unitAll) * 100 || 0,
      pieClassModifier = 'default',
      r = 80, // radius
      rArch = r - archWidth / 2,
      rotation = 0,
      strokeLinecap = 'butt',
      // filter
      filter = 'none',
      floodColor,
      // label
      labeled = false,
      textColor,
      // animation
      repeatCount = 1, // 0, 1, ... indefinite
      dur = '2s', // duration
      // decoration
      decorated = false,
      decoStrokeWidth = 5,
      decoStroke,
      decoFill = 'none',
      decoStrokeDashWidth = 2,
    } = this.props;

    let decoR =
      this.props.decoR - decoStrokeWidth / 2 || rArch + archWidth / 2 + 5;
    let decoC = 2 * decoR * Math.PI; // circumference of deco circle
    let decoStrokeDasharray =
      this.props.decoStrokeDasharray ||
      decoStrokeDashWidth +
        ',' +
        (decoC / (unitAll || 100) - decoStrokeDashWidth) ||
      '1,3';
    let c = 2 * rArch * Math.PI; // circumference of deco circle
    let strokeDasharray =
      this.props.strokeDasharray ||
      c / (unitAll / 10) - decoStrokeDashWidth + ',' + decoStrokeDashWidth ||
      '';

    // calculated values
    let cx = r + padding;
    let cy = r + padding;
    let startAngle = 0 + rotation;
    let angle = (percent / 100) * 360 + rotation;
    let largeArcFlag = percent > 50 ? 1 : 0;

    let arcStartX = cx - rArch * Math.cos(toRadians(startAngle));
    let arcStartY = cy - rArch * Math.sin(toRadians(startAngle));
    let arcEndX = cx - rArch * Math.cos(toRadians(angle));
    let arcEndY = cy - rArch * Math.sin(toRadians(angle));

    // svg dimensions
    let width = (r + padding) * 2;
    let height = (r + padding) * 2;

    // arc length
    let s = rArch * toRadians(angle - startAngle);

    //"L " + cx + " " + cy + " Z" // for closed shape
    // filter={`url(#dropshadow)`} // for shadow

    return (
      <svg
        className={'pie-chart pie-chart--' + pieClassModifier}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter
          id="insetshadow"
          x="-10"
          y="-10"
          width={width + 20}
          height={height + 20}
        >
          <feFlood floodColor={floodColor} />
          <feComposite operator="out" in2="SourceGraphic" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>

        <circle
          className="pie-chart__bg"
          cx={cx}
          cy={cy}
          r={rArch}
          stroke={bgcolor}
          fill={circleFill}
          strokeWidth={archWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={-decoStrokeDashWidth}
          transform={'rotate(' + (rotation + 180) + ' ' + cx + ' ' + cy + ')'}
        />

        <PieChartDeco1
          decorated={decorated}
          cx={cx}
          cy={cy}
          r={decoR}
          stroke={decoStroke}
          fill={decoFill}
          strokeWidth={decoStrokeWidth}
          strokeDasharray={decoStrokeDasharray}
          strokeDashoffset={-decoStrokeDashWidth}
          transform={'rotate(' + (rotation + 180) + ' ' + cx + ' ' + cy + ')'}
        />

        <path
          className="pie-chart__path"
          d={
            'M' +
            arcStartX +
            ' ' +
            arcStartY +
            'A ' +
            rArch +
            ' ' +
            rArch +
            ' 0 ' +
            largeArcFlag +
            ' 1 ' +
            arcEndX +
            ' ' +
            arcEndY
          }
          stroke={color}
          fill="none"
          strokeLinecap={strokeLinecap}
          strokeWidth={archWidth}
          strokeDasharray={s}
          strokeDashoffset={s}
          filter={filter}
        >
          <animate
            attributeType="XML"
            attributeName="stroke-dashoffset"
            from={s}
            to="0"
            dur={dur}
            repeatCount={repeatCount}
            fill="freeze"
          />
        </path>
        <PieChartLabel
          labeled={labeled}
          label={(Math.round(percent * 10) / 10).toFixed(1) + '%'}
          textColor={textColor}
          x={cx}
          y={cy}
        />
      </svg>
    );
  }
}
