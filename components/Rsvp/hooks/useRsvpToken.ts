import { isString, uniqBy } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

interface RsvpToken {
  value: string;
  timestamp: number;
}

interface Response {
  token: string | undefined;
  setToken: (token: string) => void;
}

export function useRsvpToken(): Response {
  const [tokens, setTokens] = useLocalStorageState<RsvpToken[]>("rsvp-tokens", {
    defaultValue: [],
  });

  const setToken = useCallback(
    (token: string) => {
      setTokens((prevTokens) => {
        return uniqBy(
          [{ value: token, timestamp: Date.now() }, ...prevTokens],
          "value"
        );
      });
    },
    [setTokens]
  );

  const queryParam = useRouter().query.invite;
  useEffect(() => {
    if (isString(queryParam)) {
      setToken(queryParam);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [queryParam, setToken]);

  return {
    token: tokens[0]?.value,
    setToken,
  };
}
