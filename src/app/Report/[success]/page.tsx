import { RedirectButton } from "@/components/Form/Buttons/ControlButtons";
import "@/components/Form/QuestionContents/QuestionStyles.css";
// interface ReportStatusPageParams {
//   params : {}
//   success: string;
// }

export default function ReportStatus({
  params,
}: {
  params: { success: string };
}) {
  console.log("Success: " + params.success);
  const submissionSuccess = Boolean(params.success);
  return (
    <div className="centered-box my-10">
      <img src="/Report_Submitted.svg" height="156px" width="260px" />
      <p className="header-2 my-8">
        {submissionSuccess ? "Report Submitted" : "Error Submitting Report"}
      </p>
      <RedirectButton destination="/Map">
        <div className="flex flex-row justify-center">
          <img src="/Map_Icon.svg" /> <p className="ml-2">Return to map</p>
        </div>
      </RedirectButton>
      <RedirectButton destination="/Report">
        <>
          <p>Submit another report</p>
        </>
      </RedirectButton>
    </div>
  );
}
