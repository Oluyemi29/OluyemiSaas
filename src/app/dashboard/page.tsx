import { Button } from "@/components/ui/button";
import React from "react";
import { getNotes } from "../api/action";
import Link from "next/link";
import { Edit, File } from "lucide-react";
import { Card } from "@/components/ui/card";
import EditSubmitButton from "@/components/EditSubmitButton";

type NoteProps = {
  title: string;
  id: string;
  description: string;
  createdAt: Date;
};

const page = async () => {
  const notes = await getNotes();

  return (
    <div className="w-full ">
      <div className="w-full flex items-center px-5 justify-between">
        <div className="">
          <h1 className="text-xl md:text-3xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create notes
          </p>
        </div>
        {notes?.Subscription?.status === "active" ? (
          <>
            <Link href={"/dashboard/new"}>
              <Button>Create a New Note</Button>
            </Link>
          </>
        ) : (
          <Link href={"/dashboard/billing"}>
            <Button>Make Subscription</Button>
          </Link>
        )}
      </div>
      {notes?.note.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex w-20 h-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h1 className="mt-6 text-xl font-semibold">
            You do not have any note created
          </h1>
          <p className="mt-2 mb-8 text-medium leading-6 text-muted-foreground max-w-sm mx-auto">
            You Currently do not have any note, pls create some so that u can
            see them right here
          </p>
          {notes.Subscription?.status === "active" ? (
            <Link href={"/dashboard/new"}>
              <Button>Create a New Note</Button>
            </Link>
          ) : (
            <Link href={"/dashboard/billing"}>
              <Button>Make Subscription</Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col mt-4 gap-4">
            {notes?.note.map((note: NoteProps, i: number) => {
              return (
                <Card className="flex items-center justify-between p-4" key={i}>
                  <div>
                    <h1 className="font-semibold text-xl text-primary">
                      {note.title}
                    </h1>
                    <p>
                      {new Intl.DateTimeFormat("en-us", {
                        dateStyle: "full",
                      }).format(new Date(note.createdAt))}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/dashboard/new/${note.id}`}>
                      <Button variant={"outline"} size={"icon"}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <EditSubmitButton id={note.id as string} />
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
