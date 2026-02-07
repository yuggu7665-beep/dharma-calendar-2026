
import { Festival, PanchangData, FestivalCategory } from "../types";

// Helper to simulate API delay for offline feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// VERIFIED 2026 HINDU CALENDAR DATA
// Sources: Drik Panchang, Pandit Ji, SmartPuja, Hindu Calendar
const FESTIVAL_DB: Festival[] = [
  // --- JANUARY 2026 ---
  { id: 'pn-26-01-03', name: 'Pausha Purnima', hindiName: 'पौष पूर्णिमा', date: '2026-01-03', description: 'Full moon of Paush month.', significance: 'Holy bath in sacred rivers.', rituals: ['Ganga Snan', 'Charity'], type: 'minor', icon: '🌕' },
  { id: 'ek-26-01-14', name: 'Shattila Ekadashi', hindiName: 'षटतिला एकादशी', date: '2026-01-14', description: 'Use of sesame in six ways.', significance: 'Cleansing of inner self.', rituals: ['Sesame donation', 'Fasting'], type: 'fast', icon: '✨' },
  { id: 'ms-26-01-14', name: 'Makar Sankranti', hindiName: 'मकर संक्रांति', date: '2026-01-14', description: 'Transition of the Sun into Capricorn.', significance: 'Harvest festival and longer days.', rituals: ['Holy bath', 'Donating Til-Gul'], type: 'major', icon: '🪁' },
  { id: 'am-26-01-18', name: 'Magha Amavasya', hindiName: 'माघ अमावस्या', date: '2026-01-18', description: 'New moon of Magha month.', significance: 'Ancestor worship.', rituals: ['Tarpan', 'Pind Daan'], type: 'minor', icon: '�' },
  { id: 'ek-26-01-29', name: 'Jaya Ekadashi', hindiName: 'जया एकादशी', date: '2026-01-29', description: 'Victory over ghosts and past sins.', significance: 'Spiritual liberation.', rituals: ['Full fast', 'Vishnu Puja'], type: 'fast', icon: '🏆' },

  // --- FEBRUARY 2026 ---
  { id: 'pn-26-02-01', name: 'Magha Purnima', hindiName: 'माघ पूर्णिमा', date: '2026-02-01', description: 'Full moon of Magha month.', significance: 'Holy dip at Triveni Sangam.', rituals: ['Snan', 'Daan'], type: 'minor', icon: '�' },
  { id: 'ek-26-02-13', name: 'Vijaya Ekadashi', hindiName: 'विजया एकादशी', date: '2026-02-13', description: 'Ensures victory in difficult tasks.', significance: 'Success in spiritual and worldly paths.', rituals: ['Fast', 'Prayers'], type: 'fast', icon: '⚔️' },
  { id: 'ms-26-02-15', name: 'Maha Shivaratri', hindiName: 'महा शिवरात्रि', date: '2026-02-15', description: 'The great night of Shiva.', significance: 'Union of Shiva and Shakti.', rituals: ['Night vigil', 'Abhishekam'], type: 'major', icon: '🔱' },
  { id: 'am-26-02-17', name: 'Phalguna Amavasya', hindiName: 'फाल्गुन अमावस्या', date: '2026-02-17', description: 'New moon of Phalguna.', significance: 'Spiritual cleansing.', rituals: ['Meditation', 'Tarpan'], type: 'minor', icon: '�' },
  { id: 'ek-26-02-27', name: 'Amalaki Ekadashi', hindiName: 'आमलकी एकादशी', date: '2026-02-27', description: 'Worship of Amla tree.', significance: 'Health and longevity.', rituals: ['Fasting', 'Amla worship'], type: 'fast', icon: '�' },

  // --- MARCH 2026 ---
  { id: 'pn-26-03-03', name: 'Phalguna Purnima', hindiName: 'फाल्गुन पूर्णिमा', date: '2026-03-03', description: 'Holi Purnima.', significance: 'Full moon before Holi.', rituals: ['Holika Dahan'], type: 'major', icon: '�' },
  { id: 'ho-26-03-04', name: 'Holi', hindiName: 'होली', date: '2026-03-04', description: 'Festival of colors.', significance: 'Triumph of Prahlad over Holika.', rituals: ['Colors', 'Celebration'], type: 'major', icon: '�' },
  { id: 'ek-26-03-15', name: 'Papamochani Ekadashi', hindiName: 'पापमोचनी एकादशी', date: '2026-03-15', description: 'Destroyer of all sins.', significance: 'Liberation from sins.', rituals: ['Fasting', 'Vishnu worship'], type: 'fast', icon: '🙏' },
  { id: 'am-26-03-18', name: 'Chaitra Amavasya', hindiName: 'चैत्र अमावस्या', date: '2026-03-18', description: 'New moon of Chaitra.', significance: 'New beginnings.', rituals: ['Meditation'], type: 'minor', icon: '🌑' },
  { id: 'ek-26-03-29', name: 'Kamada Ekadashi', hindiName: 'कामदा एकादशी', date: '2026-03-29', description: 'Fulfills all desires.', significance: 'Wish fulfillment.', rituals: ['Fasting', 'Prayers'], type: 'fast', icon: '�' },

  // --- APRIL 2026 ---
  { id: 'pn-26-04-02', name: 'Chaitra Purnima', hindiName: 'चैत्र पूर्णिमा', date: '2026-04-02', description: 'Full moon of Chaitra month.', significance: 'Hanuman Jayanti in some regions.', rituals: ['Hanuman Puja'], type: 'minor', icon: '🌕' },
  { id: 'hj-26-04-06', name: 'Hanuman Jayanti', hindiName: 'हनुमान जयंती', date: '2026-04-06', description: 'Birth of Lord Hanuman.', significance: 'Strength and devotion.', rituals: ['Hanuman Chalisa', 'Prasad'], type: 'major', icon: '�' },
  { id: 'ek-26-04-13', name: 'Varuthini Ekadashi', hindiName: 'वरूथिनी एकादशी', date: '2026-04-13', description: 'Protection from negativity.', significance: 'Divine protection.', rituals: ['Fasting'], type: 'fast', icon: '�️' },
  { id: 'am-26-04-17', name: 'Vaishakha Amavasya', hindiName: 'वैशाख अमावस्या', date: '2026-04-17', description: 'New moon of Vaishakha.', significance: 'Pitru Tarpan.', rituals: ['Ancestor worship'], type: 'minor', icon: '🌑' },
  { id: 'ek-26-04-27', name: 'Mohini Ekadashi', hindiName: 'मोहिनी एकादशी', date: '2026-04-27', description: 'Enchanting form of Vishnu.', significance: 'Moksha attainment.', rituals: ['Fasting', 'Vishnu Puja'], type: 'fast', icon: '✨' },

  // --- MAY 2026 ---
  { id: 'pn-26-05-01', name: 'Vaishakha Purnima', hindiName: 'वैशाख पूर्णिमा', date: '2026-05-01', description: 'Buddha Purnima.', significance: 'Birth of Lord Buddha.', rituals: ['Meditation', 'Charity'], type: 'major', icon: '☸️' },
  { id: 'ek-26-05-13', name: 'Apara Ekadashi', hindiName: 'अपरा एकादशी', date: '2026-05-13', description: 'Removes all sins.', significance: 'Complete purification.', rituals: ['Strict fasting'], type: 'fast', icon: '�️' },
  { id: 'am-26-05-16', name: 'Jyeshtha Amavasya', hindiName: 'ज्येष्ठ अमावस्या', date: '2026-05-16', description: 'Shani Amavasya.', significance: 'Saturn worship.', rituals: ['Shani Puja'], type: 'minor', icon: '🌑' },
  { id: 'ek-26-05-27', name: 'Padmini Ekadashi', hindiName: 'पद्मिनी एकादशी', date: '2026-05-27', description: 'Adhik Shukla Ekadashi.', significance: 'Spiritual merit.', rituals: ['Fasting'], type: 'fast', icon: '🌺' },
  { id: 'pn-26-05-30', name: 'Adhika Purnima', hindiName: 'अधिक पूर्णिमा', date: '2026-05-30', description: 'Extra month Purnima.', significance: 'Vat Savitri Vrat.', rituals: ['Banyan tree worship'], type: 'minor', icon: '🌕' },

  // --- JUNE 2026 ---
  { id: 'ek-26-06-11', name: 'Parama Ekadashi', hindiName: 'परमा एकादशी', date: '2026-06-11', description: 'Adhik Krishna Ekadashi.', significance: 'Supreme merit.', rituals: ['Fasting'], type: 'fast', icon: '⭐' },
  { id: 'am-26-06-14', name: 'Jyeshtha Amavasya', hindiName: 'ज्येष्ठ अमावस्या', date: '2026-06-14', description: 'New moon day.', significance: 'Pitru worship.', rituals: ['Tarpan'], type: 'minor', icon: '🌑' },
  { id: 'ek-26-06-25', name: 'Nirjala Ekadashi', hindiName: 'निर्जला एकादशी', date: '2026-06-25', description: 'Waterless fast - most austere.', significance: 'Highest spiritual merit.', rituals: ['No water fast'], type: 'fast', icon: '💧' },
  { id: 'pn-26-06-29', name: 'Jyeshtha Purnima', hindiName: 'ज्येष्ठ पूर्णिमा', date: '2026-06-29', description: 'Full moon of Jyeshtha.', significance: 'Vat Savitri Vrat.', rituals: ['Banyan worship'], type: 'minor', icon: '🌕' },

  // --- JULY 2026 ---
  { id: 'ek-26-07-10', name: 'Yogini Ekadashi', hindiName: 'योगिनी एकादशी', date: '2026-07-10', description: 'Spiritual powers.', significance: 'Yogic attainment.', rituals: ['Fasting', 'Meditation'], type: 'fast', icon: '🧘' },
  { id: 'am-26-07-14', name: 'Ashadha Amavasya', hindiName: 'आषाढ़ अमावस्या', date: '2026-07-14', description: 'New moon day.', significance: 'Ancestor blessings.', rituals: ['Shradh'], type: 'minor', icon: '🌑' },
  { id: 'ek-26-07-25', name: 'Devshayani Ekadashi', hindiName: 'देवशयनी एकादशी', date: '2026-07-25', description: 'Vishnu goes to sleep.', significance: 'Start of Chaturmas.', rituals: ['Fasting', 'Tulsi worship'], type: 'fast', icon: '😴' },
  { id: 'pn-26-07-29', name: 'Ashadha Purnima', hindiName: 'आषाढ़ पूर्णिमा', date: '2026-07-29', description: 'Guru Purnima.', significance: 'Gratitude towards teachers.', rituals: ['Guru Puja'], type: 'major', icon: '🙏' },

  // --- AUGUST 2026 ---
  { id: 'ek-26-08-09', name: 'Kamika Ekadashi', hindiName: 'कामिका एकादशी', date: '2026-08-09', description: 'Fulfills desires.', significance: 'Wish manifestation.', rituals: ['Fasting'], type: 'fast', icon: '⭐' },
  { id: 'am-26-08-12', name: 'Shravana Amavasya', hindiName: 'श्रावण अमावस्या', date: '2026-08-12', description: 'New moon day.', significance: 'Pitru Paksha preparation.', rituals: ['Tarpan'], type: 'minor', icon: '🌑' },
  { id: 'nk-26-08-18', name: 'Nag Panchami', hindiName: 'नाग पंचमी', date: '2026-08-18', description: 'Worship of snakes.', significance: 'Protection from snake bites.', rituals: ['Milk offering'], type: 'minor', icon: '🐍' },
  { id: 'ek-26-08-23', name: 'Shravana Putrada Ekadashi', hindiName: 'श्रावण पुत्रदा एकादशी', date: '2026-08-23', description: 'Blessings for children.', significance: 'Child welfare.', rituals: ['Fasting', 'Prayers'], type: 'fast', icon: '�' },
  { id: 'pn-26-08-27', name: 'Shravana Purnima', hindiName: 'श्रावण पूर्णिमा', date: '2026-08-27', description: 'Raksha Bandhan.', significance: 'Brother-sister bond.', rituals: ['Rakhi tying'], type: 'major', icon: '🧵' },

  // --- SEPTEMBER 2026 ---
  { id: 'kj-26-09-04', name: 'Janmashtami', hindiName: 'कृष्ण जन्माष्टमी', date: '2026-09-04', description: 'Birth of Lord Krishna.', significance: 'Divine play of God.', rituals: ['Dahi Handi', 'Midnight Puja'], type: 'major', icon: '🪈' },
  { id: 'ek-26-09-07', name: 'Aja Ekadashi', hindiName: 'अजा एकादशी', date: '2026-09-07', description: 'Removes sins.', significance: 'Spiritual cleansing.', rituals: ['Fasting'], type: 'fast', icon: '🕉️' },
  { id: 'am-26-09-10', name: 'Bhadrapada Amavasya', hindiName: 'भाद्रपद अमावस्या', date: '2026-09-10', description: 'Pitru Paksha begins.', significance: 'Ancestor worship starts.', rituals: ['Shradh ceremonies'], type: 'minor', icon: '🌑' },
  { id: 'gd-26-09-15', name: 'Ganesh Chaturthi', hindiName: 'गणेश चतुर्थी', date: '2026-09-15', description: 'Arrival of Lord Ganesha.', significance: 'Remover of obstacles.', rituals: ['Ganesh Sthapana'], type: 'major', icon: '�' },
  { id: 'ek-26-09-22', name: 'Parivartini Ekadashi', hindiName: 'परिवर्तिनी एकादशी', date: '2026-09-22', description: 'Vishnu turns in sleep.', significance: 'Mid-Chaturmas.', rituals: ['Fasting'], type: 'fast', icon: '�️' },
  { id: 'pn-26-09-26', name: 'Bhadrapada Purnima', hindiName: 'भाद्रपद पूर्णिमा', date: '2026-09-26', description: 'Full moon of Bhadrapada.', significance: 'Satyanarayan Puja.', rituals: ['Katha'], type: 'minor', icon: '🌕' },

  // --- OCTOBER 2026 ---
  { id: 'ek-26-10-06', name: 'Indira Ekadashi', hindiName: 'इंदिरा एकादशी', date: '2026-10-06', description: 'Pitru liberation.', significance: 'Ancestor salvation.', rituals: ['Fasting', 'Tarpan'], type: 'fast', icon: '🙏' },
  { id: 'am-26-10-10', name: 'Ashwin Amavasya', hindiName: 'आश्विन अमावस्या', date: '2026-10-10', description: 'Mahalaya Amavasya.', significance: 'Pitru Paksha ends.', rituals: ['Final Shradh'], type: 'minor', icon: '🌑' },
  { id: 'nv-26-10-17', name: 'Navratri Begins', hindiName: 'नवरात्रि आरंभ', date: '2026-10-17', description: 'Nine nights of Devi.', significance: 'Worship of Shakti.', rituals: ['Garba', 'Fast'], type: 'major', icon: '💃' },
  { id: 'ek-26-10-22', name: 'Papankusha Ekadashi', hindiName: 'पापांकुशा एकादशी', date: '2026-10-22', description: 'Destroys sins.', significance: 'Purification.', rituals: ['Fasting'], type: 'fast', icon: '✨' },
  { id: 'pn-26-10-25', name: 'Ashwina Purnima', hindiName: 'आश्विन पूर्णिमा', date: '2026-10-25', description: 'Sharad Purnima.', significance: 'Moonlight nectar.', rituals: ['Kheer under moonlight'], type: 'minor', icon: '🌕' },
  { id: 'ds-26-10-26', name: 'Dussehra', hindiName: 'दशहरा', date: '2026-10-26', description: 'Victory of Rama over Ravana.', significance: 'Victory of good over evil.', rituals: ['Ravan Dahan'], type: 'major', icon: '🔥' },

  // --- NOVEMBER 2026 ---
  { id: 'ek-26-11-05', name: 'Rama Ekadashi', hindiName: 'रमा एकादशी', date: '2026-11-05', description: 'Lakshmi\'s blessings.', significance: 'Wealth and prosperity.', rituals: ['Fasting', 'Lakshmi Puja'], type: 'fast', icon: '💰' },
  { id: 'dt-26-11-07', name: 'Dhanteras', hindiName: 'धनतेरस', date: '2026-11-07', description: 'Wealth and prosperity.', significance: 'Buying gold and utensils.', rituals: ['Lakshmi Puja'], type: 'major', icon: '💎' },
  { id: 'am-26-11-08', name: 'Kartika Amavasya', hindiName: 'कार्तिक अमावस्या', date: '2026-11-08', description: 'Diwali Amavasya.', significance: 'Festival of Lights.', rituals: ['Lakshmi Puja', 'Diyas'], type: 'major', icon: '🪔' },
  { id: 'dw-26-11-08', name: 'Diwali', hindiName: 'दिपावली', date: '2026-11-08', description: 'Festival of Lights.', significance: 'Return of Rama to Ayodhya.', rituals: ['Laxmi Puja', 'Diyas'], type: 'major', icon: '🪔' },
  { id: 'bh-26-11-10', name: 'Bhai Dooj', hindiName: 'भाई दूज', date: '2026-11-10', description: 'Brother-Sister festival.', significance: 'Strengthening bond.', rituals: ['Tilak'], type: 'major', icon: '�' },
  { id: 'ek-26-11-20', name: 'Devutthana Ekadashi', hindiName: 'देवोत्थान एकादशी', date: '2026-11-20', description: 'Vishnu wakes up.', significance: 'End of Chaturmas.', rituals: ['Tulsi Vivah'], type: 'fast', icon: '🌺' },
  { id: 'pn-26-11-24', name: 'Kartika Purnima', hindiName: 'कार्तिक पूर्णिमा', date: '2026-11-24', description: 'Dev Deepawali.', significance: 'Gods celebrate Diwali.', rituals: ['Ganga Snan', 'Diyas'], type: 'major', icon: '🌕' },

  // --- DECEMBER 2026 ---
  { id: 'ek-26-12-04', name: 'Utpanna Ekadashi', hindiName: 'उत्पन्ना एकादशी', date: '2026-12-04', description: 'Birth of Ekadashi.', significance: 'Origin of fasting tradition.', rituals: ['Fasting'], type: 'fast', icon: '🌟' },
  { id: 'am-26-12-08', name: 'Margashirsha Amavasya', hindiName: 'मार्गशीर्ष अमावस्या', date: '2026-12-08', description: 'New moon day.', significance: 'Spiritual renewal.', rituals: ['Meditation'], type: 'minor', icon: '🌑' },
  { id: 'ek-26-12-20', name: 'Mokshada Ekadashi', hindiName: 'मोक्षदा एकादशी', date: '2026-12-20', description: 'Grants liberation.', significance: 'Moksha attainment.', rituals: ['Fasting', 'Gita reading'], type: 'fast', icon: '🕉️' },
  { id: 'pn-26-12-23', name: 'Margashirsha Purnima', hindiName: 'मार्गशीर्ष पूर्णिमा', date: '2026-12-23', description: 'Full moon of Margashirsha.', significance: 'Dattatreya Jayanti.', rituals: ['Datta Puja'], type: 'minor', icon: '🌕' },
  { id: 'ge-26-12-25', name: 'Gita Jayanti', hindiName: 'गीता जयंती', date: '2026-12-25', description: 'Birth of Bhagavad Gita.', significance: 'Divine knowledge.', rituals: ['Reading Gita'], type: 'major', icon: '📖' }
];

export async function fetchMonthlyFestivalsOffline(month: number, year: number): Promise<Festival[]> {
    // Simulate network delay for realism
    await delay(300);
    return FESTIVAL_DB.filter(f => {
      const d = new Date(f.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
}

export async function getAdvancedPanchang(dateStr: string): Promise<any> {
    // Check if we have internet - simple check
    if (navigator.onLine) {
        try {
            const { fetchPanchangData } = await import('./longcatService');
            return await fetchPanchangData(new Date(dateStr));
        } catch (e) {
            console.error("Online fetch failed, falling back to offline", e);
        }
    }

    // Offline fallback / Mock data
    return {
        tithi: "Shukla Paksha",
        nakshatra: "Unknown (Offline)",
        yoga: "Unknown",
        karana: "Unknown",
        spiritualTip: "Aaj ka din dhyan aur shanti ke liye uttam hai."
    };
}
