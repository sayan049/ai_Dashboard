"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  PencilIcon,
  PlusIcon,
  XIcon,
  BotIcon as RobotIcon,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from DummyJSON API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/users?limit=4");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        // Transform the data to match our avatar structure
        const transformedData = data.users.map((user, index) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          type:
            index === 0
              ? "Professional Avatar"
              : index === 1
              ? "Casual Avatar"
              : "Creative Avatar",
          image: user.image,
          number: Math.floor(Math.random() * 5) + 1, // Random number between 1-5
        }));

        setAvatars(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load avatars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const profileImage = avatars[0]?.image;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm my-4">
        {/* Header */}
        <header className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="text-indigo-600">
              <RobotIcon className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              AI Avatar Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Welcome back, Sayan!</span>
            <div className="h-8 w-8 rounded-full overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Your AI Avatars
            </h2>
            <p className="text-gray-600 mt-1">
              Manage and customize your digital personas
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center animate-pulse"
                >
                  <div className="bg-gray-200 h-24 w-24 rounded-full mb-4"></div>
                  <div className="bg-gray-200 h-5 w-32 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded mb-4"></div>
                  <div className="bg-gray-200 h-10 w-32 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Avatar Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avatars.slice(1, 4).map((avatar) => (
                <div
                  key={avatar.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative mb-4">
                    <div className="h-24 w-24 rounded-full overflow-hidden">
                      <Image
                        src={avatar.image || "/placeholder.svg"}
                        alt={avatar.name}
                        width={96}
                        height={96}
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                      {avatar.number}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-800">
                    {avatar.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{avatar.type}</p>
                  <button className="flex items-center gap-2 text-indigo-600 border border-indigo-600 rounded-md px-4 py-2 transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                    <PencilIcon className="h-4 w-4" />
                    <span>Edit Avatar</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 px-4 py-3"
      >
        <PlusIcon className="h-5 w-5" />
        <span>Create New Avatar</span>
      </button>

      {/* Create Avatar Modal with Animation */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Create New Avatar
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 p-1"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <RobotIcon className="h-10 w-10 text-gray-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Avatar Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    placeholder="Enter avatar name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Avatar Type
                  </label>
                  <select
                    id="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <option value="">Select avatar type</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer hover:border-indigo-300">
                    <div className="flex justify-center">
                      <PlusIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors shadow hover:shadow-md">
                Create Avatar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
