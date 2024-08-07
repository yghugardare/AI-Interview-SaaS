"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import {useState,useEffect} from 'react'
import QuestionsSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

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
function Start({params}:InterviewProp) {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null)
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any[]| null >(null)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)

  useEffect(()=>{
    getInterviewDetails();
  },[])


  async function getInterviewDetails() {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.mockId));
    // Sanitize the JSON string to remove bad control characters
    const sanitizedJson = result[0].jsonMockResp.replace(/[\u0000-\u001F\u007F]/g, '');
    const jsonMockResp = JSON.parse(sanitizedJson);
    setMockInterviewQuestion(jsonMockResp)
    console.log(jsonMockResp)
    setInterviewData(result[0]);
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
      <QuestionsSection  mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}/>
      <RecordAnswerSection/>
    </div>
  )
}

export default Start