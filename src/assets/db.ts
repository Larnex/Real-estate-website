import { Property } from '../app/interfaces/property';

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Gdańsk, , 80.38 m², 3 pokoje',
    subtitle: 'Inwestycyjne dwa mieszkania z widokiem na Marinę',
    img: [
      {
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        id: 1,
        name: 'House',
      },

      {
        url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',

        id: 2,
        name: 'House',
      },
    ],

    type: 'Dom',
    city: 'Gdańsk',
    distriction: 'Morena',
    transactionType: 'Sprzedaż',
    rooms: 4,
    area: 80,
    price: 200000,
    year: 2011,
    offer: 'RS61782836',
    floor: 2,
    features: [
      'Blisko morza',
      'Widok',
      'Las',
      'Balkon',
      'Cicho',
      'Parking',
      'Taras',
      'Wysoki standart budynku',
    ],
    description:
      'Jedyny obecnie w sprzedaży trzypokojowy wykończony apartament składający się z dwóch sypialni, przestronnego salonu z aneksem kuchennym, łazienki oraz garderoby o powierzchni 80,38 m2 z widokiem na zieleń Parku im. Ronalda Reagana patrzący w stronę morza oraz zielone prywatne patio. Usytuowany na siódmym piętrze luksusowej inwestycji Tarasy Bałtyku, zlokalizowanej w pierwszej linii zabudowy od morza',
    agent: [
      {
        name: 'John Doe',
        agency: 'Real Estate Agency',
        photo:
          'https://r-scale-b1.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p145/i/04df4d434d481c5bb723be1b6df1ee65/4719da4c-df7f-450d-b663-868a58afe698.jpg?type=1&srcmode=3&srcx=1%2F2&srcy=1%2F2&srcw=743&srch=417.9375&dstw=743&dsth=417.9375&quality=75',
        phone: 929934123,
        email: 'johndoe@mail.com',
      },
    ],
  },

  {
    id: 2,
    title: 'Gdańsk, , 80.38 m², 3 pokoje',
    subtitle: 'Inwestycyjne dwa mieszkania z widokiem na Marinę',
    img: [
      {
        url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        id: 1,
        name: 'House',
      },

      {
        url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',

        id: 2,
        name: 'House',
      },
    ],
    type: 'Dom',
    city: 'Gdańsk',
    distriction: 'Morena',
    transactionType: 'Sprzedaż',
    rooms: 4,
    area: 80,
    price: 200000,
    year: 2011,
    offer: 'RS61782836',
    floor: 2,
    features: [
      'Blisko morza',
      'Widok',
      'Las',
      'Balkon',
      'Cicho',
      'Parking',
      'Taras',
      'Wysoki standart budynku',
    ],
    description:
      'Jedyny obecnie w sprzedaży trzypokojowy wykończony apartament składający się z dwóch sypialni, przestronnego salonu z aneksem kuchennym, łazienki oraz garderoby o powierzchni 80,38 m2 z widokiem na zieleń Parku im. Ronalda Reagana patrzący w stronę morza oraz zielone prywatne patio. Usytuowany na siódmym piętrze luksusowej inwestycji Tarasy Bałtyku, zlokalizowanej w pierwszej linii zabudowy od morza',
    agent: [
      {
        name: 'John Doe',
        agency: 'Real Estate Agency',
        photo:
          'https://r-scale-b1.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p145/i/04df4d434d481c5bb723be1b6df1ee65/4719da4c-df7f-450d-b663-868a58afe698.jpg?type=1&srcmode=3&srcx=1%2F2&srcy=1%2F2&srcw=743&srch=417.9375&dstw=743&dsth=417.9375&quality=75',
        phone: 929934123,
        email: 'johndoe@mail.com',
      },
    ],
  },
];
