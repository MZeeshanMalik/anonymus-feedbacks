// /* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

function Navbar() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  // Wait until the session status has been checked
  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  return (
    <nav className="p-4 md:p6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a className="text-xl font-bold mb-4 md:mb-0" href="#">
          Mystery Message
        </a>
        {!isLoading && (
          <>
            {session ? (
              <>
                <span className="mr-4">
                  Welcome, {session.user?.userName || session.user?.email}
                </span>
                <Button className="w-full md:w-auto" onClick={() => signOut()}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/sign-in">
                <Button className="w-full md:w-auto">Login</Button>
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
