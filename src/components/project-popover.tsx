import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useDispatch } from "react-redux/es/exports";
import { projectListActions } from "screens/project-list/project-list.slice";
import { useProject } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: projects } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <Container>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item style={{ paddingLeft: 0 }}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type="link"
        onClick={() => dispatch(projectListActions.openProjectModel())}
      >
        创建项目
      </ButtonNoPadding>
    </Container>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const Container = styled.div`
  min-width: 20rem;
`;
