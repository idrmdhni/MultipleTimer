export default function Wrapper({ children }) {
  return (
    <main className="mx-0 sm:mx-10 md:mx-30 text-[#a9aebb] bg-[#212a45] rounded-2xl mb-2">
      {children}
    </main>
  );
}
