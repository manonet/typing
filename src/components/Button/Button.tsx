import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const BUTTON_CLASS_NAME = 'Button';

export const ButtonColor = {
  PRIMARY: 'primary' as 'primary',
  SECONDARY: 'secondary' as 'secondary',
  DANGER: 'danger' as 'danger',
};
export type TButtonColorValue = typeof ButtonColor[keyof typeof ButtonColor];

export const ButtonSize = {
  SMALL: 'small' as 'small',
  MEDIUM: 'medium' as 'medium',
  BIG: 'big' as 'big',
};
export type TButtonSizeValue = typeof ButtonSize[keyof typeof ButtonSize];

export const ButtonDisplayType = {
  DEFAULT: 'default' as 'default',
  UNSTYLED: 'unstyled' as 'unstyled',
};
export type TTypeValue = typeof ButtonDisplayType[keyof typeof ButtonDisplayType];

export type DefaultProps = {
  displayType: TTypeValue;
  disabled: boolean;
  onClick: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  onKeyPress: (
    event: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  selected: boolean;
  type: 'button' | 'submit' | 'reset';
};

export type BaseProps = {
  children: ReactNode;
  className?: string;
  color?: TButtonColorValue;
  displaySize?: TButtonSizeValue;
  fullWidth?: boolean;
  href?: string;
  inverse?: boolean;
  square?: boolean;
  title?: string;
};

type Props = BaseProps & DefaultProps;

import './Button.scss';

class Button extends React.PureComponent<Props> {
  static defaultProps: DefaultProps = {
    displayType: ButtonDisplayType.DEFAULT,
    disabled: false,
    onClick: () => {},
    onKeyPress: () => {},
    selected: false,
    type: 'button',
  };

  onClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    const { disabled, onClick } = this.props;

    if (disabled) return;
    onClick(event);
  };

  onKeyPress: React.KeyboardEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = (event) => {
    event.preventDefault();
    const { disabled, onKeyPress } = this.props;

    if (disabled) return;
    onKeyPress(event);
  };

  render() {
    const {
      selected,
      children,
      className,
      color,
      disabled,
      displaySize,
      fullWidth,
      square,
      type,
      displayType,
      title,
      inverse,
    } = this.props;

    if (!children) return null;

    const buttonClassNames = classNames([
      BUTTON_CLASS_NAME,
      selected ? 'Button--selected' : '',
      displaySize ? `Button--${displaySize}` : '',
      `Button--${displayType}`,
      color ? `Button--${color}` : '',
      fullWidth ? 'Button--fullWidth' : '',
      square ? 'Button--square' : '',
      disabled ? 'Button--disabled' : '',
      inverse ? 'Button--inverse' : '',
      className,
    ]);

    return (
      <button
        className={buttonClassNames}
        disabled={disabled}
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        type={type}
        title={title}
      >
        {children}
      </button>
    );
  }
}

export default Button;
