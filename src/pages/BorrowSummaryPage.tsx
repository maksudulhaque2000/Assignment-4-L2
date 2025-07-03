import React from 'react';
import { useGetBorrowSummaryQuery } from '../app/api/apiSlice';
import { IBorrowSummaryItem } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const BorrowSummaryPage: React.FC = () => {
  const { data: responseData, isLoading, isError, error } = useGetBorrowSummaryQuery();

  const summary = responseData?.data || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error loading borrow summary: {JSON.stringify(error)}</div>;
  }

  if (summary.length === 0) {
    return <div className="text-center py-8">No books have been borrowed yet.</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Borrowed Books Summary</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {summary.map((item: IBorrowSummaryItem, index: number) => (
              <tr key={item.book.isbn || index}>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{item.book.title}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{item.book.isbn}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummaryPage;