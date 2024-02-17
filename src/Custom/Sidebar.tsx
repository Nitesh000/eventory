import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { data } from "@/data";
import { FileTree } from "./FileTree";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const [tree, setTree] = useState(data);

  return (
    <div className="w-1/5 h-auto bg-black dark:text-white border-2 border-[#d175b6] p-2 rounded-xl">
      <div className="flex flex-col justify-start items-center h-full">
        {tree.map((item, i) => (
          <>
            <div
              key={item.name}
              className={cn(
                "flex justify-between items-center w-full  px-2 py-3 rounded-xl text-[#d175b6]",
                item.isSelected && "border-2 border-[#d175b6]",
              )}
            >
              {item?.name}
              {item?.type === "folder" && (
                <>
                  <Checkbox
                    checked={item.isExapanded}
                    onCheckedChange={(value) => !value}
                    className={cn("hidden")}
                  ></Checkbox>
                  {item.isExapanded ? (
                    <ChevronUpIcon
                      onClick={() =>
                        setTree((prev) => {
                          console.log("click up");
                          const copy = [...prev];
                          copy[i].isExapanded = !copy[i].isExapanded;
                          console.log(copy);
                          return copy;
                        })
                      }
                      className="cursor-pointer"
                    />
                  ) : (
                    <ChevronDownIcon
                      onClick={() => {
                        console.log("click down");
                        setTree((prev) => {
                          const copy = [...prev];
                          copy[i].isExapanded = !copy[i].isExapanded;
                          console.log(copy);
                          return copy;
                        });
                      }}
                      className="cursor-pointer"
                    />
                  )}
                </>
              )}
            </div>
            {item?.isExapanded && <FileTree data={item?.children} />}
          </>
        ))}
      </div>
      <div className="mt-20">
        <Button className={cn("w-full border-none bg-black")} variant="outline">
          <ExitIcon className="mr-3 w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};
