export default class Product {
    id: string;
    ownerId: string;
    title: string;
    imgUrl: string;
    description: string;
    price: string;

    constructor(id: string, ownerId: string, title: string, imgUrl: string, description: string, price: string) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }
}
