import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import * as React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import userStore from "@/store/userStore";

function ActionsButtons() {
  const { t } = useTranslation("common");
  const { user } = userStore((state) => state);

  const router = useRouter();

  return (
    <div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <AlignJustify />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                  {!user?.name && (
                    <Button
                      onClick={() => {
                        router.push("/login");
                      }}
                      className="text-lg"
                      variant="ghost"
                    >
                      {t("login")}
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      router.push("/enterprises");
                    }}
                    className="text-lg bg-blue-500 hover:bg-blue-600"
                  >
                    {t("viewEnterprises")}
                  </Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:flex lg:space-x-4">
        {!user?.name && (
          <Button
            onClick={() => {
              router.push("/login");
            }}
            className="text-lg"
            variant="ghost"
          >
            {t("login")}
          </Button>
        )}
        <Button
          onClick={() => {
            router.push("/enterprises");
          }}
          className="text-lg bg-blue-500 hover:bg-blue-600"
        >
          {t("viewEnterprises")}
        </Button>
      </div>
    </div>
  );
}

export default ActionsButtons;
