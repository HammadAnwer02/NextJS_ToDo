"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditTodo() {
  const { id } = useParams(); // Gets the todo ID from the URL
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if unauthenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Once authenticated, fetch the todo details
    if (status === "authenticated") {
      fetch(`/api/todos/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching todo:", err);
          setLoading(false);
        });
    }
  }, [status, id, router]);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      console.error("Failed to update todo");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
