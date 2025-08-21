"use client";

import React, { useState } from "react";
import {
  CreditCardOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Content, Sider } = Layout;

type NavItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  path: string;
};

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  path?: string
): NavItem {
  return {
    key,
    icon,
    label,
    path: path ?? "",
  };
}

const navItems: NavItem[] = [
  getItem("Профиль", "1", <UserOutlined />, "/profile"),
  getItem("Последние тесты", "2", <DesktopOutlined />, "/tests"),
  getItem("Результаты", "3", <PieChartOutlined />, "/results"),
  getItem("Баланс", "4", <CreditCardOutlined />, "/balance"),
  getItem("Достижения", "5", <FileOutlined />, "/achievements"),
];

const items: MenuProps["items"] = navItems.map((n) => ({
  key: n.key,
  icon: n.icon,
  label: n.label,
}));

interface LayoutAppProps {
  children: React.ReactNode;
}

const LayoutApp: React.FC<LayoutAppProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey: string | undefined = navItems.find((item) => item.path === location.pathname)?.key;

  const onMenuClick: MenuProps["onClick"] = (e) => {
    const clickedItem = navItems.find((item) => item.key === e.key);
    if (clickedItem) {
      navigate(clickedItem.path);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={selectedKey ? [selectedKey] : []} 
          mode="inline"
          items={items}
          onClick={onMenuClick}
          className="mt-10"
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h2 className="ms-5 md:font-semibold md:text-lg text-sm font-medium mt-5 md:mt-4">
            Профиль пользователя
          </h2>
        </Header>
        <Content style={{ margin: "0 16px", height: "100%" }}>
          <div
            style={{
              marginTop: 20,
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;
