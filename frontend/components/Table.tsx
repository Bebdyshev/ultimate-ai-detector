import React from 'react';
import { useTable, Column, useSortBy } from 'react-table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

interface TableData {
  coin: string;
  exchange: string;
  current: string;
  period: string;
  deviation: string;
  commission: string;
}

const Table: React.FC = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Мемоизируем данные
  const fakeBitcoinData = React.useMemo(
    () => [
      {
        coin: 'Bitcoin',
        exchange: 'Binance',
        current: '25,000 USD',
        period: '8 | 8',
        deviation: '2%',
        commission: '0.1%',
      },
      {
        coin: 'Bitcoin',
        exchange: 'Coinbase',
        current: '25,100 USD',
        period: '4 | 8',
        deviation: '1.8%',
        commission: '0.2%',
      },
      {
        coin: 'Ethereum',
        exchange: 'Kraken',
        current: '1,800 USD',
        period: '6 | 8',
        deviation: '1.5%',
        commission: '0.15%',
      },
    ],
    []
  );

  // Мемоизируем колонки
  const columns = React.useMemo<Column<TableData>[]>(
    () => [
      {
        Header: 'Монета',
        accessor: 'coin',
        Cell: ({ value }) => (
          <div className="flex items-center justify-center space-x-2">
            <span>{value}</span>
            {value === 'Bitcoin' && (
              <Image
                src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=040"
                alt="Bitcoin Logo"
                width={20}
                height={20}
              />
            )}
            {value === 'Ethereum' && (
              <Image
                src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
                alt="Ethereum Logo"
                width={15}
                height={15}
              />
            )}
          </div>
        ),
        disableSortBy: true,
      },
      {
        Header: () => (
          <div className="flex items-center justify-center">
            Биржа
            <div className="relative inline-block ml-1">
              <span className="cursor-pointer hover:bg-gray-700 rounded-full px-1 relative">
                ℹ️
                <div className="absolute hidden bg-gray-800 p-2 border border-gray-700 rounded shadow-md w-64 text-xs z-10 left-0 top-full mt-1 hover-tooltip text-white">
                  При нажатии на эмодзи 📊 открывается график спредов, Текущие ставки финансирования и спред между ними.
                </div>
              </span>
            </div>
          </div>
        ),
        accessor: 'exchange',
        Cell: ({ value }) => (
          <div className="flex items-center justify-center">
            <span>{value}</span>
            <button onClick={() => router.push('/screening')}>
              📊
            </button>
          </div>
        ),
        disableSortBy: true,
      },
      {
        Header: () => (
          <div className="flex items-center justify-center">
            Текущий
            <div className="relative inline-block ml-1">
              <span className="cursor-pointer hover:bg-gray-700 rounded-full px-1 relative">
                ℹ️
                <div className="absolute hidden bg-gray-800 p-2 border border-gray-700 rounded shadow-md w-64 text-xs z-10 left-0 top-full mt-1 hover-tooltip text-white">
                  Для сортировки по текущей цене, нажмите на название столбца.
                </div>
              </span>
            </div>
          </div>
        ),
        accessor: 'current',
        Cell: ({ value }) => <div className="text-center">{value}</div>,
        sortType: (a, b) => {
          const numA = parseFloat(a.values.current.replace(/[^0-9.]/g, ''));
          const numB = parseFloat(b.values.current.replace(/[^0-9.]/g, ''));
          return numA - numB;
        },
      },
      {
        Header: () => (
          <div className="flex items-center justify-center">
            Период
            <div className="relative inline-block ml-1">
              <span className="cursor-pointer hover:bg-gray-700 rounded-full px-1 relative">
                ℹ️
                <div className="absolute hidden bg-gray-800 p-2 border border-gray-700 rounded shadow-md w-64 text-xs z-10 left-0 top-full mt-1 hover-tooltip text-white">
                  Период показывает количество часов, оставшихся до следующего обновления.
                </div>
              </span>
            </div>
          </div>
        ),
        accessor: 'period',
        Cell: ({ value }) => <div className="text-center">{value}</div>,
        disableSortBy: true,
      },
      {
        Header: () => (
          <div className="flex items-center justify-center">
            Отклонение
            <div className="relative inline-block ml-1">
              <span className="cursor-pointer hover:bg-gray-700 rounded-full px-1 relative">
                ℹ️
                <div className="absolute hidden bg-gray-800 p-2 border border-gray-700 rounded shadow-md w-64 text-xs z-10 left-0 top-full mt-1 hover-tooltip text-white">
                  Отклонение влияет на прогнозную ставку для бирж с фиксированной ставкой финансирования.
                </div>
              </span>
            </div>
          </div>
        ),
        accessor: 'deviation',
        Cell: ({ value }) => <div className="text-center">{value}</div>,
        sortType: (a, b) => {
          const numA = parseFloat(a.values.deviation.replace('%', ''));
          const numB = parseFloat(b.values.deviation.replace('%', ''));
          return numA - numB;
        },
      },
      {
        Header: () => (
          <div className="flex items-center justify-center">
            Комиссия
            <div className="relative inline-block ml-1">
              <span className="cursor-pointer hover:bg-gray-700 rounded-full px-1 relative">
                ℹ️
                <div className="absolute hidden bg-gray-800 p-2 border border-gray-700 rounded shadow-md w-64 text-xs z-10 left-0 top-full mt-1 hover-tooltip text-white">
                  Комиссия на платформе для выполнения сделок или вывода средств.
                </div>
              </span>
            </div>
          </div>
        ),
        accessor: 'commission',
        Cell: ({ value }) => <div className="text-center">{value}</div>,
        sortType: (a, b) => {
          const numA = parseFloat(a.values.commission.replace('%', ''));
          const numB = parseFloat(b.values.commission.replace('%', ''));
          return numA - numB;
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: fakeBitcoinData,
    },
    useSortBy
  );

  if (isMobile) {
    return (
      <div className="mt-4 w-full mx-auto px-2">
        {fakeBitcoinData.map((row, index) => (
          <div key={index} className="mb-3 p-3 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{row.coin}</span>
                {row.coin === 'Bitcoin' && (
                  <Image
                    src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=040"
                    alt="Bitcoin Logo"
                    width={20}
                    height={20}
                  />
                )}
                {row.coin === 'Ethereum' && (
                  <Image
                    src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
                    alt="Ethereum Logo"
                    width={15}
                    height={15}
                  />
                )}
              </div>
              <button 
                onClick={() => router.push('/screening')}
                className="text-lg"
              >
                📊
              </button>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Биржа:</span>
                <span>{row.exchange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Текущая цена:</span>
                <span>{row.current}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Период:</span>
                <span>{row.period}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Отклонение:</span>
                <span>{row.deviation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Комиссия:</span>
                <span>{row.commission}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 w-full max-w-6xl mx-auto px-2">
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="table-auto border-collapse border border-gray-700 w-full">
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={headerGroupKey} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th
                        key={columnKey}
                        {...restColumnProps}
                        className="border border-gray-700 px-4 py-2 text-center"
                      >
                        <div className="flex items-center justify-center">
                          {column.render('Header')}
                          {column.canSort && (
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' 🔽'
                                  : ' 🔼'
                                : ' ↕️'}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const { key: rowKey, ...restRowProps } = row.getRowProps();
              return (
                <tr key={rowKey} {...restRowProps}>
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={cellKey}
                        {...restCellProps}
                        className="border border-gray-700 px-4 py-2 text-center"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;