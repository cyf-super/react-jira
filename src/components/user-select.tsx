import React from "react";
import { useUser } from "utils/useUser";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: user } = useUser();
  return <IdSelect options={user || []} {...props} />;
};
