import { BeerStop } from './types';

export const BEER_STOPS_DATA: BeerStop[] = [
  {
    id: 1,
    name: "At the Black Ox",
    originalName: "Hostinec U Černého vola",
    animal: "Ox",
    animalEmoji: "🐂",
    address: "Loretánské náměstí 107/1, 118 00 Prague 1 - Hradčany",
    latitude: 50.088927,
    longitude: 14.391696,
    hours: {
      saturday: "10:00 – 22:00",
      sunday: "10:00 – 22:00"
    },
    payment: "Cash Only",
    beers: ["Velkopopovický Kozel (Light/Dark)", "Pilsner Urquell"],
    description: "An absolute legend of Hradčany, preserved with high vaulted Gothic ceilings and long communal oak tables. Since 1965, its profits have directly supported the Deyl School for blind children located next door.",
    history: "Founded in a beautiful Renaissance building with a beautifully preserved facade featuring Saint Luke painting the Virgin Mary. It is a state-heritage protected tavern dedicated to keeping original, non-touristy Prague pub culture alive.",
    shortFact: "Your beer price directly supports the adjacent boarding school for visually impaired children!",
    difficulty: 4,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hostinec+U+Cerneho+vola+Prague",
    avgPriceCoefficients: 1,
    highlightIcon: "shield"
  },
  {
    id: 3, // Grouped by walking route: 1 -> 3 -> 2
    name: "At the Cat",
    originalName: "Hospoda U Kocoura",
    animal: "Cat",
    animalEmoji: "🐈",
    address: "Nerudova 205/2, 118 00 Prague 1 - Malá Strana",
    latitude: 50.088714,
    longitude: 14.402852,
    hours: {
      saturday: "11:00 – 23:00",
      sunday: "11:00 – 23:00"
    },
    payment: "Cash Preferred",
    beers: ["Budějovický Budvar (Original & Dark)", "Pilsner Urquell"],
    description: "Located on the royal route ascending to Prague Castle, this historic pub carries a proud tradition of serving genuine Czech draft beer since the 17th century. Its rustic wooden furnishings and cozy arches remain timeless.",
    history: "U Kocoura was an intellectual stronghold of Czech dissidents during the socialist era, frequented by writers, actors, and political figures like Václav Havel. It remains incredibly stubborn against commercial decoration.",
    shortFact: "One of the earliest Malá Strana pubs to proudly serve Pilsner alongside Budvar.",
    difficulty: 3,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hospoda+U+Kocoura+Prague",
    avgPriceCoefficients: 2,
    highlightIcon: "beer"
  },
  {
    id: 2,
    name: "At the Hippo",
    originalName: "Hospoda U Hrocha",
    animal: "Hippo",
    animalEmoji: "🦛",
    address: "Thunovská 178/10, 118 00 Prague 1 - Malá Strana",
    latitude: 50.089290,
    longitude: 14.402632,
    hours: {
      saturday: "11:00 – 22:00",
      sunday: "11:00 – 22:00"
    },
    payment: "Cash Only",
    beers: ["Pilsner Urquell (Excellent Tap)", "Kozel Dark"],
    description: "A tiny public treasure hidden in a narrow street beneath Prague Castle. It has a legendary reputation for serving perhaps the freshest, coldest, and most perfectly tapped Pilsner Urquell in Prague.",
    history: "Although surrounded by embassy buildings, U Hrocha remains a sanctuary for local handymen, neighborhood Prague academics, and castle guards. Tables are almost always fully reserved, but standing at the tap is an art form here.",
    shortFact: "A highly coveted cult spot with Gothic vaults, where you must squeeze in with high-density local regulars.",
    difficulty: 5,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hospoda+U+Hrocha+Prague",
    avgPriceCoefficients: 1,
    highlightIcon: "crown"
  },
  {
    id: 4,
    name: "At the Golden Tiger",
    originalName: "Hospoda U Zlatého tygra",
    animal: "Tiger",
    animalEmoji: "🐅",
    address: "Husova 228/17, 110 00 Prague 1 - Staré Město",
    latitude: 50.086111,
    longitude: 14.418333,
    hours: {
      saturday: "15:00 – 23:00",
      sunday: "15:00 – 23:00"
    },
    payment: "Cash Only",
    beers: ["Pilsner Urquell (Tank Beer)"],
    description: "The absolute Holy Grail of traditional Pilsner halls in Prague. Famous as the primary writing table for Nobel laureate Bohumil Hrabal. To this day, a legendary spot where draft speed is unmatched.",
    history: "The house dates back to medieval times, marked with a relief of a golden tiger. In 1994, President Václav Havel brought US President Bill Clinton here to experience real Czech hospitality. To secure a seat, you must wait outside before 3:00 PM.",
    shortFact: "Host to presidents, kings, and great writers — you sit on shared benches with total strangers.",
    difficulty: 5,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=U+Zlateho+tygra+Prague",
    avgPriceCoefficients: 2,
    highlightIcon: "star"
  },
  {
    id: 7,
    name: "At the Two Cats",
    originalName: "Hospoda U Dvou koček",
    animal: "Cat (Two Cats)",
    animalEmoji: "🐈‍⬛",
    address: "Uhelný trh 415/10, 110 00 Prague 1 - Staré Město",
    latitude: 50.084167,
    longitude: 14.420833,
    hours: {
      saturday: "11:00 – 23:00",
      sunday: "11:00 – 23:00"
    },
    payment: "Cash & Card",
    beers: ["Pilsner Urquell", "Kočka Light (House Lager)", "Kočka Dark (House Lager)"],
    description: "Located at the historic Coal Market, this place combines a lively traditional restaurant, a dedicated neighborhood taproom, and an authentic microbrewery. Famous for live accordion acts that play everyday in the evening.",
    history: "Operating in an elegant building with late Gothic foundations, they have served locals for centuries. Since 2010, they also brew their own unfiltered, unpasteurized lagers named 'Kočka' (Cat) in view of the dining area.",
    shortFact: "Live Czech tavern accordion music plays starting at 19:00 most evenings!",
    difficulty: 3,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=U+Dvou+kocek+Prague",
    avgPriceCoefficients: 2,
    highlightIcon: "music"
  },
  {
    id: 5,
    name: "At the Golden Elephant",
    originalName: "Pivnice U Zlatého slona",
    animal: "Elephant",
    animalEmoji: "🐘",
    address: "Havelská 510/21, 110 00 Prague 1 - Staré Město",
    latitude: 50.085270,
    longitude: 14.421110,
    hours: {
      saturday: "11:00 – 23:00",
      sunday: "11:00 – 23:00"
    },
    payment: "Cash & Card",
    beers: ["Pilsner Urquell", "Kozel Dark"],
    description: "A cozy underground cellar pub decorated with historic elephant statues. Located right by Havelská Market, it offers standard Old Town comfort food and reliable, fast-flowing drafts in a warm, stone-walled retreat.",
    history: "Sits inside a massive building known historically as 'The Golden Elephant Castle' because of its robust medieval foundations. It represents one of the oldest market-area cellars converted into a spacious traditional taproom.",
    shortFact: "A stone-and-wood cellar hideout that remains cool even during hot summer walks.",
    difficulty: 2,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pivnice+U+Zlateho+slona+Prague",
    avgPriceCoefficients: 2,
    highlightIcon: "compass"
  },
  {
    id: 6,
    name: "At the Little Bears",
    originalName: "Pivovar U Medvídků",
    animal: "Bear",
    animalEmoji: "🐻",
    address: "Na Perštýně 345/7, 110 00 Prague 1 - Staré Město",
    latitude: 50.082500,
    longitude: 14.418056,
    hours: {
      saturday: "11:30 – 23:00",
      sunday: "12:00 – 22:00"
    },
    payment: "Cash & Card",
    beers: ["Budweiser Budvar", "X-Beer 33 (12.6% ABV)", "Medvídek Unfiltered Lager"],
    description: "Dating back to 1466, this multi-room tavern is a landmark of Czech brewing. While the front is a classic grand hall serving Budvar, the historic upper attic houses a tiny microbrewery producing highly specialized oak-aged craft beers.",
    history: "Named after the first brewer, Jan Medvídek. In the 20th century, it was home to Prague's premier cabaret. Today, it is revered worldwide for producing X-Beer 33, deep-brewed in traditional wooden barrels using historic methods.",
    shortFact: "Home to X-Beer 33 — the strongest naturally fermented lager in the Czech Republic!",
    difficulty: 2,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=U+Medvidku+Prague",
    avgPriceCoefficients: 2,
    highlightIcon: "flame"
  },
  {
    id: 10,
    name: "Red Stag",
    originalName: "Restaurace Červený Jelen",
    animal: "Deer / Stag",
    animalEmoji: "🦌",
    address: "Hybernská 1034/5, 110 00 Prague 1 - Nové Město",
    latitude: 50.087220,
    longitude: 14.430560,
    hours: {
      saturday: "11:30 – 23:30",
      sunday: "11:30 – 22:00"
    },
    payment: "Cash & Card",
    beers: ["Pilsner Urquell (Tank Beer)", "Stag craft specials"],
    description: "An awe-inspiring modern cubist cathedral of gastropub culture. Built in a vast bank vault designed by the legendary architect Josef Gočár, it spans multiple floors with high industrial beams and a striking copper tank centerpiece.",
    history: "The courtyard was historical lands of Czech nobility (Sweerts-Sporck Palace). Today, it houses a spectacular installation of three-stacked copper pilsner tanks suspended in the air. It bridges historical heritage with high-end culinary grill masterworks.",
    shortFact: "Has the tallest tower of copper tank-beers in the world, stretching over three floors!",
    difficulty: 2,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Cerveny+Jelen+Prague",
    avgPriceCoefficients: 3,
    highlightIcon: "sparkles"
  },
  {
    id: 11,
    name: "Two Roosters",
    originalName: "Pivovarnická hospoda Dva Kohouti",
    animal: "Rooster",
    animalEmoji: "🐓",
    address: "Sokolovská 81/55, 186 00 Prague 8 - Karlín",
    latitude: 50.093330,
    longitude: 14.449720,
    hours: {
      saturday: "12:00 – 01:00",
      sunday: "12:00 – 22:00"
    },
    payment: "Card Preferred",
    beers: ["Místní Pivo Light (8° & 12°)", "Matuška Craft Selections", "Pilsner Tank Beer"],
    description: "A trendy craft brewery hub with a roaring courtyard taproom in the Karlín district. Collaborated under local brewmaster Matuška, it serves tank fresh beers directly adjacent to the brewing kettles. Vibe is loud, standing, energetic, and highly modern.",
    history: "Established in 2018 inside a historic post-industrial courtyard, Dva Kohouti completely revitalized Prague's beer standards by showcasing that craft ales and microburst IPAs can live happily alongside traditional lagers.",
    shortFact: "A cashless, vibrant standing courtyard — great to visit during golden hour or late Saturdays.",
    difficulty: 4,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dva+Kohouti+Prague",
    avgPriceCoefficients: 2,
    highlightIcon: "zap"
  },
  {
    id: 8,
    name: "At the Bulldog",
    originalName: "Hospoda U Buldoka",
    animal: "Bulldog",
    animalEmoji: "🐶",
    address: "Dlouhá 709/26, 110 00 Prague 1 - Staré Město",
    latitude: 50.090100,
    longitude: 14.425800,
    hours: {
      saturday: "11:00 – 00:00",
      sunday: "12:00 – 22:00"
    },
    payment: "Cash & Card",
    beers: ["Pilsner Urquell", "Buldok cherry special", "Staropramen"],
    description: "Now relocated to a beautiful, historic cellar in Prague's Old Town, U Buldoka preserves its classic atmosphere. It is still styled with dozens of bulldog statues, paintings, and historical dog decor, serving hearty Czech portions.",
    history: "Originally founded in Prague 5 - Smíchov, this beloved pub recently moved to Staré Město. While it no longer sits directly near the Smíchov industrial brewery, it continues to tap excellent Pilsner alongside its famous Buldok cherry special.",
    shortFact: "This iconic pup-themed pub moved from Smíchov to Staré Město, bringing its entire bulldog universe along!",
    difficulty: 2,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hospoda+U+Buldoka+Prague",
    avgPriceCoefficients: 1,
    highlightIcon: "smile"
  },
  {
    id: 9,
    name: "At the Squirrel",
    originalName: "Restaurace U Veverky",
    animal: "Squirrel",
    animalEmoji: "🐿️",
    address: "Eliášova 324/14, 160 00 Prague 6 - Bubeneč",
    latitude: 50.101110,
    longitude: 14.401940,
    hours: {
      saturday: "11:00 – 23:00",
      sunday: "11:00 – 23:00"
    },
    payment: "Cash & Card",
    beers: ["Pilsner Urquell (Master draft)", "Kozel Dark"],
    description: "Located to the north in the upscale residential district of Bubeneč (Prague 6). U Veverky values perfect tap-craftmanship above everything, with tapsters repeatedly winning national draft quality awards.",
    history: "Sits as an anchor on a quiet leafy boulevard corner. While the area is calm, the inside of U Veverky is a bustling, steam-cladded local melting pot of students, diplomats, and old regulars enjoying traditional Czech meals.",
    shortFact: "Regarded by beer purists as serving one of the top five best-poured Pilsner Urquells in the whole country.",
    difficulty: 3,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Restaurace+U+Veverky+Prague",
    avgPriceCoefficients: 2,
    highlightIcon: "award"
  }
];

export const TOUR_SUMMARY = {
  totalDistanceKm: "approx. 10.5 km (for the complete 11-stop loop, or 5.2 km for the 8 old-town stops core walking route)",
  coreWalkingRoute: [1, 3, 2, 4, 8, 7, 5, 6, 10, 11], // Hradčany -> Malá Strana -> Staré Město -> Nové Město -> Karlín
  excursionStops: [9], // Bubeneč (recommend taking public tram!)
  tramAdvice: "For stop 9 (Bubeneč), use Prague's ultra-reliable tram lines! Take Tram 12/20 across the river, or Metro A (Hradčanská) to reach Bubeneč.",
  averageCostInfo: "A half-liter of tank lager ranges from 55 CZK to 85 CZK (approx. 2.20€ to 3.40€)."
};
