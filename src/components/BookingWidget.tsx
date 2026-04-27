import { useState, type FormEvent } from 'react';
import { Hotel, Plane, Car, Search, MapPin, Calendar, Users } from 'lucide-react';
import { buildAffiliateHref } from './AffiliateCTA';

type Tab = 'hotels' | 'flights' | 'cars';

const TODAY = new Date();
const PLUS = (d: number) => {
  const x = new Date(TODAY);
  x.setDate(x.getDate() + d);
  return x.toISOString().slice(0, 10);
};

export default function BookingWidget() {
  const [tab, setTab] = useState<Tab>('hotels');
  const [destination, setDestination] = useState('All of Finnish Lapland');
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
      href = buildAffiliateHref({
        partner: 'hotels',
        sid: 'hero_flights_search',
        destination,
        query: { origin, depart: checkin, return: checkout },
      });
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  const tabBtn = (active: boolean) =>
    `flex-1 min-w-0 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 sm:py-4 px-1 sm:px-3 font-body font-semibold text-[0.7rem] sm:text-sm uppercase tracking-wider transition-all ${
      active
        ? 'text-pink border-b-2 border-pink'
        : 'text-white/60 border-b-2 border-transparent hover:text-white/90'
    }`;

  const inputCls =
    'w-full bg-night-light/60 backdrop-blur-sm text-white border border-white/10 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink/50 focus:border-pink/40 transition-colors';
  const labelCls =
    'block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/50 mb-1.5';

  return (
    <form
      onSubmit={submit}
      className="bg-night/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_20px_60px_-20px_rgba(124,58,237,0.4)] overflow-hidden w-full"
    >
      <div className="flex border-b border-white/10">
        <button type="button" onClick={() => setTab('hotels')} className={tabBtn(tab === 'hotels')}>
          <Hotel size={16} className="shrink-0" />
          <span className="sm:hidden">Stay</span>
          <span className="hidden sm:inline">Hotels &amp; Cabins</span>
        </button>
        <button type="button" onClick={() => setTab('flights')} className={tabBtn(tab === 'flights')}>
          <Plane size={16} className="shrink-0" />
          <span>Flights</span>
        </button>
        <button type="button" onClick={() => setTab('cars')} className={tabBtn(tab === 'cars')}>
          <Car size={16} className="shrink-0" />
          <span className="sm:hidden">Cars</span>
          <span className="hidden sm:inline">Car Rental</span>
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {tab === 'hotels' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                <MapPin size={10} className="inline mr-1" />
                Destination
              </label>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={inputCls}
                placeholder="Rovaniemi, Levi, Saariselkä…"
              />
            </div>
            <div>
              <label className={labelCls}>
                <Users size={10} className="inline mr-1" />
                Guests
              </label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls}>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>
                <Calendar size={10} className="inline mr-1" />
                Check in
              </label>
              <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>
                <Calendar size={10} className="inline mr-1" />
                Check out
              </label>
              <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        {tab === 'flights' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>From (IATA)</label>
              <input value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase())} className={inputCls} maxLength={3} />
            </div>
            <div>
              <label className={labelCls}>To (Lapland city)</label>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} className={inputCls} placeholder="Rovaniemi, Ivalo, Kittilä…" />
            </div>
            <div>
              <label className={labelCls}>Depart</label>
              <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Return</label>
              <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        {tab === 'cars' && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Pickup airport (IATA)</label>
              <input value={pickup} onChange={(e) => setPickup(e.target.value.toUpperCase())} className={inputCls} maxLength={3} placeholder="RVN, IVL, KTT" />
            </div>
            <div>
              <label className={labelCls}>Drivers</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls}>
                <option value="1">1 Driver</option>
                <option value="2">2 Drivers</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Pickup</label>
              <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Drop off</label>
              <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={inputCls} />
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
              <span className="sm:hidden">Search stays</span>
              <span className="hidden sm:inline">Search Hotels &amp; Cabins</span>
            </>
          )}
          {tab === 'flights' && <span>Search flights</span>}
          {tab === 'cars' && <span>Search cars</span>}
          <span className="opacity-60">→</span>
        </button>

        <p className="text-center text-xs text-white/40 mt-3">
          Powered by Expedia — you book securely on their platform
        </p>
      </div>
    </form>
  );
}
