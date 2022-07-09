export type PlaceType = {
    is_closed: boolean | undefined
    location_string: string | undefined
    latitude: string
    longitude: string
    name: string | undefined
    num_reviews: string | undefined
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