import Axios from "axios";
// import { setupCache } from "axios-cache-interceptor";
import * as vscode from "vscode";

import { Gem } from "@/types";

const api = Axios.create({ baseURL: "https://rubygems.org" });

// setupCache(api);

export async function getGem(name: string) {
  const path = `/api/v1/gems/${name}.json`;
  try {
    const res = await api.get<Gem>(path);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    vscode.window.showErrorMessage("Error fetching gem info: " + error.message);
    return;
  }

  return;
}
