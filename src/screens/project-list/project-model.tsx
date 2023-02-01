import { Button, Drawer } from "antd";

export const ProjectModel = (props: {
  projectModelOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      open={props.projectModelOpen}
      size="large"
      width="100%"
    >
      <h1>Project Model</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
