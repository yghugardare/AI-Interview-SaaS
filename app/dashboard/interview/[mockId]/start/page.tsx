"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useState, useEffect } from "react";
import QuestionsSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type InterviewProp = {
  params: { mockId: string };
};
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
function Start({ params }: InterviewProp) {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    any[] | null
  >(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  async function getInterviewDetails() {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.mockId));
    // Sanitize the JSON string to remove bad control characters
    // console.log(result[0].jsonMockResp)
    const sanitizedJson = result[0].jsonMockResp;
    try {
      console.log("Sanitized JSON before parsing:", sanitizedJson); 
      const jsonMockResp = JSON.parse(sanitizedJson);
      setMockInterviewQuestion(jsonMockResp);
      console.log(jsonMockResp);
    } catch (error) {
      console.error("JSON parsing error:", error);
      console.error("Sanitized JSON:", sanitizedJson); // Log the sanitized JSON for debugging
    }
    setInterviewData(result[0]);
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {mockInterviewQuestion?.length &&
          activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )}
        {mockInterviewQuestion?.length &&
          activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
            <Link
              href={
                "/dashboard/interview/" + interviewData?.mockId + "/feedback"
              }
            >
              <Button>End Interview</Button>
            </Link>
          )}
      </div>
    </>
  );
}

export default Start;
