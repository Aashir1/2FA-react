import { Copy } from "lucide-react";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { ProgressCircle } from "~/components/progress-circle";
import { AuthCodeEntry } from "~/store/types";
import { formatCode } from "~/utils/format-code";

export const AuthCodeEntryListItem: FC<{ item: AuthCodeEntry }> = observer(
  ({ item }) => {
    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(item.code.toString());
      toast.success("Code copied to clipboard.");
    };

    return (
      <li className="my-1.5 rounded-md bg-slate-100 p-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col font-medium uppercase">
            <p className="text-sm">{item.name}</p>
            <div>
              <p className="inline-block font-mono text-5xl">
                {formatCode(item.code)}
              </p>
              <button className="pl-2" onClick={copyToClipboard}>
                <Copy size="16" className="text-slate-400" />
              </button>
            </div>
          </div>
          <div>
            <ProgressCircle
              percentage={Math.ceil(((60 - item.expireTime) * 100) / 60)}
              text={item.expireTime.toString()}
              fontSize={12}
              radius={15}
            />
          </div>
        </div>
      </li>
    );
  },
);
