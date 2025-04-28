"use client";

import { useState } from "react";
import AddHabitForm from "@/components/AddHabitForm";
import HabitList from "@/components/HabitList";
import HabitStats from "@/components/HabitStats";
import { HabitListGroup } from "@/types/habit";
import ConfirmModal from "@/components/ConfirmModal";
import { Toaster, toast } from "sonner";

export default function Page() {
  const [habitLists, setHabitLists] = useState<HabitListGroup[]>([]);
  const [activeListId, setActiveListId] = useState<string>("");

  // modal states

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => {});

  const handleAddList = (name: string) => {
    const newList: HabitListGroup = {
      id: String(Date.now()),
      name,
      habits: [],
    };

    setHabitLists((prev) => [...prev, newList]);
    setActiveListId(newList.id); // já seleciona a nova lista
  };

  const handleAddHabit = (habitName: string) => {
    setHabitLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              habits: [
                ...list.habits,
                {
                  id: String(Date.now()),
                  name: habitName,
                  doneCount: 0,
                  isDoneToday: false,
                },
              ],
            }
          : list
      )
    );
  };

  const handleToggleHabit = (habitId: string) => {
    setHabitLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              habits: list.habits.map((habit) =>
                habit.id === habitId
                  ? {
                      ...habit,
                      isDoneToday: !habit.isDoneToday,
                      doneCount: habit.isDoneToday
                        ? habit.doneCount - 1
                        : habit.doneCount + 1,
                    }
                  : habit
              ),
            }
          : list
      )
    );
  };

  const handleDeleteList = (listId: string) => {
    setModalTitle("Excluir Lista");
    setModalDescription("Tem certeza que deseja excluir esta lista?");
    setShowModal(true);

    setOnConfirmAction(() => {
      return () => {
        setHabitLists((prev) => prev.filter((list) => list.id !== listId));
        if (activeListId === listId) {
          setActiveListId("");
          toast.success("Lista excluída com sucesso!");
        }
        setShowModal(false);
      };
    });
  };

  const handleDeleteHabit = (habitId: string) => {
    setModalTitle("Excluir Hábito");
    setModalDescription("Tem certeza que deseja excluir este hábito?");
    setShowModal(true);

    setOnConfirmAction(() => {
      return () => {
        setHabitLists((prev) =>
          prev.map((list) =>
            list.id === activeListId
              ? {
                  ...list,
                  habits: list.habits.filter((habit) => habit.id !== habitId),
                }
              : list
          )
        );
        setShowModal(false);
        toast.success("Hábito excluído com sucesso!");
      };
    });
  };

  const activeList = habitLists.find((list) => list.id === activeListId);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col heigh items-center px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">
        Contador de Hábitos
      </h1>

      <div className="flex gap-2 flex-wrap justify-center mb-6">
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem(
                "listName"
              ) as HTMLInputElement;
              const name = input.value.trim();
              if (name) {
                handleAddList(name);
                input.value = "";
              }
            }}
            className="flex gap-2 items-center"
          >
            <input
              type="text"
              name="listName"
              placeholder="Nome da nova lista (ex: Rotina Matinal)"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-400 bg-white"
              required
            />

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Criar Lista
            </button>
          </form>
        </div>

        <div className="flex gap-2 flex-wrap justify-center items-center mb-6">
          {habitLists.map((list) => (
            <div
              key={list.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                activeListId === list.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-gray-100 transition-all duration-200`}
            >
              {/* Botão de selecionar lista */}
              <button
                onClick={() => setActiveListId(list.id)}
                className="flex-1 text-left"
              >
                {list.name}
              </button>

              {/* Botão de excluir lista */}
              <button
                onClick={() => handleDeleteList(list.id)}
                className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeList && (
        <>
          <AddHabitForm onAddHabit={handleAddHabit} />

          <HabitStats habits={activeList.habits} />
          <HabitList
            habits={activeList.habits}
            onToggleHabit={handleToggleHabit}
            onDeleteHabit={handleDeleteHabit}
          />
          <ConfirmModal
            isOpen={showModal}
            title={modalTitle}
            description={modalDescription}
            onConfirm={onConfirmAction}
            onCancel={() => setShowModal(false)}
          />
        </>
      )}

      {habitLists.length === 0 && (
        <div className="text-center text-black mt-10">
          <p className="text-lg font-semibold">Nenhuma lista criada ainda 😢</p>
          <p className="text-sm">Comece criando sua primeira lista acima!</p>
        </div>
      )}
      <Toaster richColors position="top-center" />
    </main>
  );
}
