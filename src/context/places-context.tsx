import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { PlaceType } from '../types/places-types'
import { placesAPI } from '../api/places-api'
import { BoundsType, CoordinatesType } from '../types/map-types'

type MapContextType = {
    isFetching: boolean,
    error: string | null
    places: PlaceType[] | null
    fetchPlaces: (bounds: BoundsType) => void
    coordinates: CoordinatesType | null
    setCoordinates: (coordinates: CoordinatesType) => void
    bounds: BoundsType | null
    setBounds: (bounds: BoundsType) => void
    clickedChildKey: number | null
    setClickedChildKey: (key: number) => void
}

const PlacesContext = createContext({} as MapContextType)

const mockPlaces = [
    {
        'cuisine': [
            {
                name: 'super'
            },
            {
                name: 'vodka'
            },
            {
                name: 'mnyaso'
            },
        ],
        'location_id': '1195598',
        'name': '7 Days Hotel',
        'latitude': '48.678974',
        'longitude': '26.586945',
        'num_reviews': '168',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/14/97/f9/25/7.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/14/97/f9/25/7.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '3456',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/14/97/f9/25/7.jpg',
                    'height': '2304'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/14/97/f9/25/7.jpg',
                    'height': '367'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/14/97/f9/25/7.jpg',
                    'height': '167'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2018-09-12T05:47:25-0400',
            'caption': '',
            'id': '345504037',
            'helpful_votes': '0',
            'published_date': '2018-09-12T05:47:25-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2018',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2018_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2018'
            },
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2017',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2017_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2017'
            },
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2015',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2015_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2015'
            },
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2014',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2014_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2014'
            }
        ],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.5266172885894775',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '1',
        'ranking_denominator': '90',
        'ranking_category': 'hotel',
        'ranking': '#1 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hotel',
        'subcategory_type_label': 'Hotel',
        'distance': '0.4211433202438866',
        'distance_string': null,
        'bearing': 'northwest',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$24 - $25',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'bcddb47c-a8a0-48a3-b177-ae00760129d6'
    },
    {
        'location_id': '2545382',
        'name': 'Reikartz Kamianets-Podilsky',
        'latitude': '48.67496',
        'longitude': '26.57179',
        'num_reviews': '119',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/1a/da/44/8a/reikartz.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/1a/da/44/8a/reikartz.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '1200',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/1a/da/44/8a/reikartz.jpg',
                    'height': '675'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/1a/da/44/8a/reikartz.jpg',
                    'height': '309'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/1a/da/44/8a/reikartz.jpg',
                    'height': '141'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2020-02-10T08:05:31-0500',
            'caption': '',
            'id': '450512010',
            'helpful_votes': '0',
            'published_date': '2020-02-10T08:05:31-0500',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2018',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2018_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2018'
            },
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2017',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2017_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2017'
            }
        ],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.594677686691284',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '2',
        'ranking_denominator': '90',
        'ranking_category': 'hotel',
        'ranking': '#2 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hotel',
        'subcategory_type_label': 'Hotel',
        'distance': '0.8931062708712623',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$41 - $44',
        'hotel_class': '4.0',
        'hotel_class_attribution': 'This property is classified according to Giata.',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '5d96752e-020c-467b-9cc3-65b73bbcc414'
    },
    {
        'location_id': '648584',
        'name': 'Gala Hotel',
        'latitude': '48.665096',
        'longitude': '26.577974',
        'num_reviews': '37',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/0c/10/f0/5b/gala-hotel.jpg',
                    'height': '141'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/0c/10/f0/5b/gala-hotel.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '960',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/0c/10/f0/5b/gala-hotel.jpg',
                    'height': '540'
                },
                'large': {
                    'width': '960',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/0c/10/f0/5b/gala-hotel.jpg',
                    'height': '540'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/0c/10/f0/5b/gala-hotel.jpg',
                    'height': '309'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2016-07-18T13:08:32-0400',
            'caption': '',
            'id': '202436699',
            'helpful_votes': '0',
            'published_date': '2016-07-18T13:08:32-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.1688389778137207',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '3',
        'ranking_denominator': '90',
        'ranking_category': 'hotel',
        'ranking': '#3 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hotel',
        'subcategory_type_label': 'Hotel',
        'distance': '0.8434863965917839',
        'distance_string': null,
        'bearing': 'southwest',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$16 - $26',
        'hotel_class': '3.0',
        'hotel_class_attribution': 'This property is classified according to Giata.',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '5c837dbf-8af0-45ed-8e06-d4a34c6f59a5'
    },
    {
        'location_id': '6209135',
        'name': 'Bilya Richky Hotel',
        'latitude': '48.67922',
        'longitude': '26.56999',
        'num_reviews': '32',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/18/f5/90/6d/photo9jpg.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/18/f5/90/6d/photo9jpg.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '1024',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-w/18/f5/90/6d/photo9jpg.jpg',
                    'height': '1365'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-p/18/f5/90/6d/photo9jpg.jpg',
                    'height': '733'
                },
                'medium': {
                    'width': '338',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/18/f5/90/6d/photo9jpg.jpg',
                    'height': '450'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2019-08-26T12:14:50-0400',
            'caption': '',
            'id': '418746477',
            'helpful_votes': '0',
            'published_date': '2019-08-26T12:14:50-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.101271867752075',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '4',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#4 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'small_hotel',
        'subcategory_type_label': 'Small Hotel',
        'distance': '1.0455613620852569',
        'distance_string': null,
        'bearing': 'west',
        'rating': '3.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$19 - $20',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'b439b4d2-e27c-4be4-b205-6a269304c6a2'
    },
    {
        'location_id': '7137334',
        'name': 'Grand Canyon',
        'latitude': '48.67618',
        'longitude': '26.576029',
        'num_reviews': '25',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/0a/b7/6f/4b/grand-canyon.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/0a/b7/6f/4b/grand-canyon.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '2048',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/0a/b7/6f/4b/grand-canyon.jpg',
                    'height': '1536'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/0a/b7/6f/4b/grand-canyon.jpg',
                    'height': '413'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/0a/b7/6f/4b/grand-canyon.jpg',
                    'height': '188'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2016-03-27T05:29:30-0400',
            'caption': 'Grand Canyon',
            'id': '179793739',
            'helpful_votes': '1',
            'published_date': '2016-03-27T05:29:30-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.3849782943725586',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '5',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#5 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'guest_house',
        'subcategory_type_label': 'Guest house',
        'distance': '0.7172955085681453',
        'distance_string': null,
        'bearing': 'west',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$25',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '3c6da237-b491-4b29-8fd9-ec803d228600'
    },
    {
        'location_id': '5259454',
        'name': 'Taras Bulba Hotel',
        'latitude': '48.674587',
        'longitude': '26.571396',
        'num_reviews': '51',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/1a/0d/d9/41/caption.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/1a/0d/d9/41/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '600',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/1a/0d/d9/41/caption.jpg',
                    'height': '450'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/1a/0d/d9/41/caption.jpg',
                    'height': '413'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/1a/0d/d9/41/caption.jpg',
                    'height': '188'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2019-11-17T06:56:12-0500',
            'caption': '',
            'id': '437115201',
            'helpful_votes': '0',
            'published_date': '2019-11-17T06:56:12-0500',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.14913272857666',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '6',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#6 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'lodge',
        'subcategory_type_label': 'Lodge',
        'distance': '0.9087028098215948',
        'distance_string': null,
        'bearing': 'west',
        'rating': '3.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$29 - $42',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '48d1cde0-a23b-4891-85e6-21648d7b5fce'
    },
    {
        'location_id': '659293',
        'ad_position': 'inline1',
        'ad_size': '8X8',
        'doubleclick_zone': 'eu.ukraine',
        'ancestors': [
            {
                'subcategory': [
                    {
                        'key': 'province',
                        'name': 'Province'
                    }
                ],
                'name': 'Khmelnytskyi Oblast',
                'abbrv': null,
                'location_id': '2693128'
            },
            {
                'subcategory': [
                    {
                        'key': 'country',
                        'name': 'Country'
                    }
                ],
                'name': 'Ukraine',
                'abbrv': null,
                'location_id': '294473'
            }
        ],
        'detail': '0',
        'page_type': 'hotels',
        'mob_ptype': 'app_hotels'
    },
    {
        'location_id': '1797279',
        'name': 'Hetman Hotel',
        'latitude': '48.675007',
        'longitude': '26.574669',
        'num_reviews': '24',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/07/f6/85/b8/hetman-hotel.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/07/f6/85/b8/hetman-hotel.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '2000',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/07/f6/85/b8/hetman-hotel.jpg',
                    'height': '1333'
                },
                'large': {
                    'width': '1024',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-w/07/f6/85/b8/hetman-hotel.jpg',
                    'height': '682'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/07/f6/85/b8/hetman-hotel.jpg',
                    'height': '367'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2015-05-25T09:35:28-0400',
            'caption': 'Hotel',
            'id': '133596600',
            'helpful_votes': '1',
            'published_date': '2015-05-26T09:35:46-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.1863694190979004',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '7',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#7 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'small_hotel',
        'subcategory_type_label': 'Small Hotel',
        'distance': '0.762922973666209',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$40 - $42',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '69ec508c-091d-4874-b177-40ce3e3f8400'
    },
    {
        'location_id': '1724241',
        'name': 'Kleopatra Hotel',
        'latitude': '48.676903',
        'longitude': '26.573252',
        'num_reviews': '132',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/0d/ee/1b/73/caption.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/0d/ee/1b/73/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '2000',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/0d/ee/1b/73/caption.jpg',
                    'height': '1333'
                },
                'large': {
                    'width': '1024',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-w/0d/ee/1b/73/caption.jpg',
                    'height': '682'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/0d/ee/1b/73/caption.jpg',
                    'height': '367'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2016-12-21T09:24:51-0500',
            'caption': 'Зал - зимний сад',
            'id': '233708403',
            'helpful_votes': '2',
            'published_date': '2016-12-21T09:24:51-0500',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2018',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2018_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2018'
            },
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2017',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2017_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2017'
            },
            {
                'award_type': 'CERTIFICATE_OF_EXCELLENCE',
                'year': '2015',
                'images': {
                    'small': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg',
                    'large': 'https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2015_en_US_large-0-5.jpg'
                },
                'categories': [],
                'display_name': 'Certificate of Excellence 2015'
            }
        ],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.5632781982421875',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '8',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#8 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'small_hotel',
        'subcategory_type_label': 'Small Hotel',
        'distance': '0.8527428796644928',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$45 - $51',
        'hotel_class': '4.0',
        'hotel_class_attribution': 'This property is classified according to Giata.',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '64e142c3-9f0f-4f99-9eb3-4ab3fc51f62c'
    },
    {
        'location_id': '12360067',
        'name': 'Panorama Apart-Hotel',
        'latitude': '48.677654',
        'longitude': '26.574905',
        'num_reviews': '7',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/15/38/3f/3d/caption.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/15/38/3f/3d/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '1280',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-m/1280/15/38/3f/3d/caption.jpg',
                    'height': '960'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/15/38/3f/3d/caption.jpg',
                    'height': '413'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/15/38/3f/3d/caption.jpg',
                    'height': '188'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2018-11-01T11:35:47-0400',
            'caption': 'Только заселились в номер',
            'id': '356007741',
            'helpful_votes': '0',
            'published_date': '2018-11-01T11:35:47-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0921778678894043',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '9',
        'ranking_denominator': '90',
        'ranking_category': 'hotel',
        'ranking': '#9 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'apartment_hotel',
        'subcategory_type_label': 'Apartment Hotel',
        'distance': '0.7971026789824915',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$18 - $21',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '102190be-94d2-46c6-8156-dc01c71b2afa'
    },
    {
        'location_id': '8869484',
        'name': 'Celebrity',
        'latitude': '48.67428',
        'longitude': '26.588253',
        'num_reviews': '8',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/09/bb/2e/b0/celebrity.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/09/bb/2e/b0/celebrity.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '2000',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/09/bb/2e/b0/celebrity.jpg',
                    'height': '1500'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/09/bb/2e/b0/celebrity.jpg',
                    'height': '413'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/09/bb/2e/b0/celebrity.jpg',
                    'height': '188'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2015-12-11T06:38:45-0500',
            'caption': 'Номер',
            'id': '163262128',
            'helpful_votes': '0',
            'published_date': '2015-12-11T07:57:08-0500',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.1132805347442627',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '10',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#10 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hostel',
        'subcategory_type_label': 'Hostel',
        'distance': '0.14430712984387686',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$24',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '991e8f10-9b93-462b-b26d-3b1199f8f027'
    },
    {
        'location_id': '12198045',
        'name': 'Baron Munchausen Guest House',
        'latitude': '48.66669',
        'longitude': '26.59281',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/0f/59/33/0d/caption_rotated_90.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/0f/59/33/0d/caption_rotated_90.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '3024',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/0f/59/33/0d/caption_rotated_90.jpg',
                    'height': '4032'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-p/0f/59/33/0d/caption_rotated_90.jpg',
                    'height': '733'
                },
                'medium': {
                    'width': '338',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/0f/59/33/0d/caption_rotated_90.jpg',
                    'height': '450'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2017-05-22T12:37:42-0400',
            'caption': 'Современный хостел с множеством развлечений и приятным персоналом. \nВезде всегда чисто и есть го',
            'id': '257504013',
            'helpful_votes': '0',
            'published_date': '2017-05-22T12:37:42-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.023909568786621',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '11',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#11 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'guest_house',
        'subcategory_type_label': 'Guest house',
        'distance': '0.4822156054188143',
        'distance_string': null,
        'bearing': 'south',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$20 - $22',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '3b07adc6-191a-4878-ad53-438f718cb36a'
    },
    {
        'location_id': '7377611',
        'name': 'Monte-Kristo Hotel',
        'latitude': '48.68054',
        'longitude': '26.5837',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0115387439727783',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '12',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#12 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'small_hotel',
        'subcategory_type_label': 'Small Hotel',
        'distance': '0.5913810653375706',
        'distance_string': null,
        'bearing': 'northwest',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$19',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'e5e680f1-077e-4841-b6a0-9856dcde9310'
    },
    {
        'location_id': '23525823',
        'name': 'ZIG ZAG',
        'latitude': '48.672314',
        'longitude': '26.593454',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/1d/67/ff/fc/caption.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/1d/67/ff/fc/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '1280',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1d/67/ff/fc/caption.jpg',
                    'height': '960'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/1d/67/ff/fc/caption.jpg',
                    'height': '413'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/1d/67/ff/fc/caption.jpg',
                    'height': '188'
                }
            },
            'is_blessed': false,
            'uploaded_date': '2021-07-21T14:40:06-0400',
            'caption': 'Хорошие завтраки в комфортной обстановке',
            'id': '493355004',
            'helpful_votes': '0',
            'published_date': '2021-07-21T14:40:06-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.043630599975586',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '13',
        'ranking_denominator': '90',
        'ranking_category': 'hotel',
        'ranking': '#13 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hotel',
        'subcategory_type_label': 'Hotel',
        'distance': '0.1342469148657664',
        'distance_string': null,
        'bearing': 'southeast',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$22 - $31',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '3c541787-d58f-486a-88f6-9ec5d16b9628'
    },
    {
        'location_id': '12095698',
        'name': 'Mini Home Hotel',
        'latitude': '48.67317',
        'longitude': '26.57401',
        'num_reviews': '3',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/24/80/fe/54/caption.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/24/80/fe/54/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/80/fe/54/caption.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/80/fe/54/caption.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/24/80/fe/54/caption.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2022-07-07T11:38:41-0400',
            'caption': '',
            'id': '612433492',
            'helpful_votes': '0',
            'published_date': '2022-07-07T11:38:41-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0704681873321533',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '14',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#14 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'inn',
        'subcategory_type_label': 'Inn',
        'distance': '0.7871441318542531',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$15 - $17',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '39ebd15e-69c2-415f-82b8-0d4e90e18ff1'
    },
    {
        'location_id': '659293',
        'ad_position': 'inline2',
        'ad_size': '8X8',
        'doubleclick_zone': 'eu.ukraine',
        'ancestors': [
            {
                'subcategory': [
                    {
                        'key': 'province',
                        'name': 'Province'
                    }
                ],
                'name': 'Khmelnytskyi Oblast',
                'abbrv': null,
                'location_id': '2693128'
            },
            {
                'subcategory': [
                    {
                        'key': 'country',
                        'name': 'Country'
                    }
                ],
                'name': 'Ukraine',
                'abbrv': null,
                'location_id': '294473'
            }
        ],
        'detail': '0',
        'page_type': 'hotels',
        'mob_ptype': 'app_hotels'
    },
    {
        'location_id': '23579366',
        'name': 'Ratusha  Craft  Rooms',
        'latitude': '48.67564',
        'longitude': '26.573183',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/24/74/ee/c6/caption.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/24/74/ee/c6/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/74/ee/c6/caption.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/74/ee/c6/caption.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/24/74/ee/c6/caption.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2022-07-03T23:14:33-0400',
            'caption': '',
            'id': '611643078',
            'helpful_votes': '0',
            'published_date': '2022-07-03T23:14:33-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.041170597076416',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '15',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#15 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'inn',
        'subcategory_type_label': 'Inn',
        'distance': '0.8365867422787715',
        'distance_string': null,
        'bearing': 'west',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$41 - $46',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '76c2924f-a134-402e-b130-bc0fe911353f'
    },
    {
        'location_id': '12676369',
        'name': 'Hostel KARTA',
        'latitude': '48.6717',
        'longitude': '26.56631',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/19/ec/73/3f/2506983.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/19/ec/73/3f/2506983.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/19/ec/73/3f/2506983.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/19/ec/73/3f/2506983.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/19/ec/73/3f/2506983.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2019-11-04T09:49:06-0500',
            'caption': 'Hostel KARTA',
            'id': '434926399',
            'helpful_votes': '0',
            'published_date': '2019-11-04T09:49:06-0500',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '16',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#16 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hostel',
        'subcategory_type_label': 'Hostel',
        'distance': '1.1457826020437645',
        'distance_string': null,
        'bearing': 'west',
        'rating': '3.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$23',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '642feb72-ff23-4140-8b49-1ed2918138f7'
    },
    {
        'location_id': '13444811',
        'name': 'Smotryts\'ka Perlyna',
        'latitude': '48.66476',
        'longitude': '26.57218',
        'num_reviews': '4',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/19/ab/e3/86/3017802.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/19/ab/e3/86/3017802.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/19/ab/e3/86/3017802.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/19/ab/e3/86/3017802.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/19/ab/e3/86/3017802.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2019-10-17T11:51:06-0400',
            'caption': 'Sadiba Smotrits\'ka Perlina',
            'id': '430695302',
            'helpful_votes': '0',
            'published_date': '2019-10-17T11:51:06-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.075934410095215',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '17',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#17 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'inn',
        'subcategory_type_label': 'Inn',
        'distance': '1.0629943812530043',
        'distance_string': null,
        'bearing': 'southwest',
        'rating': '4.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$27 - $71',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '8f00ec9c-4007-438e-a3e5-14f8870fdb1b'
    },
    {
        'location_id': '7131421',
        'name': 'Dlya Vseh Motel',
        'latitude': '48.67495',
        'longitude': '26.57172',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-l/19/b1/78/0d/443103.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/19/b1/78/0d/443103.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/19/b1/78/0d/443103.jpg',
                    'height': '413'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/19/b1/78/0d/443103.jpg',
                    'height': '413'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/19/b1/78/0d/443103.jpg',
                    'height': '188'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2019-10-17T15:34:21-0400',
            'caption': 'Dlya Vseh Motel',
            'id': '431061005',
            'helpful_votes': '0',
            'published_date': '2019-10-17T15:34:21-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '18',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#18 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'small_hotel',
        'subcategory_type_label': 'Small Hotel',
        'distance': '0.8962276695101151',
        'distance_string': null,
        'bearing': 'west',
        'rating': '3.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$14',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '8ac5dc63-6ec8-4d05-af05-9677f42f314b'
    },
    {
        'location_id': '7058407',
        'name': 'Filvarki-Centre',
        'latitude': '48.664436',
        'longitude': '26.579687',
        'num_reviews': '9',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/0c/52/32/7e/photo2jpg.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/0c/52/32/7e/photo2jpg.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '1536',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/0c/52/32/7e/photo2jpg.jpg',
                    'height': '2048'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-p/0c/52/32/7e/photo2jpg.jpg',
                    'height': '733'
                },
                'medium': {
                    'width': '338',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/0c/52/32/7e/photo2jpg.jpg',
                    'height': '450'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2016-07-31T17:58:41-0400',
            'caption': '',
            'id': '206713470',
            'helpful_votes': '0',
            'published_date': '2016-08-11T07:06:27-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.035936117172241',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '19',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#19 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'small_hotel',
        'subcategory_type_label': 'Small Hotel',
        'distance': '0.8237161397946635',
        'distance_string': null,
        'bearing': 'southwest',
        'rating': '3.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$23',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'ca8ab6da-068d-4429-b394-70995158f64b'
    },
    {
        'location_id': '14773240',
        'name': 'Smotrytska Vezha',
        'latitude': '48.668076',
        'longitude': '26.56554',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/1b/78/1b/09/photo6jpg.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/1b/78/1b/09/photo6jpg.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '1024',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-w/1b/78/1b/09/photo6jpg.jpg',
                    'height': '1365'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-p/1b/78/1b/09/photo6jpg.jpg',
                    'height': '733'
                },
                'medium': {
                    'width': '338',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/1b/78/1b/09/photo6jpg.jpg',
                    'height': '450'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2020-06-28T16:24:17-0400',
            'caption': '',
            'id': '460856073',
            'helpful_votes': '0',
            'published_date': '2020-06-28T16:24:17-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0353662967681885',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '20',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#20 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'specialty_inn',
        'subcategory_type_label': 'Specialty Inn',
        'distance': '1.2338859245713472',
        'distance_string': null,
        'bearing': 'west',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$19',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '2935782d-a5e2-45ca-aa51-a96175e875a6'
    },
    {
        'location_id': '7064033',
        'name': 'U Dominikana',
        'latitude': '48.6742',
        'longitude': '26.57235',
        'num_reviews': '20',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/06/8c/39/86/u-dominicana-hotel-and.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/06/8c/39/86/u-dominicana-hotel-and.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '996',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/06/8c/39/86/u-dominicana-hotel-and.jpg',
                    'height': '663'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/06/8c/39/86/u-dominicana-hotel-and.jpg',
                    'height': '366'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/06/8c/39/86/u-dominicana-hotel-and.jpg',
                    'height': '166'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2014-09-11T11:12:04-0400',
            'caption': 'Номер стандарт',
            'id': '109853062',
            'helpful_votes': '0',
            'published_date': '2014-09-23T05:26:37-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.169956922531128',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '21',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#21 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'small_hotel',
        'subcategory_type_label': 'Small Hotel',
        'distance': '0.8635380335592154',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$29 - $34',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '065144e6-08a6-4885-baff-32f43e5a0ec9'
    },
    {
        'location_id': '13353445',
        'name': 'Nazar Stodolya',
        'latitude': '48.67588',
        'longitude': '26.56404',
        'num_reviews': '3',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/12/48/ac/51/img-20180309-122313-largejpg.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/12/48/ac/51/img-20180309-122313-largejpg.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '921',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/12/48/ac/51/img-20180309-122313-largejpg.jpg',
                    'height': '691'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/12/48/ac/51/img-20180309-122313-largejpg.jpg',
                    'height': '413'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/12/48/ac/51/img-20180309-122313-largejpg.jpg',
                    'height': '188'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2018-03-09T14:57:56-0500',
            'caption': '',
            'id': '306752593',
            'helpful_votes': '0',
            'published_date': '2018-03-09T14:57:56-0500',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0398874282836914',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '22',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#22 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'lodge',
        'subcategory_type_label': 'Lodge',
        'distance': '1.2521716344240434',
        'distance_string': null,
        'bearing': 'west',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$20 - $24',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'fe5db2df-c1cc-4eb1-b0fc-741574809b91'
    },
    {
        'location_id': '659293',
        'ad_position': 'inline3',
        'ad_size': '8X8',
        'doubleclick_zone': 'eu.ukraine',
        'ancestors': [
            {
                'subcategory': [
                    {
                        'key': 'province',
                        'name': 'Province'
                    }
                ],
                'name': 'Khmelnytskyi Oblast',
                'abbrv': null,
                'location_id': '2693128'
            },
            {
                'subcategory': [
                    {
                        'key': 'country',
                        'name': 'Country'
                    }
                ],
                'name': 'Ukraine',
                'abbrv': null,
                'location_id': '294473'
            }
        ],
        'detail': '0',
        'page_type': 'hotels',
        'mob_ptype': 'app_hotels'
    },
    {
        'location_id': '23306276',
        'name': '"Luxury House"in Old Town',
        'latitude': '48.674225',
        'longitude': '26.572468',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/24/7f/cd/21/caption.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/24/7f/cd/21/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/7f/cd/21/caption.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/7f/cd/21/caption.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/24/7f/cd/21/caption.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2022-07-07T10:39:08-0400',
            'caption': '',
            'id': '612355361',
            'helpful_votes': '0',
            'published_date': '2022-07-07T10:39:08-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0416605472564697',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '23',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#23 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'cottage',
        'subcategory_type_label': 'Cottage',
        'distance': '0.8582363079995512',
        'distance_string': null,
        'bearing': 'west',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$41 - $52',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'cea30a05-5c63-484f-bcec-df76dfaca265'
    },
    {
        'location_id': '12722638',
        'name': 'Romantic Guest House',
        'latitude': '48.67964',
        'longitude': '26.57111',
        'num_reviews': '2',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/24/66/40/bc/caption.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/24/66/40/bc/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/66/40/bc/caption.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/66/40/bc/caption.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/24/66/40/bc/caption.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2022-07-01T03:57:43-0400',
            'caption': '',
            'id': '610681020',
            'helpful_votes': '0',
            'published_date': '2022-07-01T03:57:43-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.05659818649292',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '24',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#24 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'bed_and_breakfast',
        'subcategory_type_label': 'Bed and Breakfast',
        'distance': '1.0100820789701592',
        'distance_string': null,
        'bearing': 'northwest',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$22 - $25',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'a6d57bc6-5d38-43cf-8ca7-7ff7677a9db2'
    },
    {
        'location_id': '9738893',
        'name': 'Mini Hotel in Old Town',
        'latitude': '48.67168',
        'longitude': '26.58259',
        'num_reviews': '5',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/24/82/c5/2e/caption.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/24/82/c5/2e/caption.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/82/c5/2e/caption.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/24/82/c5/2e/caption.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/24/82/c5/2e/caption.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2022-07-07T13:03:31-0400',
            'caption': '',
            'id': '612549934',
            'helpful_votes': '0',
            'published_date': '2022-07-07T13:03:31-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.045491933822632',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '25',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#25 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'lodge',
        'subcategory_type_label': 'Lodge',
        'distance': '0.41613231607417006',
        'distance_string': null,
        'bearing': 'west',
        'rating': '3.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$29 - $32',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '7004283b-a5f6-4ea3-86da-df235d3bf9b8'
    },
    {
        'location_id': '6726532',
        'name': 'V Kanyone',
        'latitude': '48.67957',
        'longitude': '26.57089',
        'num_reviews': '7',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/05/db/cf/31/getlstd-property-photo.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/05/db/cf/31/getlstd-property-photo.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '4608',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-o/05/db/cf/31/getlstd-property-photo.jpg',
                    'height': '3456'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/05/db/cf/31/getlstd-property-photo.jpg',
                    'height': '412'
                },
                'medium': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-f/05/db/cf/31/getlstd-property-photo.jpg',
                    'height': '187'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2014-05-13T09:40:06-0400',
            'caption': 'getlstd_property_photo',
            'id': '98291505',
            'helpful_votes': '2',
            'published_date': '2014-05-13T09:40:06-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0391008853912354',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '26',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#26 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'guest_house',
        'subcategory_type_label': 'Guest house',
        'distance': '1.0171559826776997',
        'distance_string': null,
        'bearing': 'northwest',
        'rating': '3.5',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'c3bb137a-a557-4611-88a3-5281dc6f4990'
    },
    {
        'location_id': '14029806',
        'name': 'Arthouse',
        'latitude': '48.67611',
        'longitude': '26.57471',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '250',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-f/19/ac/70/4e/propertybuilding.jpg',
                    'height': '137'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/19/ac/70/4e/propertybuilding.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/19/ac/70/4e/propertybuilding.jpg',
                    'height': '460'
                },
                'large': {
                    'width': '840',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/19/ac/70/4e/propertybuilding.jpg',
                    'height': '460'
                },
                'medium': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/19/ac/70/4e/propertybuilding.jpg',
                    'height': '301'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2019-10-17T12:13:19-0400',
            'caption': 'Property building',
            'id': '430731342',
            'helpful_votes': '0',
            'published_date': '2019-10-17T12:13:19-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0386295318603516',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '27',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#27 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hostel',
        'subcategory_type_label': 'Hostel',
        'distance': '0.7745761436994605',
        'distance_string': null,
        'bearing': 'west',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$28 - $35',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '962444ef-89a2-42a0-a221-f64fa25ad85e'
    },
    {
        'location_id': '13289943',
        'name': 'Eco Hostel',
        'latitude': '48.67621',
        'longitude': '26.60078',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0312438011169434',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '28',
        'ranking_denominator': '90',
        'ranking_category': 'other',
        'ranking': '#28 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'hostel',
        'subcategory_type_label': 'Hostel',
        'distance': '0.4723913041996528',
        'distance_string': null,
        'bearing': 'northeast',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '79ae6289-1dc4-443f-9a62-631111fe93bc'
    },
    {
        'location_id': '11701125',
        'name': 'Guest House SunRise',
        'latitude': '48.679844',
        'longitude': '26.56848',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-l/1c/f1/d5/48/1981418.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-t/1c/f1/d5/48/1981418.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/1c/f1/d5/48/1981418.jpg',
                    'height': '366'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-s/1c/f1/d5/48/1981418.jpg',
                    'height': '366'
                },
                'medium': {
                    'width': '500',
                    'url': 'https://media-cdn.tripadvisor.com/media/partner/bookingcom/photo-o/1c/f1/d5/48/1981418.jpg',
                    'height': '333'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2021-05-06T23:49:03-0400',
            'caption': 'Guest House SunRise',
            'id': '485610824',
            'helpful_votes': '0',
            'published_date': '2021-05-06T23:49:03-0400',
            'user': null
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.0310182571411133',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '29',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#29 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'inn',
        'subcategory_type_label': 'Inn',
        'distance': '1.1258016941580635',
        'distance_string': null,
        'bearing': 'northwest',
        'rating': '5.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': 'e31f357d-7a80-43af-9733-45e29ef6b372'
    },
    {
        'location_id': '12477895',
        'name': 'Guest House Stara Rus',
        'latitude': '48.66724',
        'longitude': '26.57144',
        'num_reviews': '1',
        'timezone': 'Europe/Kiev',
        'location_string': 'Kamianets-Podilskyi, Khmelnytskyi Oblast',
        'photo': {
            'images': {
                'small': {
                    'width': '150',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-l/13/ed/b3/57/guest-house-stara-rus.jpg',
                    'height': '150'
                },
                'thumbnail': {
                    'width': '50',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-t/13/ed/b3/57/guest-house-stara-rus.jpg',
                    'height': '50'
                },
                'original': {
                    'width': '1024',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-w/13/ed/b3/57/guest-house-stara-rus.jpg',
                    'height': '1365'
                },
                'large': {
                    'width': '550',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-p/13/ed/b3/57/guest-house-stara-rus.jpg',
                    'height': '733'
                },
                'medium': {
                    'width': '338',
                    'url': 'https://media-cdn.tripadvisor.com/media/photo-s/13/ed/b3/57/guest-house-stara-rus.jpg',
                    'height': '450'
                }
            },
            'is_blessed': true,
            'uploaded_date': '2018-07-31T04:46:02-0400',
            'caption': '',
            'id': '334345047',
            'helpful_votes': '0',
            'published_date': '2018-07-31T04:46:02-0400',
            'user': {
                'user_id': null,
                'member_id': '0',
                'type': 'user'
            }
        },
        'awards': [],
        'preferred_map_engine': 'default',
        'autobroaden_type': 'category_integrated',
        'autobroaden_label': 'Kamianets-Podilskyi Places to Stay',
        'raw_ranking': '3.01489520072937',
        'ranking_geo': 'Kamianets-Podilskyi',
        'ranking_geo_id': '659293',
        'ranking_position': '30',
        'ranking_denominator': '90',
        'ranking_category': 'bb',
        'ranking': '#30 Best Value of 90 places to stay in Kamianets-Podilskyi',
        'subcategory_type': 'guest_house',
        'subcategory_type_label': 'Guest house',
        'distance': '1.0049714458299284',
        'distance_string': null,
        'bearing': 'southwest',
        'rating': '4.0',
        'is_closed': false,
        'is_long_closed': false,
        'price_level': '$',
        'price': '$42',
        'hotel_class': '0.0',
        'business_listings': {
            'desktop_contacts': [],
            'mobile_contacts': []
        },
        'special_offers': {
            'desktop': [],
            'mobile': []
        },
        'listing_key': '9635f59f-b030-42cc-bc08-5b8704adc580'
    }
]

export const usePlacesContext = () => useContext(PlacesContext)

export const MapProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [places, setPlaces] = useState<any>(mockPlaces)
    const [coordinates, setCoordinates] = useState<CoordinatesType | null>(null)
    const [bounds, setBounds] = useState<BoundsType | null>(null)
    const [clickedChildKey, setClickedChildKey] = useState<number | null>(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    /*useEffect(() => {
        if (bounds) fetchPlaces(bounds)
    }, [bounds])*/

    const fetchPlaces = (bounds: BoundsType) => {
        setIsFetching(true)
        setError(null)

        const getPlaces = async () => {
            const data = await placesAPI.getPlaces(bounds)
            setPlaces(data)
        }

        getPlaces()
            .catch(e => setError((e as Error).message))

        setIsFetching(false)
    }

    return (
        <PlacesContext.Provider value={{
            isFetching,
            error,
            places,
            fetchPlaces,
            coordinates,
            setCoordinates,
            bounds,
            setBounds,
            clickedChildKey,
            setClickedChildKey
        }}>
            {children}
        </PlacesContext.Provider>
    )
}