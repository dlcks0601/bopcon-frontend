import { describe, it, expect, vi } from 'vitest';
import {
  addArtistFavorite,
  addConcertFavorite,
  getFavorites,
  deleteArtistFavorite,
  deleteConcertFavorite,
} from '@/apis/favorites.api';
import { httpClient } from '@/apis/http';

// Mock HTTP client
vi.mock('@/apis/http', () => ({
  httpClient: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Favorites API', () => {
  it('should add an artist to favorites', async () => {
    const mockResponse = {
      favorite_id: 1,
      user_id: 1,
      artist_id: 1,
      created_at: '2024-11-15T12:45:00Z',
    };
    (httpClient.post as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await addArtistFavorite(1);

    expect(httpClient.post).toHaveBeenCalledWith('/api/favorites/artist/1');
    expect(result).toEqual(mockResponse);
  });

  it('should add a concert to favorites', async () => {
    const mockResponse = {
      favorite_id: 2,
      user_id: 1,
      concert_id: 3,
      created_at: '2024-11-15T13:00:00Z',
    };
    (httpClient.post as jest.Mock).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await addConcertFavorite(3);

    expect(httpClient.post).toHaveBeenCalledWith('/api/favorites/concert/3');
    expect(result).toEqual(mockResponse);
  });

  it('should fetch all favorites', async () => {
    const mockResponse = [
      {
        favoriteId: 5,
        artistId: 3,
        artistName: 'Official HIGE DANdism',
        newConcertId: null,
        newConcertTitle: null,
        newConcertDate: null,
      },
      {
        favoriteId: 6,
        artistId: null,
        artistName: null,
        newConcertId: 3,
        newConcertTitle: '2024 오피셜히게단디즘 내한공연',
        newConcertDate: '2024-11-30',
      },
    ];
    (httpClient.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await getFavorites();

    expect(httpClient.get).toHaveBeenCalledWith('/api/favorites');
    expect(result).toEqual(mockResponse);
  });

  it('should delete an artist favorite', async () => {
    (httpClient.delete as jest.Mock).mockResolvedValueOnce({
      data: { message: 'Favorite deleted successfully.' },
    });

    const result = await deleteArtistFavorite(1);

    expect(httpClient.delete).toHaveBeenCalledWith('/api/favorites/artist/1');
    expect(result).toEqual({ message: 'Favorite deleted successfully.' });
  });

  it('should delete a concert favorite', async () => {
    (httpClient.delete as jest.Mock).mockResolvedValueOnce({
      data: { message: 'Favorite deleted successfully.' },
    });

    const result = await deleteConcertFavorite(3);

    expect(httpClient.delete).toHaveBeenCalledWith('/api/favorites/concert/3');
    expect(result).toEqual({ message: 'Favorite deleted successfully.' });
  });
});
