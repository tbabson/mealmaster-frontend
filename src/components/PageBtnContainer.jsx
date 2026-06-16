import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllMealsContext } from "../pages/Meals";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllMealsContext();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => (
    <button
      key={pageNumber}
      className={`page-btn${activeClass ? " active" : ""}`}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const renderPageButtons = () => {
    const buttons = [];

    buttons.push(addPageButton({ pageNumber: 1, activeClass: currentPage === 1 }));

    if (currentPage > 3) {
      buttons.push(<span className="dots" key="dots-left">…</span>);
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(numOfPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      buttons.push(addPageButton({ pageNumber: i, activeClass: currentPage === i }));
    }

    if (currentPage < numOfPages - 2) {
      buttons.push(<span className="dots" key="dots-right">…</span>);
    }

    if (numOfPages > 1) {
      buttons.push(addPageButton({ pageNumber: numOfPages, activeClass: currentPage === numOfPages }));
    }

    return buttons;
  };

  const prevPage = currentPage > 1 ? currentPage - 1 : numOfPages;
  const nextPage = currentPage < numOfPages ? currentPage + 1 : 1;

  return (
    <Wrapper>
      <button className="arrow-btn" onClick={() => handlePageChange(prevPage)}>
        <HiChevronLeft /> Prev
      </button>

      <div className="btn-container">{renderPageButtons()}</div>

      <button className="arrow-btn" onClick={() => handlePageChange(nextPage)}>
        Next <HiChevronRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
