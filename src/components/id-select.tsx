import { Select } from "antd";
import React from "react";

import { raw } from "types";

// 获取Select本身的属性
type SelectProps = React.ComponentProps<typeof Select>;

// 拓展Select属性，以便透传
// Omit 剔除SelectProps中 'value'、'onChange'、'options'属性
interface IdSelectType
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * 封装一个id管理组件：转化id为number，如果value是负责人，没有id故不会显示
 *   - 如果value为负责人，id为0
 *   - 否则id转化为number
 * @param props
 * @returns
 */
export const IdSelect = (props: IdSelectType) => {
  const { value, onChange, options, defaultOptionName, ...restProps } = props;
  return (
    // restProps：透传Select组件属性
    <Select
      value={options && options.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {/* 处理value为默认值的情况 */}
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options &&
        options.map((option) => (
          <Select.Option key={option.id} value={option.id}>
            {option.name}
          </Select.Option>
        ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
