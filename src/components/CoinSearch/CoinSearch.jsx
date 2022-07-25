import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import CoinItem from "../CoinItem";
import "./pagination.css";

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");

  function Items({ currentItems }) {
    return (
      <tbody>
        {currentItems &&
          currentItems
            .filter(value => {
              if (searchText === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
              }
            })
            .map(coin => <CoinItem key={coin.id} coin={coin} />)}
      </tbody>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(coins.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(coins.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = event => {
      const newOffset = (event.selected * itemsPerPage) % coins.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th></th>
              <th className="px-4">#</th>
              <th className="text-left">Coin</th>
              <th></th>
              <th>Price</th>
              <th>24h</th>
              <th className="hidden md:table-cell">24h Volume</th>
              <th className="hidden sm:table-cell">Mkt Cap</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <Items currentItems={currentItems} />
        </table>

        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return (
    <section className="rounded-div mb-4 mt-36">
      {/* Title + input Coin Search */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-4 pb-6 text-center md:text-right">
        <h1 className="text-2xl font-bold my-4">
          Top 100 Cryptocurrencies by Market Cap
        </h1>
        <form>
          <input
            onChange={e => setSearchText(e.target.value)}
            className="w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl"
            type="text"
            placeholder="Search a coin in the list"
          />
        </form>
      </div>

      <p className="mb-8 text-center md:text-left italic font-light">
        Click the star icon to save a coin in your account's watchlist.
      </p>

      {/* Coins data fetched from coingecko API and displayed as a table with 10 results per page 
      and pagination at the bottom */}
      <PaginatedItems itemsPerPage={25} />
    </section>
  );
};

export default CoinSearch;
