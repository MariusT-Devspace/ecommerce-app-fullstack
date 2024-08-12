export interface ProductPOST {
    title:       string;
    description: string;
    price:       number;
    picture:     string;
    isAvailable: boolean;
    categoryId:  number;
}