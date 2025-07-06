import { useGetBookQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { ArrowLeft, BookOpen, BookOpenCheck, Calendar, Edit2, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

const BooksDetails = () => {
    const { id } = useParams<{ id: string }>()
    console.log({ id });
    const { data, isLoading } = useGetBookQuery(id!)
    const book: IBook = data?.books ?? {};

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
     if (isLoading) {
        return <span className="loading loading-infinity loading-xl"></span>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 mt-14">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/books')}
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Books
                </button>

                <div className="flex space-x-3">
                    <Link
                        to={`/edit-book/${book._id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Book
                    </Link>
                    {
                        book.available && (

                            <Link
                                to="/borrow/123"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Borrow Book
                            </Link>
                        )
                    }
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">The Theory of Everything</h1>
                    <p className="text-blue-100 mt-1">by Stephen Hawking</p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Author</p>
                                    <p className="text-lg font-medium text-gray-900">{book.author}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <BookOpenCheck className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Genre</p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {book.genre}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <BookOpen className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">ISBN</p>
                                    <p className="text-lg font-medium text-gray-900">{book.isbn}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Added</p>
                                    <p className="text-lg font-medium text-gray-900">{book.createdAt}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Last Updated</p>
                                    <p className="text-lg font-medium text-gray-900">{book.updatedAt}</p>
                                </div>
                            </div>

                           
                            <div className="flex items-center space-x-3">
                                <div className={`h-3 w-3 rounded-full mr-3 ${book.available ? 'bg-green-400' : 'bg-red-400'
                                    }`}></div>
                                <div>
                                    <p className="text-sm text-gray-500">Availability</p>
                                    <p className={`text-lg font-medium ${book.available ? 'text-green-800' : 'text-red-800'}`}>{book.available ? `${book.copies} copies available` : `Out of stock`}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-700 leading-relaxed">
                           {book.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksDetails;