import { useEffect, useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Outlet } from 'react-router-dom';
import Chats from './Chats';
import Conversations from './Conversations';

export default function ChatLayout() {
  return (
    <div>
      {/*---------------------- Chat layout for sm devices------------------------- */}
      <div className="md:hidden">
        <Outlet />
      </div>

      {/*----------------- Chat layout for md devices ------------------------- */}
      <div className=" hidden  md:flex ">
        <div className="left md:relative">
          <Conversations  />
        </div>
        <div className="right flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
