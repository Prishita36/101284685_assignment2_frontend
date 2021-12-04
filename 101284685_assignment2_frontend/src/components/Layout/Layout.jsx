import React from "react";
import { Layout } from "antd";


import "./Layout.less";

const LayoutWrapper = ({ children }) => {
  const { Content } = Layout;

  return (
    <>
      <Layout id="MainLayout">

        <Content id="contentLayout">
          <Layout
            className="site-layout-background"
            style={{ padding: "12px" }}
          >

            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
                backgroundColor: "white",
              }}
            >
              <div style={{ paddingTop: "24px" }}>{children}</div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default LayoutWrapper;
