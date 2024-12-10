import React, { useState } from "react";
import ArtistTab from "../../components/admin/ArtistTab";
import ConcertTab from "../../components/admin/ConcertTab";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState<"artist" | "concert">("artist");

    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="flex justify-center space-x-4 border-b py-4 bg-white shadow">
                <button
                    className={`px-4 py-2 ${
                        activeTab === "artist" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("artist")}
                >
                    아티스트 관리
                </button>
                <button
                    className={`px-4 py-2 ${
                        activeTab === "concert" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("concert")}
                >
                    콘서트 관리
                </button>
            </div>
            <div className="p-4">
                {activeTab === "artist" && <ArtistTab />}
                {activeTab === "concert" && <ConcertTab />}
            </div>
        </div>
    );
};

export default AdminPage;