import React from 'react';
import { COLORS } from '../../constants/colors';

const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  onFocus,
  label = '',
  error = '',
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = {
    width: fullWidth ? '100%' : 'auto',
    padding: '12px 16px',
    border: `2px solid ${error ? COLORS.error : COLORS.border}`,
    borderRadius: '25px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: disabled ? COLORS.backgroundDark : COLORS.white,
    color: COLORS.textPrimary,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    ...props.style
  };

  const focusStyles = {
    borderColor: error ? COLORS.error : COLORS.primary,
    boxShadow: `0 0 0 3px ${error ? COLORS.error + '20' : COLORS.primary + '20'}`
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto'
  };

  const labelStyles = {
    fontSize: '14px',
    fontWeight: 600,
    color: COLORS.textPrimary,
    marginLeft: '4px'
  };

  const errorStyles = {
    fontSize: '12px',
    color: COLORS.error,
    marginLeft: '4px',
    marginTop: '4px'
  };

  return (
    <div style={containerStyles} className={className}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: COLORS.error }}> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        style={baseStyles}
        {...props}
      />
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};

export default Input; 