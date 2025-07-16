import Form from "./Form";
import Logo from "../ui/Logo";

export default function NavBar({ children }) {
  return (
    <header>
      <div className="text-3xl font-semibold text-[#a9aebb] flex justify-center items-center mb-3">
        <Logo />
        Multiple Timer
      </div>
      {children}
    </header>
  );
}
