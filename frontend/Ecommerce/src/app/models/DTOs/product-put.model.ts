export interface ProductPUT {
    id:          number;
    title:       string;
    description: string;
    price:       number;
    picture:     string;
    isAvailable: boolean;
    categoryId:  number;
}