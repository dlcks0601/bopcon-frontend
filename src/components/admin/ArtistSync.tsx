import { useState } from "react";
import axios from "axios";

const ArtistSync = () => {
    const [mbid, setMbid] = useState("");

    const syncArtistData = async () => {
        // JWT 토큰 가져오기 (예: 로컬 스토리지 또는 쿠키에서)
        const token = localStorage.getItem('token');

        try {
            await axios.post(
                `/api/admin/artists/${mbid}/sync`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰 추가
                    },
                }
            );
            alert("데이터 동기화 성공");
            setMbid("");
        } catch (error) {
            console.error("데이터 동기화 실패:", error);
        }
    };


    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">아티스트 데이터 동기화</h2>
            <input
                type="text"
                value={mbid}
                onChange={(e) => setMbid(e.target.value)}
                placeholder="MBID 입력"
                className="border p-2 mb-2 w-full"
            />
            <button onClick={syncArtistData} className="bg-green-500 text-white px-4 py-2">
                동기화 요청
            </button>
        </div>
    );
};

export default ArtistSync;