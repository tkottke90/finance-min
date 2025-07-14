const loginButtonTheme = {
  light: "bg-illuminating-emerald-600 text-white",
  dark: "",
};

function LoginButton() {
  return (
    <a href="/login">
      <button className={`${loginButtonTheme.light} text-xl py-4! px-8!`}>
        Login
      </button>
    </a>
  );
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="w-full text-3xl font-bold text-center">
          Finance Minimum
        </h1>

        <p className="w-full text-center text-sm sm:text-base">
          Minimalistic finance app
        </p>

        <div className="w-full flex gap-4 justify-center sm:flex-row">
          <LoginButton />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
