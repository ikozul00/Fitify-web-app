import Link from "next/link";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

const Pagination = (props) => {
  const { currentPage, totalPages } = props;

  // Ako je korisnik lociran na stranici 2, prethodna stranica je blog/index
  const prevPageUrl =
    currentPage === "2"
      ? "/blog"
      : `/blog/page/${parseInt(currentPage, 10) - 1}`;
  const nextPageUrl = `/blog/page/${parseInt(currentPage, 10) + 1}`;

  // Odredivanje je su li prethodna/iduca stranica nedostupne (nepostojece)
  // 10 je baza broja (dekadski broj)
  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
    <div className="flex place-content-center mb-12  mt-12">
      <span>
        {prevDisabled && (
          <span
            className="text-center p-1 m-2 sm:text-5xl text-3xl "
          >
           <FaArrowLeft className="mr-3 opacity-60"/>
          </span>
        )}
        {!prevDisabled && (
          <Link href={prevPageUrl}>
            <a className="text-center p-1 m-2 sm:text-5xl text-3xl" aria-label="Left arrow">
            <FaArrowLeft className="mr-3"/>
            </a>
          </Link>
        )}
      </span>
      <span className="self-center sm:text-xl text-lg">
        Page {currentPage} of {totalPages}
      </span>
      <span>
        {nextDisabled && (
          <span className="text-center p-1 m-2 sm:text-5xl text-3xl ">
            <FaArrowRight className="ml-3 opacity-60"/>
          </span>
        )}
        {!nextDisabled && (
          <Link href={nextPageUrl}>
            <a className="text-center  p-1 m-2 sm:text-5xl text-4xl " aria-label="Right arrow">
              <FaArrowRight className="ml-3"/>
            </a>
          </Link>
        )}
      </span>
    </div>
  );
};
export default Pagination;
