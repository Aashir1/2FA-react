import { PlusIcon } from "lucide-react";
import { Link, useRoute } from "wouter";

export function Header() {
  const [createEntryRoute] = useRoute("/create");

  return (
    <header className="flex h-20 items-center justify-between bg-slate-900 px-10">
      <Link href="/" className="text-2xl font-semibold text-white">
        REACT AUTHENTICATOR
      </Link>
      {!createEntryRoute ? (
        <Link
          href="/create"
          className="flex items-center rounded-md px-5 py-2.5 text-slate-300 transition-colors hover:bg-slate-800"
        >
          Add account <PlusIcon className="inline text-slate-300" size="16" />
        </Link>
      ) : null}
    </header>
  );
}
