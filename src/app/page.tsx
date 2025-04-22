"use client";

import AddHabitForm from "@/components/AddHabitForm";
import HabitList from "@/components/HabitList";
import HabitStats from "@/components/HabitStats";
import { Habit } from "@/types/habit";
import { useEffect, useState } from "react";

export default function Page() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const [lastResetDate, setLastResetDate] = useState<string>(() =>
    new Date().toLocaleDateString()
  );

  useEffect(() => {
    const today = new Date().toLocaleDateString();

    if (lastResetDate !== today) {
      setHabits((prev) =>
        prev.map((habit) => ({
          ...habit,
          isDoneToday: false,
        }))
      );
      setLastResetDate(today);
    }
  }, [lastResetDate]);

  const handleAddHabit = (name: string) => {
    const newHabit: Habit = {
      id: String(Date.now()),
      name,
      doneCount: 0,
      isDoneToday: false,
    };

    setHabits((prev) => [...prev, newHabit]);
  };

  const handleToggleHabit = (id: string) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          const alreadyDone = habit.isDoneToday;

          return {
            ...habit,
            isDoneToday: !alreadyDone,
            doneCount: alreadyDone ? habit.doneCount - 1 : habit.doneCount + 1,
          };
        }

        return habit;
      })
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
  <h1 className="text-3xl font-semibold mb-8 text-gray-900">Contador de Hábitos</h1>
  
  <AddHabitForm onAddHabit={handleAddHabit} />
  <HabitStats habits={habits} />
  <HabitList habits={habits} onToggleHabit={handleToggleHabit} />
</main>
  );
}
