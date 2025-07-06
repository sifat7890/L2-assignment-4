import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { BookOpen, Edit2, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Swal from 'sweetalert2';


interface IProps {
    books: IBook[]
}

const BooksList = ({ books }: IProps) => {
    const [deleteBook] = useDeleteBookMutation()


    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This book will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })


        if (result.isConfirmed) {
            try {
                await deleteBook(id).unwrap();
                Swal.fire("'Deleted!', 'The book has been deleted.', 'success")

            } catch (error) {
                Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
                console.error("Delete failed", error);
            }

        }

    };


    return (
        <div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Book Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Genre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ISBN
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Availability
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.map((book) => (
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                            <div className="text-sm text-gray-500">by {book.author}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {book.genre}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {book.isbn}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`h-2 w-2 rounded-full mr-2 ${book.available ? 'bg-green-400' : 'bg-red-400'
                                                }`}></div>
                                            <span className={`text-sm font-medium ${book.available ? 'text-green-800' : 'text-red-800'}`}>{book.available ? `${book.copies} available` : `Out of stock`}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link
                                                to={`/books/${book._id}`}
                                                className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                to={`/edit-book/${book._id}`}
                                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                                title="Edit Book"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(book._id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                                title="Delete Book"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>

                                            {book.available && (
                                                <Link
                                                    to={`/borrow/${book._id}`}
                                                    className="text-purple-600 hover:text-purple-900 p-1 rounded transition-colors"
                                                    title="Borrow Book"
                                                >
                                                    <BookOpen className="h-4 w-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    );
};

export default BooksList;