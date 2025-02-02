import React from 'react';

interface TableCellProps {
  value: string | number;
  isHeader?: boolean;
}
export const TableCell = ({ value, isHeader = false }: TableCellProps) => {
  if (isHeader) {
    return (
      <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
        {value}
      </th>
    );
  }

  return (
    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
      {value}
    </td>
  );
};
// export const TableCell = ({ value }: TableCellProps) => (
//   <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{value}</td>
// );
