"use client";

import { useState, useEffect } from "react";

export default function IndexPage() {
  const [text, setText] = useState("");
  const [aiPercent, setAiPercent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overall");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const checkAiPercent = () => {
    const calculatedPercent = Math.random() * 100; // Example: random percent
    setAiPercent(calculatedPercent.toFixed(2));
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="w-[95%] h-[80%] flex flex-col -mt-8"> {/* Добавлен -mt-8 для поднятия вверх */}
        <div className="flex justify-end">
          <div className="rounded-t-lg flex items-center w-[50%]">
            <div className="flex justify-start space-x-1">
              <button
                className={`px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === "overall"
                    ? "bg-white border-b-2 border-blue-600 text-blue-600 [border-bottom-left-radius:-0.5rem] [border-bottom-right-radius:-0.5rem]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                } focus:outline-none`}
                onClick={() => setActiveTab("overall")}
              >
                Overall
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === "site1"
                    ? "bg-white border-b-2 border-blue-600 text-blue-600 [border-bottom-left-radius:-0.5rem] [border-bottom-right-radius:-0.5rem]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                } focus:outline-none flex items-center`}
                onClick={() => setActiveTab("site1")}
              >
                <img src="https://www.google.com/s2/favicons?sz=64&domain_url=zerogpt.com" alt="ZeroGPT" className="w-4 h-4 mr-2" />
                ZeroGPT
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === "site2"
                    ? "bg-white border-b-2 border-blue-600 text-blue-600 [border-bottom-left-radius:-0.5rem] [border-bottom-right-radius:-0.5rem]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                } focus:outline-none flex items-center`}
                onClick={() => setActiveTab("site2")}
              >
                <img src="https://www.google.com/s2/favicons?sz=64&domain_url=quillbot.com" alt="QuillBot" className="w-4 h-4 mr-2" />
                QuillBot
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === "site3"
                    ? "bg-white border-b-2 border-blue-600 text-blue-600 [border-bottom-left-radius:-0.5rem] [border-bottom-right-radius:-0.5rem]"
                    : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                } focus:outline-none flex items-center`}
                onClick={() => setActiveTab("site3")}
              >
                <img src="https://www.google.com/s2/favicons?sz=64&domain_url=grammarly.com" alt="Grammarly" className="w-4 h-4 mr-2" />
                Grammarly
              </button>
            </div>
          </div>
        </div>

        {/* Main content section */}
        <div className="h-[100%] flex bg-white dark:bg-gray-800 rounded-b-lg border border-gray-300 rounded-lg shadow-lg">
          {/* Left section - Textarea */}
          <div className="flex flex-col w-[50%] space-y-4 relative border-r border-gray-300 dark:border-gray-600 p-4">
            <textarea
              className="w-full h-[90%] p-3 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white resize-none"
              placeholder="To analyze paste your text here..."
              value={text}
              onChange={handleTextChange}
            />
            <button
              className="absolute bottom-4 right-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={checkAiPercent}
            >
              Detect AI
            </button>
          </div>

          {/* Right section - Results */}
          <div className="w-[50%] p-6 dark:bg-gray-700">
            <div>
              {activeTab === "overall" && (
                <div className="text-lg font-medium text-gray-800 dark:text-white">
                  {aiPercent !== null ? `Overall AI Percent: ${aiPercent}%` : "No analysis results yet."}
                </div>
              )}
              {activeTab === "site1" && (
                <div className="text-lg font-medium text-gray-800 dark:text-white">
                  {aiPercent !== null ? `AI Percent from Site 1: ${aiPercent}%` : "No analysis results yet."}
                </div>
              )}
              {activeTab === "site2" && (
                <div className="text-lg font-medium text-gray-800 dark:text-white">
                  {aiPercent !== null ? `AI Percent from Site 2: ${aiPercent}%` : "No analysis results yet."}
                </div>
              )}
              {activeTab === "site3" && (
                <div className="text-lg font-medium text-gray-800 dark:text-white">
                  {aiPercent !== null ? `AI Percent from Site 3: ${aiPercent}%` : "No analysis results yet."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}