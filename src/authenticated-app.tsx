import { Button } from "antd";
import { ProjectLIst } from "./screens/project-list";

export const AuthenticatedApp = ({
  logout,
}: {
  logout: () => Promise<void>;
}) => {
  return (
    <div>
      <Button onClick={logout}>登出</Button>
      <ProjectLIst></ProjectLIst>
    </div>
  );
};
