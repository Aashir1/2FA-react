import { Toaster } from "react-hot-toast";
import { Route } from "wouter";
import { Layout } from "~/components/layout";
import { CreateEntry } from "~/pages/create-entry";
import { Home } from "~/pages/home";

export const Application = () => {
  return (
    <Layout>
      <Route path="/" component={Home} />
      <Route path="/create" component={CreateEntry} />
      <Toaster position="bottom-center" />
    </Layout>
  );
};
