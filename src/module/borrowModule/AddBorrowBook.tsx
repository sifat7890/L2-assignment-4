/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { format } from "date-fns";
import { ArrowLeft, BookOpen, CalendarIcon, Hash, Save } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const AddBorrowBook = () => {

    const navigate = useNavigate();

    const form = useForm()
    const { id } = useParams();

    const { data } = useGetBookQuery(id!)
    const book: IBook = data?.books ?? {};

    const [borrowBook] = useBorrowBookMutation();


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const borrowData = {
            ...data,
            book: book._id,
            quantity: Number(data.quantity),

        }

        const res = await borrowBook(borrowData).unwrap();
        if (borrowData) {
            Swal.fire({
                title: "Good job!",
                text: "Your book borrowed successfully",
                icon: "success"
            });
        }

        form.reset();
    }


    return (
        <div>
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate("/books")}
                        className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Books
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Borrow Book</h1>
                </div>

                {/* Book Information (Static) */}
                <div className="bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">{book.title}</h2>
                        <p className="text-blue-100 mt-1">by {book.author}</p>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Genre</p>
                                    <p className="font-medium">{book.genre}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Hash className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">ISBN</p>
                                    <p className="font-medium">{book.isbn}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-2 w-2 rounded-full bg-green-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Available</p>
                                    <p className="font-medium text-green-800">{book.copies} copies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Borrow Form (Static) */}
                <div className="bg-white shadow-lg rounded-lg border border-gray-200">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">Borrow Details</h2>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <FormField
                                    control={form.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Book Quantity</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 978-0-123-45678-9" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            " pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    // disabled={(date) =>
                                                    //     date > new Date() || date < new Date("1900-01-01")
                                                    // }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500">* Required fields</p>
                                <div className="flex space-x-3 ">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => navigate('/books')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700  disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                                        type="submit">
                                        <Save className="h-4 w-4 mr-2" />
                                        Borrow Book
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>


    );
};

export default AddBorrowBook;