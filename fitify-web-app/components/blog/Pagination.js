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
    <ol className="flex place-content-center mb-5">
      <li>
        {prevDisabled && <span className="text-2xl bg-fitify-purple text-center rounded-full p-1 m-2 "><i class=" text-white fas fa-arrow-left mx-1"></i></span>}
        {!prevDisabled && (
          <Link href={prevPageUrl}>
            <a className="text-2xl bg-fitify-purple text-center rounded-full p-1 m-2"><i class=" text-white fas fa-arrow-left mx-1"></i></a>
          </Link>
        )}
      </li>
      <li className="self-center">
        Page {currentPage} of {totalPages}
      </li>
      <li>
        {nextDisabled && <span className="text-2xl bg-fitify-purple text-center rounded-full p-1 m-2"><i class="fas fa-arrow-right text-white mx-1"></i></span>}
        {!nextDisabled && (
          <Link href={nextPageUrl}>
            <a className="text-2xl bg-fitify-purple text-center rounded-full p-1 m-2"><i class="fas fa-arrow-right text-white mx-1"></i></a>
          </Link>
        )}
      </li>
    </ol>
  );
};
export default Pagination;
