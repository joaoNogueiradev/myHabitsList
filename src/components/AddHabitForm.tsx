"use client";

import React, { useState } from "react";

type Props = {
  onAddHabit: (name: string) => void;
};

const AddHabitForm = ({ onAddHabit }: Props) => {
  const [habitName, setHabitName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!habitName.trim()) {
      alert("Digite o nome de um hábito");
      return;
    }
    onAddHabit(habitName.trim());

    setHabitName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Nome do Hábito
        </label>

        <input
          id="habit"
          type="text"
          placeholder="Digite um hábito"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Adicionar Hábito
        </button>
      </div>
    </form>
  );
};

export default AddHabitForm;
