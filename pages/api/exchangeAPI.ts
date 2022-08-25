import {ExchangeRate, ExchangeRateRes} from "../../types/exchange";

const ExchangeAPI = {
    fetchForexRates: async (base = "USD", symbols = "CNY,RUB") => {
        let res: ExchangeRateRes, rates: ExchangeRate[] = []
        try {
            const fetchRes = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`);
            res = await fetchRes.json() as ExchangeRateRes
        } catch (e) {
            res = await new Promise((resolve) => {
                setTimeout(() => {
                    let r:ExchangeRateRes = {
                        success: true,
                        base: "USD",
                        date: "2022-08-16",
                        rates: {
                            RUB: 61.263275,
                            CNY: 6.781836,
                        },
                    }
                    if (base==='CNY'){
                        r = {
                            "success": true,
                            "base": "CNY",
                            "date": "2022-08-25",
                            "rates": {
                                "RUB": 8.71995,
                                "USD": 0.145801
                            }
                        }
                    }
                    if (base==='RUB'){
                        r = {
                            "success": true,
                            "base": "RUB",
                            "date": "2022-08-25",
                            "rates": {
                                "CNY": 0.11468,
                                "USD": 0.01672
                            }
                        }
                    }
                    resolve(r);
                }, 50);
            })
        }
        for (const key in res.rates) {
            rates.push({
                base: base,
                target: key,
                rate: res.rates[key]
            })
        }
        return rates
    }
}

export default ExchangeAPI
