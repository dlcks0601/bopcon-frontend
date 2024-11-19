import React, { useState } from 'react';

const ArtistConcertManagement: React.FC = () => {
    const [artistData, setArtistData] = useState({
        mbid: '',
        name: '',
        imgUrl: '',
        snsUrl: '',
        mediaUrl: ''
    });
    const [concertData, setConcertData] = useState({
        artistId: 0,
        title: '',
        subTitle: '',
        date: '',
        venueName: '',
        cityName: '',
        countryName: '',
        countryCode: '',
        ticketPlatforms: '',
        ticketUrl: '',
        posterUrl: '',
        genre: '',
        concertStatus: 'UPCOMING'
    });
    const [artists, setArtists] = useState<any[]>([]);
    const [concerts, setConcerts] = useState<any[]>([]);

    // Handle Artist form input change
    const handleArtistInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setArtistData({ ...artistData, [id]: value });
    };

    // Handle Concert form input change
    const handleConcertInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setConcertData({ ...concertData, [id]: id === 'artistId' ? parseInt(value) : value });
    };

    // Add Artist with JWT token
    const addArtist = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 accessToken 가져오기
            if (!accessToken) {
                alert('로그인이 필요합니다.');
                return;
            }
            const response = await fetch('/api/admin/artist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Authorization 헤더에 accessToken 추가
                },
                body: JSON.stringify(artistData)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            alert(`Artist Added: ${data.name}`);
        } catch (error) {
            console.error("Error adding artist:", error);
            alert(`Error adding artist: ${error}`);
        }
    };

    // Get All Artists
    const getAllArtists = async () => {
        try {
            const response = await fetch('/api/artists');
            const data = await response.json();
            setArtists(data);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    // Add Concert with JWT token
    const addConcert = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 accessToken 가져오기
            if (!accessToken) {
                alert('로그인이 필요합니다.');
                return;
            }
            const response = await fetch('/api/admin/new-concert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` // Authorization 헤더에 accessToken 추가
                },
                body: JSON.stringify(concertData)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            alert(`Concert Added: ${data.title}`);
        } catch (error) {
            console.error("Error adding concert:", error);
            alert(`Error adding concert: ${error}`);
        }
    };

    // Get All Concerts
    const getAllConcerts = async () => {
        try {
            const response = await fetch('/api/new-concerts');
            const data = await response.json();
            setConcerts(data);
        } catch (error) {
            console.error("Error fetching concerts:", error);
        }
    };

    return (
        <div>
            <h1>Artist and Concert Management</h1>

            {/* Artist Management Section */}
            <section>
                <h2>Add Artist</h2>
                <form onSubmit={addArtist}>
                    <input type="text" id="mbid" placeholder="MBID" required onChange={handleArtistInputChange} />
                    <input type="text" id="name" placeholder="Name" required onChange={handleArtistInputChange} />
                    <input type="text" id="imgUrl" placeholder="Image URL" onChange={handleArtistInputChange} />
                    <input type="text" id="snsUrl" placeholder="SNS URL" onChange={handleArtistInputChange} />
                    <input type="text" id="mediaUrl" placeholder="Media URL" onChange={handleArtistInputChange} />
                    <button type="submit">Add Artist</button>
                </form>
            </section>

            <section>
                <h2>All Artists</h2>
                <button onClick={getAllArtists}>Get All Artists</button>
                <ul>
                    {artists.map((artist) => (
                        <li key={artist.artistId}>
                            ID: {artist.artistId}, MBID: {artist.mbid}, Name: {artist.name}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Concert Management Section */}
            <section>
                <h2>Add Concert</h2>
                <form onSubmit={addConcert}>
                    <input type="number" id="artistId" placeholder="Artist ID" required onChange={handleConcertInputChange} />
                    <input type="text" id="title" placeholder="Title" required onChange={handleConcertInputChange} />
                    <input type="text" id="subTitle" placeholder="Sub Title" onChange={handleConcertInputChange} />
                    <input type="date" id="date" required onChange={handleConcertInputChange} />
                    <input type="text" id="venueName" placeholder="Venue Name" required onChange={handleConcertInputChange} />
                    <input type="text" id="cityName" placeholder="City Name" required onChange={handleConcertInputChange} />
                    <input type="text" id="countryName" placeholder="Country Name" required onChange={handleConcertInputChange} />
                    <input type="text" id="countryCode" placeholder="Country Code" required onChange={handleConcertInputChange} />
                    <input type="text" id="ticketPlatforms" placeholder="Ticket Platforms" onChange={handleConcertInputChange} />
                    <input type="url" id="ticketUrl" placeholder="Ticket URL" onChange={handleConcertInputChange} />
                    <input type="url" id="posterUrl" placeholder="Poster URL" onChange={handleConcertInputChange} />
                    <input type="text" id="genre" placeholder="Genre" required onChange={handleConcertInputChange} />
                    <select id="concertStatus" required onChange={handleConcertInputChange}>
                        <option value="UPCOMING">UPCOMING</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>
                    <button type="submit">Add Concert</button>
                </form>
            </section>

            <section>
                <h2>All Concerts</h2>
                <button onClick={getAllConcerts}>Get All Concerts</button>
                <ul>
                    {concerts.map((concert) => (
                        <li key={concert.newConcertId}>
                            Concert ID: {concert.newConcertId}, Artist ID: {concert.artistId}, Title: {concert.title}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ArtistConcertManagement;
