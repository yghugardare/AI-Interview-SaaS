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
import { chatSession } from "@/utils/GeminiAImodel";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { FormEvent, useState } from "react";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { MockInterview } from "@/utils/schema";
import { useRouter } from "next/navigation";

const interview_question_count = 5;
function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>("");
  const [jsonMockResp, setjsonMockResp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    try {
      e.preventDefault();
      const InputPrompt =
        "Job position: " +
        jobPosition +
        ", Job Description: " +
        jobDesc +
        ", Years of Experience : " +
        jobExperience +
        " , Depends on Job Position, Job Description & Years of Experience give us " +
        interview_question_count +
        " Interview question along with Answer in JSON format, Give us question and answer field on JSON";
      const result = await chatSession.sendMessage(InputPrompt);
      // const text:string = result.response.text();
      const jsonString: string = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      setjsonMockResp(jsonString);
      // console.log(jsonString);
      
      if (!jsonString) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "No respone from Gemini model!!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
      const response = await db
        .insert(MockInterview)
        .values({
          jsonMockResp: jsonString,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress || "",
          createdAt: moment().format("DD-MM-yyyy"),
          mockId: uuidv4(),
        })
        .returning({ mockId: MockInterview.mockId });
        const mId = response[0]?.mockId;
        if(response){
          setOpenDialog(false);
          router.push("/dashboard/interview/"+mId);
        }
        
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      // return;
    } finally {
      setLoading(false);
      return;
    }
  };

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
              <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
                <div className="">
                  <h2 className="text-md">
                    Add details about your job position/role , job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-2">
                    <label htmlFor="">Job Role/Position</label>
                    <Input
                      placeholder="Ex. Web Developer"
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setJobPosition(e.target.value);
                      }}
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Job Description/ Tech Stack</label>
                    <Textarea
                      placeholder="ReactJs, ExpressJs, NextJs, PostgresSQL"
                      required
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setJobDesc(e.target.value)
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Years of Experience</label>
                    <Input
                      placeholder="Ex.5"
                      type="number"
                      max={50}
                      required
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setJobExperience(e.target.value)
                      }
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
                  <Button disabled={loading} type="submit">
                    {loading ? "Generating From AI.." : "Start Interview"}
                  </Button>
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
