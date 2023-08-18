import { observer } from "mobx-react-lite";
import { AuthCodesObservable } from "~/store/auth-codes";
import { AuthCodeEntryListItem } from "./components/auth-code-entry-list-item";
import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Home = observer(() => {

  const moveItem = (fromItem: any, toItem: any) => {
    AuthCodesObservable.moveItem(fromItem, toItem)
  }

  return (
    <div className="mt-5 flex flex-col px-10">
      <h1 className="mx-auto my-10 text-left text-3xl font-semibold uppercase">
        Accounts
      </h1>
      <DndProvider backend={HTML5Backend}>
        <ul className="mx-auto flex w-full flex-1 flex-col sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
          {AuthCodesObservable.entries.map((entry, index) => (
            <AuthCodeEntryListItem item={entry} key={entry.id} index={index} moveItem={moveItem} />
          ))}
        </ul>
      </DndProvider>
    </div>
  );
});
