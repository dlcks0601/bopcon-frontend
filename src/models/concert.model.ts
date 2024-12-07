// src/models/Concert.ts

export interface Concert {
  endDate: [number, number, number];
  startDate: [number, number, number];
  artistName: string;
  newConcertId: number;
  artistId: number;
  title: string;
  subTitle: string;
  date: string;
  venueName: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  ticketPlatforms: string;
  ticketUrl: string;
  posterUrl: string;
  genre: string;
  concertStatus: string; // 적절한 Enum 사용 가능
}
