'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/button';
import Table from '@/components/Table';
import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination';

const exchanges = [
  'Все',
  'Binance',
  'ByBit',
  'MEXC',
  'OKX',
  'Bitget',
  'KuCoin',
  'Gate.io',
  'Huobi',
  'CoinEx',
  'Bingx',
  'Bitmart',
  'Bitmex',
  'XT',
  'LBank',
  'HyperLiquid',
];

interface ExchangeSelectingProps {
  selectedExchanges: string[];
  setSelectedExchanges: React.Dispatch<React.SetStateAction<string[]>>;
}

// Хук для определения мобильного устройства по ширине экрана
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function ExchangeSelecting({
  selectedExchanges,
  setSelectedExchanges,
}: ExchangeSelectingProps) {
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5;

  const router = useRouter();
  const isMobile = useIsMobile();

  const toggleExchange = useCallback(
    (exchange: string) => {
      setSelectedExchanges((prev) => {
        if (exchange === 'Все') {
          return prev.length === exchanges.length - 1 ? [] : exchanges.slice(1);
        }
        return prev.includes(exchange)
          ? prev.filter((item) => item !== exchange)
          : [...prev, exchange];
      });
    },
    [setSelectedExchanges]
  );

  const handleSubmit = () => {
    if (selectedExchanges.length === 0) {
      setError('Пожалуйста, выберите хотя бы одну биржу');
    } else {
      setError(null);
      setShowTable(true);
    }
  };

  const handleAnalysisClick = () => {
    router.push('/screening');
  };

  return (
    <main className="flex flex-col items-center p-6 mt-[20px]">
      <h1 className="text-4xl font-bold mb-4 text-center">Фьючерсный сканер</h1>
      <h2 className="text-2xl font-medium mb-6 text-center">Выберите биржи</h2>

      <div
        className={`grid ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} gap-6 justify-items-center`}
      >
        {exchanges.map((exchange) => (
          <label key={exchange} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={
                exchange === 'Все'
                  ? selectedExchanges.length === exchanges.length - 1
                  : selectedExchanges.includes(exchange)
              }
              onChange={() => toggleExchange(exchange)}
              className="cursor-pointer"
            />
            <span>{exchange}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <Button className="mt-6" onClick={handleSubmit}>
        Применить
      </Button>

      {showTable && (
        <>
          <Table data={tableData} />
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <Button className="mt-6" onClick={handleAnalysisClick}>
            📊 Анализ
          </Button>
        </>
      )}
    </main>
  );
}
