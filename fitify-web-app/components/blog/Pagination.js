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
    <ol>
      <li>
        {prevDisabled && <span>Previous page</span>}
        {!prevDisabled && (
          <Link href={prevPageUrl}>
            <a>Previous page</a>
          </Link>
        )}
      </li>
      <li>
        Page {currentPage} of {totalPages}
      </li>
      <li>
        {nextDisabled && <span>Next page</span>}
        {!nextDisabled && (
          <Link href={nextPageUrl}>
            <a>Next page</a>
          </Link>
        )}
      </li>
    </ol>
  );
};
export default Pagination;
