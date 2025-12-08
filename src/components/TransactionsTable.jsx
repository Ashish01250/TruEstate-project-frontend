import { formatDate } from "../utils";

function TransactionsTable({ data }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Phone No.</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer Region</th>
            <th>Product ID</th>
            <th>Employee Name</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => {
            const transactionId =
              row.transactionId || String(row._id).slice(-8);

            return (
              <tr key={row._id}>
                <td>{transactionId}</td>
                <td>{formatDate(row.date)}</td>
                <td>{row.customerId}</td>
                <td>{row.customerName}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.gender}</td>
                <td>{row.age}</td>
                <td>{row.productCategory}</td>
                <td>{row.quantity}</td>
                <td>{row.totalAmount}</td>
                <td>{row.customerRegion}</td>
                <td>{row.productId}</td>
                <td>{row.employeeName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
