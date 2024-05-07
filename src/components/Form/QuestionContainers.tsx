/*
QuestionContainter.tsx

Description: Contains all of the question components for use in the forms

TODO: remove the use of context, introduce props to pass events down instead, redundancy is being introduced with question-content 
needing the same functionality
*/
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

import "./QuestionContainers.css";
import LabeledInput from "../LabeledInput/LabeledInput";

export type InputResponse = {
  id: number;
  input: any;
};

export interface BaseQuestionProps extends CoreInformation {
  submitData: (d: InputResponse) => void;
}

export interface CoreInformation {
  id: number;
  title?: string;
  imgRef?: string;
}

export function BooleanQuestion({
  id,
  title,
  submitData,
  imgRef,
}: BaseQuestionProps) {
  return (
    <BaseQuestion
      id={id}
      buttonComponent={BoolButtons}
      buttonProps={{ submitData, id, canProgress: true }}
      title={title}
      imgRef={imgRef}
    ></BaseQuestion>
  );
}

export interface InputQuestionProps<T = string | number>
  extends BaseQuestionProps {
  initialValue: T;
  validator: (d: T) => boolean;
  label?: string;
}

export function InputQuestion<T = string | number>({
  id,
  title,
  initialValue,
  validator,
  submitData,
  imgRef,
  label,
}: InputQuestionProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(
    validator ? validator(inputValue) : true
  );
  return (
    <BaseQuestion
      id={id}
      title={title}
      imgRef={imgRef}
      buttonComponent={SubmitButton}
      buttonProps={{
        submitData,
        canProgress: isValid,
        payload: inputValue,
        id,
      }}
    >
      <LabeledInput
        label={label}
        type={typeof initialValue}
        pattern={typeof initialValue === "number" ? "[0-9]*" : ""}
        value={inputValue}
        onChange={(e) => {
          console.log(e.target.value);
          setInputValue(e.target.value);
          setIsValid(
            validator
              ? validator(
                  typeof initialValue === "number"
                    ? e.target.valueAsNumber
                    : e.target.value
                )
              : true
          );
        }}
      ></LabeledInput>
    </BaseQuestion>
  );
}

export interface FormSubmitScreenProps extends BaseQuestionProps {
  questionList: { id: any; title: string; presentation: ReactElement }[];
  onEditPress: Dispatch<SetStateAction<number>>;
}

//Only a question in name
export function SummaryQuestion({
  id,
  submitData,
  questionList,
  onEditPress,
}: FormSubmitScreenProps) {
  return (
    <BaseQuestion
      id={id}
      title="Summary of your submission"
      buttonComponent={SubmitButton}
      buttonProps={{ id, submitData }}
    >
      <div className="summary-parent">
        {questionList.map((q) => {
          return (
            <div key={q.id} className="summary-box">
              <div className="info-review">
                <p key={q.title} className="text-base text-center">
                  {q.title}
                </p>
                {q.presentation}
              </div>
              <button
                className="summary-button form-button"
                onClick={(e) => {
                  e.preventDefault();

                  onEditPress(q.id);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </BaseQuestion>
  );
}

export interface RadioButtonQuestionProps extends BaseQuestionProps {
  options: CoreInformation[];
}
export function RadioButtonQuestion({
  title,
  imgRef,
  id,
  options,
  submitData,
}: RadioButtonQuestionProps) {
  return (
    <BaseQuestion
      id={id}
      title={title}
      imgRef={imgRef}
      buttonProps={{ id, submitData }}
    >
      <div className="radio-parent">
        {options.map((o) => {
          return (
            <button
              key={o.id}
              onClick={(e) => {
                e.preventDefault();
                submitData({ id: id, input: o.id });
              }}
            >
              <div className="radio-button">
                <img src={o.imgRef}></img>
              </div>
              <p>{o.title}</p>
            </button>
          );
        })}
      </div>
    </BaseQuestion>
  );
}

export interface MediaQuestionProps extends BaseQuestionProps {}

export function MediaQuestion({ title, id, submitData }: MediaQuestionProps) {
  const [takePicState, setTakePicState] = useState(false);
  const videoRef = useRef(null as unknown as HTMLVideoElement);

  const [picTaken, setPicTaken] = useState(false);
  const canvasRef = useRef(null as unknown as HTMLCanvasElement);

  const [imageState, setImageState] = useState("");

  const StartCamera = () => {
    var constraints = {
      audio: false,
      video: {
        facingMode: "environment",
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          const video = videoRef.current;
          video.srcObject = stream;
          // video.play();
          //Required for IOS
          video.playsInline = true;
          video.autoplay = true;
          video.muted = true;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const mediaSelectOptions = (
    <>
      <form className="contents">
        <label htmlFor="image-capture" className="form-button photo-button">
          Take a Photo
        </label>
        <input
          id="image-capture"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => {
            e.preventDefault();
            if (!e.target.files) return;
            setImageState(URL.createObjectURL(e.target.files[0]));
            setPicTaken(true);
          }}
        />

        <label htmlFor="file-upload" className="form-button photo-button">
          Upload a photo
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            e.preventDefault();
            if (!e.target.files) return;
            setImageState(URL.createObjectURL(e.target.files[0]));
            setPicTaken(true);
          }}
        />
      </form>
    </>
  );

  const cameraOptions = (
    <>
      <button
        className="form-button photo-button"
        onClick={(e) => {
          if (canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            context?.drawImage(
              videoRef.current,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );

            const data = canvasRef.current.toDataURL("image/png");
            // if (imgRef.current) {
            //   imgRef.current.src = data;
            //   setPicTaken(true);
            // }
            setPicTaken(true);
            context?.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            StopVideo();
          }
        }}
      >
        Take photo
      </button>
      <button
        className="form-button photo-button"
        onClick={(e) => {
          e.preventDefault();
          if (picTaken) {
            // if (imgRef.current) {
            //   imgRef.current.src = "";
            //   setPicTaken(false);
            // }
            setPicTaken(false);
          } else {
            StopVideo();
          }
          setTakePicState(false);
        }}
      >
        Undo
      </button>
    </>
  );

  return (
    <BaseQuestion
      id={id}
      title={title}
      buttonProps={{ id, submitData, payload: imageState }}
      buttonComponent={SkipOrProceedButtons}
    >
      <div className="camera-box">
        <div className="image-bounding-box">
          <video
            className={`video-player ${picTaken ? "hidden" : ""}`}
            ref={videoRef}
          />
          <img
            src={imageState}
            className={`video-player ${!picTaken ? "hidden" : ""}`}
          />
          <canvas className="hidden" ref={canvasRef} />
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {mediaSelectOptions}
        </div>
      </div>
    </BaseQuestion>
  );

  function StopVideo() {
    if (videoRef.current && videoRef.current.srcObject) {
      let stream: MediaStream = videoRef.current.srcObject as MediaStream;
      stream.getTracks()[0].stop();
      videoRef.current.srcObject = null;
    }
  }
}

interface _BaseQuestionProps {
  id: number;
  title?: string;
  imgRef?: string;
  children?: ReactElement<BaseQuestionProps>;
  buttonComponent?: (props: FormButtonProps) => ReactElement<FormButtonProps>; //Allows for context to be inherited
  buttonProps: FormButtonProps;
}

function BaseQuestion({
  title,
  imgRef,
  children,
  buttonComponent,
  buttonProps,
}: _BaseQuestionProps) {
  return (
    <div className="question-grid">
      <div className="question-content">
        <>
          {imgRef ? <img src={imgRef}></img> : <></>}
          <a className="text-center question-title my-4">{title}</a>
        </>
        {children}
        {/* {imgRef ? <img src={imgRef}></img> : children} */}
      </div>

      <div className="question-navigation">
        {buttonComponent ? (
          buttonComponent(
            buttonProps ? buttonProps : { id: -1, submitData: (d) => {} }
          )
        ) : (
          <></>
        )}

        <BackFormButton {...buttonProps} />
      </div>
    </div>
  );
}

interface FormButtonProps {
  submitData: (d: InputResponse) => void;
  canProgress?: boolean;
  payload?: any;
  id: number;
}

function BoolButtons({ submitData, id }: FormButtonProps) {
  return (
    <div>
      <button
        className="bool-button form-button ml-10 mr-3"
        onClick={(e) => {
          submitData({ id, input: true });
        }}
      >
        Yes
      </button>
      <button
        className="bool-button form-button mr-10 ml-3"
        onClick={(e) => {
          submitData({ id, input: false });
        }}
      >
        No
      </button>
    </div>
  );
}

function SubmitButton({
  submitData,
  canProgress,
  payload,
  id,
}: FormButtonProps) {
  return (
    <div>
      <button
        className="form-button large-button mx-10"
        onClick={(e) => {
          submitData({ id, input: payload });
        }}
      >
        Submit
      </button>
    </div>
  );
}

function BackFormButton({ submitData }: FormButtonProps) {
  return (
    <button
      className="form-button large-button mx-10"
      onClick={(e) => {
        submitData({ id: -1, input: null });
      }}
    >
      Back
    </button>
  );
}

function SkipOrProceedButtons({
  submitData,
  canProgress,
  payload,
  id,
}: FormButtonProps) {
  return (
    <div>
      <button
        className="bool-button form-button ml-10 mr-3"
        onClick={(e) => {
          submitData({ id, input: null });
        }}
      >
        Skip
      </button>
      <button
        disabled={payload}
        className="bool-button form-button mr-10 ml-3"
        onClick={(e) => {
          submitData({ id, input: payload });
        }}
      >
        Next
      </button>
    </div>
  );
}
