"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FormEvent, useState } from "react";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [jobPosition, setJobPosition] = useState<string>("");
    const [jobDesc, setJobDesc] = useState<string>("");
    const [jobExperience, setJobExperience] = useState<string>("");
    const handleSubmit = (e:FormEvent)=>{
        alert("HI")
        e.preventDefault();
    }

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      >
        <h2 className="text-lg font-semibold text-center">+ Add New </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more About your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={(e:FormEvent) => handleSubmit(e)}>
                <div className="">
                  <h2 className="text-md">
                    Add details about your job position/role , job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-2">
                    <label htmlFor="">Job Role/Position</label>
                    <Input placeholder="Ex. Web Developer"  required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setJobPosition(e.target.value)}}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Job Description/ Tech Stack</label>
                    <Textarea placeholder="ReactJs, ExpressJs, NextJs, PostgresSQL" required
                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Years of Experience</label>
                    <Input placeholder="Ex.5" type="number" max={50} required
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-5">
                  <Button
                  type="button"
                    variant={"ghost"}
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Start Interview</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
