import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

const PAGE_SIZE_OPTIONS = [20, 50, 100, 200];

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}: PaginationProps) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Build a compact page number list with ellipsis
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const btnBase =
    'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-40';
  const btnNeutral =
    `${btnBase} bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-red-300 hover:text-red-500 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700`;
  const btnActive =
    `${btnBase} bg-red-500 text-white shadow-md`;

  return (
    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      {/* Info + page size */}
      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>
          {startItem}–{endItem} of {totalItems}
        </span>
        <span className="hidden sm:inline">·</span>
        <label className="hidden items-center gap-1 sm:flex">
          Per page:
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="ml-1 rounded-md bg-white px-2 py-1 text-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        <button
          className={btnNeutral}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          className={btnNeutral}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getPageNumbers().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-slate-400">…</span>
          ) : (
            <button
              key={p}
              className={p === currentPage ? btnActive : btnNeutral}
              onClick={() => onPageChange(p as number)}
            >
              {p}
            </button>
          )
        )}

        <button
          className={btnNeutral}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className={btnNeutral}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
