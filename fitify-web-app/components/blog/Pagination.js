import Link from "next/link";

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
        {prevDisabled && <span className="text-center p-1 m-2 text-4xl opacity-70" aria-label="Previous page"><i class="fas fa-arrow-left mx-1" aria-hidden="true"></i></span>}
        {!prevDisabled && (
          <Link href={prevPageUrl}>
            <a className="text-center p-1 m-2 text-4xl"><i class="  fas fa-arrow-left mx-1 hover:scale-105"></i></a>
          </Link>
        )}
      </span>
      <span className="self-center text-xl">
        Page {currentPage} of {totalPages}
      </span>
      <span>
        {nextDisabled && <span className="text-center p-1 m-2 text-4xl opacity-70"><i class="fas fa-arrow-right mx-1"></i></span>}
        {!nextDisabled && (
          <Link href={nextPageUrl}>
            <a className="text-center  p-1 m-2 text-4xl "><i class="fas fa-arrow-right mx-1 hover:scale-105"></i></a>
          </Link>
        )}
      </span>
    </div>
  );
};
export default Pagination;
