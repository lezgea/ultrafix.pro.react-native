import list from "native-base/src/components/primitives/List/List";

export default class Appliances {
    static list = [
        {
            id: 2,
            title: "Washer",
            icon: "washer",
            slug: "washer",
            rank: 5,
        },
        {
            id: 3,
            title: "Ice Machine",
            icon: "ice-machine",
            slug: "ice-machine",
            rank: 3,
        },
        {
            id: 4,
            title: "Refrigerator",
            icon: "refrigerator",
            slug: "refrigerator",
            rank: 1,
        },
        {
            id: 5,
            title: "Dryer",
            icon: "dryer",
            slug: "dryer",
            rank: 4,
        },
        {
            id: 6,
            title: "Dishwasher",
            icon: "dishwasher",
            slug: "dishwasher",
            rank: 2,
        },
        {
            id: 7,
            title: "Oven",
            icon: "oven",
            slug: "oven",
            rank: 8,
        },
        {
            id: 8,
            title: "Cooktop",
            icon: "cooktop",
            slug: "cooktop",
            rank: 6,
        },
        {
            id: 9,
            title: "Microwave",
            icon: "microwave",
            slug: "microwave",
            rank: 7,
        },
        {
            id: 10,
            title: "Wine Cooler",
            icon: "wine-cooler",
            slug: "wine-cooler",
            rank: 9,
        },
        {
            id: 11,
            title: "Freezer",
            icon: "freezer",
            slug: "freezer",
            rank: 10,
        },
        {
            id: 12,
            title: "Garbage Disposal",
            icon: "dishwasher",
            slug: "garbage-disposal",
            rank: 11,
        },
        {
            id: 13,
            title: "Stove",
            icon: "refrigerator",
            slug: "stove",
            rank: 12,
        },
        {
            id: 14,
            title: "Vent Hood",
            icon: "refrigerator",
            slug: "vent-hood",
            rank: 16,
        },
    ]


    static title(id) {
        let obj = this.list.filter(item => item.id == id)
        return obj[0]?.title
    }

    static icon(id) {
        let obj = this.list.filter(item => item.id == id)
        return obj[0]?.icon
    }

    static slug(id) {
        let obj = this.list.filter(item => item.id == id)
        return obj[0]?.slug
    }

    static rank(id) {
        let obj = this.list.filter(item => item.id == id)
        return obj[0]?.rank
    }
}
