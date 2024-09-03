import { createI18n } from "vue-i18n"

const i18n = createI18n({
    locale: 'US',
    datetimeFormats: {
        US: {
            short: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            },
            long: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        }

    },
    numberFormats: {
        'en-US': {
            currency: {
                style: 'currency', currency: 'USD', notation: 'standard'
            },
            decimal: {
                style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
            },
            percent: {
                style: 'percent', useGrouping: false
            }
        }
    }
})

export default i18n