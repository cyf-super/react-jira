import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  // 除了children剩下的属性
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
  state = { error: null };

  // 当子组件抛出异常，这里会就接收并且调用，然后会自动设置state
  static getDerivedStateFormError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
