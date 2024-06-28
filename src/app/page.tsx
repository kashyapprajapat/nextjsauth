import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">AuthKing 👑</div>
        <div className="text-white">Authentication</div>
      </div>
    </nav>
    <main className="flex flex-1 items-center justify-center container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Welcome to the Authentication Page</h2>
          <p className="text-gray-700">Please log in to access your account and manage your preferences.</p>
        </div>
      </div>
    </main>
    <footer className="bg-gray-800 text-white text-center p-4">
      2024-2025 copyright by Kashyap Prajapati.
    </footer>
  </div>
  );
}
