import type { CityOverlay } from './cityI18n';
const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: 'Ostrobotnia del Norte',
    blurb: 'Capital Europea de la Cultura 2026, y la única escena de clubes que funciona de verdad todo el año en el norte.',
    pageTagline: 'Capital Europea de la Cultura 2026.',
    venues: {
      '45 Special': { type: 'Discoteca', note: 'El club favorito de los estudiantes. Abierto de miércoles a sábado, hasta tarde.' },
      'Never Grow Old': { type: 'Música en vivo + club', note: 'Programación indie / alternativa. El más pequeño de la calle, pero con el público más fiel.' },
      'St Michael': { type: 'Directos + club', note: 'La sala más grande de la calle. DJ de gira y noches tributo.' },
    },
    quickFacts: {
      'Population': { label: 'Población', value: '210 000' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'OUL · 15 min' },
      'Last call': { label: 'Último servicio', value: '03:30' },
      'Best season': { label: 'Mejor temporada', value: 'Todo el año · Capital de la Cultura 2026' },
    },
  },
  rovaniemi: {
    region: 'Laponia',
    blurb: 'La capital ártica: dividida entre los fines de semana turísticos y los días de diario solo para locales.',
    pageTagline: 'La capital ártica.',
    venues: {
      'Roy Club': { type: 'Discoteca', note: 'Abierto desde 1985. Tres salas: la pista más grande de la ciudad.' },
      'Bull Bar': { type: 'Bar deportivo', note: 'Ruidoso, lleno, terraza de Premier League y comida hasta tarde.' },
      'Kauppayhtiö': { type: 'Café + bar', note: 'Estética de salón vintage; cócteles hasta tarde.' },
    },
    quickFacts: {
      'Population': { label: 'Población', value: '64 000' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'RVN · 10 min' },
      'Last call': { label: 'Último servicio', value: '03:00' },
      'Best season': { label: 'Mejor temporada', value: 'Sep–Mar (auroras) · Dic (Papá Noel)' },
    },
  },
  levi: {
    region: 'Municipio de Kittilä',
    blurb: 'Hullu Poro Areena: aforo de 1 700, 10 barras, 2 plantas; la discoteca más grande de Laponia.',
    pageTagline: 'La mayor fiesta de estación de esquí de Finlandia.',
    venues: {
      'Hullu Poro Areena': { type: 'Megadiscoteca', note: 'Aforo de 1 700, 10 barras, 2 plantas. Sala de conciertos de miércoles a sábado.' },
      'Ihku': { type: 'Après-ski', note: 'Cabaña de madera al pie de la pista. Botas de esquí en la pista de baile.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Camas en la estación', value: '24 000' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'KTT · 18 km' },
      'Last call': { label: 'Último servicio', value: '03:30' },
      'Best season': { label: 'Mejor temporada', value: 'Nov–Abr (nieve + Hullu Poro)' },
    },
  },
  saariselka: {
    region: 'Municipio de Inari',
    blurb: 'Iglús de cristal, el Igloo Bar de Kakslauttanen y un único pub de verdad: Local Pub Panimo.',
    pageTagline: 'Lujo en plena naturaleza: el pueblo de los bares-iglú.',
    intro: 'Saariselkä no es un destino de clubes. Es un destino de iglús de cristal, y de eso se trata. El Kakslauttanen Arctic Resort tiene el bar más fotografiado del mundo (un iglú de cristal donde el techo es la aurora). El pueblo en sí es una calle principal, dos restaurantes que merecen la pena y Local Pub Panimo: una microcervecería con la carta de cerveza artesanal de barril más fiable de Laponia. Al caer la noche, la acción está en los resorts, no en el pueblo.',
    venues: {
      'Kakslauttanen Igloo Bar': { type: 'Bar de techo de cristal', note: 'La foto mundialmente famosa. Abierto a no alojados con reserva.' },
      'Local Pub Panimo': { type: 'Pub de microcervecería', note: 'Cervezas propias; el único pub de verdad del pueblo.' },
      'Hotel Riekonlinna Bar': { type: 'Bar de hotel', note: 'Gran chimenea en el hall y DJ local los viernes por la noche.' },
    },
    knowList: [
      'No hay clubes independientes: la vida nocturna gira en torno a los hoteles.',
      'El Igloo Bar exige reserva si no te alojas en Kakslauttanen.',
      'La carretera desde el aeropuerto (Ivalo) está a 25 minutos; reserva traslados si vas a beber.',
      'La app de previsión de auroras es imprescindible: el personal despierta a los huéspedes a las 02:00 si está activa.',
    ],
    quickFacts: {
      'Beds in village': { label: 'Camas en el pueblo', value: '7 500' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'IVL · 25 min' },
      'Last call': { label: 'Último servicio', value: '01:30 (hoteles)' },
      'Best season': { label: 'Mejor temporada', value: 'Sep–Mar (auroras)' },
    },
  },
  inari: {
    region: 'Municipio de Inari',
    blurb: 'Capital cultural sami: Sajos, Siida, el lago Inari y la iglesia silvestre de Pielpajärvi.',
    pageTagline: 'La capital cultural sami.',
    intro: 'Inari es la sede cultural del parlamento sami (Sajos) y alberga Siida, el museo que te explica todo lo que no sabías sobre Sápmi. Aquí la "vida nocturna" es cultural: el festival de cine indígena Skábmagovat en enero, el festival de música sami Ijahis Idja en agosto y un puñado de bares que en su mayoría sirven cenas. No vengas por los clubes. Ven por el agua fría del lago, los conciertos de joik y un cielo que se vuelve negro a las 14:00 en diciembre.',
    venues: {
      'Hotel Inari Bar': { type: 'Bar de hotel', note: 'Restaurante y bar con vistas al lago, abierto hasta la 01:00.' },
      'Sajos Café': { type: 'De día', note: 'Café del parlamento sami: café y eventos culturales.' },
      'Tradiska': { type: 'Restaurante + bar', note: 'Cocina sami, bar pequeño, ambiente íntimo.' },
    },
    knowList: [
      'No hay clubes. Dos hoteles con bar, tres restaurantes con licencia de alcohol.',
      'El festival de cine indígena Skábmagovat se celebra a finales de enero: el alojamiento se agota.',
      'El festival Ijahis Idja, a mediados de agosto: lo más parecido a una "escena" que tiene Inari.',
      'Sajos y Siida son visitas culturales obligadas antes de tomar una copa en cualquier sitio.',
    ],
    quickFacts: {
      'Population': { label: 'Población', value: '6 800' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'IVL · 40 min' },
      'Last call': { label: 'Último servicio', value: '01:00' },
      'Best season': { label: 'Mejor temporada', value: 'Finales de ago (Ijahis Idja) · Ene (Skábmagovat)' },
    },
  },
  kemi: {
    region: 'Laponia del Mar',
    blurb: 'El SnowCastle, el rompehielos Sampo y el escalonado complejo de restaurantes del Hotel Merihovi.',
    pageTagline: 'SnowCastle, rompehielos, Laponia del mar.',
    intro: 'Kemi es la puerta entre el tren desde Helsinki y Laponia, y un pueblo con un único truco: el SnowCastle, reconstruido cada invierno desde 1996, con capilla, hotel y un bar de paredes de hielo. El rompehielos Sampo navega desde diciembre con travesías nocturnas que también hacen de bar. La vida nocturna en tierra firme es pequeña: el Hotel Merihovi gestiona un complejo en varios niveles (bar del hall, terraza deportiva, restaurante) y eso es casi todo. Un pueblo portuario industrial que rinde por encima de su tamaño en invierno.',
    venues: {
      'SnowCastle Ice Bar': { type: 'Bar de hielo', note: 'Abierto de ene a abr. Chupitos de vodka en vasos de hielo, paredes a –5 °C.' },
      'Hotel Merihovi': { type: 'Complejo hotelero', note: 'Bar del hall + terraza deportiva + restaurante.' },
      'Sampo Icebreaker': { type: 'Bar a bordo', note: 'Travesías a las 12:00 y las 18:00 en temporada; el bar funciona durante todo el trayecto.' },
    },
    knowList: [
      'Casi toda la acción está en el SnowCastle de enero a abril.',
      'El rompehielos Sampo exige reservar con 2 o 3 días de antelación en plena temporada.',
      'Último servicio a las 02:00 en el pueblo; el bar del SnowCastle cierra antes (normalmente a las 24:00).',
      'Tren desde Helsinki: 8 h directo.',
    ],
    quickFacts: {
      'Population': { label: 'Población', value: '20 800' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'KEM · 5 min · o tren desde Helsinki' },
      'Last call': { label: 'Último servicio', value: '02:00' },
      'Best season': { label: 'Mejor temporada', value: 'Ene–Abr (SnowCastle + rompehielos)' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: 'La segunda mayor zona esquiable de Finlandia.',
    pageTagline: 'La segunda mayor zona esquiable de Finlandia.',
    venues: {
      'Sport Resort Ylläs': { type: 'Bar de hotel', note: 'El bar de après más concurrido de Äkäslompolo.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Camas en la estación', value: '23 000' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'KTT · 50 min' },
      'Last call': { label: 'Último servicio', value: '02:00' },
      'Best season': { label: 'Mejor temporada', value: 'Nov–Abr (esquí) · Mar (días más largos)' },
    },
  },
  ruka: {
    region: 'Noreste de Finlandia',
    blurb: 'La segunda estación de esquí de Finlandia por jornadas de esquiador.',
    pageTagline: 'Estación de esquí en tierra de osos.',
    venues: {
      'Zone Bar': { type: 'Après-ski', note: 'Al pie de la pista: la sede de la fiesta de apertura de la Copa del Mundo de la FIS.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Camas en la estación', value: '15 000' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'KAO · 30 min' },
      'Last call': { label: 'Último servicio', value: '03:00 (en temporada)' },
      'Best season': { label: 'Mejor temporada', value: 'Finales de nov (apertura FIS) · Dic–Abr' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: 'Amatista, montes y el esquí más tranquilo de Laponia.',
    pageTagline: 'Los montes de amatista.',
    intro: 'Dos pequeños montes, a 35 km uno del otro, que comparten un parque nacional. Pyhä tiene la mayor zona esquiable; Luosto tiene la mina de amatista que puedes visitar a medianoche bajo la aurora. Ninguno tiene clubes. Ambos tienen bares de hotel que merecen una velada junto a la chimenea: el Hotel Pyhätunturi para una cena a la altura de un restaurante, y el Hotel Aurora de Luosto para el bar con ventanal a la aurora. El "destino de esquí" más tranquilo de Laponia, y orgulloso de serlo.',
    venues: {
      'Hotel Pyhätunturi Bar': { type: 'Bar de hotel', note: 'Restaurante y bar, chimenea, al pie de la pista.' },
      'Hotel Aurora Luosto': { type: 'Bar con ventanal a la aurora', note: 'Bar con paredes de cristal orientado al norte; servicio de despertador si la aurora está activa.' },
      'Pyhän Asteli': { type: 'Restaurante + bar', note: 'Restaurante favorito local; la única cena tardía del pueblo de Pyhä.' },
    },
    knowList: [
      'No hay discotecas en ningún punto de Pyhä-Luosto.',
      'La mina de amatista ofrece visitas nocturnas bajo la aurora: reserva con antelación.',
      'El parque nacional de Pyhä-Luosto es el reclamo silencioso.',
      'El último servicio es hacia la 01:00 en ambos pueblos.',
    ],
    quickFacts: {
      'Beds in two villages': { label: 'Camas en los dos pueblos', value: '5 000' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'RVN · 1h30 · o KTT · 2h30' },
      'Last call': { label: 'Último servicio', value: '01:00' },
      'Best season': { label: 'Mejor temporada', value: 'Dic–Abr (esquí) · Sep–Mar (auroras)' },
    },
  },
  sodankyla: {
    region: 'Laponia Central',
    blurb: 'Midnight Sun Film Festival: proyectan películas a las 03:00 a plena luz del día.',
    pageTagline: 'Midnight Sun Film Festival.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Población', value: '8 600' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'RVN · 1h45' },
      'Last call': { label: 'Último servicio', value: '01:00 / 04:00 en festival' },
      'Best season': { label: 'Mejor temporada', value: 'Mediados de jun (Midnight Sun Film Festival)' },
    },
  },
  kittila: {
    region: 'Municipio de Kittilä',
    blurb: 'Donde viven de verdad los locales (Levi es sobre todo turistas).',
    pageTagline: 'Donde viven de verdad los locales de Levi.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Población', value: '6 500' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'KTT · 5 min' },
      'Last call': { label: 'Último servicio', value: '02:00' },
      'Best season': { label: 'Mejor temporada', value: 'Todo el año (escena del personal de Levi)' },
    },
  },
  ivalo: {
    region: 'Municipio de Inari',
    blurb: 'El Club Nord del Hotel Ivalo y el pub del Hotel Kultahippu.',
    pageTagline: 'El aeropuerto más al norte con un club.',
    intro: 'Ivalo es el aeropuerto más al norte de Finlandia y la puerta de entrada a Inari, Saariselkä y la Tierra Natal Sami. El pueblo en sí tiene 4 000 habitantes. El Hotel Ivalo gestiona el Club Nord, el club más al norte de la Finlandia continental, abierto viernes y sábado. El Hotel Kultahippu tiene el único pub de verdad del pueblo. Más allá de eso, bares de hotel y un quiosco de gasolinera que vende cerveza.',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: 'Discoteca', note: 'Abierto viernes y sábado. El club más al norte de la Finlandia continental.' },
      'Hotel Kultahippu Pub': { type: 'Pub', note: 'Abierto a diario. El rincón local de después del trabajo.' },
      'Hotel Ivalo Lobby Bar': { type: 'Bar de hotel', note: 'Más tranquilo, junto al restaurante.' },
    },
    knowList: [
      'El aeropuerto más al norte de la Finlandia continental.',
      'Saariselkä está a 25 minutos: muchos visitantes de Saariselkä se acercan al Club Nord.',
      'Último servicio a las 02:00 entre semana y a las 03:00 los fines de semana.',
      'No hay parada de taxis: reserva en la recepción del hotel.',
    ],
    quickFacts: {
      'Population': { label: 'Población', value: '4 000' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'IVL · 5 min' },
      'Last call': { label: 'Último servicio', value: '02:00 / 03:00 fines de semana' },
      'Best season': { label: 'Mejor temporada', value: 'Sep–Mar (auroras) · Ago (festivales)' },
    },
  },
  muonio: {
    region: 'Laponia Occidental',
    blurb: 'Sin vida nocturna. El reclamo es el parque nacional de Pallas-Yllästunturi.',
    pageTagline: 'La puerta al parque nacional.',
    venues: {
      'Harriniva Wilderness Hotel': { type: 'Bar de hotel', note: 'Sauna y bar, sobre todo para huéspedes de safari.' },
    },
    quickFacts: {
      'Population': { label: 'Población', value: '2 300' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'KTT · 1h15' },
      'Last call': { label: 'Último servicio', value: '23:00 / 01:00 fines de semana' },
      'Best season': { label: 'Mejor temporada', value: 'Sep–Mar (auroras · poca contaminación lumínica)' },
    },
  },
  salla: {
    region: 'Laponia Oriental',
    blurb: 'En medio de la nada. La estación de esquí más tranquila de Finlandia.',
    pageTagline: 'En medio de la nada.',
    venues: {
      'Hotel Revontuli Bar': { type: 'Bar de hotel', note: 'El único local que abre hasta tarde. Restaurante y bar.' },
      'Salla Wilderness Park': { type: 'Local de día', note: 'Almuerzo y café diurno para los visitantes del parque.' },
    },
    quickFacts: {
      'Population': { label: 'Población', value: '3 300' },
      'Closest airport': { label: 'Aeropuerto más cercano', value: 'KAO · 1h30' },
      'Last call': { label: 'Último servicio', value: '23:00 / 01:00 en temporada' },
      'Best season': { label: 'Mejor temporada', value: 'Dic–Abr (esquí · candidatura JJ. OO. 2032)' },
    },
  },
};
export default overlay;
