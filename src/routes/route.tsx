import App from "@/App";
import BooksDetails from "@/module/booksModule/BooksDetails";
import UpdateBook from "@/module/booksModule/UpdateBook";
import AddBorrowBook from "@/module/borrowModule/AddBorrowBook";
import AddBooks from "@/pages/books/AddBooks";
import Books from "@/pages/books/Books";
 import BorrowSummary from "@/pages/borrowBooks/BorrowSummary";
import { createBrowserRouter } from "react-router";
 


const router = createBrowserRouter([
    {
        path: "/",
        element:<App></App>,
        children:[
            {
                index:true,
                element:<Books></Books>
            },
            {
                path:"/books",
                element:<Books></Books>
            },
            {
                path:"/books/:id",
                element:<BooksDetails></BooksDetails>
            },
            {
                path:"/create-book",
                element:<AddBooks></AddBooks>
            },
            {
                path:"/edit-book/:id",
                element:<UpdateBook></UpdateBook>
            },
            {
                path:"/borrow/:id",
                element:<AddBorrowBook></AddBorrowBook>
            },
            {
                path:"/borrow-summary",
                element:<BorrowSummary></BorrowSummary>
            }
            
        ]
    }
])

export default router;