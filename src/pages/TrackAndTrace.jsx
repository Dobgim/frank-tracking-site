import { useSearchParams } from "react-router-dom";
import TrackResult from "../sections/track/TrackResult";
import TrackForm from "../sections/track/TrackForm";

export default function TrackAndTrace() {
  const [params] = useSearchParams();
  const code = params.get("code");

  return (
    <>
      <TrackForm />
      {code && <TrackResult key={code} code={code} />}
    </>
  );
}
