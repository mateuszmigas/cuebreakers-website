import React, { ReactNode } from "react";

export class NoSSR extends React.Component<
  { children: ReactNode },
  { serverRender: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      serverRender: true,
    };
  }

  componentDidMount() {
    this.setState({ serverRender: false });
  }

  render() {
    const { children } = this.props;
    const { serverRender } = this.state;
    return serverRender ? <div></div> : children;
  }
}

export default NoSSR;
