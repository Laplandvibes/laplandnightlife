import { useState, type FormEvent } from 'react';
import { Hotel, Plane, Car, Search, MapPin, Calendar, Users } from 'lucide-react';
import { buildAffiliateHref } from './AffiliateCTA';
import { buildTripFlightUrl, buildTripFlightHome } from '../lib/tripcom';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

type Tab = 'hotels' | 'flights' | 'cars';

const TODAY = new Date();
const PLUS = (d: number) => {
  const x = new Date(TODAY);
  x.setDate(x.getDate() + d);
  return x.toISOString().slice(0, 10);
};

export default function BookingWidget() {
  const lang = useLang();
  const c = COPY[lang].booking;

  const [tab, setTab] = useState<Tab>('hotels');
  const [destination, setDestination] = useState<string>(c.destinationDefault);
  const [guests, setGuests] = useState('2');
  const [checkin, setCheckin] = useState(PLUS(14));
  const [checkout, setCheckout] = useState(PLUS(18));
  const [origin, setOrigin] = useState('LON');
  const [pickup, setPickup] = useState('RVN');

  function submit(e: FormEvent) {
    e.preventDefault();
    let href = '';
    if (tab === 'hotels') {
      href = buildAffiliateHref({
        partner: 'hotels',
        sid: 'hero_hotels_search',
        destination,
        query: { checkin, checkout, adults: guests },
      });
    } else if (tab === 'cars') {
      href = buildAffiliateHref({
        partner: 'cars',
        sid: 'hero_cars_search',
        destination: pickup,
        query: { pickup_date: checkin, dropoff_date: checkout },
      });
    } else {
      const dest = destination.trim().toLowerCase();
      const iataMap: Record<string, string> = {
        rovaniemi: 'rvn',
        ivalo: 'ivl',
        kittilä: 'ktt', kittila: 'ktt', levi: 'ktt',
        kemi: 'kem',
        kuusamo: 'kao', ruka: 'kao',
        oulu: 'oul',
        helsinki: 'hel',
      };
      const toIata = iataMap[dest];
      if (origin && toIata) {
        href = buildTripFlightUrl({
          from: origin,
          to: toIata,
          depart: checkin,
          returnDate: checkout,
          sid: 'hero_flight_search',
          lang,
        });
      } else {
        href = buildTripFlightHome('hero_flight_search_generic', lang);
      }
    }
    window.open(href, '_blank', 'noopener');
  }

  const tabBtn = (active: boolean) =>
    `flex-1 min-w-0 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-1 sm:px-3 font-body font-semibold text-[0.7rem] sm:text-sm uppercase tracking-wider transition-all ${
      active
        ? 'text-pink border-b-2 border-pink'
        : 'text-white/80 border-b-2 border-transparent hover:text-white'
    }`;

  const inputCls =
    'w-full bg-night-light/60 backdrop-blur-sm text-white border border-white/10 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/40 transition-colors';
  const labelCls =
    'block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/75 mb-1.5';

  return (
    <form
      onSubmit={submit}
      className="bg-night/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_20px_60px_-20px_rgba(124,58,237,0.4)] overflow-hidden w-full"
    >
      <div className="flex border-b border-white/10">
        <button type="button" onClick={() => setTab('hotels')} className={tabBtn(tab === 'hotels')}>
          <Hotel size={16} className="shrink-0" />
          <span className="sm:hidden">{c.tabHotelsShort}</span>
          <span className="hidden sm:inline">{c.tabHotels}</span>
        </button>
        <button type="button" onClick={() => setTab('flights')} className={tabBtn(tab === 'flights')}>
          <Plane size={16} className="shrink-0" />
          <span>{c.tabFlights}</span>
        </button>
        <button type="button" onClick={() => setTab('cars')} className={tabBtn(tab === 'cars')}>
          <Car size={16} className="shrink-0" />
          <span className="sm:hidden">{c.tabCarsShort}</span>
          <span className="hidden sm:inline">{c.tabCars}</span>
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {tab === 'hotels' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <MapPin size={10} className="inline mr-1" />
                {c.destination}
              </label>
              <input
                aria-label={c.destination}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={inputCls}
                placeholder={c.placeholderDest}
              />
            </div>
            <div>
              <label className={labelCls}>
                <Users size={10} className="inline mr-1" />
                {c.guests}
              </label>
              <select aria-label={c.guests} value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls}>
                <option value="1">{c.g1}</option>
                <option value="2">{c.g2}</option>
                <option value="3">{c.g3}</option>
                <option value="4">{c.g4}</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>
                <Calendar size={10} className="inline mr-1" />
                {c.checkin}
              </label>
              <input aria-label={c.checkin} type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>
                <Calendar size={10} className="inline mr-1" />
                {c.checkout}
              </label>
              <input aria-label={c.checkout} type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        {tab === 'flights' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{c.from}</label>
              <input aria-label={c.from} value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase())} className={inputCls} maxLength={3} />
            </div>
            <div>
              <label className={labelCls}>{c.to}</label>
              <input aria-label={c.to} value={destination} onChange={(e) => setDestination(e.target.value)} className={inputCls} placeholder={c.placeholderTo} />
            </div>
            <div>
              <label className={labelCls}>{c.depart}</label>
              <input aria-label={c.depart} type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{c.return}</label>
              <input aria-label={c.return} type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        {tab === 'cars' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{c.pickup}</label>
              <input aria-label={c.pickup} value={pickup} onChange={(e) => setPickup(e.target.value.toUpperCase())} className={inputCls} maxLength={3} placeholder={c.placeholderPickup} />
            </div>
            <div>
              <label className={labelCls}>{c.drivers}</label>
              <select aria-label={c.drivers} value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls}>
                <option value="1">{c.d1}</option>
                <option value="2">{c.d2}</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>{c.pickupDate}</label>
              <input aria-label={c.pickupDate} type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{c.dropoff}</label>
              <input aria-label={c.dropoff} type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-5 w-full bg-pink hover:bg-pink-dark text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 sm:gap-2.5 hover:shadow-xl hover:shadow-pink/30 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Search size={16} className="shrink-0 sm:hidden" />
          <Search size={18} className="shrink-0 hidden sm:inline-block" />
          {tab === 'hotels' && (
            <>
              <span className="sm:hidden">{c.searchHotelsShort}</span>
              <span className="hidden sm:inline">{c.searchHotels}</span>
            </>
          )}
          {tab === 'flights' && <span>{c.searchFlights}</span>}
          {tab === 'cars' && <span>{c.searchCars}</span>}
          <span className="opacity-60">→</span>
        </button>

        <p className="text-center text-xs text-white/75 mt-3">
          {tab === 'flights' ? c.poweredTrip : c.poweredExpedia}
        </p>
      </div>
    </form>
  );
}
