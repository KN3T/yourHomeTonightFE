import { EXCHANGE_RATE } from "../../utils/CONSTANT"
import formatCurrency from "../../utils/formatCurrency"

test('format currency testing', () => {

    expect(formatCurrency(200, 'vi')).toBe(200*EXCHANGE_RATE)
    expect(formatCurrency(200, 'en')).toBe(200)
    
})