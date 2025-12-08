import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import SortDropdown from "./components/SortDropdown.jsx";
import TransactionsTable from "./components/TransactionsTable.jsx";
import Pagination from "./components/Pagination.jsx";
import useSalesQuery from "./hooks/useSalesQuery.js";
import { formatCurrency } from "./utils"; // ✅ NEW

function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    productCategory: "",
    paymentMethod: "",
    ageMin: "",
    ageMax: "",
    dateFrom: "",
    dateTo: "",
    tags: "",
  });
  const [sort, setSort] = useState({ sortBy: "date", sortOrder: "desc" });
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, total, totalPages, loading, error } = useSalesQuery({
    search,
    filters,
    sort,
    page,
    limit,
  });

  // ✅ summary values for current page
  const totalUnits = data.reduce((sum, row) => sum + (row.quantity || 0), 0);
  const totalAmount = data.reduce(
    (sum, row) => sum + (row.totalAmount || 0),
    0
  );
  const totalDiscount = data.reduce(
    (sum, row) =>
      sum + ((row.totalAmount || 0) - (row.finalAmount || row.totalAmount || 0)),
    0
  );

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleFilterChange(next) {
    setFilters(next);
    setPage(1);
  }

  function handleSortChange(next) {
    setSort(next);
    setPage(1);
  }

  function handlePageChange(nextPage) {
    setPage(nextPage);
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-title-group">
          <h1 className="app-title">Sales Overview</h1>
          <p className="app-subtitle">
            Search, filter and explore transaction data
          </p>
        </div>
      </header>

      {/* ✅ SUMMARY CARDS just below navbar */}
      <div className="summary-cards">
        <div className="summary-card">
          <p className="summary-label">Total units sold</p>
          <h3 className="summary-value">{totalUnits}</h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">Total amount</p>
          <h3 className="summary-value">
            {formatCurrency(totalAmount)}{" "}
            <span className="summary-sub">
              ({data.length} SR{data.length === 1 ? "" : "s"})
            </span>
          </h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">Total discount</p>
          <h3 className="summary-value">{formatCurrency(totalDiscount)}</h3>
        </div>
      </div>

      <div className="app-main">
        <aside className="sidebar">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </aside>
        <section className="content">
          <div className="toolbar">
            <SearchBar value={search} onChange={handleSearchChange} />
            <SortDropdown sort={sort} onChange={handleSortChange} />
          </div>
          {loading && <div className="status status-loading">Loading...</div>}
          {error && <div className="status status-error">{error}</div>}
          {!loading && !error && data.length === 0 && (
            <div className="status status-empty">No results found</div>
          )}
          {!loading && !error && data.length > 0 && (
            <>
              <TransactionsTable data={data} />
              <Pagination
                page={page}
                totalPages={totalPages}
                total={total}
                limit={limit}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
