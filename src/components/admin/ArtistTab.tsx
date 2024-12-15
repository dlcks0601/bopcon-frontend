import  { useState } from "react";
import ArtistCrud from "./ArtistCrud";
import ArtistSync from "./ArtistSync";

const ArtistTab = () => {
    const [activeTab, setActiveTab] = useState<"crud" | "sync">("crud");

    return (
        <div className="p-4">
            <div className="flex space-x-4 border-b mb-4">
                <button
                    className={`py-2 px-4 ${
                        activeTab === "crud" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("crud")}
                >
                    아티스트 관리
                </button>
                <button
                    className={`py-2 px-4 ${
                        activeTab === "sync" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("sync")}
                >
                    데이터 동기화
                </button>
            </div>
            <div>
                {activeTab === "crud" && <ArtistCrud />}
                {activeTab === "sync" && <ArtistSync />}
            </div>
        </div>
    );
};

export default ArtistTab;