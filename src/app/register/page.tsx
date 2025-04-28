"use client";

const RegisterPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Criar nova conta</h1>

      <form className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Seu nome"
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Crie uma senha"
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Cadastrar
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6">
        Já tem conta? <a href="/login" className="underline text-black">Entrar</a>
      </p>
    </main>
  );
};

export default RegisterPage;
