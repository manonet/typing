/* eslint-disable */

import classNames from 'classnames';
import React from 'react';

import { Layout, SEO } from '@components';

type Props = {
  className?: string;
  onClick: (color: string) => void;
};

type State = {
  selectedColor: string;
};

const colorNames = [
  'red',
  'volcano',
  'orange',
  'gold',
  'yellow',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
  'magenta',
  'grey',
];
const colorShades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Palette = ({ className, onClick }: Props) => {
  return (
    <div className={classNames('palette', className)}>
      {colorNames.map((colorName) => {
        return (
          <div key={colorName} className="palette__colorRow">
            {colorShades.map((colorShade) => {
              const colorStyle = `@${colorName}-${colorShade}`;
              const colorVar = `@${colorName}-${colorShade}`;
              return (
                <div className="palette__colorCell" key={colorVar}>
                  <div
                    key={colorStyle}
                    className="palette__sample"
                    style={{ background: colorStyle }}
                    onClick={() => onClick(colorStyle)}
                  >
                    <span className="palette__label">{colorVar}</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

class ColorPage extends React.Component<Props, State> {
  state: State = {
    selectedColor: `var(--color-${colorNames[0]}-${colorShades[0]})`,
  };

  changeColorRef = this.changeColor.bind(this);

  changeColor(color: string) {
    this.setState({
      selectedColor: color,
    });
  }

  render() {
    const { selectedColor } = this.state;
    return (
      <Layout>
        <SEO title="Manonet - Styleguide - Colors" />
        <h1>Colors</h1>
        <Palette onClick={() => false} />

        <div className="colorSection" style={{ background: selectedColor }}>
          <Palette onClick={this.changeColorRef} />
        </div>
      </Layout>
    );
  }
}

export default ColorPage;
