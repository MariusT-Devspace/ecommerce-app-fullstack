export interface Product {
    id:          number;
    title:       string;
    description: string;
    price:       number;
    picture:     string;
    isAvailable: boolean;
    ratingId:    number;
    categoryId:  string;
    createdOn:   string;
}