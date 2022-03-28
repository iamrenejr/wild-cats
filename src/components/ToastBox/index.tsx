import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";

import "./styles.scss";

import { getTimeAgoText } from "../../lib/utils/getTimeAgoText";

interface IProps {
  onClose: () => void;
  text: string;
}
type ToastBox = (props: IProps) => JSX.Element;
export const ToastBox: ToastBox = (props) => {
  const [visible, setVisible] = useState(true);
  const { onClose: onCloseProps, text } = props;
  const [timeLoaded] = useState(new Date().getTime());
  const [timeDiff, setTimeDiff] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newTimeDiff = Math.floor((now - timeLoaded) / 1000);
      setTimeDiff(newTimeDiff);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const onClose = () => {
    setVisible(!visible);
    onCloseProps();
  };
  const timeAgoText = getTimeAgoText(timeDiff);
  return (
    <Toast
      data-testid="toast-box"
      className="toast-box"
      show={visible}
      onClose={onClose}
    >
      <Toast.Header className="toast-header">
        <strong className="me-auto toast-title">Error</strong>
        <small className="toast-time-ago">{timeAgoText}</small>
      </Toast.Header>
      <Toast.Body className="toast-body">{text}</Toast.Body>
    </Toast>
  );
};
