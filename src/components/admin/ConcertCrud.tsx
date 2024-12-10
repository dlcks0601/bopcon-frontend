import React, { useState, useEffect } from "react";
import axios from "axios";

const ConcertCrud = () => {
    const [concerts, setConcerts] = useState([]);
    const [formData, setFormData] = useState({
        artistId: "",
        title: "",
        subTitle: "",
        startDate: "",
        endDate: "",
        venueName: "",
        cityName: "",
        countryName: "",
        countryCode: "",
        ticketPlatforms: "",
        ticketUrl: "",
        genre: "",
        concertStatus: "UPCOMING",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editConcertId, setEditConcertId] = useState<number | null>(null);

    // 포스터 파일 선택 상태
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // JWT 토큰 가져오기
    const getToken = () => localStorage.getItem('token');

    // 콘서트 목록 가져오기
    const fetchConcerts = async () => {
        try {
            const response = await axios.get("/api/new-concerts", {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            setConcerts(response.data);
        } catch (error) {
            console.error("콘서트 조회 실패:", error);
        }
    };

    useEffect(() => {
        fetchConcerts();
    }, []);

    // 입력 필드 변경 처리
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 파일 선택 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    // 콘서트 등록
    const addConcert = async () => {
        const multipartFormData = new FormData();

        // 콘서트 정보 JSON 문자열
        const concertJsonBlob = new Blob([JSON.stringify(formData)], { type: "application/json" });
        multipartFormData.append("newConcert", concertJsonBlob, "concert.json");
        // 파일 추가
        if (selectedFile) {
            multipartFormData.append("file", selectedFile);
        }

        try {
            await axios.post("/api/admin/new-concert", multipartFormData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            fetchConcerts();
            resetForm();
        } catch (error) {
            console.error("콘서트 등록 실패:", error);
        }
    };

    // 콘서트 수정
    const updateConcert = async () => {
        if (editConcertId === null) return;

        const multipartFormData = new FormData();

        const concertJsonBlob = new Blob([JSON.stringify(formData)], { type: "application/json" });
        multipartFormData.append("newConcert", concertJsonBlob, "concert.json");

        if (selectedFile) {
            multipartFormData.append("file", selectedFile);
        }

        try {
            await axios.put(`/api/admin/new-concert/${editConcertId}`, multipartFormData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            fetchConcerts();
            resetForm();
        } catch (error) {
            console.error("콘서트 수정 실패:", error);
        }
    };

    // 수정 모드 진입
    const startEditing = (concert: any) => {
        setIsEditing(true);
        setEditConcertId(concert.newConcertId);
        setFormData({
            artistId: concert.artistId,
            title: concert.title,
            subTitle: concert.subTitle,
            startDate: concert.startDate,
            endDate: concert.endDate,
            venueName: concert.venueName,
            cityName: concert.cityName,
            countryName: concert.countryName,
            countryCode: concert.countryCode,
            ticketPlatforms: concert.ticketPlatforms,
            ticketUrl: concert.ticketUrl,
            genre: concert.genre,
            concertStatus: concert.concertStatus,
        });
        setSelectedFile(null);
    };

    // 수정 모드 취소
    const cancelEditing = () => {
        resetForm();
    };

    // 폼 초기화
    const resetForm = () => {
        setIsEditing(false);
        setEditConcertId(null);
        setFormData({
            artistId: "",
            title: "",
            subTitle: "",
            startDate: "",
            endDate: "",
            venueName: "",
            cityName: "",
            countryName: "",
            countryCode: "",
            ticketPlatforms: "",
            ticketUrl: "",
            genre: "",
            concertStatus: "UPCOMING",
        });
        setSelectedFile(null);
    };

    // 콘서트 삭제
    const deleteConcert = async (id: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`/api/admin/new-concerts/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            fetchConcerts();
        } catch (error) {
            console.error("콘서트 삭제 실패:", error);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">콘서트 관리</h2>
            <div className="mb-4">
                <input
                    type="text"
                    name="artistId"
                    value={formData.artistId}
                    placeholder="아티스트 ID"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="콘서트 제목"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="subTitle"
                    value={formData.subTitle}
                    placeholder="콘서트 부제"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="venueName"
                    value={formData.venueName}
                    placeholder="공연장 이름"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="cityName"
                    value={formData.cityName}
                    placeholder="도시 이름"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="countryName"
                    value={formData.countryName}
                    placeholder="국가 이름"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="countryCode"
                    value={formData.countryCode}
                    placeholder="국가 코드"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="ticketPlatforms"
                    value={formData.ticketPlatforms}
                    placeholder="티켓 플랫폼"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="ticketUrl"
                    value={formData.ticketUrl}
                    placeholder="티켓 URL"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                {/* posterUrl 대신 파일 업로드 인풋 */}
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    placeholder="장르"
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <select
                    name="concertStatus"
                    value={formData.concertStatus}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                <button
                    onClick={isEditing ? updateConcert : addConcert}
                    className={`${
                        isEditing ? "bg-yellow-500" : "bg-blue-500"
                    } text-white px-4 py-2`}
                >
                    {isEditing ? "수정" : "등록"}
                </button>
                {isEditing && (
                    <button
                        onClick={cancelEditing}
                        className="bg-gray-500 text-white px-4 py-2 ml-2"
                    >
                        취소
                    </button>
                )}
            </div>
            <table className="w-full border-collapse border">
                <thead>
                <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">아티스트 ID</th>
                    <th className="border px-4 py-2">아티스트 이름</th>
                    <th className="border px-4 py-2">시작 날짜</th>
                    <th className="border px-4 py-2">종료 날짜</th>
                    <th className="border px-4 py-2">상태</th>
                    <th className="border px-4 py-2">수정</th>
                    <th className="border px-4 py-2">삭제</th>
                </tr>
                </thead>
                <tbody>
                {concerts.map((concert: any) => (
                    <tr key={concert.newConcertId}>
                        <td className="border px-4 py-2">{concert.newConcertId}</td>
                        <td className="border px-4 py-2">{concert.artistId}</td>
                        <td className="border px-4 py-2">{concert.artistName}</td>
                        <td className="border px-4 py-2">{concert.startDate}</td>
                        <td className="border px-4 py-2">{concert.endDate}</td>
                        <td className="border px-4 py-2">{concert.concertStatus}</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => startEditing(concert)}
                                className="bg-green-500 text-white px-2 py-1"
                            >
                                수정
                            </button>
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => deleteConcert(concert.newConcertId)}
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

export default ConcertCrud;