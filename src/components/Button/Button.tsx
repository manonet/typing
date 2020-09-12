import classNames from 'classnames';
import React, { ReactNode, forwardRef } from 'react';

export const BUTTON_CLASS_NAME = 'Button';

export const ButtonColor = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGER: 'danger',
} as const;
export type TButtonColorValue = typeof ButtonColor[keyof typeof ButtonColor];

export const ButtonSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  BIG: 'big',
} as const;
export type TButtonSizeValue = typeof ButtonSize[keyof typeof ButtonSize];

export const ButtonDisplayType = {
  DEFAULT: 'default',
  UNSTYLED: 'unstyled',
} as const;
export type TTypeValue = typeof ButtonDisplayType[keyof typeof ButtonDisplayType];

export type DefaultProps = {
  displayType?: TTypeValue;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  selected?: boolean;
  type?: 'button' | 'submit' | 'reset';
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

type RefType = HTMLButtonElement | null;

const Button = forwardRef<RefType, Props>(
  (
    {
      children,
      className,
      color,
      disabled = false,
      displaySize,
      displayType = ButtonDisplayType.DEFAULT,
      fullWidth,
      inverse,
      onClick = (e) => e,
      onKeyPress = (e) => e,
      selected = false,
      square,
      title,
      type = 'button',
    }: Props,
    ref
  ) => {
    function handleOnClick(event: React.MouseEvent) {
      event.preventDefault();

      if (disabled) return;
      onClick(event);
    }

    function handleOnKeyPress(event: React.KeyboardEvent) {
      event.preventDefault();

      if (disabled) return;
      onKeyPress(event);
    }

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
        ref={ref}
        className={buttonClassNames}
        disabled={disabled}
        onClick={handleOnClick}
        onKeyPress={handleOnKeyPress}
        type={type}
        title={title}
      >
        {children}
      </button>
    );
  }
);

export default Button;
