import { observer } from "mobx-react-lite";
import { AuthCodesObservable } from "~/store/auth-codes";
import { AuthCodeEntryListItem } from "./components/auth-code-entry-list-item";

export const Home = observer(() => {
  return (
    <div className="mt-5 flex flex-col px-10">
      <h1 className="mx-auto my-10 text-left text-3xl font-semibold uppercase">
        Accounts
      </h1>

      <ul className="mx-auto flex w-full flex-1 flex-col sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
        {AuthCodesObservable.entries.map((entry) => (
          <AuthCodeEntryListItem item={entry} key={entry.id} />
        ))}
      </ul>
    </div>
  );
});
