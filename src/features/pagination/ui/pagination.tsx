import arrowLeft from "../../../assets/icons/arrow_left.svg";
import arrowRight from "../../../assets/icons/arrow_right.svg";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: IPaginationProps) => {
  const handlePrevious = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  const generatePageNumbers = () => {
    if (!totalPages) return [];
    
    const numbers = new Set<number>();

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) numbers.add(i);
    } else {
      numbers.add(1);
      numbers.add(totalPages);
      numbers.add(currentPage);
      if (numbers.size < 4 && currentPage - 1 >= 2) numbers.add(currentPage - 1);
      if (numbers.size < 4 && currentPage + 1 <= totalPages - 1) numbers.add(currentPage + 1);
      if (numbers.size < 4 && !numbers.has(2) && totalPages > 4) numbers.add(2);
      if (numbers.size < 4 && !numbers.has(totalPages - 1) && totalPages > 4) numbers.add(totalPages - 1);
    }

    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const items: (number | string)[] = [];
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) items.push("...");
      items.push(sorted[i]);
    }

    return items;
  };

  const pageItems = generatePageNumbers();

  return (
    <div className="mx-auto w-fit mt-10 flex items-center gap-2">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <img src={arrowLeft} alt="Previous" className="w-4 h-4" />
      </button>
      {pageItems.map((item, idx) =>
        typeof item === "number" ? (
          <button
            key={item}
            className={`px-4 py-2 ${
              item === currentPage ? "border-1 border-[#FF4000] rounded-[4px]" : ""
            }`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`} className="px-2">
            {item}
          </span>
        )
      )}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        <img src={arrowRight} alt="Next" className="w-4 h-4" />
      </button>
    </div>
  );
};