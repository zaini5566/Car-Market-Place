import { SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./components/ui/button";

const Contact = () => {
  return (
    <div>
      <SignInButton>
        <Button>Sign in</Button>
      </SignInButton>
    </div>
  );
};

export default Contact;
