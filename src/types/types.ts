export interface ApartmentType{
    id: number,
    location_id: number,
    name: string,
    description: string,
    logo: string,
    images: string[],
    check_in: string,
    check_out: string,
    rating: number,
    email: string,
    phone_number: string[],
    top_facilities: FacilityType[],
    location: LocationType
}

export interface RoomType{
    id: number,
    apartment_id: number,
    name: string,
    description: string,
    room_size: number,
    bed: string[],
    bathroom: string[],
    view: string[],
    parking: string,
    images: string[],
    all_facilities: FacilityType[],
    apartment: ApartmentType
}

export interface FacilityType{
    id: number,
    name: string
}

export interface LocationType{
    id: number,
    address: string,
    city: string,
    country: string,
    latitude: number,
    longitude: number,
    map_url: string,

}