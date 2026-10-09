import type { ComponentProps } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import './brand-select.css';

type BrandSelectProps = {
  options: readonly { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
} & Omit<ComponentProps<typeof SelectTrigger>, 'value' | 'onChange' | 'children'>;

/** Shared website dropdown; Base UI supplies keyboard, touch and form semantics. */
export function BrandSelect({ options, value, onValueChange, name, disabled, className = '', ...triggerProps }: BrandSelectProps) {
  return <Select items={options} value={value} name={name} disabled={disabled} onValueChange={next => { if (next !== null) onValueChange(next); }}>
    <SelectTrigger {...triggerProps} className={`brand-select ${className}`} data-value={value}><SelectValue /></SelectTrigger>
    <SelectContent className="brand-select-menu" align="start" alignItemWithTrigger={false} sideOffset={8}>
      {options.map(option => <SelectItem key={option.value} value={option.value} className="brand-select-option">{option.label}</SelectItem>)}
    </SelectContent>
  </Select>;
}
