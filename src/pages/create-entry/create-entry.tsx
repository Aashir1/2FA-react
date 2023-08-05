import { FormEventHandler, useState } from "react";
import useLocation from "wouter/use-location";
import { AuthCodesObservable } from "~/store/auth-codes";

export const CreateEntry = () => {
  const [_location, setLocation] = useLocation();
  const [accountName, setAccountName] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (accountName && termsAndConditions) {
      AuthCodesObservable.createEntry({ name: accountName });
      setLocation("/");
    }
  };

  const handleCancel = () => {
    setLocation("/");
  };

  return (
    <div className="mt-5 flex flex-col px-10">
      <h1 className="mx-auto my-10 text-left text-3xl font-semibold uppercase">
        Add Account
      </h1>

      <div className="mx-auto flex w-full flex-1 flex-col sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="account-name" className="font-medium text-slate-900">
            <span className="text-red-500">*</span>Account Name
          </label>
          <input
            type="text"
            name="account-name"
            placeholder="Account Name"
            required
            className="mt-2 rounded-md border border-slate-900 px-4 py-2 shadow-md outline-none"
            onChange={(e) => setAccountName(e.target.value)}
            value={accountName}
          />

          <p className="my-5 text-justify text-slate-400">
            <span className="font-semibold italic text-slate-900">NOTE: </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil id,
            mollitia perferendis consequuntur nesciunt deleniti ad in incidunt
            inventore corporis dolore repellendus quia fugiat sunt explicabo
            praesentium assumenda nemo? Tempore ipsum expedita, animi, soluta
            fugit, quidem aut accusamus possimus ipsam deleniti praesentium
            mollitia ullam et quos iste? Doloremque cupiditate tempora
            voluptatum debitis perferendis vero amet ratione saepe possimus quas
            deleniti, aliquam beatae ab fuga dolorem veritatis officiis.
            Laboriosam ab cum, velit fugit, impedit laudantium numquam saepe et
            nulla voluptate hic.
          </p>

          <div className="flex gap-x-2">
            <input
              type="checkbox"
              required
              onChange={(e) => setTermsAndConditions(e.target.checked)}
              checked={termsAndConditions}
            />
            <p className="font-medium text-slate-900">
              Agree to the Terms & Conditions.
            </p>
          </div>

          <div className="flex justify-end gap-x-3">
            <button
              type="button"
              className="rounded-md px-6 py-2.5 text-slate-700 transition-colors hover:bg-slate-100"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-6 py-2.5 text-slate-100 hover:bg-slate-800"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
