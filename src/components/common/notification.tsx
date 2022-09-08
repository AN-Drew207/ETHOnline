import { BellOutlined, EllipsisOutlined } from "@ant-design/icons";
import React from "react";

export const NotificationComponent: React.FC<any> = ({ name, action }) => {
  return (
    <div className="border border-gray-300 shadow-md rounded-xl gap-2 sm:px-4 py-4 px-2 flex items-center">
      <div className="flex items-center gap-4 w-full">
        <BellOutlined className="text-3xl !text-secondary" />
        <p className="font-bold text-dark truncate flex items-center justify-center gap-2 text-md">
          {name}
          <span className="font-thin lowercase text-dark">{action}.</span>
        </p>
      </div>
      <EllipsisOutlined />
    </div>
  );
};
