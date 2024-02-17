import { cn } from "@/lib/utils";
import {
  CornerBottomLeftIcon,
  DividerVerticalIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { NotAssignDialog } from "./NotAssignModal";

interface DataType {
  name: string;
  isSelected: boolean;
  notification: number;
}

interface FileTreeProps {
  data: DataType[] | undefined;
}

export const FileTree = ({ data }: FileTreeProps) => {
  const [open, setIsOpen] = useState(false);
  return (
    <div>
      {data?.map((item, i) => (
        <>
          <div className="flex justify-start items-center">
            <div className="flex relative flex-col justify-center items-center">
              <DividerVerticalIcon
                className={cn(
                  "absolute top-[-50%] left-[10%] p-0 w-5 h-auto",
                  item?.isSelected && "text-[#d175b6]",
                )}
              />
              {i !== 0 && (
                <DividerVerticalIcon
                  className={cn(
                    "absolute top-[-100%] left-[10%] p-0 w-5 h-auto",
                    item?.isSelected && "text-[#d175b6]",
                  )}
                />
              )}
              <CornerBottomLeftIcon
                className={cn(
                  "p-0 ml-2 w-5 h-auto",
                  item?.isSelected && "text-[#d175b6]",
                )}
              />
            </div>
            <div
              onClick={() => {
                // NOTE: add a model doesn't do anything
                setIsOpen(true);
              }}
              className={cn(
                "mt-1 text-sm  px-2 py-1 w-full rounded-md cursor-pointer",
                item?.isSelected && "border-2 border-[#d175b6] text-[#d175b6]",
              )}
            >
              <span className="mr-8">{item.name}</span>
              <span
                className={`${item?.notification == 0 && "invisible"}  ${"text-[#d175b6] bg-white rounded-full px-2 py-1"}`}
              >
                {item?.notification}
              </span>
            </div>
          </div>
        </>
      ))}
      <NotAssignDialog isOpen={open} setIsOpen={setIsOpen} />
    </div>
  );
};
