"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchTodos();
    }
  }, [status, router]);

  async function fetchTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  }

  async function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    const todo = await res.json();
    setTodos((prev) => [...prev, todo]);
    setNewTodo("");
  }

  async function handleDeleteTodo(id: string) {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Welcome, {session?.user?.name}!
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <span>{todo.title}</span>
            <div>
            <button
                onClick={() => router.push(`/edit/${todo.id}`)}
                className="text-blue-500 mr-2"
                >
                ✏️
                </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
