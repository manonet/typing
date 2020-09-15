import React from 'react';

import LineChart from '../../components/Statistics/Charts/LineChart';
import PieChart, {
  PieChartProps,
} from '../../components/Statistics/Charts/PieChart';

// examples: http://canvasjs.com/docs/charts/integration/jquery/chart-types/jquery-line-chart/

function PieChartThin(props: PieChartProps) {
  return (
    // @ts-ignore FIXME
    <PieChart
      archWidth={5}
      strokeLinecap="round"
      pieClassModifier="thin"
      unitAll={props.unitAll}
      unitPart={props.unitPart}
      percent={props.percent}
      labeled={true}
    />
  );
}

function PieChartArc(props: PieChartProps) {
  return (
    // @ts-ignore FIXME
    <PieChart
      pieClassModifier="arc"
      unitAll={props.unitAll}
      unitPart={props.unitPart}
      percent={props.percent}
      r={80}
      archWidth={80}
      decorated={true}
      decoStrokeDashWidth={1}
    />
  );
}

function PieChartMarked(props: PieChartProps) {
  return (
    // @ts-ignore FIXME
    <PieChart
      pieClassModifier="marked"
      unitAll={props.unitAll}
      unitPart={props.unitPart}
      percent={props.percent}
      rotation={90}
      archWidth={14}
      decorated={true}
      decoR={72}
      decoStroke="#eee"
      decoFill={'none'}
      decoStrokeWidth={7}
      decoStrokeDashWidth={1}
      labeled={true}
    />
  );
}

function PieChartInset(props: PieChartProps) {
  return (
    // @ts-ignore FIXME
    <PieChart
      pieClassModifier="inset"
      unitAll={props.unitAll}
      unitPart={props.unitPart}
      percent={props.percent}
      rotation={-90}
      archWidth={10}
      strokeLinecap="round"
      bgcolor="none"
      filter={`url(#insetshadow)`}
      floodColor="#aa5bde"
      labeled={true}
    />
  );
}

function PieChartOuther(props: PieChartProps) {
  return (
    // @ts-ignore FIXME
    <PieChart
      pieClassModifier="outher"
      unitAll={props.unitAll}
      unitPart={props.unitPart}
      percent={props.percent}
      rotation={90}
      archWidth={10}
      labeled={true}
    />
  );
}

export default class ChartsSection extends React.Component {
  render() {
    return (
      <section className="section section--charts">
        <h2>Charts</h2>

        <h3>LineCharts</h3>

        {/* @ts-ignore */}
        <LineChart />

        <h3>Pie</h3>

        {/* @ts-ignore */}
        <PieChart />

        {/* @ts-ignore */}
        <PieChartThin percent={35.5} />

        {/* @ts-ignore */}
        <PieChartArc percent={65.5} />
        {/* @ts-ignore */}
        <PieChartMarked unitAll={150} unitPart={49} />
        {/* @ts-ignore */}
        <PieChartInset percent={82} />
        {/* @ts-ignore */}
        <PieChartOuther percent={72} />
      </section>
    );
  }
}
