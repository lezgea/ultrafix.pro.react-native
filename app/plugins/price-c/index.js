
export default class PriceC {

    // Convert price to 1,000,000.00 format
    static convert(price = 0) {
        if(price == null) return "0.00"
        return price?.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
}
