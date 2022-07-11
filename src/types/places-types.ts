export type PlaceItemType = {
    is_closed: boolean | undefined
    location_string: string | undefined
    latitude: string
    longitude: string
    name: string
    num_reviews: string | undefined
    website: string | undefined
    phone: string | undefined
    id: string
    photo: {
        images: {
            small: {
                url: string
            },
            large: {
                url: string
            }
        }
    } | undefined
    price: string | undefined
    ranking: string | undefined
    rating: string | undefined
    awards: [
        {
            year: string
            images: {
                small: string
            }
            display_name: string
        }
    ] | undefined
    cuisine: [
        {
            name: string
        }
    ] | undefined
}

export enum PlaceTypeEnum {
    Restaurants = 'restaurants',
    Hotels = 'hotels',
    Attractions = 'attractions',
}

export enum PlaceRatingEnum {
    All = 0,
    AboveThree = 3,
    AboveFour = 4,
    AboveFourPointFive = 4.5,
}