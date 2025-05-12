"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState, Suspense } from "react";

// Dynamically import MessageCard with loading fallback
const MessageCard = dynamic(() => import("@/components/MessageCard"), {
  loading: () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-32 rounded-lg w-full"></div>
    </div>
  ),
  ssr: false,
});

// Separate the message list into its own component for better performance
const MessagesList = React.memo(
  ({
    messages,
    onDelete,
  }: {
    messages: Message[];
    onDelete: (id: string) => void;
  }) => {
    if (messages.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No messages yet
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Share your profile link with others to start receiving anonymous
            messages and feedback
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {messages.map((message) => (
          <Suspense
            key={message._id}
            fallback={
              <div className="animate-pulse">
                <div className="bg-gray-200 h-32 rounded-lg w-full"></div>
              </div>
            }
          >
            <MessageCard message={message} onMessageDelete={onDelete} />
          </Suspense>
        ))}
      </div>
    );
  }
);
MessagesList.displayName = "MessagesList";

function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(true); // Initially set to true
  const [acceptMessages, setAcceptMessages] = useState<boolean | null>(null); // Use null for initial state
  const { toast } = useToast();
  const { data: session, status } = useSession(); // Add status to track authentication state

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setAcceptMessages(response.data.isAcceptingMessage ?? null);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false); // Set to false after fetching
    }
  }, [toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsloading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing Latest Messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsloading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (session?.user) {
      fetchMessages();
      fetchAcceptMessage();
    }
  }, [fetchAcceptMessage, fetchMessages, session?.user]); // Handle switch change
  const handleSwitchChange = async (value: boolean) => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: value,
      });
      setAcceptMessages(value);
      toast({
        title: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to update message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };
  const userName = session?.user.userName as unknown as User;

  // Show loading state when authentication is being checked
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">
            Loading your dashboard...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we set things up
          </p>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 ">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-48 bg-blue-600 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-600 opacity-90"></div>{" "}
            <Image
              src="/static/thinking2.jpg"
              alt="Thinking"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
              width={500}
              height={500}
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <div className="relative z-10 text-center px-6">
              <h1 className="text-white text-3xl font-bold leading-tight">
                Dashboard Access
              </h1>
              <p className="text-blue-100 mt-2">
                Connect to your Mystery Message account
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Authentication Required
              </h2>{" "}
              <p className="text-gray-600 mt-2">
                Please sign in or create an account to access your dashboard
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/sign-in">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </Button>
              </Link>
              <div className="text-center">
                <p className="text-gray-600">Don&apos;t have an account?</p>
                <Link
                  href="/sign-up"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-1"
                >
                  Create an account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>
            Mystery Message - Share anonymous feedback with your friends and
            colleagues
          </p>
        </div>
      </div>
    );
  }
  if (userName) {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const profileUrl = `${baseUrl}/u/${userName}`;
    const copyToClipboard = () => {
      navigator.clipboard.writeText(profileUrl);
      toast({
        title: "URL copied",
        description: "Profile URL copied to clipboard",
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-24 relative">
              <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-tl-3xl"></div>
            </div>

            <div className="px-6 pb-6 -mt-10 relative ">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-indigo-600 text-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold">
                      {userName.toString().charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Welcome,{" "}
                      {typeof userName === "string" ? userName : "User"}
                    </h1>
                    <p className="text-gray-500">
                      Manage your mystery messages
                    </p>
                  </div>
                </div>

                <div className="md:self-center">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchMessages(true);
                    }}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCcw className="h-4 w-4 mr-2" />
                    )}
                    Refresh Messages
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar Section */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Link Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Your Mystery Link
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Share this unique link to receive anonymous messages:
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-50 border border-gray-200 rounded-l-md px-3 py-2 flex-grow overflow-hidden">
                    <p className="text-gray-700 truncate text-sm">
                      {profileUrl}
                    </p>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    className="rounded-l-none bg-blue-600 hover:bg-blue-700"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  When someone visits this link, they can send you anonymous
                  feedback
                </p>
              </div>

              {/* Message Settings Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Message Settings
                </h2>{" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <div>
                    <p className="text-gray-700 font-medium">Accept Messages</p>
                    <p className="text-xs text-gray-500">
                      {acceptMessages === null
                        ? "Loading message settings..."
                        : acceptMessages
                        ? "You are currently receiving messages"
                        : "You are not accepting new messages"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isSwitchLoading ? (
                      <div className="h-6 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      </div>
                    ) : (
                      <div className="relative">
                        {" "}
                        <div
                          className={`absolute -inset-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full opacity-70 blur-sm transition-opacity duration-300 ${
                            acceptMessages === true ? "opacity-70" : "opacity-0"
                          }`}
                        ></div>{" "}
                        <Switch
                          checked={acceptMessages === true}
                          onCheckedChange={handleSwitchChange}
                          disabled={isSwitchLoading || acceptMessages === null}
                          className="z-10 relative"
                        />
                      </div>
                    )}{" "}
                    <span
                      className={`ml-2 text-xs font-medium transition-colors duration-300 ${
                        acceptMessages === null
                          ? "text-gray-400"
                          : acceptMessages === true
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {acceptMessages === null
                        ? "..."
                        : acceptMessages === true
                        ? "ON"
                        : "OFF"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Section */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Your Messages
                  </h2>
                  <div className="text-sm text-gray-500">
                    {messages.length}{" "}
                    {messages.length === 1 ? "message" : "messages"} total
                  </div>
                </div>

                <Separator className="mb-6" />

                <MessagesList
                  messages={messages}
                  onDelete={handleDeleteMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
