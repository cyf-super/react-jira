import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<KanbanScreen></KanbanScreen>}></Route>
        <Route path={"epic"} element={<EpicScreen></EpicScreen>}></Route>
        <Route
          path={"/*"}
          element={
            <Navigate to={window.location.pathname + "/kanban"}></Navigate>
          }
        ></Route>
      </Routes>
    </div>
  );
};
