import React from 'react';

// helpers
function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function PieChartDeco1(props) {
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

function PieChartLabel(props) {
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

export default class PieChart extends React.Component {
  render() {
    // props
    let unitAll = this.props.unitAll;
    let unitPart = this.props.unitPart;
    let percent = this.props.percent || (unitPart / unitAll) * 100 || 0;

    let pieClassModifier = this.props.pieClassModifier || 'default';
    let archWidth = this.props.archWidth || 10;
    let r = this.props.r || 80; // radius
    let rArch = r - archWidth / 2;
    let padding = this.props.padding || 20;
    let color = this.props.color;
    let bgcolor = this.props.bgcolor;
    let strokeLinecap = this.props.strokeLinecap || 'butt';
    let rotation = this.props.rotation || 0; // 0 - default left
    let circleFill = this.props.circleFill || 'none';
    // filter
    let filter = this.props.filter || 'none';
    let floodColor = this.props.floodColor;
    // label
    let labeled = this.props.labeled || false;
    let textColor = this.props.textColor;

    // animation
    let repeatCount = this.props.repeatCount || 1; // 0, 1, ... indefinite
    let dur = this.props.dur || '2s'; // duration
    // decoration
    let decorated = this.props.decorated || false;
    let decoStrokeWidth = this.props.decoStrokeWidth || 5;
    let decoR =
      this.props.decoR - decoStrokeWidth / 2 || rArch + archWidth / 2 + 5;
    let decoStroke = this.props.decoStroke;
    let decoFill = this.props.decoFill || 'none';
    let decoStrokeDashWidth = this.props.decoStrokeDashWidth || 2;
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
          label={parseFloat(Math.round(percent * 10) / 10).toFixed(1) + '%'}
          textColor={textColor}
          x={cx}
          y={cy}
        />
      </svg>
    );
  }
}
