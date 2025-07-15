import Form from "./Form";

export default function NavBar({ children }) {
  return (
    <header>
      <div className="text-3xl font-semibold text-[#a9aebb] text-center mb-3">
        ⌛ Multiple Timer
      </div>
      {children}
    </header>
  );
}
