"use client"
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await api.get("/users/hello-world/");
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMessage();
  }, []);

  return <div>{message || "Loading..."}</div>;
}
