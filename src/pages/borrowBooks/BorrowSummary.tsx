import { useBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { IBorrow } from "@/types";
import { BarChart3, BookOpen, Hash } from "lucide-react";


const BorrowSummary = () => {
    const { data, isLoading  } = useBorrowSummaryQuery(undefined)
    const borrows: IBorrow[] = data?.summary ?? [];
 
    if (isLoading) {
        return <span className="loading loading-infinity loading-xl"></span>;
    }
    const totalBorrow = borrows.reduce((sum, borrow) => sum + borrow.totalQuantity, 0) || 0;
 


    return (
        <div className="space-y-6 max-w-7xl mx-auto mt-14 px-4">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                        <BarChart3 className="h-8 w-8 mr-3 text-blue-600" />
                        Borrow Summary
                    </h1>
                    <p className="text-gray-600 mt-1">Overview of all borrowed books in the library</p>
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Books Borrowed</p>
                            <p className="text-2xl font-bold text-gray-900">{totalBorrow}</p>
                        </div>
                    </div>
                </div>

            </div>

             <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-semibold text-white">Borrowed Books Details</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Borrowed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popularity</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                borrows.map((borrow) => (
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{borrow.book.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Hash className="h-4 w-4 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-900">{borrow.book.isbn}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {borrow.totalQuantity} copies
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{
                                                    width: `${ Math.min((borrow.totalQuantity / totalBorrow) * 100,100)
                                                        }%`
                                                }}></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {
                                                    totalBorrow > 0 ? ((borrow.totalQuantity / totalBorrow) * 100).toFixed(1) : 0
                                                }% of total</p>
                                        </td>
                                    </tr>
                                ))
                            }




                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BorrowSummary;