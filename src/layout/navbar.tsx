import { BarChart3, BookOpen, Plus } from "lucide-react";
import { Link, useLocation } from "react-router";


const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/books" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Library
            </span>
            </Link>
            
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/books"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/books')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                All Books
              </Link>
              <Link
                to="/create-book"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/create-book')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </Link>
              <Link
                to="/borrow-summary"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${isActive('/borrow-summary')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Borrow Summary</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              <Link
                to="/books"
                className={`p-2 rounded-md ${isActive('/books') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
              >
                <BookOpen className="h-5 w-5" />
              </Link>
              <Link
                to="/create-book"
                className={`p-2 rounded-md ${isActive('/create-book') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
              >
                <Plus className="h-5 w-5" />
              </Link>
              <Link
                to="/borrow-summary"
                className={`p-2 rounded-md ${isActive('/borrow-summary') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
              >
                <BarChart3 className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;