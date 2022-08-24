import moment from 'moment'
import fetch from "node-fetch";

const COINDESK_API = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=2011-01-01&end=2021-07-12'

async function fetchData() {
    const result = await fetch(COINDESK_API)

    return await result.json()
}

async function main() {
    const { bpi } = await fetchData()

    const highestPrice = Math.max(...Object.values(bpi))

    const [dateString] = Object.entries(bpi).find(
        ([, price]) => price === highestPrice
    )

    const date = moment(dateString, 'YYYY-MM-DD')

    console.log(date.format('MMMM Do'))
}

main()