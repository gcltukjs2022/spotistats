import axios from "axios";

export function generateRandomString(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(arrayBuffer: ArrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);

    return btoa(String.fromCharCode.apply(null, Array.from(uint8Array)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export async function requestUserAuthorization() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URL;

  let codeVerifier = generateRandomString(128);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  let state = generateRandomString(16);
  let scope = "user-read-private user-read-email user-top-read";

  sessionStorage.setItem("code_verifier", codeVerifier);

  let params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  const authorizationUrl = "https://accounts.spotify.com/authorize?" + params;
  window.location.href = authorizationUrl;
}

export function scheduleTokenRefresh(secondsBeforeExpiration: number) {
  setTimeout(refreshAccessToken, secondsBeforeExpiration * 1000);
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    // Perform the token refresh using the refresh token
    const params = new URLSearchParams();
    params.append("client_id", import.meta.env.VITE_CLIENT_ID);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    return response;
  } catch (error: any) {
    console.log("REFRESH TOKEN ERROR: ", error);
    // Handle token refresh error; the user may need to reauthenticate
    if (error.response.data.error === "invalid_grant") {
      sessionStorage.clear();
      return error;
    }
    return error;
  }
}
