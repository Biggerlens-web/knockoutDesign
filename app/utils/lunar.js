import { Solar, I18n } from 'lunar-javascript'
import dayjs from 'dayjs'
export function getLunarResult(date, lang = 'zh') {
    I18n.setLanguage(lang !== 'zh' ? 'en' : 'chs')
    const [y, m, d] = date.split('-').map(n => Number(n))
    const solar = Solar.fromYmd(y, m, d)
    const lunar = solar.getLunar()

    const lunarFestivals = lunar.getFestivals()
    const solarFestivals = solar.getFestivals()

    const exactJieQi = lunar.getJieQi() || ''
    const currentJieQi = lunar.getCurrentJieQi() || ''
    const week = dayjs(date).day()
    return {
        solarText: solar.toFullString(),
        lunarText: lunar.toFullString(),
        lunarFestivals,
        solarFestivals,
        exactJieQi,
        currentJieQi,
        week
    }
}
