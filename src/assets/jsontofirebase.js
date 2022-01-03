import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

const PROPERTIES = [
  {
    id: 1,
    hidden: true,
    title: "Gdańsk, , 80.38 m², 3 pokoje",
    subtitle: "Inwestycyjne dwa mieszkania z widokiem na Marinę",
    img: [
      {
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        id: 1,
        name: "House",
      },

      {
        url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

        id: 2,
        name: "House",
      },
    ],

    type: "Dom",
    city: "Sopot",
    distriction: "Morena",
    transactionType: "Wynajem",
    rooms: 4,
    area: 80,
    price: 200000,
    year: 2011,
    offer: "RS61782836",
    floor: 2,
    features: [
      "Blisko morza",
      "Widok",
      "Las",
      "Balkon",
      "Cicho",
      "Parking",
      "Taras",
      "Wysoki standart budynku",
    ],
    descriptionTitle:
      "Penthouse z tarasem na dachu budynku z oszałamiającym widokiem na morze",
    description: `Znajdujący się na kameralnej inwestycji w Gdyni Orłowie, w niewielkiej odległości od plaży, zaledwie 5 minut spacerem od Trójmiejskiego Parku Krajobrazowego.
  
      O inwestycji:
      
      Budynek zaprojektowany przez cenioną pracownię architektoniczną. Nowoczesny apartamentowiec, umiejscowiony jest przy cichej ulicy Światowida - przeważa na niej zabudowa domów jednorodzinnych, co czyni okolicę spokojną i kameralną. W całym budynku znajdują się zaledwie 4 mieszkania, ponadto budynek posiada windę, podziemną halę garażową, miejsce dla mieszkańców przeznaczone pod fitness oraz komórki lokatorskie.
      
      Apartament:
      
      Przestronny, dwukondygnacyjny apartament o powierzchni łącznej 100,78 m2 zlokalizowany jest na pierwszym piętrze budynku.
      Składa się z następujących pomieszczeń:
      
      Poziom 1:
      • salon ok. 30 m2
      • kuchnia ok. 10 m2
      • gabinet ok. 12 m2
      • łazienka ok. 4 m2
      • hol ok. 8 m2
      • taras 19 m2
      
      Poziom 2:
      • antresola ok. 36 m2
      • przestronny taras 33 m2
      
      Na dachu budynku znajdu się trzeci taras ok. 60 m2 przynależący do apartamentu z oszałamiającym widokiem na morze.
      
      Do apartamentu przypisane jest jedno miejsce parkingowe w podziemnej hali garażowej budynku (płatne dodatkowo 40.000,- zł) oraz komórka lokatorska o powierzchni 4,30 m2 (cena zakupu to 3.000,- zł/m2).
      
      Zapraszam serdecznie na prezentację tej wyjątkowej nieruchomości!
      
      Przedstawione powyżej propozycje nie stanowią oferty handlowej w rozumieniu przepisów prawa, lecz mają charakter informacyjny. Wszelkie dane dotyczące nieruchomości uzyskano na podstawie oświadczeń Właściciela.
      Dokładamy wszelkich starań, aby każda oferta była rzetelnie sprawdzona i aktualna.`,
    agent: {
      name: "John Doe",
      agency: "Real Estate Agency",
      photo:
        "https://r-scale-b1.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p145/i/04df4d434d481c5bb723be1b6df1ee65/4719da4c-df7f-450d-b663-868a58afe698.jpg?type=1&srcmode=3&srcx=1%2F2&srcy=1%2F2&srcw=743&srch=417.9375&dstw=743&dsth=417.9375&quality=75",
      phone: 929934123,
      email: "johndoe@mail.com",
    },
  },

  {
    id: 2,
    title: "Gdańsk, , 80.38 m², 3 pokoje",
    hidden: false,
    subtitle: "Inwestycyjne dwa mieszkania z widokiem na Marinę",
    img: [
      {
        url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        id: 1,
        name: "House",
      },

      {
        url: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",

        id: 2,
        name: "House",
      },
    ],
    type: "Działka",
    city: "Gdańsk",
    distriction: "Morena",
    transactionType: "Sprzedaż",
    rooms: 4,
    area: 80,
    price: 200000,
    year: 2011,
    offer: "RS61782836",
    floor: 2,
    features: [
      "Blisko morza",
      "Widok",
      "Las",
      "Balkon",
      "Cicho",
      "Parking",
      "Taras",
      "Wysoki standart budynku",
    ],
    description:
      "Jedyny obecnie w sprzedaży trzypokojowy wykończony apartament składający się z dwóch sypialni, przestronnego salonu z aneksem kuchennym, łazienki oraz garderoby o powierzchni 80,38 m2 z widokiem na zieleń Parku im. Ronalda Reagana patrzący w stronę morza oraz zielone prywatne patio. Usytuowany na siódmym piętrze luksusowej inwestycji Tarasy Bałtyku, zlokalizowanej w pierwszej linii zabudowy od morza",
    agent: {
      name: "John Doe",
      agency: "Real Estate Agency",
      photo:
        "https://r-scale-b1.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p145/i/04df4d434d481c5bb723be1b6df1ee65/4719da4c-df7f-450d-b663-868a58afe698.jpg?type=1&srcmode=3&srcx=1%2F2&srcy=1%2F2&srcw=743&srch=417.9375&dstw=743&dsth=417.9375&quality=75",
      phone: 929934123,
      email: "johndoe@mail.com",
    },
  },
  {
    id: 3,
    hidden: false,
    title: "Gdańsk, , 80.38 m², 3 pokoje",
    subtitle: "Inwestycyjne dwa mieszkania z widokiem na Marinę",
    img: [
      {
        url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        id: 1,
        name: "House",
      },

      {
        url: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",

        id: 2,
        name: "House",
      },
    ],
    type: "Mieszkanie",
    city: "Gdynia",
    distriction: "Morena",
    transactionType: "Wynajem",
    rooms: 4,
    area: 80,
    price: 200000,
    year: 2011,
    offer: "RS61782836",
    floor: 2,
    features: [
      "Blisko morza",
      "Widok",
      "Las",
      "Balkon",
      "Cicho",
      "Parking",
      "Taras",
      "Wysoki standart budynku",
    ],
    description:
      "Jedyny obecnie w sprzedaży trzypokojowy wykończony apartament składający się z dwóch sypialni, przestronnego salonu z aneksem kuchennym, łazienki oraz garderoby o powierzchni 80,38 m2 z widokiem na zieleń Parku im. Ronalda Reagana patrzący w stronę morza oraz zielone prywatne patio. Usytuowany na siódmym piętrze luksusowej inwestycji Tarasy Bałtyku, zlokalizowanej w pierwszej linii zabudowy od morza",
    agent: {
      name: "John Doe",
      agency: "Real Estate Agency",
      photo:
        "https://r-scale-b1.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p145/i/04df4d434d481c5bb723be1b6df1ee65/4719da4c-df7f-450d-b663-868a58afe698.jpg?type=1&srcmode=3&srcx=1%2F2&srcy=1%2F2&srcw=743&srch=417.9375&dstw=743&dsth=417.9375&quality=75",
      phone: 929934123,
      email: "johndoe@mail.com",
    },
  },
  {
    id: 4,
    hidden: true,
    title: "Gdańsk, , 80.38 m², 3 pokoje",
    subtitle: "Inwestycyjne dwa mieszkania z widokiem na Marinę",
    img: [
      {
        url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        id: 1,
        name: "House",
      },

      {
        url: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",

        id: 2,
        name: "House",
      },
    ],
    type: "Dom",
    city: "Gdańsk",
    distriction: "Morena",
    transactionType: "Sprzedaż",
    rooms: 4,
    area: 80,
    price: 200000,
    year: 2011,
    offer: "RS61782836",
    floor: 2,
    features: [
      "Blisko morza",
      "Widok",
      "Las",
      "Balkon",
      "Cicho",
      "Parking",
      "Taras",
      "Wysoki standart budynku",
    ],
    description:
      "Jedyny obecnie w sprzedaży trzypokojowy wykończony apartament składający się z dwóch sypialni, przestronnego salonu z aneksem kuchennym, łazienki oraz garderoby o powierzchni 80,38 m2 z widokiem na zieleń Parku im. Ronalda Reagana patrzący w stronę morza oraz zielone prywatne patio. Usytuowany na siódmym piętrze luksusowej inwestycji Tarasy Bałtyku, zlokalizowanej w pierwszej linii zabudowy od morza",
    agent: {
      name: "John Doe",
      agency: "Real Estate Agency",
      photo:
        "https://r-scale-b1.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p145/i/04df4d434d481c5bb723be1b6df1ee65/4719da4c-df7f-450d-b663-868a58afe698.jpg?type=1&srcmode=3&srcx=1%2F2&srcy=1%2F2&srcw=743&srch=417.9375&dstw=743&dsth=417.9375&quality=75",
      phone: 929934123,
      email: "johndoe@mail.com",
    },
  },
];
const firebaseConfig = {
  apiKey: "AIzaSyDVuyxb3d1QfFCz85CSE5e98q4RE1ijdyA",
  authDomain: "real-estate-963b8.firebaseapp.com",
  projectId: "real-estate-963b8",
  storageBucket: "real-estate-963b8.appspot.com",
  messagingSenderId: "912471619945",
  appId: "1:912471619945:web:f6fef119914a2a6e5625f8",
  databaseURL:
    "https://real-estate-963b8-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

PROPERTIES.forEach(function (obj) {
  if (obj.hidden) {
    addDoc(collection(db, "hiddenProperties"), obj);
  } else {
    addDoc(collection(db, "properties"), obj);
  }
});
