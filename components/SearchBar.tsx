// components/SearchBar.tsx
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onKeyDown,
  placeholder = 'Search by last name...'
}: SearchBarProps) => {
  return (
    <div className='relative flex-1'>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-gray-900 text-gray-900'
      />
      <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
    </div>
  );
};
