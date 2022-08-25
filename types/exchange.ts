export interface ExchangeRate {
    base: string,
    target: string,
    rate: number
}

export interface ExchangeRateRes {
    "success": boolean,
    "base": string,
    "date": string,
    "rates": { [key in string]: number }
}
