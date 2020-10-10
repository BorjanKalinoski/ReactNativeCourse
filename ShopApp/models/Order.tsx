import dayjs from "dayjs";

class Order {

    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get getDate() {
        return dayjs(this.date).format('DD-MM-YYYY HH:mm')
    }
}



export default Order;