interface Categories {
    [key: string]: string
}

export interface GetListCategory{
    categories?: Categories
}


export interface  SubObject{
    [key: number]: Array<string | SubType>
}

export interface SubType {
    category: number,
    name: string  ,
}