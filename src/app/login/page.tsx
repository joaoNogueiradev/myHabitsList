"use client";

const LoginPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Entrar na sua conta</h1>

      <form className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Sua senha"
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6">
        Ainda não tem conta? <a href="/register" className="underline text-black">Cadastre-se</a>
      </p>
    </main>
  );
};

export default LoginPage;
