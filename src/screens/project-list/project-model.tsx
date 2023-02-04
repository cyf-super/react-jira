import { Button, Drawer } from "antd";
import { useProjectModel } from "utils/url";

export const ProjectModel = () => {
  const [, close, projectModelOpen] = useProjectModel();
  return (
    <Drawer onClose={close} open={projectModelOpen} size="large" width="100%">
      <h1>Project Model</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
