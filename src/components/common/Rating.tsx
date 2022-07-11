import { FC, memo } from 'react'
import { Rating as StarRating } from 'react-simple-star-rating'

type PropsType = {
    rating?: number
    size: number
}

export const Rating: FC<PropsType> = memo(({ rating, size }) => {
    const ratingValuePercent = rating ? rating / 5 * 100 : 0

    return (
        <StarRating
            ratingValue={ratingValuePercent}
            iconsCount={5}
            fillColor="orange"
            emptyColor="gray"
            size={size}
            readonly
        />
    )
})