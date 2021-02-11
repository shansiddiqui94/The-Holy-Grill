import { useEffect, useState } from "react";
import createRecorder from "../services/createRecorder";
import { useDispatch } from "react-redux";

import {
  mediaSupported,
  mediaNotSupported,
  stopRecording,
  startRecording,
} from "../features/recorder/actions";

import { fetchSongs } from "../features/songs/actions";

const useRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(undefined);
  const dispatch = useDispatch();

  const onStop = (data) => {
    dispatch(stopRecording());
    dispatch(fetchSongs(data));
  };

  const onStart = () => {
    dispatch(startRecording());
  };

  useEffect(() => {
    if (navigator?.mediaDevices?.getUserMedia) {
      dispatch(mediaSupported());
      (async () => {
        setMediaRecorder(await createRecorder(onStop, onStart));
      })();
    } else {
      dispatch(mediaNotSupported());
    }
  }, []);

  return mediaRecorder;
};

export default useRecorder;
