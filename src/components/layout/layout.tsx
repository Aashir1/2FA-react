import { Header } from "~/components/header";
import { FC, PropsWithChildren, Fragment } from "react";

type LayoutProps = PropsWithChildren & {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};
