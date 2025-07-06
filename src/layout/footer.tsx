import { Heart, BookOpen } from 'lucide-react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                            <span className="text-lg font-semibold text-gray-800">LibraryHub</span>
                        </div>
                        <p className="text-gray-600 text-sm flex items-center justify-center">
                            Built with <Heart className="h-4 w-4 text-red-500 mx-1" /> for book lovers everywhere
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                            © 2024 LibraryHub. A minimal library management system.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;