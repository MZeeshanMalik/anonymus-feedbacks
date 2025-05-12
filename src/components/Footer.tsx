import React from "react";

function Footer() {
  return (
    <div>
      <footer className="text-center p-4 md:p-6 flex flex-col items-center gap-2">
        <div>©️ 2025 Mystery message. All rights are reserved.</div>
        <div className="text-sm text-gray-600">
          Developed by M Zeeshan •{" "}
          <a href="mailto:m121zeeshan@gmail.com" className="hover:underline">
            m121zeeshan@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
