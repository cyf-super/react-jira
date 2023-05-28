import { memo } from "react";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";

import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { User } from "../../auto-provider";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModel } from "utils/url";
import { useProjectsQueryKey } from "./util";

export interface Project {
  created: number;
  id: number;
  name: string;
  organization: string;
  ownerId: number;
  personId: number;
  pin: boolean; // 星星
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = memo(({ users, ...props }: ListProps) => {
  const { open: setProjectModelOpen } = useProjectModel();
  const { mutate } = useEditProject(useProjectsQueryKey());
  // 柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked disabled></Pin>,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              ></Pin>
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${String(project.id)}`}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    ></Table>
  );
});

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModel();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      dropdownRender={() => (
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key="edit">
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key="delete"
          >
            删除
          </Menu.Item>
        </Menu>
      )}
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};
