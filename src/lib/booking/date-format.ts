// Explicit native calendar labels for browsers without complete CLDR data.
// Other booking languages use the browser's localized date/time formatter.
const papiamentoWeekdays = ['diadomingo', 'dialuna', 'diamars', 'diaranson', 'diahuebs', 'diabierna', 'diasabra'];
const papiamentoShortWeekdays = ['Dom', 'Lun', 'Mar', 'Ras', 'Hue', 'Bie', 'Sab'];
const papiamentoMonths = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'october', 'november', 'december'];
const englishWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const azeriWeekdays = ['bazar', 'bazar ertəsi', 'çərşənbə axşamı', 'çərşənbə', 'cümə axşamı', 'cümə', 'şənbə'];
const azeriShortWeekdays = ['B.', 'B.e.', 'Ç.a.', 'Ç.', 'C.a.', 'C.', 'Ş.'];
const azeriMonths = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
const turkishWeekdays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const turkishShortWeekdays = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
const turkishMonths = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

export function formatBookingDate(date: Date, locale: string, options: Intl.DateTimeFormatOptions): string {
  if (locale === 'az' || locale.startsWith('az-')) {
    // Turkish provides the same day/month ordering, but every calendar name is
    // explicitly Azerbaijani. Some embedded browsers report az as supported
    // while actually returning root data such as "M10" and "Wed".
    return new Intl.DateTimeFormat('tr-TR', options).formatToParts(date).map((part) => {
      if (part.type === 'weekday') {
        const index = turkishWeekdays.findIndex((day, i) => day === part.value || turkishShortWeekdays[i] === part.value);
        if (index >= 0) return options.weekday === 'long' ? azeriWeekdays[index] : azeriShortWeekdays[index];
      }
      if (part.type === 'month' && (options.month === 'long' || options.month === 'short')) {
        const index = turkishMonths.findIndex((month) => month === part.value || month.slice(0, 3) === part.value);
        if (index >= 0) return options.month === 'long' ? azeriMonths[index] : azeriMonths[index].slice(0, 3);
      }
      if (part.type === 'dayPeriod') return part.value === 'ÖÖ' ? 'AM' : part.value === 'ÖS' ? 'PM' : part.value;
      return part.value;
    }).join('');
  }
  if (locale !== 'pap') return new Intl.DateTimeFormat(locale, options).format(date);
  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
  return parts.map((part) => {
    if (part.type === 'weekday') {
      const index = englishWeekdays.findIndex((day) => day === part.value || day.slice(0, 3) === part.value);
      if (index >= 0) return options.weekday === 'long' ? papiamentoWeekdays[index] : papiamentoShortWeekdays[index];
    }
    if (part.type === 'month' && (options.month === 'long' || options.month === 'short')) {
      const index = englishMonths.findIndex((month) => month === part.value || month.slice(0, 3) === part.value);
      if (index >= 0) return options.month === 'long' ? papiamentoMonths[index] : papiamentoMonths[index].slice(0, 3);
    }
    return part.type === 'literal' ? part.value.replace(' at ', ' · ') : part.value;
  }).join('');
}
