"use client";
import React from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { redirect, usePathname } from "next/navigation";
function useCaptcha() {
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const captchaRef = React.useRef<HCaptcha>(null);
  const pathname = usePathname();
  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    // captchaRef?.current?.execute();
  };
  return {
    HCaptcha: () => (
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY as string}
        onLoad={onLoad}
        onError={(err) => redirect(`${pathname}?error=${err}`)}
        ref={captchaRef}
        onVerify={setToken}
      />
    ),
    isLoading,
    token,
    setToken,
  };
}

export default useCaptcha;
