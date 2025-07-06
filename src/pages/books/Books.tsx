import { BookOpen, Search } from "lucide-react";
import { Link } from "react-router";
import BooksList from "./BooksList";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

const Books = () => {
    const { data, isLoading } = useGetBooksQuery(undefined)
    const allBooks: IBook[] = data?.books ?? [];
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);



    const genres = [...new Set(allBooks.map((book) => book.genre))]

    const books = selectedGenre ? allBooks.filter((book) => book.genre == selectedGenre) : allBooks


    if (isLoading) {
        return <span className="loading loading-infinity loading-xl"></span>;
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto mt-14 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Library Books</h1>
                    <p className="text-gray-600 mt-1">1 book available</p>
                </div>
                <Link
                    to="/create-book"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Add New Book
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                        disabled
                    />
                </div>

                <Select onValueChange={(value) => setSelectedGenre(value)} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel >Genre</SelectLabel>
                            {
                                genres.map((genre) => <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                )
                            }

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>

                <BooksList books={books}></BooksList>
            </div>
        </div>
    );
};

export default Books;