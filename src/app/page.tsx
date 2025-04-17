"use client";

import AddHabitForm from "@/components/AddHabitForm";
import HabitList from "@/components/HabitList";
import { Habit } from "@/types/habit";
import { useState } from "react";

export default function Page() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleAddHabit = (name: string) => {
    const newHabit: Habit = {
      id: Number(Date.now()),
      name,
      doneCount: 0,
      isDoneToday: false,
    };

    setHabits((prev) => [...prev, newHabit]);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <AddHabitForm onAddHabit={handleAddHabit} />
      <HabitList habits={habits} />
    </main>
  );
}
