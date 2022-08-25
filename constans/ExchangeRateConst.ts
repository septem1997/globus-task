const ExchangeRateSymbol:{[rate:string]:string} = {
    USD:'$',
    RUB:'₽',
    CNY:'￥'
}
const ExchangeRateLabel:{[rate:string]:string} = {
    USD:'美元',
    RUB:'卢布',
    CNY:'人民币'
}
const EnableSymbols = ["USD", "CNY", "RUB"]
export {ExchangeRateSymbol,EnableSymbols,ExchangeRateLabel}
