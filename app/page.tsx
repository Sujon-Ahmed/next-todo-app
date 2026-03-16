"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/todo";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // add todo
  const addTodo = () => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setText("");
  };

  // delete todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // toggle todo
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // filtered todo
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase()),
  );

  // completed count
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="flex items-center gap-2 text-3xl font-bold mb-6">
        <FaFile />
        Todo App
      </h1>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Write task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <div className="py-3">
        <Input
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="text-sm text-gray-500 py-1 flex items-end justify-end">
          Completed {completedCount} of {todos.length} tasks
        </p>
      </div>
      <div className="space-y-3">
        {filteredTodos.map((todo) => (
          <Card key={todo.id}>
            <CardContent className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={todo.completed ? "line-through text-gray-400" : ""}
                >
                  {todo.text}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 size={18} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
