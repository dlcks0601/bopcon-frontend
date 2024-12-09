import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtistCrud = () => {
    const [artists, setArtists] = useState([]);
    const [formData, setFormData] = useState({
        mbid: "",
        name: "",
        krName: "",
        imgUrl: "",
        snsUrl: "",
        mediaUrl: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editArtistId, setEditArtistId] = useState<number | null>(null);

    // 아티스트 목록 가져오기
    const fetchArtists = async () => {
        try {
            const response = await axios.get("/api/artists");
            setArtists(response.data);
        } catch (error) {
            console.error("아티스트 조회 실패:", error);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    // 입력 필드 변경 처리
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 아티스트 등록
    const addArtist = async () => {
        const token = localStorage.getItem('token');

        try {
            await axios.post("/api/admin/artist", formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰 추가
                    },
                }
            );
            fetchArtists();
            resetForm();
        } catch (error) {
            console.error("아티스트 등록 실패:", error);
        }
    };

    // 아티스트 수정
    const updateArtist = async () => {
        if (editArtistId === null) return;

        // JWT 토큰 가져오기 (예: 로컬 스토리지 또는 쿠키에서)
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `/api/admin/artists/${editArtistId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰 추가
                    },
                }
            );
            fetchArtists();
            resetForm();
        } catch (error) {
            console.error("아티스트 수정 실패:", error);
        }
    };

    // 수정 모드 진입
    const startEditing = (artist: any) => {
        setIsEditing(true);
        setEditArtistId(artist.artistId);
        setFormData({
            mbid: artist.mbid,
            name: artist.name,
            krName: artist.krName,
            imgUrl: artist.imgUrl,
            snsUrl: artist.snsUrl,
            mediaUrl: artist.mediaUrl,
        });
    };

    // 수정 모드 취소
    const cancelEditing = () => {
        resetForm();
    };

    // 폼 초기화
    const resetForm = () => {
        setIsEditing(false);
        setEditArtistId(null);
        setFormData({
            mbid: "",
            name: "",
            krName: "",
            imgUrl: "",
            snsUrl: "",
            mediaUrl: "",
        });
    };

    // 아티스트 삭제
    const deleteArtist = async (id: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        // JWT 토큰 가져오기 (예: 로컬 스토리지 또는 쿠키에서)
        const token = localStorage.getItem('token');

        try {
            await axios.delete(
                `/api/admin/artists/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰 추가
                    },
                }
            );
            fetchArtists();
        } catch (error) {
            console.error("아티스트 삭제 실패:", error);
        }
    };


    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">아티스트 관리</h2>
            <div className="mb-4">
                <input
                    type="text"
                    name="mbid"
                    value={formData.mbid}
                    placeholder="MBID"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="이름"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="krName"
                    value={formData.krName}
                    placeholder="한글 이름"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="imgUrl"
                    value={formData.imgUrl}
                    placeholder="이미지 URL"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="snsUrl"
                    value={formData.snsUrl}
                    placeholder="SNS URL"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="mediaUrl"
                    value={formData.mediaUrl}
                    placeholder="미디어 URL"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <div className="flex space-x-2">
                    <button
                        onClick={isEditing ? updateArtist : addArtist}
                        className={`${
                            isEditing ? "bg-yellow-500" : "bg-blue-500"
                        } text-white px-4 py-2`}
                    >
                        {isEditing ? "수정" : "등록"}
                    </button>
                    {isEditing && (
                        <button
                            onClick={cancelEditing}
                            className="bg-gray-500 text-white px-4 py-2"
                        >
                            취소
                        </button>
                    )}
                </div>
            </div>
            <table className="w-full border-collapse border">
                <thead>
                <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">MBID</th>
                    <th className="border px-4 py-2">이름</th>
                    <th className="border px-4 py-2">한글 이름</th>
                    <th className="border px-4 py-2">수정</th>
                    <th className="border px-4 py-2">삭제</th>
                </tr>
                </thead>
                <tbody>
                {artists.map((artist: any) => (
                    <tr key={artist.artistId}>
                        <td className="border px-4 py-2">{artist.artistId}</td>
                        <td className="border px-4 py-2">{artist.mbid}</td>
                        <td className="border px-4 py-2">{artist.name}</td>
                        <td className="border px-4 py-2">{artist.krName}</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => startEditing(artist)}
                                className="bg-green-500 text-white px-2 py-1"
                            >
                                수정
                            </button>
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => deleteArtist(artist.artistId)}
                                className="bg-red-500 text-white px-2 py-1"
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ArtistCrud;