export interface IBook {
    _id: string;
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description?: string,
    copies: number,
    available: boolean,
    createdAt: string;
    updatedAt: string;

}

 

export interface IBorrow {
  _id: string;
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
