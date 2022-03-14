import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// main appointment compnent
// handle all appointment components
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    if (!name || !interviewer) return transition(ERROR_SAVE, true);
    props
      .bookInterview(props.id, interview, "book")
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  // edit interview
  const edit = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    if (!name || !interviewer) return transition(ERROR_SAVE, true);
    props
      .bookInterview(props.id, interview, "edit")
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  // delete interview
  const destroy = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          placeholder={"Enter Student Name"}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={edit}
          onCancel={back}
          placeholder={"Enter Student Name"}
          student={props.interview.student}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm onConfirm={destroy} onCancel={() => transition(SHOW)} />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Error: Could not save"}
          onClose={() => transition(CREATE)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error: Could not delete"} onClose={back} />
      )}
    </article>
  );
}
