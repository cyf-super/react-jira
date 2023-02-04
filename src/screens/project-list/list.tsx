import { memo } from "react";
import { Dropdown, Menu, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { User } from "../../auto-provider";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { projectListActions } from "./project-list.slice";

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
  refresh?: () => void;
}

export const List = memo(({ users, ...props }: ListProps) => {
  const dispatch = useDispatch();
  const { mutate } = useEditProject();
  // 柯里化
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(() => {
      props.refresh && props.refresh();
    });
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
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <ButtonNoPadding
                        type="link"
                        onClick={() =>
                          dispatch(projectListActions.openProjectModel())
                        }
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
});
