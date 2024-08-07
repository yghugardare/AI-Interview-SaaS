"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAImodel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

type InterviewData = {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string | null;
  mockId: string;
};
type RecordAnswerSectionProps = {
  interviewData: InterviewData | null;
  mockInterviewQuestion: any[] | null; // Replace 'any' with the actual type if known
  activeQuestionIndex: number;
};
function RecordAnswerSection({
  interviewData,
  mockInterviewQuestion,
  activeQuestionIndex,
}: RecordAnswerSectionProps) {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { user } = useUser();
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  useEffect(() => {
    results.map((result) => {
      if (typeof result !== "string") {
        // Type guard
        setUserAnswer((prevAnswer) => prevAnswer + result.transcript);
      }
    });
  }, [results]);
  // useEffect(()=>{
  //   if(!isRecording&&userAnswer?.length>10)
  //   {
  //     UpdateUserAnswer();
  //   }
  // },[userAnswer])

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText(); // Ensure to await the stop function
      if (userAnswer.length > 10) {
        // Check if userAnswer is valid before updating
        await UpdateUserAnswer();
      }
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt = `Question: ${
      mockInterviewQuestion
        ? mockInterviewQuestion[activeQuestionIndex]?.question
        : "No question available"
    }, 
    User Answer: ${userAnswer}, 
    Based on the question and user answer, please provide a rating for the answer (0 to 5, with 0 being an invalid response) and feedback on areas of improvement (if any) in just 3 to 5 lines. 
    Format the response in JSON with "rating" and "feedback" fields.`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const JsonFeedbackResp = JSON.parse(mockJsonResp);
    console.log(JsonFeedbackResp);
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId || "",
      question: mockInterviewQuestion
        ? mockInterviewQuestion[activeQuestionIndex]?.question
        : "",
      correctAns: mockInterviewQuestion
        ? mockInterviewQuestion[activeQuestionIndex]?.answer
        : "",
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

      if(resp){
        toast({
          title: "Success",
          description: "User answer recorded successfully",
        });
        setUserAnswer("");
        setResults([]);
      }
      setResults([]);

    setLoading(false);
  };
  if (typeof window === undefined) return null;
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          alt="web-cam"
          priority={true}
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
