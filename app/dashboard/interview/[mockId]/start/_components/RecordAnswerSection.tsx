"use client";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

function RecordAnswerSection() {
    const [userAnswer, setUserAnswer] = useState<string>("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  useEffect(()=>{
    results.map(result => {
        if (typeof result !== 'string') { // Type guard
            setUserAnswer(prevAnswer => prevAnswer + result.transcript);
        }
    })
  },[results]);
  function startStopRecording() {}
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          alt="web-cam"
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
      <Button variant="outline" className="my-10" onClick={isRecording?stopSpeechToText:startSpeechToText}>
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
      <Button onClick={()=>console.log(userAnswer)}>
        Show Answer
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
