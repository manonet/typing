import React from 'react';
import classNames from 'classnames';

import Layout from '../../components/Layout';
import SEO from '../../components/seo';

import './colors.scss';

type Props = {
  className?: string;
  onClick: (color: string) => void;
};

type State = {
  selectedColor: string;
};

const colorNames = ['purple', 'red', 'orange', 'green', 'teal', 'blue', 'grey'];
const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const Palette = ({ className, onClick }: Props) => {
  return (
    <div className={classNames('palette', className)}>
      {colorNames.map((colorName) => {
        return (
          <div key={colorName} className="palette__colorRow">
            {colorShades.map((colorShade) => {
              const colorStyle = `var(--color-${colorName}-${colorShade})`;
              const colorVar = `$color-${colorName}-${colorShade}`;
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
