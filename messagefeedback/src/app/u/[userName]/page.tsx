"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";

function MessagePage() {
  const [messages, setMessages] = useState<string[]>([]); // Initialize as an array of strings
  const [loading, setLoading] = useState(true); // State to handle loading
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [sending, setSending] = useState(false);
  const username = useParams().userName;

  function handleClick(message: string) {
    setCurrentMessage(message); // Set the current message to the selected one
  }
  async function handleSendMessage() {
    setSending(true);
    // Send the current message to the server
    try {
      const res = await axios.post("/api/send-messages", {
        content: currentMessage,
        userName: username,
      });
      if (res.data.success) {
        setCurrentMessage("");
        toast(res.data.message);
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
      }
    } catch (error) {
      // Handle any errors  that occur during the request
      toast({
        title: "Failed to send message",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (error as any).response.data.message,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  async function handleSuggestMessages() {
    const newMessages = await fetchMessages(); // Fetch new messages
    if (newMessages) {
      // Append new messages to the existing messages
      setMessages(newMessages);
    }
  }

  async function fetchMessages() {
    try {
      const res = await axios.post("/api/suggest-messages");
      return res.data.data
        .split("||")
        .map((message: string) => message.replace(/'/g, "").trim()); // Clean messages and return them
    } catch (error) {
      return []; // Return an empty array on error
    } finally {
      setLoading(false); // Stop loading once request is complete
    }
  }

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const initialMessages = await fetchMessages();
      setMessages(initialMessages); // Set the initial messages in state
    };
    fetchInitialMessages();
  }, []); // Add an empty dependency array to run useEffect only once

  return (
    <>
      <div className="flex justify-center items-center flex-col w-[100%] mt-3">
        <h1 className="text-3xl font-semibold">Public Profile Link</h1>
      </div>
      <div className="flex items-center px-12 justify-start flex-col mt-2">
        <div className="mt-4">
          <label className="text-sm font-medium">
            Send Anonymous Message to zeeshanmalik
          </label>
          <input
            className="border-2 p-4 w-[100%] mt-2"
            placeholder="Enter your message here"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <div className="flex justify-center items-center rounded-sm">
            <button
              onClick={() => handleSendMessage()}
              className="bg-green-500 items-center rounded-sm text-white p-2 mt-2"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSuggestMessages}
              className="bg-stone-900 items-center rounded-sm text-white p-2 mt-2"
            >
              Suggest new messages
            </button>
            <p className="text-sm mt-2">
              Click on any message below to send it.
            </p>

            <div className="mt-2 border-2">
              <h1 className="text-sm p-2 font-semibold">Messages</h1>

              {loading ? (
                <div className="flex justify-center items-center mb-4">
                  <p>Loading...</p>
                </div>
              ) : (
                <div>
                  {messages.length === 0 ? (
                    <p className="p-4 text-sm">No messages found.</p>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center mb-4"
                      >
                        <button
                          onClick={() => handleClick(message)}
                          className="items-center rounded-sm text-stone-900 p-2 mt-2 border-2 border-stone-100 w-[90%]"
                        >
                          {message} {/* Display cleaned message */}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagePage;
