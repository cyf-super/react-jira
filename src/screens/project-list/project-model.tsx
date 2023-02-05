import { Button, Drawer, Form, Spin } from "antd";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useProjectModel } from "utils/url";

export const ProjectModel = () => {
  const {
    close,
    projectModelOpen,
    editingProject,
    isLoading,
    open,
    startEdit,
  } = useProjectModel();

  const title = editingProject ? "编辑项目" : "创建项目";
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  return (
    <Drawer onClose={close} open={projectModelOpen} size="large" width="100%">
      {isLoading ? (
        <Spin size="large"></Spin>
      ) : (
        <>
          <h1>{title}</h1>
          <Form layout={"vertical"} style={{ width: "40rem" }}>
            <Form.Item
              label={"名称"}
              name={"name"}
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <input placeholder={"请输入项目名称"} />
            </Form.Item>
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <input placeholder={"请输入部门名"} />
            </Form.Item>
            <Form.Item label={"负责人"} name={"personId"}>
              <UserSelect defaultOptionName={"负责人"} />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
