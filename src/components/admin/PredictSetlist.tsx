import { useState } from "react";
import axios from "axios";

const PredictSetlist = () => {
    const [artistId, setArtistId] = useState("");
    const [newConcertId, setNewConcertId] = useState("");

    const predictSetlist = async () => {
        // JWT 토큰 가져오기 (예: 로컬 스토리지에서)
        const token = localStorage.getItem("token");

        try {
            await axios.post(
                `/api/admin/artists/${artistId}/predict-setlist`,
                null,
                {
                    params: { newConcertId },
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰 추가
                    },
                }
            );
            alert("예상 셋리스트 생성 성공");
        } catch (error) {
            console.error("예상 셋리스트 생성 실패:", error);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">예상 셋리스트 생성</h2>
            <input
                type="text"
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
                placeholder="아티스트 ID"
                className="border p-2 mb-2 w-full"
            />
            <input
                type="text"
                value={newConcertId}
                onChange={(e) => setNewConcertId(e.target.value)}
                placeholder="콘서트 ID"
                className="border p-2 mb-2 w-full"
            />
            <button onClick={predictSetlist} className="bg-green-500 text-white px-4 py-2">
                생성 요청
            </button>
        </div>
    );
};

export default PredictSetlist;