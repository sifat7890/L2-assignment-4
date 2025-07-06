import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { ArrowLeft, Save } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";


const AddBooks = () => {
    const form = useForm()

    const [createBook, { data, isLoading, isError }] = useCreateBookMutation()
     const navigate = useNavigate();


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const bookData = {
            ...data,
            available: true
        }
        const res = await createBook(bookData).unwrap();
        console.log("Inside submit function", res);


        form.reset();
    }



    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between mt-6">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/books')}
                    className="inline-flex items-center text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Books
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Add New Book</h1>
            </div>

            <div className="bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-semibold text-white">Book Information</h2>
                </div>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter book title" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter author name" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a genre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="FICTION">Fiction</SelectItem>
                                                <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                                                <SelectItem value="SCIENCE">Science</SelectItem>
                                                <SelectItem value="FANTASY">Fantasy</SelectItem>
                                                <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                                <SelectItem value="HISTORY">History</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 978-0-123-45678-9" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="copies"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of copies</FormLabel>
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={4} placeholder="Enter book description (optional)" {...field} value={field.value || ""} />
                                    </FormControl>
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
                                    Create Book
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    );
};

export default AddBooks;