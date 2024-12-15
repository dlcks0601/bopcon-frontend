import  { useState } from "react";
import ConcertCrud from "./ConcertCrud";
import PredictSetlist from "./PredictSetlist";

const ConcertTab = () => {
    const [activeTab, setActiveTab] = useState<"crud" | "predict">("crud");

    return (
        <div className="p-4">
            <div className="flex space-x-4 border-b mb-4">
                <button
                    className={`py-2 px-4 ${
                        activeTab === "crud" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("crud")}
                >
                    콘서트 관리
                </button>
                <button
                    className={`py-2 px-4 ${
                        activeTab === "predict" ? "border-b-2 border-blue-500 text-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("predict")}
                >
                    예상 셋리스트
                </button>
            </div>
            <div>
                {activeTab === "crud" && <ConcertCrud />}
                {activeTab === "predict" && <PredictSetlist />}
            </div>
        </div>
    );
};

export default ConcertTab;